<template>
	<view v-if="goods_detail.goods_name">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item class="swiper-item" v-for="(item,index) in goods_detail.pics" :key="item.pics_id">
				<view class="image" @click="preview(index)">
					<image :src="item.pics_big" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="goods-info-box">
			<view class="goods-price">￥{{goods_detail.goods_price}}</view>
			<view class="goods-info">
				<view class="goods-title">{{goods_detail.goods_name}}</view>
				<view class="star">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="yf">快递：免运费</view>
		</view>
		<view class="goods-introduce">
			<rich-text :nodes="goods_detail.goods_introduce"></rich-text>
		</view>
		<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick"/>
	</view>
</template>

<script>
	import {mapMutations,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				goods_detail:{},
				options:[{
					icon:'shop',
					text:'店铺'
				},{
					icon:'cart',
					text:'购物车',
					info:2
				}],
				buttonGroup:[{
					text:'加入购物车',
					backgroundColor:'#ff0000',
					color:'#fff'
				},{
					text:'立即购买',
					backgroundColor:'#ffa200',
					color:'#fff'
				}]
			};
		},
		onLoad(options){
			const goods_id=options.goods_id
			this.getGoodsDetail(goods_id)
		},
		computed:{
			...mapGetters(['total'])
		},
		watch:{
			total:{
				handler(val){
					let resultFind=this.options.find((item)=>item.text=='购物车')
					resultFind.info=val
				},
				immediate:true
			}
		},
		methods:{
			...mapMutations(['addToCart']),
			async getGoodsDetail(goods_id){
				const {data:res} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id:goods_id})
				if(res.meta.status!==200) return uni.$showMsg()
				
				res.message.goods_introduce=res.message.goods_introduce.replace(/<img /g,'<img style="display:block" ')
				this.goods_detail=res.message
				console.log(this.goods_detail)
			},
			preview(i){
				uni.previewImage({
					current:i,
					urls:this.goods_detail.pics.map(x=>x.pics_big)
				})
			},
			onClick(e){
				if(e.content.text==='购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}	
			},
			buttonClick(e){
				if(e.content.text==='加入购物车'){
					const goods={
						goods_id:this.goods_detail.goods_id,
						goods_name:this.goods_detail.goods_name,
						goods_price:this.goods_detail.goods_price,
						goods_count:1,
						goods_big_logo:this.goods_detail.goods_small_logo,
						goods_state: true,
					}
					this.addToCart(goods)
				}
			}
		}
	}
</script>

<style lang="scss">
	swiper{
		height: 750rpx;
		
		.image{
			height: 750rpx;
			
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.goods-info-box{
		padding:15px 10px;

		.goods-price{
			font-size: 16px;
			color: #C00000;
			margin-bottom: 10px;
		}
		.goods-info{
			display: flex;
			justify-content: space-between;
			.goods-title{
				font-size: 13px;
				padding-right: 10px;
			}
			.star{
				width: 150px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: gray;
				font-size: 12px;
				border-left: 1px solid gray;
				text{
					margin-top: 5px;
				}
			}
		}
		.yf{
			font-size: 12px;
			color: gray;
			margin-top: 10px;
		}
	}
	
	.goods-introduce{
		padding-bottom: 50px;
	}
	uni-goods-nav{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
