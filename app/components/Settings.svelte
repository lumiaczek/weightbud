<script lang="ts">
	import { clear } from '@nativescript/core/application-settings';
	import { CouchBase } from '@triniwiz/nativescript-couchbase';
	import { navigate } from 'svelte-native';
	import StartScreen from './StartScreen.svelte';
	import Dashboard from './Dashboard.svelte';
	import { confirm } from '@nativescript/core/ui/dialogs';
	import { exit } from 'nativescript-exit';

	const userSettings = new CouchBase('userSettings');
	const userPlans = new CouchBase('userPlans');
	const exerciseDatabase = new CouchBase('exerciseDatabase');
	const userWorkouts = new CouchBase('userWorkouts');

	const personData = userSettings.getDocument('personData');

	let errors = {
		nameError: false,
		genderError: false,
		weightError: false,
		heightError: false
	};

	const saveData = () => {
		let status = true;
		if (personData.name === '' || personData.name.length > 18) {
			errors.nameError = true;
			setTimeout(() => {
				errors.nameError = false;
			}, 2000);
			status = false;
		}
		if (
			personData.weight === '' ||
			Number(personData.weight) > 500 ||
			Number(personData.weight) < 30
		) {
			errors.weightError = true;
			setTimeout(() => {
				errors.weightError = false;
			}, 2000);
			status = false;
		}
		if (
			personData.height === '' ||
			Number(personData.height) > 300 ||
			Number(personData.height) < 50
		) {
			errors.heightError = true;
			setTimeout(() => {
				errors.heightError = false;
			}, 2000);
			status = false;
		}

		if (status === false) {
			return;
		}

		userSettings.updateDocument('personData', personData);
		userSettings.close();
	};

	const onBack = () => {
		navigate({ page: Dashboard });
	};

	const resetData = () => {
		const destroy = async () => {
			userSettings.destroyDatabase();
			userSettings.close();
			userPlans.destroyDatabase();
			userPlans.close();
			exerciseDatabase.destroyDatabase();
			exerciseDatabase.close();
			userWorkouts.destroyDatabase();
			userWorkouts.close();
			clear();
		};

		confirm({
			message:
				'Czy na pewno chcesz usunąć wszystkie dane? UWAGA: Reset danych wymusi wyłączenie aplikacji',
			okButtonText: 'Tak',
			cancelButtonText: 'Nie'
		}).then(async (res) => {
			if (res === true) {
				await destroy().then(() => {
					navigate({ page: StartScreen });
					exit();
				});
			}
		});
	};
</script>

<page actionBarHidden={true} class="bg-main h-full">
	<flexBoxLayout flexDirection="column" alignItems="center" class="w-full h-full">
		<flexBoxLayout
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			class="w-full bg-secound py-2 px-4"
		>
			<label text="&#xf060;" class="text-white text-2xl p-2 fas" on:tap={onBack} />
			<label text="Ustawienia" class="text-2xl lato mr-5 text-white font-light" />
			<label text="" class="text-white text-2xl p-2 fas" />
		</flexBoxLayout>
		<flexBoxLayout
			flexDirection="column"
			alignItems="center"
			justifyContent="space-between"
			class="h-[90%]"
		>
			<flexBoxLayout flexDirection="column" alignItems="center" class="px-4">
				<stackLayout class="mt-3">
					<flexBoxLayout flexDirection="row" justifyContent="space-between" class="mx-2">
						<label text="Imię" class="text-lg text-white text-left lato" />
						<label text="" class="text-lg text-grayText text-right lato" />
					</flexBoxLayout>
					<textView
						class="bg-secound w-full text-center text-3xl px-4 pb-2 mt-1 text-white rounded-3xl"
						bind:text={personData.name}
					/>
					{#if errors.nameError}
						<stackLayout orientation="horizontal">
							<label text="&#xf06a" class="mt-1 text-sky-600 mx-2 fas" />
							<label
								text="Proszę wprowadzić prawidłowe imię"
								class="mt-0.5 text-sky-600"
							/>
						</stackLayout>
					{/if}
				</stackLayout>
				<stackLayout>
					<flexBoxLayout
						flexDirection="row"
						justifyContent="space-between"
						class="mx-2 mt-2"
					>
						<label text="Wzrost" class="text-lg text-white text-left lato" />
						<label text="cm" class="text-lg text-grayText text-right lato" />
					</flexBoxLayout>
					<textView
						class="bg-secound w-full text-center text-3xl px-4 pb-2 mt-1 text-white rounded-3xl"
						keyboardType="number"
						bind:text={personData.height}
					/>
					{#if errors.heightError}
						<stackLayout orientation="horizontal">
							<label text="&#xf06a" class="mt-1 text-sky-600 mx-2 fas" />
							<label
								text="Proszę wprowadzić prawidłowy wzrost"
								class="mt-0.5 text-sky-600"
							/>
						</stackLayout>
					{/if}
				</stackLayout>
				<stackLayout>
					<flexBoxLayout
						flexDirection="row"
						justifyContent="space-between"
						class="mx-2 mt-2"
					>
						<label text="Waga" class="text-lg text-white text-left lato" />
						<label text="kg" class="text-lg text-grayText text-right lato" />
					</flexBoxLayout>
					<textView
						class="bg-secound w-full text-center text-3xl px-4 pb-2 mt-1 text-white rounded-3xl"
						keyboardType="number"
						bind:text={personData.weight}
					/>
					{#if errors.weightError}
						<stackLayout orientation="horizontal">
							<label text="&#xf06a" class="mt-1 text-sky-600 mx-2 fas" />
							<label
								text="Proszę wprowadzić prawidłową wagę"
								class="mt-0.5 text-sky-600 "
							/>
						</stackLayout>
					{/if}
				</stackLayout>
				<button
					text="Zapisz dane"
					on:tap={saveData}
					class="w-[80%] bg-sky-600 rounded-3xl text-center mt-6 text-white text-lg mx-5 p-5"
				/>
			</flexBoxLayout>
			<stackLayout class="border-4 border-red-500 pb-6 pt-2 rounded-3xl bg-secound">
				<label text="Strefa zagrożenia" class=" ml-6 lato text-lg text-red-500 mb-2" />
				<button
					text="Zresetuj dane"
					on:tap={resetData}
					class="w-[80%] bg-red-500 rounded-3xl text-center text-white text-lg mx-5 p-5"
				/>
			</stackLayout>
		</flexBoxLayout>
	</flexBoxLayout>
</page>
