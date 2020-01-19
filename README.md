# V-Intersect

![version](https://img.shields.io/npm/v/v-intersect)

**Detect when element is visible or hidden on user viewport**

## Installation

#### NPM
```javascript
npm install v-intersect --save
```
#### Yarn
```javascript
yarn add v-intersect
```

Install the plugin into your Vue project:
```javascript
import Vue from 'vue'
import VIntersect from 'v-intersect'

Vue.use(VIntersect)
```
or use the component and directive directly:
```javascript
import Vue from 'vue'
import { VIntersectComp, VIntersectDir } from 'v-intersect'

Vue.directive('intersect', VIntersectDir)
Vue.component('v-intersect', VIntersectComp)
```

## Usage
### Directive

```html
<div class="content" v-intersect="onIntersect">...</div>
```
The function will be called when the visibility of the element is changes.
```javascript
onIntersect(observer){
    this.isVisible = observer.isIntersecting
    console.log(observer.entries)
}
```
- `isIntersecting`: when it's `true` it means the element is visible on the screen, and `false` means it's hidden
- `entries`: [IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)

And if you want the function only called when element is visible you can use `.enter` modifier.
``` html
<div class="content" v-intersect.enter="onIntersect">...</div>
```
### Options

```html
<div class="content" v-intersect="{
    callback: onIntersect,
    options: {
        root: ...,
        rootMargin: ...,
        threshold: ...
    }
}">
</div>
```
For more details [IntersectionObserver Options](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#Parameters)

### Once

It will called the function once when the element is visible
```html
<div class="content" v-intersect="{
    callback: onIntersect,
    once: true
}" />
```
### Disabling the observer

```html
<div class="content" v-intersect="{
    callback: onIntersect,
    disabled: true
}" />
```

### Component

```html
<v-intersect @change="onIntersect">
    <div class="content">...</div>
</v-intersect>
```
### Events

| Name |  Description |
|---|---|
| **change**  |  event fired when visibility of the element change |
| **enter**  |  event fired when the element is intersect (visible) on the screen|
| **once** | event fired once when the elemnt is visible |

### Props

| Name  | Type  | Default  | Description  |
|---|---|---|---|
| **root** |  String | ' '  |  [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) |
| **rootMargin**  | String  |  '0px' | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options)  |
| **threshold** | [Array, Number] | 0 | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options)|
| **disabled** | Boolean | false | Disable the observer |

**Note**: for `root` prop, you need to pass the element class or id i.e `.content` or `#content`

## Polyfill
This plugin uses The IntersectionObserver API, and currently it is not available in all browsers [(IE11, Safari and iOS Safari)](http://caniuse.com/#feat=intersectionobserver). If you intend to support these browsers, you can include [WICG IntersectionObserver Polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) to your bundle.