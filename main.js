import Vue from 'vue'
import App from './App'
import {$http} from '@escook/request-miniprogram'
import store from './store/index.js'

uni.$http=$http

$http.baseUrl='https://api-hmugo-web.itheima.net'

$http.beforeRequest=function(options){
	uni.showLoading({
		title:'数据加载中...'
	})
}

$http.afterRequest=function(options){
	uni.hideLoading()
}

uni.$showMsg=function(title='数据请求失败！',duration=1500){
	return uni.showToast({
		title:title,
		duration:duration,
		icon:'none'
	})
}

Vue.config.productionTip = false

App.mpType = 'app'


const app = new Vue({
	...App,
	store
})
app.$mount()
