<script lang="ts">
	import { SwipeGestureEventData } from '@nativescript/core/ui/gestures';
	import { CouchBase } from '@triniwiz/nativescript-couchbase';
	import { navigate } from 'svelte-native';
	import Dashboard from '../Dashboard.svelte';
	import Plans from './Plans.svelte';
	import WorkoutArchive from '../workout/WorkoutArchive.svelte';

	const userWorkouts = new CouchBase('userWorkouts');
	const userSettings = new CouchBase('userSettings');

	let workouts = userWorkouts.query({
		select: [],
		from: ''
	});

	const user = userSettings.getDocument('personData');

	let ppm: number = 0;
	let bmi: number = 0;
	let time: number = 0;

	let squat = 0;
	let deadlift = 0;
	let benchPress = 0;

	const gotoMain = () => {
		navigate({ page: Dashboard });
	};

	const gotoPlans = () => {
		navigate({ page: Plans });
	};

	const gotoArchive = () => {
		navigate({ page: WorkoutArchive });
	};

	const getStatistics = () => {
		try {
			workouts.forEach((e) => {
				time += e.czas;
			});

			time = time / 60;
			time = parseInt(time.toString());
		} catch {}

		bmi = Math.round((user.weight / ((user.height / 100) * (user.height / 100))) * 100) / 100;
		if (user.gender === 'men') {
			ppm = 66.5 + 13.75 * user.weight + 5.003 * user.height - 6.775 * 24;
			ppm = parseInt(ppm.toString());
		}

		if (user.gender === 'women') {
			ppm = 655.1 + 9.563 * user.weight + 1.85 * user.height - 4.676 * 24;
			ppm = parseInt(ppm.toString());
		}

		workouts.forEach((e) => {
			// search for benchPress
			e.cwiczenia.forEach((e: any) => {
				if (e.name === 'Bench Press') {
					benchPress = Math.max(...e.waga);
				}
			});
		});

		workouts.forEach((e) => {
			// search for squat
			e.cwiczenia.forEach((e: any) => {
				if (e.name === 'Squat') {
					squat = Math.max(...e.waga);
				}
			});
		});

		workouts.forEach((e) => {
			// search for deadlift
			e.cwiczenia.forEach((e: any) => {
				if (e.name === 'Deadlift') {
					deadlift = Math.max(...e.waga);
				}
			});
		});
	};

	getStatistics();

	userSettings.close();
	userWorkouts.close();

	const onSwipe = (args: SwipeGestureEventData) => {
		switch (args.direction) {
			case 2:
				gotoMain();
				break;
			default:
				return;
		}
	};
</script>

<page actionBarHidden={true} class="h-screen" on:swipe={onSwipe}>
	<flexBoxLayout
		flexDirection="column"
		justifyContent="space-between"
		class="bg-main w-full h-full"
	>
		<flexBoxLayout
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			class="w-full bg-secound p-4"
		>
			<label text="Statystyki" class="text-2xl lato text-white font-light" />
		</flexBoxLayout>
		<flexBoxLayout
			flexDirection="column"
			class="w-full -mt-10 mx-4 h-[24%] rounded-xl bg-secound"
		>
			<flexBoxLayout
				flexDirection="row"
				justifyContent="center"
				class="px-4 rounded-t-3xl bg-secound pt-3 w-full"
			/>
			<label text="Statystyki ogólne" class="ml-3 lato text-grayText text-lg" />

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
								<label text="&#xf5cd;" class="fas text-lg text-white mr-2" />
								<label text="Waga:" class="text-sky-600 text-lg" />
							</flexBoxLayout>
							<label
								text={`${user.weight.toString()} kg`}
								class="text-white text-xl"
							/>
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
								<label text="Suma czasu:" class="text-sky-600 text-lg" />
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
			class="w-full -mt-12 mx-4 h-[26%] rounded-xl bg-secound"
		>
			<flexBoxLayout
				flexDirection="row"
				justifyContent="center"
				class="px-4 rounded-t-3xl bg-secound pt-3 w-full"
			/>
			<label text="Statystyki trójboju" class="ml-3 lato text-grayText text-lg" />
			<flexBoxLayout
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				class="p-2"
			>
				<label text="Wyciskanie na klate" class="lato text-white text-lg" />
				<label text={`${benchPress} kg`} class="lato text-sky-600  text-lg" />
				<label text="Przysiad" class="lato text-white text-lg" />
				<label text={`${squat} kg`} class="lato text-sky-600  text-xl" />
				<label text="Martwy ciąg" class="lato text-white text-lg" />
				<label text={`${deadlift} kg`} class="lato text-sky-600  text-xl" />
			</flexBoxLayout>
		</flexBoxLayout>

		<button
			class="w-[80%] h-[10%] bg-sky-600 rounded-3xl text-center mx-5 p-5"
			on:tap={gotoArchive}
		>
			<formattedString>
				<span
					text="Zobacz archiwum treningów"
					class="text-white lato text-2xl font-normal"
				/>
			</formattedString>
		</button>

		<flexboxLayout
			flexDirection="row"
			justifyContent="space-around"
			alignSelf="flex-end"
			alignItems="center"
			class="bg-secound rounded-t-xl p-4"
		>
			<stackLayout class="w-1/3 -ml-3">
				<label
					text="&#xf201;"
					class="fas text-2xl text-white mx-auto text-center current-route"
				/>
				<label
					text="Statystyki"
					class="lato text-xs font-light text-white mt-1 text-center current-route"
				/>
			</stackLayout>
			<stackLayout class="w-1/3" on:tap={gotoMain}>
				<label text="&#xf015;" class="fas text-2xl text-white mx-auto text-center" />
				<label
					text="Strona główna"
					class="lato text-xs font-light text-white mt-1 text-center"
				/>
			</stackLayout>
			<stackLayout class="w-1/3" on:tap={gotoPlans}>
				<label text="&#xf46d;" class="fas text-2xl text-white mx-auto text-center" />
				<label text="Plany" class="lato text-xs font-light text-white mt-1 text-center" />
			</stackLayout>
		</flexboxLayout>
	</flexBoxLayout>
</page>
