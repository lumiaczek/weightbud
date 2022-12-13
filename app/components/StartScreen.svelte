<script lang="ts">
	import UserConfiguration from './UserConfiguration.svelte';
	import { navigate } from 'svelte-native';

	const startConfig = () => {
		navigate({ page: UserConfiguration });
	};
</script>

<page actionBarHidden={true}>
	<flexBoxLayout flexDirection="column" class="h-screen bg-main" justifyContent="space-between">
		<label class="top-wave h-1/5 w-full" />
		<image src="~/img/picture.png" class="w-full h-[35%]" alignSelf="center" />
		<stackLayout class="bottom-wave h-1/3 w-full -mb-5 px-2">
			<label
				text="Witaj w WeightBud"
				class="text-white text-center mt-4 lato text-[34px] font-medium header"
			/>
			<label
				text="Zanim zaczniemy, powiedz mi nieco o sobie."
				class="text-white text-center text-[20px] mt-4 lato font-light tekst"
				textWrap={true}
			/>
			<button
				class="rounded-3xl bg-red-500 mx-auto text-center px-4 py-2 mt-7 w-3/4 button"
				on:tap={startConfig}
			>
				<formattedString>
					<span text="Zaczynajmy" class="text-white text-xl lato font-normal opacity" />
				</formattedString>
			</button>
		</stackLayout>
	</flexBoxLayout>
</page>

<style>
	.top-wave {
		background-image: url('~/img/waveTop.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}
</style>
