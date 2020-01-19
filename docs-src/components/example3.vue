<template>
  <card :code="code" lang="html">
    <template slot="title">
      <h2 style="margin: 0">Once</h2>
      <p style="margin-bottom: 20px">Callback will be called once when element is visible</p>
    </template>
    <h2 class="scroll-sign">Scroll Down</h2>
    <div style="height: 400px"></div>
    <div class="example-content" v-intersect="{callback: onIntersect, once: true}">
      <h3>Some Content</h3>
    </div>
    <div style="height: 400px;"></div>
      <p class="visibility" :class="[visibleText]" slot="indicator">{{visibleText}}</p>
  </card>
</template>
<script>
import Card from './card.vue';

const code = `<!-- Component -->
<template>
  <v-intersect @once="onIntersect">
    <div class="content">
      <h3>Some Content</h3>
    </div>
  </v-intersect>
</template>

<!-- Directive -->
<template>
  <div class="content" v-intersect="{
    callback: onIntersect,
    once: true
  }">
    <h3>Some Content</h3>
  </div>
</template>
`;

export default {
  components: { Card },
  data: () => ({
    code,
    visible: false,
  }),
  methods: {
    onIntersect({ isIntersecting }) {
      this.visible = isIntersecting;
    },
  },
  computed: {
    visibleText() {
      return this.visible ? 'visible' : 'hidden';
    },
  },
};
</script>
