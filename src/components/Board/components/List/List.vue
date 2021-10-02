<template>
	<section
		class='list'>
		<strong>{{data.name}}</strong>
		<div class="card-wrapper">
			<Card
				v-for="card in cards"
				:key="card.id"
				:data="card"
				@initializeFades="determineContainerClasses('.card-wrapper')" />
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

		/** Set the scroll listener for the white fade-outs on top and bottom of the list. And execute the function once to set initial status. */
		this.initializeScrollHandler();
	},

	methods: {
		initializeScrollHandler() {
			this.$el.querySelector('.card-wrapper').addEventListener('scroll', this.determineContainerClasses.bind(this, '.card-wrapper'));
		},

		/**
		 * 
		 * @param { String } className The classname of the element you want to add fade clasess to. Needs to be in this vue component.
		 */
		determineContainerClasses(className) {
			const el = this.$el.querySelector(className);
			console.log(el);
			if(el.scrollTop > 10) {
				this.$el.classList.add('fade-top');
			} else {
				this.$el.classList.remove('fade-top')
			}

			if(Number(el.scrollTop + el.offsetHeight) <= el.scrollHeight - 20) {
				this.$el.classList.add('fade-bottom');
			} else {
				this.$el.classList.remove('fade-bottom');
			}
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

		&:before,
		&:after {
			content: '';
			display: block;
			position: absolute;
			z-index: 2;
			left: 0;
			width: 100%;
			height: 300px;
			opacity: 0;
			pointer-events: none;
			transition: all .2s ease-in-out;
		}

		&:before {
			top: 35px;
			background: linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
		}

		&:after {
			bottom: 0;
			background: linear-gradient(to top, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
		}

		&.fade-top {
			&:before {
				opacity: 1;
			}
		}

		&.fade-bottom {
			&:after {
				opacity: 1;
			}
		}

		.card-wrapper {
			max-height: calc(100vh - 250px);
			overflow: auto;
			margin-top: 16px;
		}

		+ .list {
			margin-left: 1rem;
		}
	}
</style>