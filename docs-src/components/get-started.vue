<template>
  <div>
    <h2>Installation</h2>
    <prism language="javascript" class="prism" code="npm install --s v-intersect"/>
    <p>or</p>
    <prism language="javascript" class="prism" code="yarn add v-intersect"/>
    </prism>
    <h2>Usage</h2>
    <p>main.js</p>
    <prism language="javascript" class="prism" code="import Vue from 'vue'
import VIntersect from 'v-intersect'

Vue.use(VIntersect)
" />
<p>app.vue</p>
<prism language="html" class="prism" code="<template>
  <div class='container'>
    <!-- Directive -->
    <div class='content' v-intersect='onIntersect'>
      <h3>Some Content</h3>
    </div>

    <!-- Component -->
    <v-intersect @change='onIntersect'>
      <div class='content'>
        <h3>Some Content</h3>
      </div>
    </v-intersect>
  </div>
</template>
" />
  </div>
</template>
<script>
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import Prism from 'vue-prism-component';

export default {
  components: { Prism },
};
</script>
