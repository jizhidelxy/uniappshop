<template>
	<view >
		<view class="add-address" v-if="JSON.stringify(address)==='{}'">
			<button type="primary" @click="chooseAddress">请选择收货地址+</button>
		</view>
		<view class="address-info" v-if="JSON.stringify(address)!=='{}'">
			<view class="row-1">
				<view class="row-1-left">
					收货人：{{address.userName}}
				</view>
				<view class="row-1-right">
					<text class="tel">电话：{{address.telNumber}}</text>
					<uni-icons type="arrowright" @click="chooseAddress"></uni-icons>
				</view>
			</view>
			<view class="row-2">
				<text class="row-2-left">收货地址：</text><text>{{addstr}}</text>
			</view>
		</view>
		<image src="../../static/cart_border@2x.png" mode="" class="border-image"></image>
	</view>
</template>

<script>
	import {mapMutations,mapState,mapGetters} from 'vuex'
	export default {
		data() {
			return {
			};
		},
		computed:{
			...mapState({
				address:state=>state.user.address
			}),
			...mapGetters(['addstr'])
		},
		
		methods:{
			...mapMutations(['updateAddress']),
			async chooseAddress(){
				const [err,suc]=await uni.chooseAddress().catch(err=>err)
				
				if(err===null && suc.errMsg==='chooseAddress:ok'){
					this.updateAddress(suc)
				}
				if(err&&(err.errMsg === 'chooseAddress:fail auth deny'||err.errMsg === 'chooseAddress:fail authorize no response')){
					this.reAuth()
				}
			},
			async reAuth(){
				const [err2,confirmResult]=await uni.showModal({
					content:'检测到您未打开地址权限，是否去设置打开？',
					confirmText:'确定',
					cancelText:'取消'
				})
				if(err2) return
				if(confirmResult.cancel) return uni.$showMsg('您取消了授权')
				if(confirmResult.confirm) return uni.openSetting({
					success:(settingResult)=>{
						if(settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功，请选择地址！')
						if(!settingResult.authSetting['scope.address']) return uni.$showMsg('授权失败！')
					}
				})
			}
		},
	}
</script>

<style lang="scss">
	.add-address{
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
	}
	.address-info{
		height: 90px;
		padding: 0 5px;
		flex-direction: column;
		font-size: 14px;
		display: flex;
		justify-content: center;
		.row-1{
			display: flex;
			justify-content: space-between;
			margin-bottom: 10px;
			.row-1-right{
				.tel{
					margin-right: 5px;
				}
			}
		}
		.row-2{
			display: flex;
			.row-2-left{
				white-space: nowrap;
			}
		}
	}
	.border-image{
		width:100%;
		height: 5px;
	}
</style>
