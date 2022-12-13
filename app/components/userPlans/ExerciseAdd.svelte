<script lang="ts">
	import { navigate } from 'svelte-native';
	import ExerciesList from './ExerciesList.svelte';
	import { CouchBase } from '@triniwiz/nativescript-couchbase';
	import planCache from './newPlanCache';
	import NewPlan from './NewPlan.svelte';

	const exerciseDatabase = new CouchBase('exerciseDatabase');

	export let id = '';
	export let cat = '';

	interface Cache {
		name: string;
		cwiczenia: any[];
	}

	const onBack = () => {
		let obj = {
			name: cat
		};
		navigate({ page: ExerciesList, props: obj });
	};

	let cwiczenie = exerciseDatabase.getDocument(id);
	exerciseDatabase.close();

	let serie: number = 0;
	let error: boolean = false;
	let blank: any[] = [];

	const addSerie = () => {
		if (serie !== 5) {
			blank = [...blank, null];
			serie++;
			return;
		}
		error = true;
		setTimeout(() => {
			error = false;
		}, 2000);
		return;
	};

	const deleteSerie = (i: number) => {
		blank.splice(i, 1);
		blank = [...blank];
		serie--;
	};

	const addPlan = () => {
		if (blank.length === 0) {
			return;
		}

		let name = $planCache.name;
		let cwiczenia = $planCache.cwiczenia;
		let exercise = { serie: serie, id: id, imgURL: cwiczenie.imgUrl };
		cwiczenia = [...cwiczenia, exercise];

		const obj: Cache = {
			name: name,
			cwiczenia: cwiczenia
		};

		planCache.set(obj);

		serie = 0;

		navigate({ page: NewPlan });
	};
</script>

<page actionBarHidden={true} class="bg-main">
	<stackLayout>
		<flexBoxLayout
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			class="bg-secound w-full p-4 h-[4rem]"
		>
			<label text="&#xf060;" class="text-white text-2xl pl-2 fas" on:tap={onBack} />
			<label text={cwiczenie.name} class="text-white text-xl lato text-center" />
			<label text="&#xf00c" class="text-white text-2xl pr-2 fas " on:tap={addPlan} />
		</flexBoxLayout>
		<stackLayout>
			<image src={cwiczenie.imgUrl} stretch="aspectFill" class="h-[45%] w-full" />
			<stackLayout class="w-full bg-secound p-2 ">
				<flexBoxLayout
					flexDirection="row"
					class="w-full"
					justifyContent="space-between"
					alignItems="center"
				>
					<flexBoxLayout
						flexDirection="row"
						justifyContent="space-between"
						class="w-full"
						alignItems="center"
					>
						<label text="Dodaj serie:" class="text-xl lato text-white font-semibold" />
						<label
							text="&#xf00c"
							class="text-xl fas text-white font-semibold p-2"
							on:tap={addSerie}
						/>
					</flexBoxLayout>
					{#if error}
						<label
							text="Ilość serii nie może być większa niż 5"
							class="lato font-light text-sm text-red-500"
						/>
					{/if}
				</flexBoxLayout></stackLayout
			>

			<flexBoxLayout flexDirection="column" class="mt-4 space-y-1">
				{#each blank as exr, i (i)}
					<flexBoxLayout
						flexDirection="row"
						alignItems="center"
						justifyContent="space-between"
						class="p-2 bg-secound"
					>
						<label
							text={`Seria ${i + 1}`}
							class="text-xl text-white lato font-semibold ml-2"
						/>
						<label
							text="&#xf057"
							class="text-2xl text-red-500 fas font-semibold ml-2"
							on:tap={() => {
								deleteSerie(i);
							}}
						/>
					</flexBoxLayout>
				{/each}
			</flexBoxLayout>
		</stackLayout>
	</stackLayout>
</page>
