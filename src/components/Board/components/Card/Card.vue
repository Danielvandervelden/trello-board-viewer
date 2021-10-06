<template>
	<article	
		class='card'
		:class="this.cover ? 'has-cover' : ''">
		<div class="card__inner">
			<div class="card__front">
				<figure class="card__image" v-if="cover">
					<img :src="cover.url" :alt="`Visual representation of the attachment: ${cover.name}`">
				</figure>
				<div class="card__info">
					<strong class="card__title">{{data.name}}</strong>
				</div>
			</div>
			<div class="card__back">
				<span class="card__comments"><unicon name="comment" /><span class="card__comments--count">{{data.badges.comments}}</span></span>
				<span class="card__attachments"><unicon name="paperclip" /><span class="card__attachments--count">{{data.badges.attachments}}</span></span>
				<span v-if="data.badges.checkItems" class="card__checklist"><unicon name="check-square" /><span class="card__checklist--count">{{data.badges.checkItemsChecked}}/{{data.badges.checkItems}}</span></span>
				<span v-if="data.badges.due" class="card__due"><unicon name="schedule" /><span class="card__due--date">{{parseDate(data.badges.due)}}</span></span>
				<span class="card__link"><a :href="data.url" :title="`Go to ${data.name} on Trello`" target="_blank" rel="noopener noreferrer">Go to card</a></span>
			</div>
		</div>
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
				this.$emit('initializeFades');
			}
		}
	},
	methods: {
		getCoverData() {
			this.cover = this.attachments.find(attachment => attachment.id === this.data.cover.idAttachment);
		},
		
		/**
		 * 
		 * @param { Date } date Should be a string in ISO8601 format
		 */
		parseDate(date) {
			const locale = navigator.language || 'en-US';
			return new Date(date).toLocaleString(locale, {
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			});
		},

		handleMobile(e) {
			if(window.innerWidth < 1025) {
				e.preventDefault();
			}
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
		position: relative;
		display: block;
		text-decoration: none;
		color: #161616;

		+ .card {
			margin-top: 16px;
		}

		&__image {
			margin: 0;
			min-height: 150px;
			width: 100%;
			position: relative;

			img {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				object-fit: cover;
				border-radius: 5px;
				max-width: 100%;
			}

			+ div {
				margin-top: 10px;
			}
		}
		
		&__info {
			white-space: pre-wrap;
		}

		&__back {
			display: flex;

			> span {
				display: flex;
				align-items: center;

				.unicon {
					margin-right: 5px;
				}
			}
		}

		&__link {
			margin-top: 1rem;
		}

		&:not(.has-cover) {
			transform: translateY(0);
			box-shadow: 0px 0px 4px rgba(0, 0, 0, 0);
			transition: all .2s ease-in-out;

			.card {
				&__back {
					margin-top: 10px;
					justify-content: space-between;
				}

			}

			&:hover {
				transform: translateY(-4px);
				box-shadow: 1px 1px 4px rgba(0, 0, 0, .3);
			}
		}

		&.has-cover {
			.card {
				&__inner {
					transition: all .3s ease-in-out;
					transform-style: preserve-3d;
				}
				
				&__front,
				&__back {
					backface-visibility: hidden;
					position: relative;
					z-index: 1;
				}

				&__back {
					position: absolute;
					border-radius: 5px;
					z-index: 2;
					top: 0;
					left: 0;
					background-color: #FFF;
					box-shadow: 0 0 5px rgba(0, 0, 0, .5);
					width: 100%;
					height: 100%;
					transform: rotateY(180deg);
					justify-content: center;
					padding: 20px;
					flex-direction: column;
				}
			}

			&:hover {
				.card__inner {
					transform: rotateY(180deg);
				}
			}
		}
	}
</style>