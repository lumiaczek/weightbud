import { readable } from 'svelte/store';

export const exercises = readable([
	{
		category: 'Klata',
		name: 'Bench Press',
		imgUrl: '~/img/exercise/Chest/bench-press-1.png'
	},
	{
		category: 'Klata',
		name: 'Wyciskanie hantli',
		imgUrl: '~/img/exercise/Chest/bench-press-dumbbell-2.png'
	},
	{
		category: 'Klata',
		name: 'Dips',
		imgUrl: '~/img/exercise/Chest/tricep-dips-using-body-weight-2.png'
	},
	{
		category: 'Barki',
		name: 'Lateral Raise',
		imgUrl: '~/img/exercise/Shoulders/lateral-dumbbell-raises-1.png'
	},
	{
		category: 'Barki',
		name: 'Dumbell front raise',
		imgUrl: '~/img/exercise/Shoulders/front-raises-1.png'
	},
	{
		category: 'Barki',
		name: 'Over Head Press',
		imgUrl: '~/img/exercise/Shoulders/barbell-shoulder-press-2.png'
	}
]);
