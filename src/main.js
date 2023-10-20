import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

import './mock/mockServer'
import loading from './common/images/loading.gif'
import './filters'

import {Button} from 'mint-ui'
Vue.component(Button.name,Button)
Vue.use(VueLazyload,{
    loading
})

new Vue({
    el:'#app',
    render:h=>h(App),
    router,
    store
})