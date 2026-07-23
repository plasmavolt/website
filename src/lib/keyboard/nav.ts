import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { gotoMap } from './keymap';
import { vim, flashMessage } from './state.svelte';

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
		return;
	}
	const next = current + delta;
	// past either end: keep going to the actual edge of the page
	if (next < 0) {
		window.scrollTo({ top: 0 });
	} else if (next >= list.length) {
		window.scrollTo({ top: document.body.scrollHeight });
	} else {
		select(list[next]);
	}
}

function openSelected() {
	const el = document.activeElement;
	if (el instanceof HTMLElement && 'kb' in el.dataset) el.click();
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
	if (key === 'h') return { action: 'home', pending: null };
	if (key === 'l') return { action: 'open', pending: null };
	if (key === ':') return { action: 'cmd', pending: null };
	if (/^[1-9]$/.test(key)) return { action: `jump:${key}`, pending: null };
	if (key === '?') return { action: 'help', pending: null };
	return { action: null, pending: null };
}

function runCommand(cmd: string) {
	if (cmd === ':q') {
		flashMessage('E37: No write since last change (add ! to override)');
	} else if (cmd === ':q!' || cmd === ':wq') {
		window.close();
		flashMessage('E444: Cannot close last window');
	} else if (cmd.length > 1) {
		flashMessage(`E492: Not an editor command: ${cmd.slice(1)}`);
	}
}

function handleCommandMode(event: KeyboardEvent) {
	if (event.key === 'Escape') {
		vim.cmd = null;
	} else if (event.key === 'Enter') {
		runCommand(vim.cmd!);
		vim.cmd = null;
	} else if (event.key === 'Backspace') {
		vim.cmd = vim.cmd!.slice(0, -1) || null;
	} else if (event.key.length === 1) {
		vim.cmd += event.key;
	} else {
		return;
	}
	event.preventDefault();
}

export function handleKeydown(event: KeyboardEvent, toggleHelp: () => void) {
	if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
	if (isEditable(event.target)) return;

	if (vim.cmd !== null) {
		handleCommandMode(event);
		return;
	}

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
	else if (action === 'home') goto(resolve('/'));
	else if (action === 'open') openSelected();
	else if (action === 'cmd') vim.cmd = ':';
	else if (action === 'help') toggleHelp();
	else if (action.startsWith('jump:')) {
		const list = sorted();
		const el = list[Number(action.slice(5)) - 1];
		if (el) select(el);
	} else if (action.startsWith('goto:')) {
		goto(gotoMap[action.slice(5)].href);
	}
}
