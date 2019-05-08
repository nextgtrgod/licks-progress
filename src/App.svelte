<main>
	{#each data as list, i}
		<ul>
			{#each list as lick}
				<Lick lick="{ lick }"/>
			{/each}
		</ul>
	{/each}
</main>


<script>
	import data from '../data'
	import Lick from './components/Lick.svelte'

</script>


<style>

	:root {
		height: 100%;
		overflow: hidden;

		--bg-color: #0FF;
		--bar-color: #F7FF00;
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
		opacity: 0;
		animation: fade-in .4s forwards;
		overflow: hidden;
	}

	:global(ul) {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	@keyframes fade-in {
		100% {
			opacity: 1;
		}
	}

	::selection {
		background: var(--bar-color);
	}

	main {
		position: relative;
		display: flex;
		align-items: center;
		scroll-snap-type: x mandatory;
		max-height: 100vh;
		overflow: auto;
		z-index: 1;
	}

	ul {
		flex-shrink: 0;
		position: relative;
		width: 610px;
		height: 100vh;
		min-height: 100vh;
		scroll-snap-align: start;
		scroll-snap-stop: always;
		margin: auto;
		padding: 80px 30px;
		padding-left: 20px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		box-sizing: border-box;
		border-right: 1px dashed #111;
	}

	ul:last-of-type {
		border: none;
	}

	:global(body:after) {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		background: linear-gradient(to right, rgba(247, 255, 0, 1), rgba(247, 255, 0, 0));
		mix-blend-mode: exclusion;
	}

</style>