<template>
	<view>
		Home
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//轮播图的数据列表
				swiperList: []
				//分类导航的数据列表
				navList: []
			};
		},
		onLoad() {
			//调用方法获取数据
			this.getSwiperList()
			this.getNavList()
		},
		methods: {
			//获取轮播图数据
			async getSwiperList() {
				//发起请求
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				//请求失败
				if (res.meta.status != 200) {
					return uni.showToast({
						title: '数据请求失败！',
						duration: 1500,
						icon: 'none'
					})
				}
				//请求成功
				this.swiperList = res.message
			},
			getNavList() {
				uni.$http.get()
			}
		}
	}
</script>

<style lang="scss">

</style>