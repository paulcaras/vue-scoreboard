import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import stores from './store';
import routes from './routes';
import mixin from './mixin';
import VIcon from 'vue-awesome/components/Icon.vue';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.prototype.APP_NAME = "ERJ";
Vue.prototype.APP_NAME_FULL = "ERJscoreboard";
Vue.prototype.APP_NAME_FLASH = "ERJ";
Vue.prototype.SERVER_IP = "192.168.4.1:8080";
Vue.prototype.SERVER_URI = "http://192.168.4.1:8080";
Vue.prototype.KEY_CONTROLS = {
	navi: ['ARROWLEFT', 'ARROWRIGHT', 'P', 'T', ' ', 'C', 'R'],
	mode: ['S', 'B', 'V', 'F', 'U'],
	view: ['ARROWUP', 'ARROWDOWN'],
	shot: ['1', '2', '3', ',', '.', '-', '=', 'I', 'O']
};

Vue.component('v-icon', VIcon);
Vue.use(Vuex);

Vue.use(VueResource);
//Vue.http.options.crossOrigin = true;
//Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';
//Vue.http.headers.common['User-Agent'] = 'ERJscoreboard 1.0';

Vue.use(VueRouter);
Vue.mixin(mixin);

const router = new VueRouter({routes});
const store = new Vuex.Store(stores);

const app = new Vue({
	template: '<app/>',
  	components: {
   		app: App
  	},
  	router,
  	store
}).$mount('#app');