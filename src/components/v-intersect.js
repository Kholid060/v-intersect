export default {
  name: 'v-intersect',
  abstract: true,
  props: {
    root: {
      type: String,
      default: '',
    },
    rootMargin: {
      type: String,
      default: '0px',
    },
    threshold: {
      type: [Number, Array],
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    const root = this.root ? document.querySelector(this.root) : null;

    this.observer = new IntersectionObserver((entries) => {
      if (this.disabled) return;

      const isIntersecting = Boolean(entries.find(entry => entry.isIntersecting));
      const payload = { isIntersecting, entries };
      const { change, enter, once } = this.$listeners;

      if (change && !enter) this.$emit('change', payload);

      if (isIntersecting) {
        if (enter) this.$emit('enter', payload);
        if (once) {
          this.$emit('once', payload);
          this.observer.unobserve(this.$slots.default[0].elm);
        }
      }
    }, {
      root,
      rootMargin: this.rootMargin,
      threshold: this.threshold,
    });
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$slots.default && this.$slots.default.length > 1) {
        console.error('You may only wrap one element inside a v-intersect component.');
      } else if (!this.$slots.default || this.$slots.default.length < 1) {
        console.error('You must have at least one child inside a v-intersect component.');
        return;
      }

      this.observer.observe(this.$slots.default[0].elm);
    });
  },
  destroyed() {
    this.observer.disconnect();
  },
  render() {
    if (this.$slots.default) {
      return this.$slots.default[0];
    }
    return null;
  },
};
