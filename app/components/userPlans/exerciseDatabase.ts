import { readable } from 'svelte/store';

export const exercises = readable([
	{
		category: 'Klata',
		name: 'Wyciskanie sztangi',
		imgUrl: '~/img/exercise/Chest/bench-press-1.png'
	},
	{
		category: 'Klata',
		name: 'Wyciskanie hantli',
		imgUrl: '~/img/exercise/Chest/bench-press-dumbbell-2.png'
	},
	{
		category: 'Klata',
		name: 'Dipy',
		imgUrl: '~/img/exercise/Chest/tricep-dips-using-body-weight-2.png'
	},
	{
		category: 'Barki',
		name: 'Wznosy hantli na boki',
		imgUrl: '~/img/exercise/Shoulders/lateral-dumbbell-raises-1.png'
	},
	{
		category: 'Barki',
		name: 'Wznosy hantli do przodu',
		imgUrl: '~/img/exercise/Shoulders/front-raises-1.png'
	},
	{
		category: 'Barki',
		name: 'Wyciskanie sztangi nad głowe',
		imgUrl: '~/img/exercise/Shoulders/barbell-shoulder-press-2.png'
	}
]);
