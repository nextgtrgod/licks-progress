import { writable } from 'svelte/store'

let createStore = () => {
    let { subscribe, set, update } = writable({

        selected: 'all',
        showCompleted: true,
    })

    return {
        subscribe,
        set,
        update,
    }
}

export const store = createStore()
