<script lang="ts">
	import { CouchBase } from '@triniwiz/nativescript-couchbase';
	import { navigate, goBack } from 'svelte-native';
	import Settings from './Settings.svelte';
	import Stats from './Dashboard/Stats.svelte';
	import Plans from './Dashboard/Plans.svelte';
	import * as application from '@nativescript/core/application';
	import { onMount } from 'svelte';
	import { SwipeGestureEventData, AndroidApplication } from '@nativescript/core';

	// routes
	const openSettings = () => {
		enableHardwareBack();
		navigate({ page: Settings });
	};
	const gotoStats = () => {
		// enableHardwareBack();
		navigate({ page: Stats });
	};
	const gotoPlans = () => {
		// enableHardwareBack();
		navigate({ page: Plans });
	};

	// ----------------------------------------

	const onSwipe = (args: SwipeGestureEventData) => {
		switch (args.direction) {
			case 1:
				gotoStats();
				break;
			case 2:
				gotoPlans();
				break;
			default:
				return;
				break;
		}
	};

	//functional data definition

	let showAddWorkoutButton: boolean = false;

	// Database connections
	const userSettings = new CouchBase('userSettings');
	const userPlans = new CouchBase('userPlans');

	// ----------------------------------------

	// Pulling data from database
	const name = userSettings.getDocument('personData').name;
	const date = new Date(
		Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
	).toLocaleDateString();

	let plans = userPlans.query({
		select: [],
		from: ''
	});

	// ----------------------------------------

	onMount(() => {
		if (plans.length === 0) {
			showAddWorkoutButton = true;
		}
	});

	// Reactive checking
	$: {
		if (application.android) {
			application.android.on(AndroidApplication.activityBackPressedEvent, (data: any) => {
				data.cancel = true; // prevents default back button behavior
			});
		}
	}

	// ----------------------------------------

	// enabling hardware back button on exiting dashboard - this prevents to goback to initialization fase after first config
	const enableHardwareBack = () => {
		if (application.android) {
			application.android.on(
				application.AndroidApplication.activityBackPressedEvent,
				(data: any) => {
					goBack();
				}
			);
		}
	};

	// ----------------------------------------

	// closing connection to databases in case we want to destroy any
	userSettings.close();
	userPlans.close();

	// ----------------------------------------
</script>

<page actionBarHidden={true} on:swipe={onSwipe}>
	<flexBoxLayout
		flexDirection="column"
		justifyContent="space-between"
		class="bg-main w-full h-full pt-6"
	>
		<flexBoxLayout
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			class="px-4"
		>
			<stackLayout>
				<label text={`Cześć ${name}!`} class="text-3xl text-white lato font-light" />
				<label text={date} class="text-lg text-grayText lato font-light" />
			</stackLayout>
			<label text="&#xf013;" class="fas text-3xl text-white" on:tap={openSettings} />
		</flexBoxLayout>

		<flexBoxLayout flexDirection="column" class="w-full mx-4 h-[20%] rounded-xl bg-secound">
			<flexBoxLayout
				flexDirection="row"
				justifyContent="center"
				class="px-4 rounded-t-3xl bg-secound pt-3 w-full"
			>
				<label text="Statystyki" class="lato text-grayText text-base" />
			</flexBoxLayout>
			<flexBoxLayout flexDirection="column" class="rounded-b-3xl bg-secound px-4 pb-4" />
		</flexBoxLayout>
		<flexBoxLayout
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			class="rounded-3xl bg-secound p-4 h-[22%] w-full mx-4  "
		>
			{#if !showAddWorkoutButton}
				<button class="w-[80%] h-1/2 bg-red-500 rounded-3xl text-center mx-5 p-5">
					<formattedString>
						<span text="Pora na trening" class="text-white lato text-2xl font-normal" />
					</formattedString>
				</button>
			{/if}
			{#if showAddWorkoutButton}
				<label
					text="Wygląda na to że, nie masz żadnych planów."
					class="text-base lato font-light mb-3 text-white"
				/>
				<button
					class="w-[80%] h-1/2 bg-grayText rounded-3xl text-center mx-5 p-5"
					on:tap={gotoPlans}
				>
					<formattedString>
						<span
							text="Przejdź do planów"
							class="text-white lato text-2xl font-normal"
						/>
					</formattedString>
				</button>
			{/if}
		</flexBoxLayout>
		<stackLayout class="rounded-3xl bg-secound p-4 h-[22%] w-full mx-4 " />

		<flexboxLayout
			flexDirection="row"
			justifyContent="space-around"
			alignSelf="flex-end"
			alignItems="center"
			class="bg-secound rounded-t-xl p-4"
		>
			<stackLayout class="w-1/3 -ml-3" on:tap={gotoStats}>
				<label text="&#xf201;" class="fas text-2xl text-white mx-auto text-center" />
				<label
					text="Statystyki"
					class="lato text-xs font-light text-white mt-1 text-center"
				/>
			</stackLayout>
			<stackLayout class="w-1/3">
				<label
					text="&#xf015;"
					class="fas text-2xl text-white mx-auto text-center current-route"
				/>
				<label
					text="Strona główna"
					class="lato text-xs font-light text-white mt-1 text-center current-route"
				/>
			</stackLayout>
			<stackLayout class="w-1/3" on:tap={gotoPlans}>
				<label text="&#xf46d;" class="fas text-2xl text-white mx-auto text-center" />
				<label text="Plany" class="lato text-xs font-light text-white mt-1 text-center" />
			</stackLayout>
		</flexboxLayout>
	</flexBoxLayout>
</page>
