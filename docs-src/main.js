import Vue from 'vue';
import HeroIcons from 'vue-heroicons';
import { cheveronDown, cheveronUp } from 'vue-heroicons/src/icons';
import './assets/scss/style.scss';
import VIntersect from '../src';
import App from './App.vue';

Vue.use(VIntersect);

HeroIcons.add([cheveronDown, cheveronUp]);
Vue.use(HeroIcons);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
