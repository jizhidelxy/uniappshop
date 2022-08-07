const user={
	state:{
		address:JSON.parse(uni.getStorageSync('address')||'{}'),
		token:uni.getStorageSync('token')||'',
		userinfo:JSON.parse(uni.getStorageSync('userinfo')||'{}'),
		redirectInfo:null
	},
	mutations:{
		updateAddress(state,address){
			state.address=address
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		updateUserinfo(state,userinfo){
			state.userinfo=userinfo
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		},
		updateToken(state,token){
			state.token=token
			uni.setStorageSync('token',state.token)
		},
		updateRedirectInfo(state,redirectInfo){
			state.redirectInfo=redirectInfo
		}
	},
	getters:{
		addstr(state){
			if(!state.address.provinceName) return ''
			return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
		}
	},
}

export default user