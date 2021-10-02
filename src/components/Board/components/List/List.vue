<template>
	<section
		class='list'>
		<strong>{{data.name}}</strong>
		<div class="card-wrapper">
			<Card
				v-for="card in cards"
				:key="card.id"
				:data="card" />
		</div>
	</section>
</template>

<script>
import Card from '../Card/Card.vue';

export default {
	props: {
		data: Object
	},

	data() {
		return {
			cards: null
		}
	},

	components: {
		Card
	},

	async mounted() {
		this.cards = await fetch(`${this.API_URL}/lists/${this.data.id}/cards`).then(res => res.json());

		/** Set the scroll listener for the white fade-outs on top and bottom of the list. */
		this.initializeScrollHandler();
	},

	methods: {
		initializeScrollHandler() {

		}
	}
}
</script>

<style lang="scss" scoped>
	.list {
		display: inline-block;
		vertical-align: top;
		width: 300px;
		flex-shrink: 0;
		padding: 16px;
		background-color: #FFF;
		box-shadow: 2px 2px 6px rgba(0, 0, 0, .5);
		border-radius: 8px;
		max-height: calc(100vh - 200px);
		position: relative;
		overflow: hidden;

		&.fade-top {
			&:before {
				content: '';
				display: block;
				position: absolute;
				top: 35px;
				left: 0;
				width: 100%;
				height: 300px;
				background: linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
			}
		}

		&.fade-bottom {
			&:after {
				content: '';
				display: block;
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 300px;
				background: linear-gradient(to top, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
			}
		}

		.card-wrapper {
			max-height: inherit;
			overflow: auto;
		}

		+ .list {
			margin-left: 1rem;
		}
	}
</style>