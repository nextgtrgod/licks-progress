<ul>
    {#each data as lick}
		{#if visible(lick)}
			<Lick
				bind:data={ lick }
				bind:shift={ shift }
				on:remove={ remove }
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

		return () => {

			document.removeEventListener('keydown', shiftOn)
			document.removeEventListener('keyup', shiftOff)
		}
	})

	$: visible = lick => {

		if (selected === 'all' || (lick.tags || []).includes(selected)) {

			return lick.current === lick.goal
				? showCompleted
				: true
		}

		return false
	}

	let remove = ({ detail }) => {

		data = data.filter(el => el.id !== detail.id)
	}

</script>


<style>

	ul {
        /* width: 100%; */
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
		margin: 0 -20px;
	}

</style>