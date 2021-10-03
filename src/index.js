import intersectDirective from './directives/v-intersect';
import intersectComponent from './components/v-intersect';
export { useIntersect } from './composable/intersect';

export const VIntersectComp = intersectComponent;
export const VIntersectDir = intersectDirective;

export default {
  install(app) {
    app.directive('intersect', intersectDirective);
    app.component('v-intersect', intersectComponent);
  },
};
