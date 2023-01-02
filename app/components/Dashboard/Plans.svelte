<script lang="ts">
	import { SwipeGestureEventData } from '@nativescript/core/ui/gestures';
	import { CouchBase } from '@triniwiz/nativescript-couchbase';
	import { onMount } from 'svelte';
	import { navigate } from 'svelte-native';
	import Dashboard from '../Dashboard.svelte';
	import NewPlan from '../userPlans/NewPlan.svelte';
	import Stats from './Stats.svelte';
	import Overview from '../workout/Overview.svelte';
	import { confirm } from '@nativescript/core/ui/dialogs';

	// database connections
	const userPlans = new CouchBase('userPlans');

	// ----------

	let plans = userPlans.query({
		select: [],
		from: ''
	});

	$: plans;

	//functional data definition

	let showAddPlanButton: boolean = false;

	// checking if any plan exist
	onMount(() => {
		if (plans.length === 0) {
			showAddPlanButton = true;
		} else {
			showAddPlanButton = false;
		}
	});

	// routes
	const gotoMain = () => {
		navigate({ page: Dashboard });
	};
	const gotoStats = () => {
		navigate({ page: Stats });
	};

	const addNew = () => {
		navigate({ page: NewPlan });
	};

	// ----------

	const deletePlan = async (id: string) => {
		const userPlans = new CouchBase('userPlans');

		await confirm({
			message: 'Czy na pewno chcesz usunąć plan?',
			okButtonText: 'Usuń',
			cancelButtonText: 'Anuluj'
		}).then((res) => {
			if (res === true) {
				userPlans.deleteDocument(id);
			}
		});

		plans = userPlans.query({
			select: [],
			from: ''
		});

		if (plans.length === 0) {
			showAddPlanButton = true;
		}

		userPlans.close();

		return;
	};

	userPlans.close(); //closing database for safety

	const gotoOverview = (id: string) => {
		let data = { id: id };
		navigate({ page: Overview, props: data });
	};

	const onSwipe = (args: SwipeGestureEventData) => {
		switch (args.direction) {
			case 1:
				gotoMain();
				break;
			default:
				return;
		}
	};
</script>

<page actionBarHidden={true} class="h-full" on:swipe={onSwipe}>
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
			class:plans-head={plans.length >= 5}
		>
			<label text="Plany" class="text-2xl lato text-white font-light" />
			<label text="&#xf0fe;" class="fas text-2xl text-white" on:tap={addNew} />
		</flexBoxLayout>

		{#if showAddPlanButton}
			<stackLayout>
				<label text="Ups..." class="text-center text-2xl lato text-white font-normal" />
				<label
					text="Wygląda na to że nie masz żadnych planów."
					class="text-center lato text-white font-light text-base"
				/>
				<button
					class="w-[80%] bg-sky-600 rounded-3xl text-center mx-5 px-4 py-3 mt-5"
					on:tap={addNew}
				>
					<formattedString>
						<span
							text="Stwórz nowy plan"
							class="text-white lato text-2xl font-normal"
						/>
					</formattedString>
				</button>
			</stackLayout>
		{/if}

		{#if !showAddPlanButton}
			<scrollView orientation="vertical" class="w-full mt-2" on:swipe={onSwipe}>
				<flexBoxLayout flexDirection="column">
					{#each plans as plan, i (plan.id)}
						<flexBoxLayout
							flexDirection="row"
							alignItems="center"
							justifyContent="space-between"
							class="mb-4 bg-secound p-4"
						>
							<flexBoxLayout
								flexDirection="row"
								alignItems="center"
								on:tap={() => {
									gotoOverview(plan.id);
								}}
							>
								<label
									text={plan.name.slice(0, 2).toUpperCase()}
									class="text-3xl p-4 rounded-full text-white lato bg-sky-600 w-18"
								/>
								<flexBoxLayout flexDirection="column" class="p-4 leading-tight">
									<label
										text={plan.name}
										class="text-2xl rounded-full text-white lato "
									/>
									<label
										text={`Ilość ćwiczeń: ${plan.cwiczenia.length}`}
										class="text-xl text-white font-light lato"
									/>
								</flexBoxLayout>
							</flexBoxLayout>
							<label
								text="&#xf2ed;"
								class="text-white fas text-xl"
								on:tap={() => {
									deletePlan(plan.id);
								}}
							/>
						</flexBoxLayout>
					{/each}
				</flexBoxLayout>
			</scrollView>
		{/if}
		<flexboxLayout
			flexDirection="row"
			justifyContent="space-around"
			alignItems="center"
			class="bg-secound rounded-t-xl py-4 z-50"
			class:navPlans={!showAddPlanButton}
			class:nav-plans={plans.length >= 5}
		>
			<stackLayout class="w-1/3 mt-px" on:tap={gotoStats}>
				<label text="&#xf201;" class="fas text-2xl text-white mx-auto text-center" />
				<label
					text="Statystyki"
					class="lato text-xs font-light text-white mt-1 text-center"
				/>
			</stackLayout>
			<stackLayout class="w-1/3 mt-px" on:tap={gotoMain}>
				<label text="&#xf015;" class="fas text-2xl text-white mx-auto text-center" />
				<label
					text="Strona główna"
					class="lato text-xs font-light text-white mt-1 text-center"
				/>
			</stackLayout>
			<stackLayout class="w-1/3 -mr-px">
				<label
					text="&#xf46d;"
					class="fas text-2xl text-white mx-auto text-center current-route"
				/>
				<label
					text="Plany"
					class="lato text-xs font-light text-white mt-1 text-center current-route"
				/>
			</stackLayout>
		</flexboxLayout>
	</flexBoxLayout>
</page>
