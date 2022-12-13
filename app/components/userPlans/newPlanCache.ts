import { writable } from 'svelte/store';

interface Cache {
	name: string;
	cwiczenia: any[];
}

let obj: Cache = {
	name: 'Nowy plan',
	cwiczenia: []
};

const planCache = writable(obj);

export default planCache;
