<template>
	<article
		class='card'>
		<figure v-if="cover">
			<img :src="cover.url" :alt="`Visual representation of the attachment: ${cover.name}`">
		</figure>
		<span>{{data.name}}</span>

	</article>
</template>

<script>
export default {
	props: {
		data: Object
	},
	data() {
		return {
			attachments: null,
			cover: null
		}
	},
	async mounted() {
		if(this.data.badges.attachments) {
			this.attachments = await fetch(`${this.API_URL}/cards/${this.data.id}/attachments`).then(res => res.json());

			if(this.data.cover.idAttachment) {
				this.getCoverData();
			}
		}
	},
	methods: {
		getCoverData() {
			this.cover = this.attachments.find(attachment => attachment.id === this.data.cover.idAttachment);
		}
	}
}
</script>

<style lang="scss" scoped>
	.card {
		width: 100%;
		border: 1px solid #ddd;
		border-radius: 5px;
		padding: 8px;

		+ .card {
			margin-top: 16px;
		}

		img {
			max-width: 100%;
		}
	}
</style>