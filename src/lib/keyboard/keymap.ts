import { resolve } from '$app/paths';

/** routes reachable via `g` prefix, e.g. `gh` goes home */
export const gotoMap: Record<string, { href: string; label: string }> = {
	h: { href: resolve('/'), label: 'go home' },
	i: { href: resolve('/photos'), label: 'go to photos' },
	w: { href: resolve('/words'), label: 'go to words' }
};

/** drives the help overlay; keep in sync with the dispatcher in +layout.svelte */
export const bindings: { keys: string; description: string }[] = [
	{ keys: 'j / k', description: 'move selection / scroll' },
	{ keys: 'gg / G', description: 'top / bottom' },
	{ keys: '1-9', description: 'jump to item' },
	...Object.entries(gotoMap).map(([key, { label }]) => ({
		keys: `g${key}`,
		description: label
	})),
	{ keys: 'Enter', description: 'open selected' },
	{ keys: '?', description: 'toggle help' }
];
