<template>
		<view class="settle-box">
			<view class="select-all">
				<radio :checked="allChecked" color="#C00000" @click="changeAllState"></radio>
				<text>全选</text>
			</view>
			<view class="total-price">
				<text>合计：</text>
				<view class="price">￥{{totalPrice}}</view>
			</view>
			<view class="btn" @click="settlement">结算({{totalNumChecked}})</view>
		</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from 'vuex'
	export default {
		data() {
			return {
				seconds:3,
				timer:null
			};
		},
		computed:{
			...mapState({
				token:state=>state.user.token,
				cart:state=>state.cart.cart
			}),
			...mapGetters(['allChecked','totalPrice','totalNumChecked','addstr'])
		},
		methods:{
			...mapMutations(['updateAllState','updateRedirectInfo']),
			changeAllState(){
				this.updateAllState(!this.allChecked)
			},
			settlement(){
				if(this.totalNumChecked==0) return uni.$showMsg('请选择要结算的商品！')
				if(!this.addstr) return uni.$showMsg('请选择收货地址！')
				if(!this.token) return this.delayLogin()
				this.pay()
			},
			delayLogin(){
				this.showTips(this.seconds)
				this.timer=setInterval(()=>{
					this.seconds--
					if(this.seconds<=0) {
						clearInterval(this.timer)
						uni.switchTab({
							url:'/pages/my/my',
							success:()=>{
								this.updateRedirectInfo({
									type:'switchTab',
									redirect:'/pages/cart/cart'
								})
							}
						})
						this.seconds=3
						return
					}
					this.showTips(this.seconds)
				},1000)
			},
			showTips(n){
				uni.showToast({
					title: n+'秒后自动跳转至登陆页面',
					mask:true,
					duration:1500
				});
			},
			async pay(){
				const order={
					order_price:0.001,
					consignee_addr:this.addstr,
					goods:this.cart.filter(x=>x.goods_state==true).map(x=>({
						goods_id:x.goods_id,
						goods_number:x.goods_count,
						goods_price:x.goods_price
					}))
				}
				
				const {data:res}=await uni.$http.post('/api/public/v1/my/orders/create',order)
				if(res.meta.status!==200) return uni.$showMsg('创建订单失败！')

				const res1=await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number:res.message.order_number})
				const [err,succ]=await wx.requestPayment(res1.message.pay)
				if(err) return uni.$showMsg('订单未支付！')
				
				const {data:res2} = await uni.$http.post('/api/public/v1/my/orders/chkOrder',{order_number:res.message.order_number})
				if(res2.meta.status!==200) return uni.$showMsg('订单未支付！')
				uni.showToast({
					title:'支付成功',
					icon:'success'
				})
			}
		},
	}
</script>

<style lang="scss">
	.settle-box{
		position: fixed;
		bottom: 0;
		left:0;
		background-color: white;
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.select-all{
			padding-left: 5px;
		}
		.total-price{
			display:flex ;
		}
		.btn{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100px;
			height: 100%;
			background-color: #C00000;
		}
	}
</style>
