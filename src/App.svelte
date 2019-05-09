<main class:loaded>
	<ul>
		{#each data as lick, i (i)}
			<Lick {...lick}/>
		{/each}
	</ul>
</main>


<script>
	import { API } from './config'
	import Lick from './components/Lick.svelte'

	import { onMount, beforeUpdate, afterUpdate } from 'svelte'

	let data = []
	let loaded = false

	onMount(async () => {

		try {
			let res = await fetch(`${API}/api`, {
				method: 'GET',
				cache: 'no-cache',
			})
	
			data = (await res.json()).data

		} catch (error) {
			console.log(error)
		}

		loaded = true

		// console.log('-> mounted')
	})

	// beforeUpdate(() => {
		
	// 	console.log('-> before update')
	// })

	// afterUpdate(() => {
		
	// 	console.log('-> after update')
	// })

</script>


<style type="postcss">

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

	ul {
		width: 400px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

</style>