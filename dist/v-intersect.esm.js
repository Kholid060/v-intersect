import { ref, watch, onMounted, onUnmounted, h } from 'vue';

function mounted(el, { value, modifiers }) {
  const isObject = typeof value === 'object' && value !== null;
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };

  if (isObject && value.options) {
    Object.entries(value.options).forEach(([key, value]) => {
      if (options.hasOwnProperty(key)) options[key] = value;
    });
  }

  const callback = isObject ? value.callback : value;

  const observer = new IntersectionObserver((entries) => {
    if (!el._intersect || (isObject && value.disabled)) return;

    const isIntersecting = entries.some((entry) => entry.isIntersecting);

    if (isIntersecting) {
      callback({ isIntersecting, entries });

      if (el._intersect && value.once) unmounted(el);
    } else if (!modifiers.enter) {
      callback({ isIntersecting, entries });
    }
  }, options);

  el._intersect = { observer, options };
  observer.observe(el);
}
function updated(el, binding) {
  unmounted(el);
  mounted(el, binding);
}
function unmounted(el) {
  if (!el._intersect) return;

  el._intersect.observer.unobserve(el);
  delete el._intersect;
}

var intersectDirective = {
  mounted,
  updated,
  unmounted,
};

var intersectComponent = {
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    enter: {
      type: Boolean,
      default: false,
    },
    once: {
      type: Boolean,
      default: false,
    },
    as: {
      type: String,
      default: 'div',
    },
  },
  emits: ['change'],
  setup(props, { slots, emit }) {
    const rootRef = ref(false);

    let observer;

    function createObserver() {
      observer = new IntersectionObserver((entries) => {
        if (props.disabled) return;

        const isIntersecting = entries.some((entry) => entry.isIntersecting);

        if (isIntersecting) {
          emit('change', isIntersecting, entries);

          if (props.once) destroyObserver();
        } else if (!props.enter) {
          emit('change', isIntersecting, entries);
        }
      }, props.options);

      observer.observe(rootRef.value);
    }
    function destroyObserver() {
      if (observer) observer.disconnect();
    }

    watch(() => props.options, () => {
      destroyObserver();
      createObserver();
    }, { deep: true });

    onMounted(createObserver);
    onUnmounted(destroyObserver);

    return () => h(props.as, {
      ref: rootRef,
    }, slots.default && slots.default());
  },
};

function useIntersect(options) {
  let observeId = 0;
  const listeners = [];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const itemId = entry.target.getAttribute('v-intersect');
      const listener = listeners.find(({ id }) => id === itemId);
      const { target, isIntersecting } = entry;

      if (!listener) {
        observer.unobserve(target);
        return;
      }

      if (isIntersecting) {
        listener.callback(isIntersecting, entries);

        if (listener.once) unobserve(target);
      } else if (!listener.enter) {
        listener.callback(isIntersecting, entries);
      }
    }, options);
  });

  function observe(el, callback) {
    if (el.hasAttribute('v-intersect')) return;

    observeId += 1;

    const options = typeof callback === 'function' ? { callback } : callback;
    const itemId = `item-${observeId}`;

    listeners.push({ id: itemId, ...options });
    observer.observe(el);
    el.setAttribute('v-intersect', itemId);

    return itemId;
  }
  function unobserve(el) {
    if (!el.hasAttribute('v-intersect')) return;

    const itemId = el.getAttribute('v-intersect');
    const itemIndex = listeners.findIndex(({ id }) => id === itemId);

    if (itemIndex !== -1) {
      listeners.splice(itemIndex, 1);
      observer.unobserve(el);
    }
  }

  return { observe, observer, unobserve };
}

const VIntersectComp = intersectComponent;
const VIntersectDir = intersectDirective;

var index = {
  install(app) {
    app.directive('intersect', intersectDirective);
    app.component('v-intersect', intersectComponent);
  },
};

export { VIntersectComp, VIntersectDir, index as default, useIntersect };
