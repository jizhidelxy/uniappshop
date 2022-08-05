import {mapGetters} from 'vuex'

export default{
	data(){
		return {
			
		}
	},
	onShow(){
		this.setBadge()
	},
	computed:{
		...mapGetters(['total'])
	},
	watch:{
		total(val){
			this.setBadge()
		}
	},
	methods:{
		setBadge(){
			uni.setTabBarBadge({
				index:2,
				text:this.total+''
			})
		}
	}
	
}
