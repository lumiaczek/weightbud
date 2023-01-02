<script lang="ts">
	import { navigate } from 'svelte-native';
	import Stats from '../Dashboard/Stats.svelte';
	import { CouchBase } from '@triniwiz/nativescript-couchbase';

	const userWorkouts = new CouchBase('userWorkouts');
	let workouts = userWorkouts.query({
		select: [],
		from: ''
	});

	userWorkouts.close();

	const onBack = () => {
		navigate({ page: Stats });
	};
</script>

<page actionBarHidden={true} class="h-screen bg-main">
	<stackLayout>
		<flexBoxLayout
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			class="bg-secound w-full p-4 h-[4rem]"
		>
			<label text="&#xf060;" class="text-white text-2xl pl-2 fas" on:tap={onBack} />
			<label text="Archiwum" class="text-white text-xl lato -ml-5 font-light" />
			<label text="" class="text-white text-xl lato" />
		</flexBoxLayout>
		<flexBoxLayout flexDirection="column" class="space-y-2">
			<scrollView orientation="vertical" class="w-full mt-2 bg-main h-full">
				<flexBoxLayout flexDirection="column" class="space-y-2 p-4">
					{#each workouts as workout}
						<stackLayout class="p-4 bg-secound rounded-xl">
							<flexBoxLayout
								flexDirection="row"
								justifyContent="space-between"
								alignItems="center"
								class="mb-2"
							>
								<label text={workout.name} class="text-2xl text-white" />
								<label
									text={`${parseInt((workout.czas / 60).toString())} minut`}
									class="text-xl text-grayText"
								/></flexBoxLayout
							>
							{#each workout.cwiczenia as e, i (i)}
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
												<flexBoxLayout
													flexDirection="row"
													alignItems="center"
												>
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
												<flexBoxLayout
													flexDirection="row"
													alignItems="center"
												>
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
							{/each}
						</stackLayout>
					{/each}
				</flexBoxLayout>
			</scrollView>
		</flexBoxLayout>
	</stackLayout>
</page>
