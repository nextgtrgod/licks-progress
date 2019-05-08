<li>
    <p>{ lick.name }</p>
    <div data-goal="{ lick.goal }">
        <span style="width: {100 * lick.current / lick.goal}%"></span>
        <h2>{ (100 * lick.current / lick.goal) ^ 0}%</h2>
        <h3 style="left: {100 * lick.current / lick.goal}%">
            {100 * lick.current / lick.goal !== 100 ? lick.current : ''}
        </h3>
    </div>
</li>


<script>

    export let lick


</script>


<style>

	li {
		flex-shrink: 0;
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
		list-style: none;
		margin-bottom: 40px;
	}

	li:last-child {
		margin-bottom: 0;
	}

	li:before {
		content: '';
		position: absolute;
		top: 0;
		left: -15px;
		bottom: 0;
		margin: auto;
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 5px 0 5px 10px;
		border-color: transparent transparent transparent var(--text-color);
		opacity: 0;
		transition: opacity .2s;
	}

	li.selected div {
		border: 1px dashed;
	}

	li.selected div span {
		border-right: 1px dashed;
	}

		p {
			flex-shrink: 0;
			flex-basis: 25%;
			padding-right: 10px;
			margin: 0;
			font-size: .95em;
			font-weight: 700;
			box-sizing: border-box;
			cursor: pointer;
		}

		div {
			position: relative;
			flex-basis: 80%;
			height: 25px;
			border: 1px solid;
		}

		div:after {
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

			h2 {
				position: relative;
				margin: 0;
				font-size: .95em;
				font-weight: 500;
				line-height: 25px;
				text-align: center;
				pointer-events: none;
				user-select: none;
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