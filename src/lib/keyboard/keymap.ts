import { resolve } from '$app/paths';

/** routes reachable via `g` prefix, e.g. `gi` goes to photos */
export const gotoMap: Record<string, { href: string; label: string }> = {
	i: { href: resolve('/photos'), label: 'go to photos' },
	w: { href: resolve('/words'), label: 'go to words' }
};

/** drives the help overlay; keep in sync with the dispatcher in nav.ts */
export const bindings: { keys: string; description: string }[] = [
	{ keys: 'j / k', description: 'move selection / scroll' },
	{ keys: 'l / Enter', description: 'open selected' },
	{ keys: 'h', description: 'go home' },
	{ keys: 'gg / G', description: 'top / bottom' },
	{ keys: '1-9', description: 'jump to item' },
	...Object.entries(gotoMap).map(([key, { label }]) => ({
		keys: `g${key}`,
		description: label
	})),
	{ keys: '?', description: 'toggle help' }
];
