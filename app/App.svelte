<script lang="ts">
	import { getBoolean, clear } from '@nativescript/core/application-settings';
	import { CouchBase } from '@triniwiz/nativescript-couchbase';
	import StartScreen from './components/StartScreen.svelte';
	import Dashboard from './components/Dashboard.svelte';

	const userSettings = new CouchBase('userSettings');
	const exerciseDatabase = new CouchBase('exerciseDatabase');

	console.log(
		userSettings.query({
			select: [],
			from: ''
		})
	);

	console.log(
		exerciseDatabase.query({
			select: [],
			from: ''
		})
	);

	userSettings.close();
	exerciseDatabase.close();

	let configured: boolean = getBoolean('personDataSetted', false);
</script>

<frame class="bg-main">
	{#if !configured}
		<StartScreen />
	{/if}
	{#if configured}
		<Dashboard />
	{/if}
</frame>
