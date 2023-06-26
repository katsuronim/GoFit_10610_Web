import { createApp } from 'vue'
import App from './App.vue'
//import router
import router from './router'
//import Bootstrap, Popper, jQuery
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'
import Toaster from '@meforma/vue-toaster'


const app = createApp(App)

//use vue router
app.use(Toaster)
app.use(router)
app.mount('#app')