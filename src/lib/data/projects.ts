export interface Project {
	name: string;
	href: string;
	description: string;
	lang: string;
}

export const projects: Project[] = [
	{
		name: 'chip-8',
		href: 'https://github.com/plasmavolt/chip-8',
		description: 'a CHIP-8 emulator',
		lang: 'rust'
	},
	{
		name: 'lean4-dag',
		href: 'https://github.com/plasmavolt/lean4-dag',
		description: 'formalization of DAG theory (wip)',
		lang: 'lean'
	},
	{
		name: 'wiki-racer',
		href: 'https://github.com/plasmavolt/wiki-racer',
		description: 'finds short paths between wikipedia pages the way a human would',
		lang: 'python'
	},
	{
		name: 'nixfiles',
		href: 'https://github.com/plasmavolt/nixfiles',
		description: 'my nixos config',
		lang: 'nix'
	}
];
