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
			<view class="btn">结算({{totalNumChecked}})</view>
		</view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters(['allChecked','totalPrice','totalNumChecked'])
		},
		methods:{
			...mapMutations(['updateAllState']),
			changeAllState(){
				this.updateAllState(!this.allChecked)
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
