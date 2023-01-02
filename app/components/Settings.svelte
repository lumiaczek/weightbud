<script lang="ts">
	import { clear } from '@nativescript/core/application-settings';
	import { CouchBase } from '@triniwiz/nativescript-couchbase';
	import { navigate } from 'svelte-native';
	import StartScreen from './StartScreen.svelte';

	const userSettings = new CouchBase('userSettings');
	const userPlans = new CouchBase('userPlans');
	const exerciseDatabase = new CouchBase('exerciseDatabase');
	const userWorkouts = new CouchBase('userWorkouts');

	const resetData = () => {
		userSettings.destroyDatabase();
		userSettings.close();
		userPlans.destroyDatabase();
		userPlans.close();
		exerciseDatabase.destroyDatabase();
		exerciseDatabase.close();
		userWorkouts.destroyDatabase();
		userWorkouts.close();

		clear();
		navigate({ page: StartScreen });
	};
</script>

<page actionBarHidden={true}>
	<flexBoxLayout
		flexDirection="column"
		justifyContent="space-between"
		class="bg-main w-full h-full py-6 px-4"
	>
		<button text="DEBUG" on:tap={resetData} />
	</flexBoxLayout>
</page>
