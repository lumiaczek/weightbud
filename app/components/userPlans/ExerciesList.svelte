<script lang="ts">
	import { navigate } from 'svelte-native';
	import CategoryChoose from './CategoryChoose.svelte';
	import { CouchBase } from '@triniwiz/nativescript-couchbase';
	import ExerciseAdd from './ExerciseAdd.svelte';

	const exerciseDatabase = new CouchBase('exerciseDatabase');

	export let name = '';

	const exerciseList = exerciseDatabase.query({
		select: [],
		from: '',
		where: [{ property: 'category', comparison: 'equalTo', value: name }]
	});

	exerciseDatabase.close();

	const onBack = () => {
		navigate({ page: CategoryChoose });
	};

	const onAdd = (id: string) => {
		let obj = {
			id: id,
			cat: name
		};
		navigate({ page: ExerciseAdd, props: obj });
	};
</script>

<page actionBarHidden={true} class="bg-main">
	<stackLayout>
		<flexBoxLayout
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			class="bg-secound w-full p-4 h-[8%]"
		>
			<label text="&#xf060;" class="text-white text-2xl pl-2 fas" on:tap={onBack} />
			<label text={name} class="text-white text-xl lato text-center" />
			<label text="" class="text-white text-xl lato text-center" />
		</flexBoxLayout>
		<flexBoxLayout flexDirection="column" alignItems="center" class="space-y-2 p-2">
			{#each exerciseList as exercise, i (exercise.id)}
				<flexBoxLayout
					flexDirection="row"
					alignItems="center"
					class="bg-secound w-full py-4 px-2"
				>
					<image src={exercise.imgUrl} stretch="aspectFill" class="h-16 w-16 p-2 ml-4" />
					<flexBoxLayout
						flexDirection="row"
						class="justify-between items-center mr-4 ml-4 w-[70%]"
					>
						<label
							text={exercise.name}
							class="text-lg text-white lato leading-tight"
							textWrap={true}
						/>
						<label
							text="&#xf055"
							class="text-xl text-white fas"
							on:tap={() => {
								onAdd(exercise.id);
							}}
						/>
					</flexBoxLayout>
				</flexBoxLayout>
			{/each}
		</flexBoxLayout>
	</stackLayout>
</page>
