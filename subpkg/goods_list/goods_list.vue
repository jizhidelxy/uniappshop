<template>
	<view>
		<view class="goods-list">
			<view v-for="(item,index) in goods_list" :key="index"  @click="gotoDetail(item.goods_id)">
				<my-goods :goods="item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				},
				goods_list:[],
				total:0,
				isLoading:false
			};
		},
		onLoad(options){
			this.queryObj.query=options.query||''
			this.queryObj.cid=options.cid||''
			// console.log(this.queryObj)
			this.getGoodsList()
		},
		methods:{
			async getGoodsList(cb){
				this.isLoading=true
				const {data:res}=await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				
				if(res.meta.status!==200) uni.$showMsg()
				
				this.goods_list=[...this.goods_list,...res.message.goods]
				this.total=res.message.total
				
				this.isLoading=false
				cb&&cb()
				// console.log(this.goods_list)
			},
			gotoDetail(goods_id){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+goods_id
				})
			}
		},
		onReachBottom(){
			if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total) return uni.$showMsg('已经到底啦！')
			
			if(this.isLoading==true) return
			
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh(){
			this.queryObj.pagenum=1
			this.total=0
			this.goods_list=[]
			this.isLoading=false
			
			this.getGoodsList(()=>uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">
	
</style>
