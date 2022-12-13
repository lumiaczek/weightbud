<script lang="ts">
	import { navigate } from 'svelte-native';
	import ExerciesList from './ExerciesList.svelte';
	import NewPlan from './NewPlan.svelte';

	const categories = [
		{
			name: 'Klata'
		},
		{
			name: 'Barki'
		},
		{
			name: 'Triceps'
		},
		{
			name: 'Plecy'
		},
		{
			name: 'Dolne plecy'
		},
		{
			name: 'Kapury'
		},
		{
			name: 'Biceps'
		},
		{
			name: 'Uda'
		},
		{
			name: 'Łydki'
		},
		{
			name: 'ABS'
		}
	];

	const onBack = () => {
		navigate({ page: NewPlan });
	};

	const gotoCategory = (name: object) => {
		navigate({ page: ExerciesList, props: name });
	};
</script>

<page actionBarHidden={true} class="bg-main">
	<stackLayout>
		<flexBoxLayout
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			class="bg-secound w-full p-4 h-[8%]"
			on:tap={onBack}
		>
			<label text="&#xf060;" class="text-white pl-2 text-2xl fas" />
			<label
				text="Wybierz kategorie"
				class="text-white text-xl text-center lato mr-4"
				on:tap={onBack}
			/>
			<label text="" class="text-white text-xl lato text-center" />
		</flexBoxLayout>
		<scrollView orientation="vertical" class="w-full mt-2 bg-main h-full">
			<flexBoxLayout flexDirection="column" class="space-y-2 p-4">
				{#each categories as category}
					<label
						text={category.name}
						class="text-2xl text-white text-center p-4 bg-secound"
						on:tap={() => {
							gotoCategory(category);
						}}
					/>
				{/each}
			</flexBoxLayout>
		</scrollView>
	</stackLayout>
</page>
