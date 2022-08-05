const cart={
	state:{
		cart:JSON.parse(uni.getStorageSync('cart')||'[]')
	},
	mutations:{
		addToCart(state,goods){
			let resultFind=state.cart.find((item)=>item.goods_id==goods.goods_id)
			if(resultFind==null){
				state.cart.push(goods)
			}else{
				resultFind.goods_count++
			}
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		updateGoodsStatus(state,goods){
			let resultFind=state.cart.find((item)=>item.goods_id==goods.goods_id)
			if(resultFind){
				resultFind.goods_state=resultFind.goods_state==true?false:true
			}
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		updateGoodsNum(state,goods){
			let resultFind=state.cart.find((item)=>item.goods_id==goods.goods_id)
			if(resultFind){
				resultFind.goods_count=goods.goods_count
			}
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		removeGoodsById(state,goods){
			state.cart=state.cart.filter((item)=>item.goods_id!==goods.goods_id)
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		updateAllState(state,checked){
			state.cart.forEach(x=>x.goods_state=checked)
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		}
	},
	
	getters:{
		total(state){
			let c=0
			state.cart.forEach((item)=>c=c+item.goods_count)
			return c
		},
		allChecked(state){
			return state.cart.every(x=>x.goods_state==true)
		},
		totalPrice(state){
			return state.cart.filter(x=>x.goods_state==true).reduce((total,item)=>total+item.goods_count*item.goods_price,0).toFixed(2)
		},
		totalNumChecked(state){
			return state.cart.filter(x=>x.goods_state==true).reduce((total,item)=>total+item.goods_count*1,0)
		}
	}
}
export default cart