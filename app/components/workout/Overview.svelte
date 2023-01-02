<script lang="ts">
	import { confirm } from '@nativescript/core/ui/dialogs';
	import { CouchBase } from '@triniwiz/nativescript-couchbase';
	import { navigate } from 'svelte-native';
	import Plans from '../Dashboard/Plans.svelte';
	import Workout from './Workout.svelte';
	import cache from './workoutCache';

	type Lista = {
		name: string;
		imgURL: string;
		serie: number;
		powtorzenia: any[];
		waga: any[];
	};

	export let id;

	const userPlans = new CouchBase('userPlans');

	let workout = userPlans.getDocument(id);

	userPlans.close();

	const onBack = () => {
		navigate({ page: Plans });
	};

	const startWorkout = () => {
		let workoutCache: any = {
			name: workout.name,
			cwiczenia: [],
			czas: 0
		};

		workout.cwiczenia.forEach((e: any) => {
			let lista: Lista = {
				name: e.id,
				imgURL: e.imgURL,
				serie: e.serie,
				powtorzenia: [],
				waga: []
			};

			for (let i = 1; i <= e.serie; i++) {
				lista.powtorzenia.push(10);
				lista.waga.push(0);
			}

			workoutCache.cwiczenia.push(lista);
		});

		cache.set(workoutCache);
		console.log(workoutCache);

		navigate({ page: Workout });
	};
</script>

<page actionBarHidden={true} class="h-full">
	<flexBoxLayout flexDirection="column" class="bg-main w-full h-full">
		<flexBoxLayout
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			class="bg-secound w-full py-2 px-4"
			class:nav-overview={workout.cwiczenia.length > 6}
		>
			<label text="&#xf060;" class="text-white text-2xl p-2 fas" on:tap={onBack} />
			<label text={workout.name} class="text-2xl mr-8 lato text-white font-light" />
			<label text="" class="text-2xl lato text-white font-normal" />
		</flexBoxLayout>
		<button
			class="rounded-3xl bg-sky-600 text-center mx-4 px-6 mt-2 h-[15%] py-4 w-3/4"
			class:button-overview={workout.cwiczenia.length < 6}
			on:tap={startWorkout}
		>
			<formattedString>
				<span text="Rozpocznij trening" class="text-white text-xl lato font-normal" />
			</formattedString>
		</button>
		<scrollView orientation="vertical" class="w-full mt-2">
			<flexBoxLayout flexDirection="column" class="space-y-2">
				{#each workout.cwiczenia as exercise, i (i)}
					<flexBoxLayout
						flexDirection="row"
						alignItems="center"
						class="bg-secound w-full py-4 px-2"
					>
						<image
							src={exercise.imgURL}
							stretch="aspectFill"
							class="h-16 w-16 p-2 ml-4 mr-4"
						/>
						<stackLayout>
							<label
								text={exercise.id}
								class="text-base text-white font-semibold lato"
							/>
							<label
								text={`Serie: ${exercise.serie}`}
								class="text-sm text-white font-light lato"
							/>
						</stackLayout>
					</flexBoxLayout>
				{/each}
			</flexBoxLayout>
		</scrollView>
	</flexBoxLayout>
</page>
