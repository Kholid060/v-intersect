import intersectDirective from './directives/v-intersect';
import intersectComponent from './components/v-intersect';

export const VIntersectComp = intersectComponent;
export const VIntersectDir = intersectDirective;

export default {
  install(Vue) {
    Vue.directive('intersect', intersectDirective);
    Vue.component(intersectComponent.name, intersectComponent);
  },
};
