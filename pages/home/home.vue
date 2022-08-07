<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key="index" >
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item.name)">
				<image :src="item.image_src" mode="" class="nav-img"></image>
			</view>
		</view>
		<view class="floor-list">
			<view class="floor-item"  v-for="(item,index) in floorList" :key="index">
				<image :src="item.floor_title.image_src" mode="" class="floor-title"></image>
				<view class="image-box">
					<view class="left-box">
						<navigator :url="item.product_list[0].url">
							<image :src="item.product_list[0].image_src"  mode="widthFix" :style="{width: item.product_list[0].image_width + 'rpx'}"></image>
						</navigator>
					</view>
					<view class="right-box">
						<navigator v-for="(item1,index1) in item.product_list" :key="index1" :url="item1.url" v-if="index1!=0">
							<image  :src="item1.image_src" mode="widthFix" :style="{width:item1.image_width+'rpx'}" ></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import BadgeMix from '../../mixins/tabbar-badge.js'
	export default {
		mixins:[BadgeMix],
		data() {
			return {
				swiperList:[],
				navList:[],
				floorList:[]
			};
		},
		onLoad(){
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods:{
			async getSwiperList(){
				const {data:res}=await uni.$http.get('/api/public/v1/home/swiperdata')
				if(res.meta.status!==200) return uni.$showMsg()
				this.swiperList=res.message	
				// console.log(this.swiperList)
			},
			async getNavList(){
				const {data:res}=await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status!==200) return uni.$showMsg()
				this.navList=res.message	
				// console.log(this.navList)
			},
			async getFloorList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status!==200) return uni.$showMsg()
				res.message.forEach(floor => {
				  floor.product_list.forEach(prod => {
				    prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
				  })
				})
				this.floorList=res.message
				// console.log(this.floorList)
			},
			swiperClickHandler(){
				
			},
			navClickHandler(name){
				if(name==="分类"){
					uni.switchTab({
						url:"/pages/cate/cate"
					})
				}
			}
		}
		
	}
</script>

<style lang="scss">
	swiper{
		height: 330rpx;
		.swiper-item,image{
			width: 100%;
			height: 100%;
		}
	}
	.nav-list{
		display: flex;
		justify-content: space-around;
		margin: 15px 0;
		.nav-img{
			width: 128rpx;
			height: 140rpx;
		}
	}
	.floor-title{
		height: 60rpx;
		width: 100%;
	}
	.image-box{
		display: flex;
		margin-left: 10rpx;
		.right-box{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}
</style>
