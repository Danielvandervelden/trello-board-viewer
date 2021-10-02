<template>
	<main
		class='board'>
		<List
			v-for="list in lists"
			:key="list.id"
			:data="list" />
	</main>
</template>

<script>
import List from './components/List/List.vue';

export default {
	props: {
		data: Object
	},
	data() {
		return {
			lists: null
		}
	},
	components: {
		List
	},
	async mounted() {
		this.lists = await fetch(`${this.API_URL}/boards/${this.data.id}/lists`).then(res => res.json());
	}
}
</script>

<style lang="scss" scoped>
	.board {
		display: block;
		white-space: nowrap;
		overflow-x: scroll;
		padding: 24px;
	}
</style>