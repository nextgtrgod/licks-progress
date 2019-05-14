
<li>
    <div
		bind:this={ bar }
		class="bar"
		class:almost
		class:completed
		data-goal={ data.goal }
	>
        <span style="width: { percent }%;"/>

        <h3 style="left: { percent }%;">{ currentView }</h3>
    </div>

	<div class="edit">
		<input
			bind:this={ input }
			bind:value={ data.name }
			placeholder="lick name"
		/>
		<h2>{ percentView }%</h2>
	</div>
</li>


<script>
	import interact from 'interact.js'
	import { onMount, beforeUpdate, afterUpdate, onDestroy } from 'svelte'
	import clamp from '../utils/clamp'
	import map from '../utils/map'

	export let data

	$: percent = 100 * data.current / data.goal
	$: almost = percent >= 90 && !completed
	$: completed = percent === 100

	$: currentView = Math.round(data.current)
	$: percentView = Math.round(percent)


	let bar
	let input
	let offset = 0
	let width = 0

	onMount(() => {

		width = bar.offsetWidth

		interact(bar).draggable({
			onstart: () => {

				input.blur()
			},
			onmove: ({ dx, dy }) => {

				data.current = clamp(
					data.current + map(dx, 0, width, 0, data.goal),
					0,
					data.goal,
				)
			},
			onend: () => {

				data.current = Math.round(data.current)
			}
		})
	})

</script>


<style>

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
	}

	.bar.almost:after {
		transform: translateY(-120%);
	}

	.bar.almost h3,
	.bar.completed h3 {
		transform: translateX(-100%);
	}

	li.edited {
		/* background-color: #007b97; */
	}

	li:last-child {
		margin-bottom: 0;
	}

	.edit {
		width: 100%;
		display: flex;
		align-items: flex-end;
	}

	input {
		flex-basis: 100%;
		margin: 0;
		padding: 0;
		font-size: 1em;
		font-weight: 700;
		line-height: 1;
		color: inherit;
		background-color: transparent;
		border-radius: 0;
		border: none;
		border-bottom: 1px dashed transparent;
		transition: .2s;
		outline: none;
		box-sizing: border-box;
	}

	input:focus {
		border-bottom: 1px dashed;
	}

	h2 {
		position: relative;
		width: 65px;
		margin: 0;
		margin-left: auto;
		padding-left: 20px;
		text-align: right;
		font-size: 1em;
		font-weight: 700;
		line-height: 1;
		pointer-events: none;
		user-select: none;
	}

	.bar {
		position: relative;
		height: 25px;
		margin-bottom: 10px;
		border: 1px solid;
	}

	.bar:after {
		position: absolute;
		content: attr(data-goal);
		right: 0;
		bottom: 35px;
		font-size: .75em;
		line-height: 1;
		transition: transform .2s;
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
		font-size: .75em;
		line-height: 1;
		transform: translateX(-50%);
		transition-property: opacity, transform;
		transition-duration: .1s;
	}

</style>