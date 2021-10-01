<template>
	<div v-if="!board" class="intro__noboard">
		<h1>Welcome to Trello Board Viewer.</h1>
		<span>Select a board down below, or enter a specific board ID you'd like to view!</span>
		<BoardSelector @boardSelect="changeBoard" />
	</div>

	<div v-else class="intro__board">
		<button @click="resetBoard" type="button">&lt; Change board</button>
		<h1>Here's your board: {{board.name}}</h1>
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

<style>

</style>
