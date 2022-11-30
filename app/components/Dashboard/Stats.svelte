<script lang="ts">
	import { SwipeGestureEventData } from "@nativescript/core/ui/gestures";
	import { navigate } from "svelte-native";
    import Dashboard from "../Dashboard.svelte";
    import Plans from "./Plans.svelte";

    const gotoMain = () => {
        navigate({page: Dashboard})
    }
    const gotoPlans = () => {
        navigate({page: Plans})
    }

    const onSwipe = (args:SwipeGestureEventData) => {
        switch(args.direction){
            case 2:
                gotoMain();
            break;
            default:
                return;
            break;
        }
    }
</script>
<page actionBarHidden={true} class="h-screen" on:swipe={onSwipe}>
    <flexBoxLayout flexDirection="column" justifyContent="space-between" class="bg-main w-full h-full pt-6">
        <label text="" />
    <flexboxLayout flexDirection="row" justifyContent="space-around" alignSelf="flex-end" alignItems="center" class="bg-secound rounded-t-xl p-4">
        <stackLayout class="w-1/3 -ml-3" >
            <label text="&#xf201;" class="fas text-2xl text-white mx-auto text-center current-route" />
            <label text="Statystyki" class="lato text-xs font-light text-white mt-1 text-center current-route"  />
        </stackLayout>
        <stackLayout class="w-1/3" on:tap={gotoMain}> 
            <label text="&#xf015;" class="fas text-2xl text-white mx-auto text-center" />
            <label text="Strona główna" class="lato text-xs font-light text-white mt-1 text-center"   />
        </stackLayout>
        <stackLayout class="w-1/3" on:tap={gotoPlans}>
            <label text="&#xf46d;" class="fas text-2xl text-white mx-auto text-center" />
            <label text="Plany" class="lato text-xs font-light text-white mt-1 text-center"  />
        </stackLayout>
    </flexboxLayout>
    </flexBoxLayout>
</page>