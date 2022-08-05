const user={
	state:{
		address:JSON.parse(uni.getStorageSync('address')||'{}'),
	},
	mutations:{
		updateAddress(state,address){
			state.address=address
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		
	},
	getters:{
		addstr(state){
			if(!state.address.provinceName) return ''
			return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
		}
	}
}

export default user