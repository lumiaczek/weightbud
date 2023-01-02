import { readable } from 'svelte/store';

export const exercises = readable([
	{
		category: 'Klata',
		name: 'Bench Press',
		imgUrl: '~/img/exercise/Chest/bench-press-1.png'
	},
	{
		category: 'Klata',
		name: 'Dumbell press',
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
	},
	{
		category: 'Triceps',
		name: 'Skull Crushers',
		imgUrl: '~/img/exercise/Triceps/skull-crusher-2.png'
	},
	{
		category: 'Triceps',
		name: 'Triceps pushdown',
		imgUrl: '~/img/exercise/Triceps/triceps-pushdown.png'
	},
	{
		category: 'Plecy',
		name: 'Pullup',
		imgUrl: '~/img/exercise/Back/pull-ups-2.png'
	},
	{
		category: 'Plecy',
		name: 'Bent over row',
		imgUrl: '~/img/exercise/Back/barbell-rows-2.png'
	},
	{
		category: 'Plecy',
		name: 'V Bar pulldown',
		imgUrl: '~/img/exercise/Back/pull-down-2.png'
	},
	{
		category: 'Dolne plecy',
		name: 'Deadlift',
		imgUrl: '~/img/exercise/LowerBack/deadlift.png'
	},
	{
		category: 'Kaptury',
		name: 'Dumbell shrugs',
		imgUrl: '~/img/exercise/Traps/shrugs.png'
	},
	{
		category: 'Biceps',
		name: 'Barbell curl',
		imgUrl: '~/img/exercise/Biceps/barbell-curl.png'
	},
	{
		category: 'Biceps',
		name: 'Hammer curl',
		imgUrl: '~/img/exercise/Biceps/hammer-curls.png'
	},
	{
		category: 'Przedramiona',
		name: 'Reverse Curls',
		imgUrl: '~/img/exercise/Forearm/reverse-curls.png'
	},
	{
		category: 'Uda',
		name: 'Squat',
		imgUrl: '~/img/exercise/Quads/squat.png'
	},
	{
		category: 'Uda',
		name: 'Leg extensions',
		imgUrl: '~/img/exercise/Quads/leg-extensions.png'
	},
	{
		category: 'Łydki',
		name: 'Calf raises',
		imgUrl: '~/img/exercise/Calfs/calf-raise.png'
	},
	{
		category: 'ABS',
		name: 'Crunches',
		imgUrl: '~/img/exercise/ABS/crunches.png'
	},
	{
		category: 'ABS',
		name: 'Cable Crunches',
		imgUrl: '~/img/exercise/ABS/cable-crunch.png'
	}
]);
