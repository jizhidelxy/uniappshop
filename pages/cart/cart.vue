<template>
	<view class="cart-page">
		<view class="cart-box" v-if="cart.length!==0">
			<view class="my-address">
				<my-address></my-address>
			</view>
			<view class="cart-goods-list">
				<view class="cart-title">
					<uni-icons type="shop" size="18"></uni-icons>
					<text>购物车</text>
				</view>
				<uni-swipe-action>
					<block v-for="(item,index) in cart" :key="item.goods_id">
						<uni-swipe-action-item :options="options" @click="swiperHandler(item)">
							<my-goods :goods="item" :showRadio="true"></my-goods>
						</uni-swipe-action-item>
					</block>
				</uni-swipe-action>
			</view>
			<view class="my-settle">
				<my-settle></my-settle>
			</view>
		</view>
		<view class="cart-empty" v-else>
			<text>购物车空空如也~</text>
		</view>
	</view>
</template>

<script>
	import BadgeMix from '../../mixins/tabbar-badge.js'
	import {mapState,mapMutations} from 'vuex'
	export default {
		mixins:[BadgeMix],
		data() {
			return {
				options:[{
					text:'删除',
					style:{
						backgroundColor:'#C00000'
					}
				}]
			};
		},
		computed:{
			...mapState({
				cart:state=>state.cart.cart
			})
		},
		methods:{
			...mapMutations(['removeGoodsById']),
			swiperHandler(goods){
				this.removeGoodsById(goods)
				console.log(this.cart)
			}
		}
	}
</script>

<style lang="scss">
	.cart-page{
		padding-bottom:50px;
		.cart-title{
			height: 40px;
			padding: 5px 10px;
			font-size: 14px;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #efefef;
			uni-icons{
				margin-right:10px;
			}
		}
		.cart-empty{
			text-align: center;
			position: absolute;
			color:gray;
			top:50%;
			left:50%;
			transform: translate(-50%,-50%);
		}
	}
</style>
