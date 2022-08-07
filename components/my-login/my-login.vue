<template>
	<view class="my-login">
		<uni-icons type="contact-filled" color="#afafaf" size="70"></uni-icons>
		<view class="btn" @click="login">一键登录</view>
		<text class="tishi">登陆后享更多权益</text>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			...mapState({
				redirectInfo:state=>state.user.redirectInfo
			})
		},
		methods:{
			...mapMutations(['updateUserinfo','updateToken','updateRedirectInfo']),
			 async login(){
				const res1=await wx.getUserProfile({desc:'我的'})
				if(res1.errMsg!=='getUserProfile:ok') return uni.$showMsg('登录授权失败!')
				this.updateUserinfo(res1.userInfo)
				
				const [err2,res2]=await uni.login().catch(err=>err)
				if(!res2.errMsg=='login:ok') return uni.$showMsg('登录失败！')
	
				const query={
					code:res2.code,
					encryptedData:res1.encryptedData,
					iv:res1.iv,
					rawData:res1.rawData,
					signature:res1.signature
				}
				const result=await uni.$http.post('/api/public/v1/users/wxlogin',query)

				// if(result.data.meta.status !== 200) return uni.$showMsg('登陆失败！')
				
				this.updateToken('uniquetokenstr')
				this.navigateBack()
			},
			navigateBack(){
				console.log(this.redirectInfo)
				if(this.redirectInfo && this.redirectInfo.type=='switchTab'){
					uni.switchTab({
						url:this.redirectInfo.redirect,
						complete:()=>{
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.my-login{
		margin-top: 120px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.btn{
			height: 40px;
			width: 90%;
			background-color: #C00000;
			color: white;
			border-radius:40px ;
			margin-top:20px;
			margin-bottom:10px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.tishi{
			color: #afafaf;
			font-size: 12px;
	
		}
	}
</style>
