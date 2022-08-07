<template>
	<view>
		<view class="my-login" v-if="!token">
			<my-login></my-login>
		</view>
		<view class="my-userinfo" v-else>
			<my-userinfo></my-userinfo>
		</view>
	</view>
</template>

<script>
	import BadgeMix from '../../mixins/tabbar-badge.js'
	import {mapState} from 'vuex'
	export default {
		mixins:[BadgeMix],
		data() {
			return {
			};
		},
		computed:{
			...mapState({
				token:state=>state.user.token
			})
		},
	}
</script>

<style lang="scss">
	
</style>
