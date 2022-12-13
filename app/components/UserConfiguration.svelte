<script lang="ts">
	// sekcja importów
	import { navigate } from 'svelte-native';
	import StartScreen from './StartScreen.svelte';
	import Initialization from './Initialization.svelte';

	// routing
	const onBack = () => {
		navigate({ page: StartScreen });
	};

	// definicja danych użytkownika do bindingu
	let personData = {
		name: '',
		gender: '',
		height: '',
		weight: ''
	};

	// definicja kategorii błędów
	let errors = {
		nameError: false,
		genderError: false,
		weightError: false,
		heightError: false
	};

	// obsługa zmiany płci
	const changeSex = (name: string) => {
		switch (name) {
			case 'men':
				personData.gender = 'men';
				break;
			case 'women':
				personData.gender = 'women';
				break;
			default:
				personData.gender = '';
				break;
		}
	};

	// sprawdzanie danych a następnie
	const checkBeforeSend = () => {
		if (personData.name === '') {
			errors.nameError = true;
			setTimeout(() => {
				errors.nameError = false;
			}, 2000);
		}
		if (personData.weight === '') {
			errors.weightError = true;
			setTimeout(() => {
				errors.weightError = false;
			}, 2000);
		}
		if (personData.height === '') {
			errors.heightError = true;
			setTimeout(() => {
				errors.heightError = false;
			}, 2000);
		}

		if (
			personData.name === '' ||
			personData.weight === '' ||
			personData.gender === '' ||
			personData.height === ''
		) {
			return;
		}

		navigate({ page: Initialization, props: personData });
	};
</script>

<page actionBarHidden={true}>
	<gridLayout columns="45, *" rows="45, *" class="w-full h-screen bg-main pt-3 px-2">
		<label
			text="&#xf060;"
			class="rounded-full p-2 text-center text-white text-3xl fas w-[12%]"
			on:tap={onBack}
			col={0}
			row="0"
		/>
		<flexBoxLayout
			flexDirection="column"
			justifyContent="space-between"
			class="h-full w-full bg-main pt-4 px-4"
			col="0"
			row="1"
			rowSpan="full"
			colSpan="2"
		>
			<flexBoxLayout flexDirection="column">
				<label
					text="Podstawowe informacje"
					class="text-3xl text-white lato"
					alignSelf="center"
				/>
				<label
					text="Dzięki tym informacjom będę w stanie przygotować aplikacje specjalnie dla ciebie."
					class="text-base text-white text-center leading-none lato"
					textWrap="true"
				/>
			</flexBoxLayout>
			<flexBoxLayout flexDirection="row" justifyContent="space-around" class="mt-5">
				<flexBoxLayout
					class="bg-secound p-6 rounded-3xl"
					on:tap={() => {
						changeSex('men');
					}}
					class:current={personData.gender === 'men'}
				>
					<label
						text="&#xf222;"
						class="rounded-full p-2 px-5 text-center text-white text-8xl fas"
					/>
				</flexBoxLayout>
				<flexBoxLayout
					class="bg-secound p-6 rounded-3xl"
					on:tap={() => {
						changeSex('women');
					}}
					class:current={personData.gender === 'women'}
				>
					<label
						text="&#xf221;"
						class="rounded-full p-2 px-7 text-center  text-white text-8xl fas"
					/>
				</flexBoxLayout>
			</flexBoxLayout>

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
						<label text="&#xf06a" class="mt-1 text-red-500 mx-2 fas" />
						<label text="Proszę wprowadzić imię" class="mt-0.5 text-red-500" />
					</stackLayout>
				{/if}
			</stackLayout>
			<stackLayout>
				<flexBoxLayout flexDirection="row" justifyContent="space-between" class="mx-2 mt-2">
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
						<label text="&#xf06a" class="mt-1 text-red-500 mx-2 fas" />
						<label text="Proszę wprowadzić wzrost" class="mt-0.5 text-red-500" />
					</stackLayout>
				{/if}
			</stackLayout>
			<stackLayout>
				<flexBoxLayout flexDirection="row" justifyContent="space-between" class="mx-2 mt-2">
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
						<label text="&#xf06a" class="mt-1 text-red-500 mx-2 fas" />
						<label text="Proszę wprowadzić wagę" class="mt-0.5 text-red-500 " />
					</stackLayout>
				{/if}
			</stackLayout>
			<button
				class="rounded-3xl bg-red-500 mx-auto text-center px-4 py-2 my-8 w-3/4"
				on:tap={checkBeforeSend}
			>
				<formattedString>
					<span text="Dalej" class="text-white text-xl lato font-normal" />
				</formattedString>
			</button>
		</flexBoxLayout>
	</gridLayout>
</page>
