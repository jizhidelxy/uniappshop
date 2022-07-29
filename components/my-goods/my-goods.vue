<template>
	<view>
		<view class="goods-item" >
			<view class="goods-item-left">
				<image :src="goods.goods_big_logo||defaultPic" class="goods-pic"></image>
			</view>
			<view class="goods-item-right">
				<view class="goods-name">{{goods.goods_name}}</view>
				<view class="goods-info-box">
					<view class="goods-price">￥{{goods.goods_price|toFixed}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			goods:{
				type:Object,
				default:{}
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
		}
	}
</script>

<style lang="scss">
	.goods-item{
		display:flex;
		padding:10px 5px;
		border-bottom: 1px solid #f0f0f0;
		
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
				.goods-price{
					font-size: 16px;
					color: #C00000;
				}
			}
		}
	}
	
</style>
