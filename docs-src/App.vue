<template>
  <div id="app">
    <div class="main">
      <div class="wrapper">
        <p class="title">v-intersect</p>
        <p class="description">Detect when element is visible or hidden on user viewport</p>
        <div class="package-info">
          <a href="https://www.npmjs.com/package/v-intersect" class="button" target="_blank">
            <img src="https://img.shields.io/npm/v/v-intersect">
          </a>
          <a class="github-button button" href="https://github.com/kholid060/v-intersect" data-icon="octicon-star" data-show-count="true" aria-label="Star kholid060/v-intersect on GitHub">Star</a>
        </div>
        <div class="buttons-wrapper">
          <button class="button" @click="showGetStarted = !showGetStarted">Get Started</button>
          <a class="button" href="https://github.com/Kholid060/v-intersect" target="_blank">Documentation</a>
          <a class="button" href="https://github.com/Kholid060/v-intersect/issues" target="_blank">Report an issue</a>
        </div>
      </div>
    </div>
    <div class="content">
      <get-started v-if="showGetStarted"></get-started>
      <template v-else>
        <example1></example1>
        <example2></example2>
        <example3></example3>
      </template>
    </div>
  </div>
</template>

<script>
import Example1 from './components/example1';
import Example2 from './components/example2';
import Example3 from './components/example3';
import GetStarted from './components/get-started';

export default {
  name: 'app',
  components: {
    Example1, Example2, Example3, GetStarted,
  },
  data: () => ({
    showGetStarted: false,
  }),
};
</script>
