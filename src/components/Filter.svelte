
<div id="filter">
	<select bind:value={ $store.selected }>
		{#each tags as tag}
			<option value={ tag }>
				{ tag }
			</option>
		{/each}
	</select>

	<Checkbox
		bind:checked={ $store.showCompleted }
		text={ 'completed' }
	/>
</div>


<script>
	import { store } from '../store'
	import Checkbox from './Checkbox.svelte'

	export let tags = []

</script>


<style>

	#filter {
		max-width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	select {
		width: 200px;
		margin: 0;
		padding-left: 10px;
		margin-right: 30px;
		text-indent: 0;
		height: 1.8em;
		font-size: 1em;
		color: inherit;
		background-color: transparent;
		border: 1px solid;
		outline-color: var(--bar-color);
		-webkit-appearance: none;
	}

</style>