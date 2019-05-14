<ul>
    {#each data as lick (lick.id)}
        <Lick bind:data={ lick }/>
    {/each}
</ul>

<script>
	import { afterUpdate } from 'svelte'
    import Lick from './Lick.svelte'

    export let data

	// afterUpdate(() => {
		
	// 	console.log('-> List updated')
	// })

</script>


<style>

	ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
		margin: 0;
		padding: 0;
		list-style: none;
	}

</style>