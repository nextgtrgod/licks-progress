
<div id="settings" class:open>
	<ul>
		{#each colors as color, i}
			<li
				on:click={ () => select(i) }
				style="transition-delay: { i * 400 / colors.length }ms"
			>
				<span style="background: { color.bar }"/>
				<span style="background: { color.bg }"/>
				<span style="background: { color.text }"/>
			</li>
		{/each}
    </ul>

    <button class="toggle" on:click={ () => open = !open }>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" viewBox="0 0 478.7 478.7">
			<path class="fill" d="M454.2 189.1l-33.6-5.7c-3.5-11.3-8-22.2-13.5-32.6l19.8-27.7c8.4-11.8 7.1-27.9-3.2-38.1l-29.8-29.8c-5.6-5.6-13-8.7-20.9-8.7-6.2 0-12.1 1.9-17.1 5.5l-27.8 19.8c-10.8-5.7-22.1-10.4-33.8-13.9l-5.6-33.2C286.3 10.4 274 0 259.5 0h-42.1c-14.5 0-26.8 10.4-29.2 24.7l-5.8 34c-11.2 3.5-22.1 8.1-32.5 13.7l-27.5-19.8c-5-3.6-11-5.5-17.2-5.5-7.9 0-15.4 3.1-20.9 8.7L54.4 85.6c-10.2 10.2-11.6 26.3-3.2 38.1l20 28.1c-5.5 10.5-9.9 21.4-13.3 32.7l-33.2 5.6C10.4 192.5 0 204.8 0 219.3v42.1c0 14.5 10.4 26.8 24.7 29.2l34 5.8c3.5 11.2 8.1 22.1 13.7 32.5l-19.7 27.4c-8.4 11.8-7.1 27.9 3.2 38.1l29.8 29.8c5.6 5.6 13 8.7 20.9 8.7 6.2 0 12.1-1.9 17.1-5.5l28.1-20c10.1 5.3 20.7 9.6 31.6 13L189 454c2.4 14.3 14.7 24.7 29.2 24.7h42.2c14.5 0 26.8-10.4 29.2-24.7l5.7-33.6c11.3-3.5 22.2-8 32.6-13.5l27.7 19.8c5 3.6 11 5.5 17.2 5.5 7.9 0 15.3-3.1 20.9-8.7l29.8-29.8c10.2-10.2 11.6-26.3 3.2-38.1l-19.8-27.8c5.5-10.5 10.1-21.4 13.5-32.6l33.6-5.6c14.3-2.4 24.7-14.7 24.7-29.2v-42.1c.2-14.5-10.2-26.8-24.5-29.2zm-2.3 71.3c0 1.3-.9 2.4-2.2 2.6l-42 7c-5.3.9-9.5 4.8-10.8 9.9-3.8 14.7-9.6 28.8-17.4 41.9-2.7 4.6-2.5 10.3.6 14.7l24.7 34.8c.7 1 .6 2.5-.3 3.4l-29.8 29.8c-.7.7-1.4.8-1.9.8-.6 0-1.1-.2-1.5-.5l-34.7-24.7c-4.3-3.1-10.1-3.3-14.7-.6-13.1 7.8-27.2 13.6-41.9 17.4-5.2 1.3-9.1 5.6-9.9 10.8l-7.1 42c-.2 1.3-1.3 2.2-2.6 2.2h-42.1c-1.3 0-2.4-.9-2.6-2.2l-7-42c-.9-5.3-4.8-9.5-9.9-10.8-14.3-3.7-28.1-9.4-41-16.8-2.1-1.2-4.5-1.8-6.8-1.8-2.7 0-5.5.8-7.8 2.5l-35 24.9c-.5.3-1 .5-1.5.5-.4 0-1.2-.1-1.9-.8L75 375.6c-.9-.9-1-2.3-.3-3.4l24.6-34.5c3.1-4.4 3.3-10.2.6-14.8-7.8-13-13.8-27.1-17.6-41.8-1.4-5.1-5.6-9-10.8-9.9L29.2 264c-1.3-.2-2.2-1.3-2.2-2.6v-42.1c0-1.3.9-2.4 2.2-2.6l41.7-7c5.3-.9 9.6-4.8 10.9-10 3.7-14.7 9.4-28.9 17.1-42 2.7-4.6 2.4-10.3-.7-14.6l-24.9-35c-.7-1-.6-2.5.3-3.4l29.8-29.8c.7-.7 1.4-.8 1.9-.8.6 0 1.1.2 1.5.5l34.5 24.6c4.4 3.1 10.2 3.3 14.8.6 13-7.8 27.1-13.8 41.8-17.6 5.1-1.4 9-5.6 9.9-10.8l7.2-42.3c.2-1.3 1.3-2.2 2.6-2.2h42.1c1.3 0 2.4.9 2.6 2.2l7 41.7c.9 5.3 4.8 9.6 10 10.9 15.1 3.8 29.5 9.7 42.9 17.6 4.6 2.7 10.3 2.5 14.7-.6l34.5-24.8c.5-.3 1-.5 1.5-.5.4 0 1.2.1 1.9.8l29.8 29.8c.9.9 1 2.3.3 3.4l-24.7 34.7c-3.1 4.3-3.3 10.1-.6 14.7 7.8 13.1 13.6 27.2 17.4 41.9 1.3 5.2 5.6 9.1 10.8 9.9l42 7.1c1.3.2 2.2 1.3 2.2 2.6l-.1 42.1z"/>
			<path class="fill" d="M239.4 136c-57 0-103.3 46.3-103.3 103.3s46.3 103.3 103.3 103.3 103.3-46.3 103.3-103.3S296.4 136 239.4 136zm0 179.6c-42.1 0-76.3-34.2-76.3-76.3s34.2-76.3 76.3-76.3 76.3 34.2 76.3 76.3-34.2 76.3-76.3 76.3z"/>
		</svg>
	</button>
</div>


<script>
	import { onMount } from 'svelte'

	let open = false

	let colors = [
		{
			bg:	'#1D222C',
			bar: '#6c3fb5',
			text: '#FFF',
		},
		{
			bg: '#F7F8F3',
			bar: '#78f744',
			text: '#111',
		},
	]

	let theme = JSON.parse(localStorage.getItem('theme')) || colors[0]

	onMount(() => {

		set()
	})

	let select = i => {

		theme = colors[i]

		set()

		localStorage.setItem('theme', JSON.stringify(theme))
	}

	let set = () => {
		document.documentElement.style.setProperty('--bg-color', theme.bg)
		document.documentElement.style.setProperty('--bar-color', theme.bar)
		document.documentElement.style.setProperty('--text-color', theme.text)
	}

</script>


<style lang="less">

	#settings {
		margin-left: auto;
		display: flex;
		align-items: center;

		&.open {

			button.toggle {
				transform: rotate(60deg);
			}

			li {
				transform: translate3d(0, 0, 0) rotate(15deg);
				opacity: 1;
				pointer-events: all;
			}
		}
	}

	button.toggle {
		margin-left: 20px;
		transition: transform .3s;
	}

	ul {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
	}

	li {
		position: relative;
		width: 30px;
		height: 30px;
		margin: 0 12px;
		transform: translate3d(0, 75%, 0) rotate(15deg);
		opacity: 0;
		transition-duration: .15s;
		transition-timing-function: ease-in-out;
		cursor: pointer;
		pointer-events: none;
	}

	span {
		position: absolute;
		display: block;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		border: 1px solid #000;
		box-sizing: border-box;

		&:nth-of-type(1) {
			top: 0;
			left: 0;
		}

		&:nth-of-type(2) {
			top: 0;
			right: 0;
		}

		&:nth-of-type(3) {
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
		}
	}

</style>