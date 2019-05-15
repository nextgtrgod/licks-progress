<main class:loaded>

	<Filter bind:tags={ tags }/>

	{#if changes}
		<button
			in:fade="{{ duration: 200 }}"
			out:fly="{{ y: 50, duration: 200 }}"
			class="changes"
			on:click={ saveData }
		>
			<img src="./images/save.svg" alt="">
		</button>
	{/if}

	<List bind:data={ data }/>
</main>


<script>
	import { API } from './config'
	import Filter from './components/Filter.svelte'
	import List from './components/List.svelte'

	import { onMount, beforeUpdate, afterUpdate, onDestroy } from 'svelte'
	import { fade, fly } from 'svelte/transition'

	let data = []
	let beforeSave = ''

	let loaded = false
	let changes = false

	onMount(async () => {

		await getData()

		loaded = true

		console.log('-> App mounted 🌚')
	})

	let getData = async () => {

		try {
			let res = await fetch(`${API}/api`, {
				method: 'GET',
				cache: 'no-cache',
			})

			data = (await res.json()).data
			beforeSave = JSON.stringify(data)

		} catch (error) {
			console.log(error)
		}
	}

	let saveData = async () => {

		try {
			let res = await fetch(`${API}/api`, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				},
			})

			data = (await res.json()).data
			beforeSave = JSON.stringify(data)

		} catch (error) {
			console.log(error)
		}
	}

	$: {
		if (data.length) {

			changes = !(beforeSave === JSON.stringify(data))
		}
	}

	$: tags = (() => {

		let allTags = data.reduce((acc, el) => [...acc, ...(el.tags || [])], [])

		return [ ...new Set(['all', ...allTags]) ]
	})()

</script>


<style>

	:root {
		height: 100%;
		overflow: hidden;

		--bg-color:	#1D222C;
		--text-color: #FFF;
		--bar-color: #6c3fb5;
	}

	:global(body) {
		position: relative;
		margin: 0;
		padding: 0;

		font-family: 'Jura', sans-serif;
		font-weight: 400;
		font-size: 18px;

		color: var(--text-color);
		background-color: var(--bg-color);
		overflow: auto;
	}

	::selection {
		background: var(--bar-color);
	}

	main {
		margin: 40px auto;
		padding: 0 20px;
		box-sizing: border-box;
		opacity: 0;
	}

	main.loaded {
		animation: fade-in .4s forwards;
	}

	@keyframes fade-in {
		100% {
			opacity: 1;
		}
	}

	button.changes {
		position: fixed;
		bottom: 20px;
		right: 20px;
		margin: 0;
		padding: 0;
		font-weight: 300;
		background-color: transparent;
		border: none;
		cursor: pointer;
		filter: drop-shadow(0px 0px 40px var(--bar-color));
		z-index: 1;
	}

	button.changes img {
		width: 50px;
	}

</style>