<main class:loaded>

	<div class="menu">
		<Filter bind:tags={ tags }/>

		<button class="add" on:click={ addData }>
			<img src="./images/plus.svg" alt="">
		</button>

		{#if changes}
			<button
				class="save"
				in:fade="{{ duration: 200 }}"
				out:fly="{{ y: -50, duration: 200 }}"
				on:click={ saveData }
			>
				<img src="./images/save.svg" alt="">
			</button>
		{/if}
	</div>

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

	let addData = () => {

		console.log('addition')
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
		height: 100%;
		margin: 0;
		padding: 0;

		font-family: 'Jura', sans-serif;
		font-weight: 400;
		font-size: 18px;

		color: var(--text-color);
		background-color: var(--bg-color);
		overflow: auto;
	}

	:global(button) {
		margin: 0;
		padding: 0;
		font: inherit;
		color: inherit;
		background: transparent;
		border: none;
		outline: none;
		cursor: pointer;
	}

	:global(img) {
		pointer-events: none;
	}

	::selection {
		background: var(--bar-color);
	}

	main {
		margin: 30px auto;
		padding: 0 20px;
		box-sizing: border-box;
		opacity: 0;
	}

	@media (min-width: 720px) {
		main {
			margin: 40px auto;
			padding: 0 40px;
		}
	}

	main.loaded {
		animation: fade-in .4s forwards;
	}

	@keyframes fade-in {
		100% {
			opacity: 1;
		}
	}

	.menu {
		display: flex;
		align-items: center;
		margin-bottom: 30px;
	}

	button.save {
		margin-left: 30px;
	}

	button.save img {
		width: 30px;
	}

	button.add {
		margin-left: 35px;
	}

	button.add img {
		width: 32px;
	}

</style>