import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import Home from '../views/Home.vue'
import Attendance from '@/views/Attendance'
import CertcardView from "@/views/CertcardView";
import urlcollectView from "@/views/urlcollectView";

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ViewUI)

Vue.http.options.root = 'http://127.0.0.1:9000/'
Vue.http.headers.common['Authorization'] = 'Bearer  ' + localStorage.getItem('access');

Vue.http.options.emulateJSON = true;
Vue.http.options.xhr = {withCredentials: true}

const routes = [
  {
    path: '/',
    name: 'urlcollect',
    component: urlcollectView
  },
  {
    path: '/certcard',
    name: 'certcard',
    component: CertcardView
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
