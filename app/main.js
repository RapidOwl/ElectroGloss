import Vue from 'vue/dist/vue'
import App from './App.vue'
import Normalize from '../assets/css/normalize.css'
import Skeleton from '../assets/css/skeleton.css'
import SiteCss from '../assets/css/site.css'

Vue.component('term-list', {
    props: ['term'],
    template: '<div>' +
        '<div class="row"><div class="four columns">{{ term.name }}</div><div class="eight columns">{{ term.description }}</div></div>' +
        '<div class="row"><div class="four columns">{{ term.tags }}</div><div class="four columns">{{ term.otherNames }}</div><div class="four columns">{{ term.disambiguations }}</div></div>' +
        '</div>'
});

Vue.component('yml-preview', {
    props: ['yml'],
    template: '<pre style=\'border: 1px dashed red; padding: 10px;\'>{{ yml }}</pre>'
});

new Vue({
    el: '#app',
    components: { App }
})

new Vue(App).$mount('#app');