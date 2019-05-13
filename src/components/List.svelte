<ul>
    {#each data as lick (lick.id)}
        <Lick bind:data={ lick } on:change={ handleChange }/>
    {/each}
</ul>

<script>
	import { afterUpdate } from 'svelte'
    import Lick from './Lick.svelte'

    export let data
    export let changes

    let handleChange = ({ detail }) => {

        console.log(data)

        let { id, edited } = detail

        if (!edited) delete changes[id]
        else changes[id] = true

        changes = {...changes}
    }

	afterUpdate(() => {
		
		console.log('-> List updated')
	})

</script>


<style>

	ul {
		width: 400px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

</style>