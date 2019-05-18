<div class="tags">
	<ul>
		{#each tags as tag}
			<li>
				<span>{ tag }</span>
				<button on:click={ () => remove(tag) }>×</button>
			</li>
		{/each}
	</ul>

	<form on:submit|preventDefault={ add }>
		<input
			type="text"
			placeholder="write some tags"
			bind:value={ newTag }
			class:hovered={ hover }
		>
		<slot/>
	</form>
</div>


<script>
	export let tags = []
	export let hover = false

	let newTag = ''

	let add = () => {

		if (!newTag) return

		let tag = newTag.trim()

		if (tags.includes(tag)) {
			return newTag = ''
		}

		tags = [...tags, tag]

		newTag = ''
	}

	let remove = name => {

		tags = tags.filter(tag => tag !== name)
	}

</script>


<style>

	.tags {
		--font-size: 14px;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		min-height: 8px;
	}

	li {
		height: 20px;
		display: flex;
		align-items: center;
		margin-right: 10px;
		margin-bottom: 10px;
		padding-left: 4px;
		font-size: var(--font-size);
		line-height: 1;
		color: var(--text-color);
		background-color: var(--bar-color);
		cursor: pointer;
	}

	span {
		margin-bottom: 3px;
		padding-right: 4px;
	}

	button {
		width: 15px;
		height: 20px;
		font-size: 16px;
	}

	form {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	input {
		width: 100%;
		max-width: 200px;
		font-size: var(--font-size);
		/* border-bottom: 1px dashed transparent; */
		opacity: 0;
		pointer-events: none;
		transition: all .2s;
	}

	input.hovered {
		opacity: 1;
		pointer-events: all;
	}

	/* input:focus {
		border-bottom: 1px dashed currentColor;
	} */

</style>