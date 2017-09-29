import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router';
import App from './app.vue';
import Http from './common/http';



Vue.use(VueRouter);
Vue.use(Http);
const router = new VueRouter({
    // mode: 'history',
    routes
})
  


new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})
