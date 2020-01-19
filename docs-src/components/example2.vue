<template>
  <card :code="code" lang="html">
    <h2 slot="title">With Options</h2>
    <h2 class="scroll-sign">Scroll Down</h2>
    <div style="height: 400px"></div>
        <div class="example-content" v-intersect="{
    callback: onIntersect,
    options: {
      threshold: 1
    }
  }">
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
  <v-intersect @change="onIntersect" :threshold="1">
    <div class="content">
      <h3>Some Content</h3>
    </div>
  </v-intersect>
</template>

<!-- Directive -->
<template>
  <div class="content" v-intersect="{
    callback: onIntersect,
    options: {
      threshold: 1
    }
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
