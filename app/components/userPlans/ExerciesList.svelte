<script lang="ts">
	import { navigate } from "svelte-native";
    import CategoryChoose from "./CategoryChoose.svelte";
    import { CouchBase } from "@triniwiz/nativescript-couchbase";

    const exerciseDatabase = new CouchBase('exerciseDatabase')

    export let name = '';

    const exerciseList = exerciseDatabase.query({
        select: [],
        from: '',
        where: [{property: 'category', comparison: 'equalTo', value: name}]
    })

    const onBack = () => {
		navigate({ page: CategoryChoose });
	};

    exerciseDatabase.close();

</script>

<page actionBarHidden={true} class="bg-main">
    <stackLayout>
        <flexBoxLayout
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        class="bg-secound w-full p-4 h-[8%]"
        >
        <label text="&#xf060;" class="text-white text-2xl fas" on:tap={onBack} />
        <label text={name} class="text-white text-xl lato text-center" />
        <label text="" class="text-white text-xl lato text-center" />
        </flexBoxLayout>
        <flexBoxLayout flexDirection="column" alignItems="center" class="space-y-2 p-4">
            {#each exerciseList as exercise, i (exercise.id)}
                <flexBoxLayout flexDirection="row" alignItems="center" class="bg-secound w-[95%] p-4 rounded-3xl">
                    <image src={exercise.imgUrl} stretch="aspectFill" class="h-16 w-16 p-2 ml-4"/>
                    <flexBoxLayout flexDirection="column" class="mr-4 ml-5 w-[55%]">
                        <label text={exercise.name} class="text-xl text-white lato leading-tight" textWrap={true}/>
                        <button class="bg-red-600 py-2 px-6 w-[20%] h-[20%]">
                            <formattedString>
                                <span text={"Dodaj do planu"} class="text-white"/>
                            </formattedString>
                        </button>
                    </flexBoxLayout>
                </flexBoxLayout>
            {/each}
        </flexBoxLayout>
    </stackLayout>
</page>