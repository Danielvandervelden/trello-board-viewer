<template>
	<main
		class='board'
		:style="{ height: determineHeight(), backgroundImage: `url(${data.prefs.backgroundImage}` }">
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
	},

	methods: {

		/**
		 * 
		 * @description A simple function to determine the height of the board. It needs to be 100vh minus a few pixels (depends on how
		 * high the title div is. If it's 2 lines for example...);
		 */
		determineHeight() {
			if(this.$el) {
				const marginBetweenWindowTop = this.$el.getBoundingClientRect().top;
				return `calc(100vh - ${marginBetweenWindowTop}px)`;
			}

			return 'auto';
		}
	}
}
</script>

<style lang="scss" scoped>
	.board {
		display: block;
		white-space: nowrap;
		overflow-x: scroll;
		padding: 90px 24px 24px;
		background-repeat: no-repeat;
		background-size: cover;
	}

	@media screen and (min-width: $break_tablet) {

	}
</style>