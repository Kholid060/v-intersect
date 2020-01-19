<template>
  <div class="card-container">
    <slot name="title"></slot>
    <div class="card">
      <div class="example-container">
        <slot></slot>
      </div>
      <slot name="indicator"></slot>
      <transition name="slide" mode="out-in">
       <prism language="html" class="prism" v-show="expand" :code="code"></prism>
     </transition>
      <button class="code-expand" @click="expand = !expand">
        <heroicon :name="expand ? 'cheveron-up' : 'cheveron-down'"></heroicon>
        <span>{{expand ? 'Hide' : 'Expand'}}</span>
      </button>
    </div>
  </div>
</template>
<script>
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import Prism from 'vue-prism-component';

export default {
  components: { Prism },
  props: {
    code: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    expand: false,
  }),
  methods: {
    intersect({ isIntersecting }) {
      this.visible = isIntersecting;
    },
  },
};
</script>
<style lang="scss">
.slide-enter-active {
  transition: all .2s ease;
}
.slide-leave-active {
  transition: all .2s ease;
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
}
</style>
