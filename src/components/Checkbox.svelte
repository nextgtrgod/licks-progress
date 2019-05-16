
<button class="checkbox" on:click={ () => checked = !checked }>
	<p>{ text }</p>
	<span class:checked/>
</button>


<script>
	export let checked
	export let text

</script>


<style>

	.checkbox {
		display: flex;
		align-items: center;
	}

	span {
		position: relative;
		width: 42px;
		height:	26px;
		background-color: #CCC;
		border-radius: 16px;
		transition: background-color .2s;
	}

	span:after {
		content: '';
		position: absolute;
		top: 0;
		left: 4px;
		bottom: 0;
		margin: auto;
		width: 20px;
		height: 20px;
		background-color: #FFF;
		border-radius: 50%;
		box-shadow: 1px 1px 2px rgba(0,0,0, .15);
		transition: all .2s;
	}

	span.checked {
		background-color: var(--bar-color);
	}

	span.checked:after {
		transform: translateX(15px);
		box-shadow: 1px 1px 2px rgba(0,0,0, .5);
		opacity: 1;
	}

	p {
		margin: 0;
		margin-right: 12px;
		font-size: 1em;
		line-height: 1;
	}

</style>