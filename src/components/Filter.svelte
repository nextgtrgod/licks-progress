
<div class="filter">
	<select bind:value={ $store.selected }>
		{#each tags as tag}
			<option value={ tag }>
				{ tag }
			</option>
		{/each}
	</select>

	<label>
		<input type=checkbox bind:checked={ $store.showCompleted }>
		show completed
	</label>
</div>


<script>
	import { store } from '../store'

	export let tags = []

</script>


<style>

	.filter {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
	}

	.filter > * {
		margin-left: 20px;
	}

	select {
		width: 200px;
		margin: 0;
		text-indent: 0;
		height: 1.8em;
		font-size: 1em;
		color: inherit;
		background-color: transparent;
		border: 1px solid #FFF;
		outline-color: var(--bar-color);
	}

	label {
		display: flex;
		align-items: center;
		padding-left: 10px;
		line-height: 1;
	}

	input {
		margin: 0;
		margin-right: 5px;
	}

</style>