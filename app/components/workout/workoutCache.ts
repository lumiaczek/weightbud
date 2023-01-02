import { writable } from 'svelte/store';

const cache = writable({
	name: '',
	cwiczenia: [],
	czas: 0
});

export default cache;
