<template>
  <div id="app">
    <div class="main">
      <div class="wrapper">
        <p class="title">Vue Intersection</p>
        <p class="description">Detect when element is visible or hidden on user viewport</p>
        <div class="buttons-wrapper">
          <button class="button" @click="showGetStarted = !showGetStarted">Get Started</button>
          <a class="button" href="#" target="_blank">Documentation</a>
          <a class="button" href="#" target="_blank">Report an issue</a>
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
