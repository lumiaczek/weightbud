<script lang="ts">
	import { confirm } from '@nativescript/core';
	import { CouchBase } from '@triniwiz/nativescript-couchbase';
	import cache from './workoutCache';
	import Dashboard from '../Dashboard.svelte';
	import { navigate } from 'svelte-native';

	let sekundy = 0;
	let minuty = 0;

	const timer = () => {
		setInterval(() => {
			$cache.czas++;

			sekundy++;

			if (sekundy === 60) {
				minuty++;

				sekundy = 0;
			}
		}, 1000);
	};

	const end = () => {
		confirm({
			message: 'Czy chcesz zakończyć trening?',
			okButtonText: 'Zakończ',
			cancelButtonText: 'Anuluj'
		}).then((res) => {
			if (res === true) {
				const userWorkouts = new CouchBase('userWorkouts');

				userWorkouts.createDocument($cache);

				navigate({ page: Dashboard });
			}
		});
	};

	timer();
</script>

<page actionBarHidden={true} class="h-full">
	<flexBoxLayout flexDirection="column" class="bg-main w-full h-full">
		<flexBoxLayout
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			class="bg-secound w-full py-2 px-4 h-16"
		>
			<label text="&#xf057;" class="text-white text-2xl p-2 fas" on:tap={end} />
			<label text={$cache.name} class="text-2xl lato text-white font-light " />
			<label text={`${minuty}:${sekundy}`} class="text-2xl lato text-white font-normal" />
		</flexBoxLayout>
		<scrollView orientation="vertical" class="w-full mt-2">
			<flexBoxLayout flexDirection="column" class="space-y-2">
				{#each $cache.cwiczenia as e, i (i)}
					<flexBoxLayout flexDirection="column">
						<flexBoxLayout
							flexDirection="row"
							alignItems="center"
							class="bg-secound w-full py-4 px-2"
						>
							<image
								src={e.imgURL}
								stretch="aspectFill"
								class="h-16 w-16 p-2 ml-4 mr-4"
							/>
							<stackLayout>
								<label
									text={e.name}
									class="text-base text-white font-semibold lato"
								/>
							</stackLayout>
						</flexBoxLayout>
						<flexBoxLayout flexDirection="row" class="w-full bg-secound pb-4 px-2 pt-2">
							<flexBoxLayout flexDirection="column" class="w-2/3">
								{#each e.powtorzenia as rep, i (i)}
									<flexBoxLayout flexDirection="row" alignItems="center">
										<label
											text={`Seria: ${i + 1}`}
											class="lato text-2xl text-white text-center ml-3"
										/>
										<textView
											bind:text={rep}
											keyboardType="number"
											class="lato text-2xl text-center text-white ml-9"
										/>
										<label
											text=" rep"
											class="lato text-2xl text-center text-white"
										/>
									</flexBoxLayout>
								{/each}
							</flexBoxLayout>
							<flexBoxLayout flexDirection="column" class="w-1/3">
								{#each e.waga as weight, i (i)}
									<flexBoxLayout flexDirection="row" alignItems="center">
										<textView
											bind:text={weight}
											keyboardType="number"
											class="lato text-2xl text-center text-white"
										/>
										<label
											text=" kg"
											class="lato text-2xl text-center text-white"
										/>
									</flexBoxLayout>
								{/each}
							</flexBoxLayout>
						</flexBoxLayout>
					</flexBoxLayout>
				{/each}
			</flexBoxLayout>
		</scrollView>
	</flexBoxLayout>
</page>
