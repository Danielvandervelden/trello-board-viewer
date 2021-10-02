<template>
	<div
		class='board-selector'>
		<div class="input-wrapper __checkbox">
			<strong for="custom_id">Would you like to enter a custom ID?</strong>
			<label class="switch">
				<input type="checkbox">
				<span class="slider round"></span>
			</label>
		</div>

		<div v-show="!enableCustomId" class="input-wrapper __select">
			<label for="board-selector">Select one of the boards in the dropdown</label>
			<select id="board-selector" name="board-selector" @change="boardId = $event.target.value">
				<option selected disabled value="null">Make a selection...</option>
				<option value="uGcMEnGt">New Years Resolutions</option>
				<option value="AwYSWOyt">The Ultimate To-Do list</option>
				<option value="6kEJFwks">Keeping Up With Friends</option>
				<option value="WGQ0ZGKe">Bucket List</option>
			</select>
		</div>

		<div v-show="enableCustomId" class="input-wrapper __input">
			<label for="board-id">Enter custom board ID (it must be publicly available)</label>
			<input minlength="8" maxlength="8" type="text" name="board-id" id="board-id" @input="boardId = $event.target.value">
		</div>
		<button :disabled="isDisabled" type="button" @click="emitBoardSelect">Go!</button>
	</div>
</template>

<script>
export default {
	props: {
		data: Object
	},
	data() {
		return {
			enableCustomId: false,
			boardId: null
		}
	},
	methods: {
		/**
		 * 
		 * @param { Boolean } enable Whether we should enable custom ID or not.
		 */
		customIDHandler(enable) {
			this.enableCustomId = enable;
		},

		/**
		 * 
		 * @description Handler to emit the boardSelect event so we can query the boardID in App.vue
		 */
		emitBoardSelect() {
			this.$emit('boardSelect', this.boardId);
		}
	},
	computed: {
		isDisabled: function() {
			return this.boardId !== null && this.boardId.length === 8 ? false : true;
		}
	}
}
</script>

<style lang="scss" scoped>
	.board-selector {
		margin-top: 1rem;
	}
</style>