<main class:loaded>
	{#if Object.keys(changes).length}
		<button class="changes" on:click={ saveData }>
			<img src="./images/save.svg" alt="">
		</button>
	{/if}

	<List
		bind:data={ data }
		bind:changes={ changes }
	/>
</main>


<script>
	import { API } from './config'
	import List from './components/List.svelte'

	import { onMount, beforeUpdate, afterUpdate, onDestroy } from 'svelte'

	let data = []
	let beforeSave = []

	let loaded = false

	let changes = {}

	onMount(async () => {

		beforeSave = await getData()

		loaded = true

		console.log('-> App mounted')
	})

	let getData = async () => {

		try {
			let res = await fetch(`${API}/api`, {
				method: 'GET',
				cache: 'no-cache',
			})

			data = (await res.json()).data
			beforeSave = [...data]

		} catch (error) {
			console.log(error)
		}
	}

	let saveData = async () => {

		console.log(data)
		return

		try {
			let res = await fetch(`${API}/api`, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				},
			})

			data = (await res.json()).data

			console.log(data)

		} catch (error) {
			console.log(error)
		}
	}

	$: {
		if (data.length) {

			console.log(data[0].name)
			if (beforeSave) console.log(beforeSave[0].name)
		}
	}

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
	}

	button.changes img {
		width: 50px;
	}

</style>