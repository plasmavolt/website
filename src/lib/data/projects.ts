export interface Project {
	name: string;
	ext: string;
	href: string;
	description: string;
}

export const projects: Project[] = [
	{
		name: 'chip-8',
		ext: '.rs',
		href: 'https://github.com/plasmavolt/chip-8',
		description: 'a CHIP-8 emulator'
	},
	{
		name: 'lean4-dag',
		ext: '.lean',
		href: 'https://github.com/plasmavolt/lean4-dag',
		description: 'formalization of DAG theory (wip)'
	},
	{
		name: 'wiki-racer',
		ext: '.py',
		href: 'https://github.com/plasmavolt/wiki-racer',
		description: 'finds short paths between wikipedia pages the way a human would'
	},
	{
		name: 'nixfiles',
		ext: '.nix',
		href: 'https://github.com/plasmavolt/nixfiles',
		description: 'my nixos config'
	}
];
