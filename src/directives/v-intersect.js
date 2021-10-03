function mounted(el, { value, modifiers = {} }) {
  if (el._intersect) return;

  const isObject = typeof value === 'object' && value !== null;
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };

  if (isObject && value.options) {
    Object.entries(value.options).forEach(([key, value]) => {
      if (options[key]) options[key] = value;
    });
  }

  const callback = isObject ? value.callback : value;

  const observer = new IntersectionObserver((entries) => {
    const isIntersecting = entries.some((entry) => entry.isIntersecting);

    if (!el._intersect || value.disabled) return;

    if (callback && !modifiers.enter) callback({ isIntersecting, entries });

    if (isIntersecting) {
      if (modifiers.enter) callback({ isIntersecting, entries });
      if (el._intersect && value.once) unbind(el);
    }
  }, options);

  el._intersect = { observer, options };
  observer.observe(el);
}
function unmounted(el) {
  if (!el._intersect) return;

  el._intersect.observer.disconnect();
  delete el._intersect;
}

export default {
  mounted,
  unmounted,
};
