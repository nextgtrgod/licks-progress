<ul>
    {#each data as lick}
		{#if visible(lick)}
			<Lick
				bind:data={ lick }
				bind:shift={ shift }
			/>
		{/if}
    {/each}
</ul>

<script>
	import { onMount, onDestroy } from 'svelte'
	import { store } from '../store'

    import Lick from './Lick.svelte'

	export let data

	$: selected = $store.selected
	$: showCompleted = $store.showCompleted

	let shift = false
	
	let shiftOn = ({ keyCode }) => (keyCode === 16) && (shift = true)
	let shiftOff = ({ keyCode }) => (keyCode === 16) && (shift = false)

	onMount(() => {

		document.addEventListener('keydown', shiftOn)
		document.addEventListener('keyup', shiftOff)
	})

	onDestroy(() => {

		document.removeEventListener('keydown', shiftOn)
		document.removeEventListener('keyup', shiftOff)
	})

	$: visible = lick => {

		if (selected === 'all' || (lick.tags || []).includes(selected)) {

			return lick.current === lick.goal
				? showCompleted
				: true
		}

		return false
	}

</script>


<style>

	ul {
        /* width: 100%; */
        display: flex;
        flex-wrap: wrap;
        align-items: center;
		margin: 0 -20px;
		padding: 0;
		list-style: none;
	}

</style>