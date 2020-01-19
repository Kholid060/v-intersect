/* eslint no-underscore-dangle: 0 */

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};

function unbind(el) {
  if (!el._intersect) return;

  el._intersect.observer.unobserve(el);
  delete el._intersect;
}

function changeOptions(items) {
  Object.keys(items).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(options, key)) options[key] = items[key];
  });
}

export function bind(el, { value, modifiers = {} }) {
  const isObject = typeof value === 'object';

  if (isObject && Object.prototype.hasOwnProperty.call(value, 'options')) changeOptions(value.options);
  const callback = isObject ? value.callback : value;
  const observer = new IntersectionObserver((entries) => {
    const isIntersecting = Boolean(entries.find(entry => entry.isIntersecting));

    if (!el._intersect || value.disabled) return;

    if (callback && !modifiers.enter) callback({ isIntersecting, entries });

    if (isIntersecting) {
      if (modifiers.enter) callback({ isIntersecting, entries });
      if (el._intersect && value.once) unbind(el);
    }
  }, options);

  el._intersect = { observer };
  observer.observe(el);
}

const directive = {
  bind,
};

export default directive;
