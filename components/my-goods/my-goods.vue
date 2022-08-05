<template>
	<view>
		<view class="goods-item" >
			<radio :checked="goods.goods_state" color="#C00000" @click="changeChecked" v-if="showRadio"></radio>
			<view class="goods-item-left">
				<image :src="goods.goods_big_logo||defaultPic" class="goods-pic"></image>
			</view>
			<view class="goods-item-right">
				<view class="goods-name">{{goods.goods_name}}</view>
				<view class="goods-info-box">
					<view class="goods-price">￥{{goods.goods_price|toFixed}}</view>
					<uni-number-box min="1" :value="goods.goods_count" @change="changeNum" v-if="showRadio"></uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		props:{
			goods:{
				type:Object,
				default:{}
			},
			showRadio:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		filters:{
			toFixed(num){
				return Number(num).toFixed(2)
			}
		},
		methods:{
			...mapMutations(['updateGoodsNum','updateGoodsStatus']),
			changeChecked(e){
				this.updateGoodsStatus(this.goods)
			},
			changeNum(val){
				this.goods.goods_count=val
				this.updateGoodsNum(this.goods)
			}
		}
	}
</script>

<style lang="scss">
	.goods-item{
		display:flex;
		padding:10px 5px;
		border-bottom: 1px solid #f0f0f0;
		align-items: center;
		.goods-item-left{
			margin-right: 10px;
			
			.goods-pic{
				display:block;
				width:100px;
				height:100px;
			}
		}
		
		.goods-item-right{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			
			.goods-name{
				font-size: 14px;
			}
			
			.goods-info-box{
				margin-top: 20px;
				display: flex;
				justify-content:space-between;
				align-items: center;
				.goods-price{
					font-size: 16px;
					color: #C00000;
				}
			}
		}
	}
	
</style>
