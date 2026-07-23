import { goto } from '$app/navigation';
import { gotoMap } from './keymap';

const items = new Set<HTMLElement>();

/** svelte action: marks an element as reachable via j/k */
export function kbItem(node: HTMLElement) {
	node.dataset.kb = '';
	items.add(node);
	return {
		destroy() {
			items.delete(node);
		}
	};
}

function sorted(): HTMLElement[] {
	return [...items].sort((a, b) =>
		a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
	);
}

function select(el: HTMLElement) {
	el.focus({ preventScroll: true });
	el.scrollIntoView({ block: 'nearest' });
}

function move(delta: number) {
	const list = sorted();
	if (list.length === 0) {
		window.scrollBy({ top: delta * 120 });
		return;
	}
	const current = list.findIndex((el) => el === document.activeElement);
	if (current === -1) {
		select(list[delta > 0 ? 0 : list.length - 1]);
	} else {
		select(list[Math.min(Math.max(current + delta, 0), list.length - 1)]);
	}
}

function isEditable(target: EventTarget | null): boolean {
	if (!(target instanceof HTMLElement)) return false;
	return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
}

const SEQUENCE_TIMEOUT_MS = 800;
let pending: { key: string; at: number } | null = null;

/** pure-ish sequence step, split out so it's unit-testable */
export function resolveKey(
	key: string,
	prev: string | null
): { action: string | null; pending: string | null } {
	if (prev === 'g') {
		if (key === 'g') return { action: 'top', pending: null };
		if (key in gotoMap) return { action: `goto:${key}`, pending: null };
		return { action: null, pending: null };
	}
	if (key === 'g') return { action: null, pending: 'g' };
	if (key === 'G') return { action: 'bottom', pending: null };
	if (key === 'j') return { action: 'down', pending: null };
	if (key === 'k') return { action: 'up', pending: null };
	if (/^[1-9]$/.test(key)) return { action: `jump:${key}`, pending: null };
	if (key === '?') return { action: 'help', pending: null };
	return { action: null, pending: null };
}

export function handleKeydown(event: KeyboardEvent, toggleHelp: () => void) {
	if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
	if (isEditable(event.target)) return;

	const prev = pending && Date.now() - pending.at < SEQUENCE_TIMEOUT_MS ? pending.key : null;
	const { action, pending: next } = resolveKey(event.key, prev);
	pending = next ? { key: next, at: Date.now() } : null;
	if (!action && !next) return;
	event.preventDefault();
	if (!action) return;

	if (action === 'down') move(1);
	else if (action === 'up') move(-1);
	else if (action === 'top') window.scrollTo({ top: 0 });
	else if (action === 'bottom') window.scrollTo({ top: document.body.scrollHeight });
	else if (action === 'help') toggleHelp();
	else if (action.startsWith('jump:')) {
		const list = sorted();
		const el = list[Number(action.slice(5)) - 1];
		if (el) select(el);
	} else if (action.startsWith('goto:')) {
		goto(gotoMap[action.slice(5)].href);
	}
}
