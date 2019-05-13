import { writable } from 'svelte/store'
import { API } from './config'

let createStore = () => {
    let { subscribe, set, update } = writable({

        data: [],
        changes: [],
    })

    return {
        subscribe,
        set,
        update,
    }
}

export const store = createStore()
