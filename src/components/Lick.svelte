
<li class:edited>
    <div class="bar" data-goal={ data.goal }>

        <span style="width: { percent }%; opacity: { percent / 100 };"/>

        <h3 style="left: { percent }%">
            { !completed ? data.current : '' }
        </h3>
    </div>

	<div class="edit">
		<input bind:value={ data.name } placeholder="lick name"/>
		<h2>{ percent ^ 0}%</h2>
	</div>
</li>


<script>
	import events from '../utils/events'

	import {
		beforeUpdate,
		afterUpdate,
		// createEventDispatcher,
	} from 'svelte'

	export let data

	let edited = false

	let percent = 100 * data.current / data.goal
	let completed = percent === 100

	// let dispatch = createEventDispatcher()

	$: {
		// edited = (name !== init.name) || (goal !== init.goal) || (current !== init.current)
		
		// dispatch('change', { id, edited })
	}

</script>


<style>

	li {
		flex-shrink: 0;
		position: relative;
		width: 100%;
		margin-bottom: 40px;
		padding-top: 20px;
		list-style: none;
		transition: all .2s;
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
		margin: 0;
		margin-left: auto;
		padding-left: 20px;
		font-size: 1em;
		font-weight: 700;
		line-height: 1;
		text-align: center;
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
		transition: width .2s;
	}

	h3 {
		position: absolute;
		bottom: 35px;
		left: 0;
		margin: 0;
		font-size: .75em;
		line-height: 1;
		transform: translateX(-50%);
	}

</style>