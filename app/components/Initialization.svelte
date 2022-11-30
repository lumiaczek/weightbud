<script lang="ts">
    import { CouchBase } from '@triniwiz/nativescript-couchbase';
	import { onMount } from 'svelte';
	import { navigate } from 'svelte-native';
    import Dashboard from './Dashboard.svelte';
    import { setBoolean, hasKey } from '@nativescript/core/application-settings';
    import { exercises } from './userPlans/exerciseDatabase';

    export let name = '';
    export let gender = '';
    export let weight = '';
    export let height = '';

    const init = async () => {
        const userSettings = new CouchBase('userSettings');
        const exerciseDatabase = new CouchBase('exerciseDatabase')
        
        if(!hasKey('personDataSetted')){
            await userSettings.createDocument({
                name: name,
                gender: gender,
                weight: weight,
                height: height,
                weightArchive: [],
                weightDates: []
            }, 'personData');

            const databaseStartup = async () =>{
                $exercises.forEach(e => {
                    exerciseDatabase.createDocument(e, e.name);
                });
            }

            await databaseStartup();

            setBoolean('personDataSetted', true);
        }
        userSettings.close();
        exerciseDatabase.close();
        return;

    };

    onMount(async () => {
        await init();
        navigate({page: Dashboard});
    })

</script>

<page actionBarHidden={true}>
    <flexBoxLayout class="h-full w-full p-6 bg-main" justifyContent="center" flexDirection="column" alignItems="center">
        <label text="Trwa inicjalizacja aplikacji..." class="text-2xl text-center lato text-white font-medium leading-tight" textWrap="true"/>
        <label text="Prosimy o nie opuszczanie tego okna." class="text-base text-center lato text-white font-light leading-tight" textWrap="true"/>
        <label text="&#xf013;" class="fas text-6xl mt-4 text-red-500 spinner"/>
    </flexBoxLayout>
</page>


