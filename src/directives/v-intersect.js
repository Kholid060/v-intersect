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

export default {
  mounted,
  updated,
  unmounted,
};
