<template>
	<div v-if="!board" class="intro__noboard">
		<div class="intro__noboard--wrapper">
			<h1>Welcome to Trello Board Viewer.</h1>
			<span>Select a board down below, or enter a specific board ID you'd like to view!</span>
			<BoardSelector @boardSelect="changeBoard" />
		</div>
	</div>

	<div v-else class="intro__board">
		<div class="intro__board--heading">
			<button @click="resetBoard" type="button"><unicon name="arrow-left" /> Change board</button>
			<h1>Here's your board: {{board.name}}</h1>
		</div>
		<Board :data="board" />
	</div>

	<span v-if="error" class="error">This board does not exist, please try entering another boardID</span>
</template>

<script>
import Board from './components/Board/Board.vue';
import BoardSelector from './components/BoardSelector/BoardSelector.vue';

export default {
	name: 'App',
	components: {
		Board,
		BoardSelector
	},
	data() {
		return {
			board: null,
			error: false
		}
	},

	methods: {
		resetBoard() {
			this.board = null;
		},

		/**
		 * 
		 * @param { String } boardID Should be a string which represents the BoardID we should fetch
		 */
		async changeBoard(boardID) {
			try {
				this.board = await fetch(`${this.API_URL}/boards/${boardID}/`).then(res => res.json());
				this.error = false;
			} catch(e) {
				this.error = true;
			}
		}
	}
}
</script>

<style lang="scss">
	@import '@/assets/scss/_base.scss';

	.intro__noboard {
		width: 100vw;
		height: 100vh;
		margin-top: 20vw;
		display: flex;
		justify-content: center;
	}

	.intro__board {
		&--heading {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			padding: 10px 20px;
			position: absolute;
			z-index: 2;
			top: 0;
			left: 0;
			background-color: rgba(255, 255, 255, .75);
			width: 100%;
		}

		h1 {
			margin-left: 1rem;
		}
	}
</style>
