<template>
	<view class="page">
		<view class="top">
			<image :src="userinfo.avatarUrl" mode="" class="avatar"></image>
			<view class="nickname">{{userinfo.nickName}}</view>
		</view>
		<view class="bottom">
			<view class="info-list">
				<view class="info-list-item">
					8 <text>收藏的店铺</text>
				</view>
				<view class="info-list-item">
					14 <text>收藏的商品</text>
				</view>
				<view class="info-list-item">
					18 <text>关注的商品</text>
				</view>
				<view class="info-list-item">
					84 <text>足迹</text>
				</view>
			</view>
			<view class="order-box">
				<view class="order-box-title">我的订单</view>
				<view class="order-item-box">
					<view class="order-item">
						<image src="../../static/my-icons/icon1.png" mode="widthFix" ></image>
						<text>待付款</text>
					</view>
					<view class="order-item">
						<image src="../../static/my-icons/icon2.png" mode="widthFix" ></image>
						<text>待收货</text>
					</view>
					<view class="order-item">
						<image src="../../static/my-icons/icon3.png" mode="widthFix"></image>
						<text>退款/退货</text>
					</view>
					<view class="order-item">
						<image src="../../static/my-icons/icon4.png" mode="widthFix"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<view class="other-info">
				<view class="my-address other-info-item">
					<text>收货地址</text> 
					<uni-icons type="arrowright"></uni-icons>
				</view>
				<view class="contact-sevice other-info-item">
					<text>联系客服</text>
					<uni-icons type="arrowright"></uni-icons>
				</view>
				<view class="logout other-info-item">
					<text>退出登录</text>
					<uni-icons type="arrowright" @click="logout"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		props:['wh'],
		data() {
			return {
				
			};
		},
		computed:{
			...mapState({
				userinfo:state=>state.user.userinfo
			})
		},
		methods:{
			...mapMutations(['updateUserinfo','updateToken','updateAddress']),
			async logout(){
				const [err,suc]=await uni.showModal({
					title:'确认退出登录吗？'
				})

				if(suc && suc.confirm){
					this.updateToken('')
					this.updateUserinfo({})
					this.updateAddress({})
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f4f4f4;
		.top{
				height: 200px;
				background-color: #C00000;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				
				.avatar{
					width: 70px;
					height: 70px;
					border-radius: 70px;
				}
				
				.nickname{
					font-size: 16px;
					color: white;
					margin-top: 10px;
				}
		}
		
		.bottom{
			width: 94%;
			border-radius: 5px;
			position: absolute;
			top:180px;
			left:50%;
			transform: translate(-50%,0);
		
			.info-list{
				height: 50px;
				background-color: white;
				border-radius: 5px;
				display: flex;
				justify-content: space-around;
				font-size: 14px;
				
				.info-list-item{
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					text{
						margin-bottom: 3px;
					}
				}
			}
			
			.order-box{
				margin-top:10px;
				background-color: white;
				border-radius: 5px;
				
				.order-box-title{
					line-height: 40px;
					padding-left: 10px;
					height: 40px;
					font-size: 16px;
					border-bottom: 1px solid gray;
				}
				
				.order-item-box{
					display: flex;
					justify-content: space-around;
					align-items: center;
					height:80px;
					
					.order-item{
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						font-size: 14px;
						image{
							width: 35px;
						}
					}
				}
			}
			
			.other-info{
				background-color: white;
				border-radius: 5px;
				margin-top: 10px;
				
				.other-info-item{
					padding: 0 10px;
					font-size:16px;
					height: 40px;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
		}
	}
</style>
