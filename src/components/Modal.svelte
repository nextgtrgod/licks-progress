
<svelte:window on:keydown={ handleEsc }/>

<div id="modal" class:visible>
	<div class="overlay" on:click={ () => visible = false }/>

	<form class="content" on:submit|preventDefault={ submit }>
		<h2>New stuff</h2>
		<Lick bind:data={ data }/>

		<button disabled={ !valid }>done</button>
	</form>
</div>


<script context="module">
	export let toggle
</script>

<script>
	import { onMount, createEventDispatcher } from 'svelte'
	import Lick from './Lick.svelte'

	let dispatch = createEventDispatcher()

	let visible = false

	let data = {
		name: '',
		current: 60,
		goal: 120,
		tags: [],
	}

	toggle = () => {

		visible = !visible

		data = {
			name: '',
			current: 60,
			goal: 120,
			tags: [],
		}
	}

	let handleEsc = ({ keyCode }) => keyCode === 27 && visible && toggle()


	$: valid = data.name && data.current && data.goal

	let submit = e => {

		if (!valid) return

		dispatch('submit', {
			id: Date.now(),
			...data,
			name: data.name.trim(),
		})

		toggle()
	}

</script>


<style lang="less">

	#modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		display: flex;
		align-items: center;
		justify-content: center;

		font-size: 1em;

		opacity: 0;
		pointer-events: none;
		transition: all .2s;

		&.visible {
			opacity: 1;
			pointer-events: all;
		}
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		/* background: fade(#000, 90%); */
		backdrop-filter: blur(5px);
	}

	.content {
		width: 100%;
		max-width: 400px;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
		margin: 0;

		li {
			margin-bottom: 0;
		}
	}

	h2 {
		width: 100%;
		max-width: 400px;
		margin-top: 0;
	}

	input {
		margin-bottom: 20px;
		border-bottom: 1px solid;
	}

	button {
		padding: 5px 25px;
		border: 1px solid;
		transition: opacity .2s;
	}

	button:disabled {
		opacity: .5;
		pointer-events: none;
	}

</style>