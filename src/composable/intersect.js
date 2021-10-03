export function useIntersect(options) {
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
