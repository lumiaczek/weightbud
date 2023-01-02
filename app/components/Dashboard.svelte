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
	const userWorkouts = new CouchBase('userWorkouts');

	// ----------------------------------------

	// Pulling data from database
	const user = userSettings.getDocument('personData');

	const name = user.name;
	const date = new Date(
		Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
	).toLocaleDateString();

	let plans = userPlans.query({
		select: [],
		from: ''
	});

	let workouts = userWorkouts.query({
		select: [],
		from: ''
	});

	let ppm: number = 0;
	let bmi: number = 0;
	let time: number = 0;
	let kcal: number = 0;

	const getStatistics = () => {
		try {
			time = Number(workouts[workouts.length - 1].czas) / 60;
			time = parseInt(time.toString());
		} catch {
			time = 0;
		}
		kcal = time * 3.6;

		bmi = Math.round((user.weight / ((user.height / 100) * (user.height / 100))) * 100) / 100;
		if (user.gender === 'men') {
			ppm = 66.5 + 13.75 * user.weight + 5.003 * user.height - 6.775 * 24;
			ppm = parseInt(ppm.toString());
		}

		if (user.gender === 'women') {
			ppm = 655.1 + 9.563 * user.weight + 1.85 * user.height - 4.676 * 24;
			ppm = parseInt(ppm.toString());
		}
	};

	// ----------------------------------------

	onMount(() => {
		if (plans.length === 0) {
			showAddWorkoutButton = true;
		}

		getStatistics();
	});

	$: {
		if (application.android) {
			application.android.on(AndroidApplication.activityBackPressedEvent, (data: any) => {
				data.cancel = true;
			});
		}
	}

	// ----------------------------------------

	// włączenie przycisku hardwarowego

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
	userWorkouts.close();

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

		<flexBoxLayout flexDirection="column" class="w-full mx-4 h-[19%] rounded-xl bg-secound">
			<flexBoxLayout
				flexDirection="row"
				justifyContent="center"
				class="px-4 rounded-t-3xl bg-secound pt-3 w-full"
			/>
			<flexBoxLayout flexDirection="column" justifyContent="center" alignItems="center">
				<flexBoxLayout
					flexDirection="column"
					justifyContent="space-between"
					class="w-full px-6 py-2"
				>
					<flexBoxLayout
						flexDirection="row"
						justifyContent="space-between"
						alignItems="center"
					>
						<flexBoxLayout flexDirection="column">
							<flexBoxLayout flexDirection="row" alignItems="center">
								<label text="&#xf06d;" class="fas text-lg text-white mr-2" />
								<label text="Kalorie spalone:" class="text-sky-600 text-lg" />
							</flexBoxLayout>
							<label text={`${kcal.toString()} kcal`} class="text-white text-xl" />
						</flexBoxLayout>
						<flexBoxLayout flexDirection="column">
							<flexBoxLayout flexDirection="row" alignItems="center" class="mr-6">
								<label text="&#xf496;" class="fas text-xl text-white mr-2" />
								<label text="BMI:" class="text-sky-600 text-lg" />
							</flexBoxLayout>
							<label text={bmi.toString()} class="text-white text-xl" />
						</flexBoxLayout>
					</flexBoxLayout>
					<flexBoxLayout
						flexDirection="row"
						justifyContent="space-between"
						alignItems="center"
						class="mt-2"
					>
						<flexBoxLayout flexDirection="column">
							<flexBoxLayout flexDirection="row" alignItems="center">
								<label text="&#xf017;" class="fas text-lg text-white mr-2" />
								<label text="Czas treningu:" class="text-sky-600 text-lg" />
							</flexBoxLayout>
							<label text={`${time.toString()} minut`} class="text-white text-xl" />
						</flexBoxLayout>
						<flexBoxLayout flexDirection="column">
							<flexBoxLayout flexDirection="row" alignItems="center">
								<label text="&#xf0e7;" class="fas text-xl text-white mr-2" />
								<label text="PPM:" class="text-sky-600 text-lg" />
							</flexBoxLayout>
							<label text={`${ppm.toString()} kcal`} class="text-white text-xl" />
						</flexBoxLayout>
					</flexBoxLayout>
				</flexBoxLayout>
			</flexBoxLayout>
		</flexBoxLayout>
		<flexBoxLayout
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			class="rounded-3xl bg-secound p-4 h-[24%] w-full mx-4  "
		>
			{#if !showAddWorkoutButton}
				<button
					class="w-[80%] h-1/2 bg-sky-600 rounded-3xl text-center mx-5 p-5"
					on:tap={gotoPlans}
				>
					<formattedString>
						<span
							text="Rozpocznij trening"
							class="text-white lato text-2xl font-normal"
						/>
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
		{#if workouts.length === 0}
			<flexBoxLayout
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				class="rounded-3xl bg-secound p-4 h-[26%] w-full mx-4 "
			>
				<label
					text="Wygląda na to że, nie masz jeszcze żadnych treningów za sobą."
					class="text-base lato font-light mb-3 text-grayText leading-tight text-center"
					textWrap={true}
				/>
			</flexBoxLayout>
		{/if}
		{#if workouts.length !== 0}
			<flexBoxLayout
				flexDirection="column"
				class="rounded-3xl bg-secound py-2 px-4 h-[26%] w-full mx-4 "
			>
				<flexBoxLayout
					flexDirection="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<label
						text={workouts[workouts.length - 1].name}
						class="text-grayText text-xl lato"
					/>
					<label text={`${time} minut`} class="text-sm text-grayText  lato" />
				</flexBoxLayout>
				<flexBoxLayout
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					class="space-y-2"
				>
					{#each workouts[workouts.length - 1].cwiczenia as e, i (i)}
						{#if i < 2}
							<flexBoxLayout flexDirection="column">
								<flexBoxLayout
									flexDirection="row"
									alignItems="center"
									justifyContent="space-between"
									class="w-full px-2"
								>
									<label
										text={e.name}
										class="text-base text-white font-semibold lato"
									/>
								</flexBoxLayout>
								<flexBoxLayout flexDirection="row" class="w-full px-2">
									<flexBoxLayout flexDirection="column" class="w-2/3">
										{#each e.powtorzenia as rep, i (i)}
											<flexBoxLayout flexDirection="row" alignItems="center">
												<label
													text={`Seria: ${i + 1}`}
													class="lato text-white text-sm text-center ml-3"
												/>
												<label
													text={rep}
													class="lato text-center text-sm text-white ml-14"
												/>
												<label
													text=" rep"
													class="lato text-center text-sm text-white"
												/>
											</flexBoxLayout>
										{/each}
									</flexBoxLayout>
									<flexBoxLayout flexDirection="column" class="w-1/3">
										{#each e.waga as weight, i (i)}
											<flexBoxLayout flexDirection="row" alignItems="center">
												<label
													text={weight}
													class="lato text-center text-sm text-white"
												/>
												<label
													text=" kg"
													class="lato text-sm text-center text-white"
												/>
											</flexBoxLayout>
										{/each}
									</flexBoxLayout>
								</flexBoxLayout>
							</flexBoxLayout>
						{/if}
					{/each}
				</flexBoxLayout>
			</flexBoxLayout>
		{/if}

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
