<main class:loaded>

	<div class="menu">
		<Filter bind:tags={ tags }/>

		<button class="add" on:click={ showModal }>
			<svg xmlns="http://www.w3.org/2000/svg" width="32" viewBox="0 0 31.1 31.1">
				<path class="fill" d="M15.5 31.1C7 31.1 0 24.1 0 15.5S7 0 15.5 0 31 7 31 15.5c.1 8.6-6.9 15.6-15.5 15.6zm0-29.3C7.9 1.8 1.8 7.9 1.8 15.5S8 29.3 15.6 29.3c7.6 0 13.8-6.2 13.8-13.8S23.1 1.8 15.5 1.8z"/>
				<path class="fill" d="M21.7 16.4H9.4c-.5 0-.9-.4-.9-.9s.4-.9.9-.9h12.2c.5 0 .9.4.9.9s-.4.9-.8.9z"/>
				<path class="fill" d="M15.5 22.5c-.5 0-.9-.4-.9-.9V9.4c0-.5.4-.9.9-.9s.9.4.9.9v12.2c0 .5-.4.9-.9.9z"/>
			</svg>
		</button>

		{#if changes}
			<button
				class="save"
				in:fade="{{ duration: 200 }}"
				out:fly="{{ y: -50, duration: 200 }}"
				on:click={ saveData }
				disabled={ fetching }
			>
				<img src="./images/save.svg" alt="">
			</button>
		{/if}

		<Settings/>
	</div>

	<List bind:data={ data }/>

	<Modal on:submit={ addData }/>
</main>


<script>
	import { API } from './config'
	import Filter from './components/Filter.svelte'
	import List from './components/List.svelte'
	import Modal, { toggle as toggleModal } from './components/Modal.svelte'
	import Settings from './components/Settings.svelte'

	import { onMount, beforeUpdate, afterUpdate, onDestroy } from 'svelte'
	import { fade, fly } from 'svelte/transition'

	let data = []
	let beforeSave = ''

	let loaded = false
	let changes = false
	let fetching = false

	onMount(async () => {

		await getData()

		loaded = true

		console.log('-> App mounted 🌚')
	})

	let getData = async () => {

		fetching = true

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

		fetching = false
	}

	let saveData = async () => {

		fetching = true

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

		fetching = false
	}

	let showModal = () => {

		toggleModal()
		console.log('addition')
	}

	let addData = ({ detail }) => {

		let maxId = Math.max(...data.reduce((acc, el) => [...acc, el.id], []))

		data = [...data, { ...detail, id: maxId + 1 }]
	}

	$: {
		if (data.length) {

			changes = beforeSave !== JSON.stringify(data)
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
		background-color: var(--bg-color) !important;
		transition: background-color .1s;
		overflow: auto;

		-webkit-overflow-scrolling: touch;
		overscroll-behavior-y: none;
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

	:global(svg path.fill) {
		fill: var(--text-color);
	}

	:global(input) {
		margin: 0;
		padding: 0;
		font-family: inherit;
		font-size: inherit;
		line-height: 1;
		color: inherit;
		border: none;
		border-radius: 0;
		background-color: transparent;
		outline: none;
		box-sizing: border-box;
	}

	:global(ul) {
		padding: 0;
		margin: 0;
		list-style: none;
	}

	:global(.overlay) {
		background-color: var(--bg-color);
		opacity: .95;
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
		margin-bottom: 60px;
	}

	button {
		transition: all .2s;
	}

	button:hover {
		transform: scale(1.05);
	}

	button:disabled {
		pointer-events: none;
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

</style>