import { onMounted, onUnmounted, watch, h, ref } from 'vue';

export default {
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
      }, props.options)

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
