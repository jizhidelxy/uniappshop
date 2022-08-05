<template>
	<view>
		<view class="scroll-view-container">
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height:wh+'px'}" > 
				<block v-for="(item,index) in cateList" :key="item.cat_id">
					<view :class="['left-scroll-view-item',activeIndex==index?'active':'']" @click="changeActive(index)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<scroll-view class="right-scroll-view" scroll-y="true" :style="{height:wh+'px'}">
				<view class="category2" v-for="(item1,index1) in cateList2" :key="item1.cat_id">
						<view class="category2-title">/ {{item1.cat_name}} /</view>
						<view class="category3">
							<view class="category3-item" v-for="(item2,index2) in item1.children" :key="item2.cat_id" @click="gotoGoodList(item2)">
								<image :src="item2.cat_icon" mode="widthFix"></image>
								<text>{{item2.cat_name}}</text>
							</view>
						</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import BadgeMix from '../../mixins/tabbar-badge.js'
	export default {
		mixins:[BadgeMix],
		data() {
			return {
				wh:0,
				cateList:[],
				activeIndex:0,
				cateList2:[]
			};
		},
		onLoad(){
			const sysInfo=uni.getSystemInfoSync()
			this.wh=sysInfo.windowHeight
			this.getCateList()
		},
		methods:{
			async getCateList(){
				const {data:res} = await uni.$http.get('/api/public/v1/categories')
				if(res.meta.status!==200) return uni.$showMsg()
				this.cateList=res.message
				this.cateList2=this.cateList[0].children
				console.log(this.cateList)
			},
			changeActive(index){
				this.activeIndex=index
				this.cateList2=this.cateList[this.activeIndex].children
				// console.log(this.cateList2)
			},
			gotoGoodList(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?cid='+item.cat_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container{
		display: flex;
		.left-scroll-view{
			width: 120px;

			
			.left-scroll-view-item{
				height: 60px;
				background-color: #f7f7f7;
				text-align: center;
				line-height: 60px;
				font-size: 14px;
				
				&.active{
					background-color: #FFFFFF;
					position: relative;
					&::after{
						content: '';
						display: block;
						position: absolute;
						height: 30px;
						width: 4px;
						background-color:#c00000 ;
						left: 0;
						top:50%;
						transform: translateY(-50%);
					}
				}
			}
		}
		
		.right-scroll-view{

			
			.category2{
				
				.category2-title{
					font-size: 14px;
					font-weight: bold;
					text-align: center;
					padding: 15px 0;
				}
				
				.category3{
					display: flex;
					flex-wrap:wrap;
					
					.category3-item{
						width: 33.33%;
						display: flex;
						flex-direction: column;
						justify-items: center;
						align-items: center;
						margin-bottom: 10px;
	
						image{
							width:60%
						}
						
						text{
							font-size: 12px;
						}
					}
				}
				
			}
		}
	}
		
	
	
</style>
