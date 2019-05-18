<li 
	class="lick"
	bind:this={ root }
	on:mouseenter={ () => hover = true }
	on:mouseleave={ () => hover = false }
>
    <div
		bind:this={ bar }
		class="bar"
		class:almost
		class:completed
	>
        <span style="width: { percent }%;"/>

        <h3 style="left: { percent }%;">{ currentView }</h3>

		<input type="number" class="goal" bind:value={ data.goal }>
    </div>

	<div class="edit">
		<div>
			<input
				class="name"
				bind:this={ input }
				bind:value={ data.name }
				placeholder="lick name"
			/>
			<h2>{ percentView }%</h2>
		</div>

		<Tags bind:tags={ data.tags } bind:hover={ hover }>
			{#if data.id}
				<button type="button" on:click={ remove }>
					<svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 11.7 15">
						<path class="fill" d="M.8 13.3c0 .9.8 1.7 1.7 1.7h6.7c.9 0 1.7-.8 1.7-1.7v-10H.9v10zM11.7.8H8.8L7.9 0H3.8l-.9.8H0v1.7h11.7V.8z"/>
						<path fill="none" d="M-4.2-2.5h20v20h-20v-20z"/>
					</svg>
				</button>
			{/if}
		</Tags>
	</div>
</li>


<script context="module">
	let current
</script>

<script>
	import interact from 'interact.js'

	import { onMount, createEventDispatcher } from 'svelte'
	import Tags from './Tags.svelte'

	let dispatch = createEventDispatcher()

	import clamp from '../utils/clamp'
	import map from '../utils/map'

	export let data
	export let shift = false

	let innerCurrent = data.current // debounce

	$: percent = clamp(100 * innerCurrent / (data.goal || 1), 1, 100)
	$: almost = percent >= 90 && !completed
	$: completed = percent === 100

	$: currentView = Math.floor(innerCurrent)
	$: percentView = Math.floor(percent)

	let root
	let bar
	let input
	let offset = 0
	let width = 0

	let hover = false

	onMount(() => {

		width = bar.offsetWidth

		interact(bar).draggable({
			onstart: () => {

				input.blur()
			},
			onmove: ({ dx, dy }) => {

				innerCurrent = clamp(
					innerCurrent + map(dx / (1 + shift), 0, width, 0, data.goal),
					0,
					data.goal,
				)
			},
			onend: () => {

				data.current = Math.round(innerCurrent)
			}
		})

		return () => { // same as onDestroy

			interact(bar).unset()
		}
	})

	let edit = () => {}

	let remove = () => dispatch('remove', { id: data.id })

</script>


<style lang="less">

	li {
		flex-shrink: 0;
		position: relative;
		width: 100%;
		max-width: 400px;
		margin: 0 20px;
		margin-bottom: 40px;
		padding-top: 20px;
		list-style: none;
		transition: all .2s;

		&:hover,
		&.selected {

			button {
				opacity: 1;
				pointer-events: all;
			}
		}
	}

	.bar {
		position: relative;
		height: 25px;
		margin-bottom: 10px;
		border: 1px solid;

		&.almost {
			input.goal {
				transform: translateY(-120%);
			}
		}

		&.completed {

			h3 {
				opacity: 0;
			}
		}

		span {
			max-width: 100%;
		}
	}

	.edit {
		width: 100%;

		&>div:not(:last-child) {
			display: flex;
			align-items: flex-end;
			margin-bottom: 10px;
		}
		
		&>div:nth-child(2) {
			margin-left: -8px;
			font-size: 0;
		}
	}

	input {
		border-bottom: 1px dashed transparent;
		transition: .2s;

		&:focus {
			border-bottom: 1px dashed;
		}
	}

	input.name {
		flex-basis: 100%;
		font-size: 1.1em;
		font-weight: 700;
	}

	button {
		margin-right: -8px;
		padding: 0 8px;
		opacity: 0;
		transition-property: transform, opacity;
		transition-duration: .2s;
		pointer-events: none;

		&:hover {
			transform: scale(1.15);
		}
	}

	h2 {
		position: relative;
		width: 65px;
		margin: 0;
		margin-left: auto;
		padding-left: 20px;
		text-align: right;
		font-size: 1.1em;
		font-weight: 700;
		line-height: 1;
		pointer-events: none;
		user-select: none;
	}

	input.goal {
		position: absolute;
		width: 25px;
		height: 16px;
		right: 0;
		bottom: 34px;
		font-size: 14px;
		text-align: right;
		transition: all .2s;

		-moz-appearance: textfield;

		&::-webkit-inner-spin-button,
		&::-webkit-outer-spin-button {
			-webkit-appearance: none;
			margin: 0;	
		}
	}

	span {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		display: block;
		height: 100%;
		width: 0;
		background-color: var(--bar-color);
		border-right: 1px solid;
	}

	h3 {
		position: absolute;
		bottom: 35px;
		left: 0;
		margin: 0;
		font-size: 14px;
		font-weight: normal;
		line-height: 1;
		transform: translateX(-100%);
		transition-property: opacity, transform;
		transition-duration: .1s;
	}

</style>