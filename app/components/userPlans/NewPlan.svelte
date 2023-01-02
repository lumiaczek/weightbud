<script lang="ts">
	import { navigate } from 'svelte-native';
	import Plans from '../Dashboard/Plans.svelte';
	import CategoryChoose from './CategoryChoose.svelte';
	import planCache from './newPlanCache';
	import { confirm } from '@nativescript/core/ui/dialogs';
	import { CouchBase } from '@triniwiz/nativescript-couchbase';

	interface Cache {
		name: string;
		cwiczenia: any[];
	}

	let newPlan = {
		name: $planCache.name,
		cwiczenia: $planCache.cwiczenia
	};

	const onBack = () => {
		confirm({
			message: 'Jeżeli wyjdziesz, zmiany nie zostaną zapisane',
			okButtonText: 'Wyjdź',
			cancelButtonText: 'Zostań'
		}).then((res) => {
			if (res === true) {
				let obj: Cache = {
					name: 'Nowy plan',
					cwiczenia: []
				};
				planCache.set(obj);
				navigate({ page: Plans });
			}
		});
	};

	const applyPlan = () => {
		const userPlans = new CouchBase('userPlans');
		if (newPlan.cwiczenia.length === 0) {
			userPlans.close();
			return;
		}
		userPlans.createDocument(newPlan);
		userPlans.close();

		let obj: Cache = {
			name: 'Nowy plan',
			cwiczenia: []
		};

		planCache.set(obj);
		navigate({ page: Plans });
	};

	const gotoCategoryChoose = () => {
		navigate({ page: CategoryChoose });
	};
</script>

<page actionBarHidden={true}>
	<flexBoxLayout
		flexDirection="column"
		justifyContent="space-between"
		class="bg-main w-full h-full"
	>
		<flexBoxLayout
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			class="bg-secound w-full py-2 px-4 h-[16%]"
		>
			<label text="&#xf060;" class="text-white text-2xl p-2 fas" on:tap={onBack} />
			<textView
				class="w-[60%] bg-secound text-center -mt-12 self-end text-xl text-white lato font-light"
				bind:text={$planCache.name}
			/>
			<label
				text="&#xf0fe;"
				class="fas text-2xl text-white p-2"
				on:tap={gotoCategoryChoose}
			/>
		</flexBoxLayout>
		{#if newPlan.cwiczenia.length === 0}
			<flexBoxLayout
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				class="h-full w-full bg-main pt-4 px-4 space-y-2"
			>
				<label
					text="Dodaj nowe ćwiczenie przyciskiem u góry."
					textWrap="true"
					class="text-white font-light text-lg lato leading-tight text-center"
				/>
			</flexBoxLayout>
		{/if}
		{#if newPlan.cwiczenia.length !== 0}
			<flexBoxLayout flexDirection="column" class="h-full w-full bg-main pt-4 px-4 space-y-2">
				{#each newPlan.cwiczenia as plan, i (i)}
					<flexBoxLayout
						flexDirection="row"
						alignItems="center"
						class="bg-secound w-full py-4 px-2 rounded-3xl"
					>
						<image
							src={plan.imgURL}
							stretch="aspectFill"
							class="h-16 w-16 p-2 ml-4 mr-4"
						/>
						<stackLayout>
							<label text={plan.id} class="text-base text-white font-semibold lato" />
							<label
								text={`Serie: ${plan.serie}`}
								class="text-sm text-white font-light lato"
							/>
						</stackLayout>
					</flexBoxLayout>
				{/each}
				<button
					class="rounded-3xl bg-sky-600 mx-auto text-center px-4 -mt-10 py-2 w-3/4"
					on:tap={applyPlan}
				>
					<formattedString>
						<span text="Dodaj plan" class="text-white text-xl lato font-normal" />
					</formattedString>
				</button>
			</flexBoxLayout>
		{/if}
	</flexBoxLayout>
</page>
