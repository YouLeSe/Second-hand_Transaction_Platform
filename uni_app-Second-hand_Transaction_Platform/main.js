// #ifndef VUE3
import Vue from 'vue'
import App from './App'
//导入网络请求的包
import {
	$http
} from '@escook/request-miniprogram'

uni.$http = $http

//请求响应器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '正在努力加载中...'
	})
}

//拦截响应器
$http.afterRequest = function() {
	uni.hideLoading()
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif