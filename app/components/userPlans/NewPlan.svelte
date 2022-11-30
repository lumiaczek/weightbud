<script lang="ts">
	import { navigate } from "svelte-native";
	import Plans from "../Dashboard/Plans.svelte";
	import CategoryChoose from "./CategoryChoose.svelte";

    let newPlan = {
        name: 'Edytuj tytuł',
        exercises: []
    }

    const onBack = () => {
		navigate({ page: Plans });
	};

    const gotoCategoryChoose = () => {
        navigate({page: CategoryChoose})
    }
</script>

<page actionBarHidden={true}>
    <flexBoxLayout
    flexDirection="column"
    justifyContent="space-between"
    class="bg-main w-full h-full">
        <flexBoxLayout flexDirection="row" justifyContent="space-between" alignItems="center" class="bg-secound w-full py-2 px-4 h-[16%]">
            <label
                text="&#xf060;"
                class="text-white text-2xl fas"
                on:tap={onBack}
            />
            <textView
            class="w-[60%] bg-secound text-center -mt-12 self-end text-xl  text-white "
            bind:text={newPlan.name}
        />
            <label text="&#xf0fe;" class="fas text-2xl text-white" on:tap={gotoCategoryChoose}/>
        </flexBoxLayout>
        <flexBoxLayout
            flexDirection="column"
            class="h-full w-full bg-main pt-4 px-4 space-y-2"
        >

        </flexBoxLayout>
    </flexBoxLayout>
</page>
