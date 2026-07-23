import { describe, expect, it } from 'vitest';
import { resolveKey } from './nav';

describe('resolveKey', () => {
	it('maps single motions', () => {
		expect(resolveKey('j', null)).toEqual({ action: 'down', pending: null });
		expect(resolveKey('k', null)).toEqual({ action: 'up', pending: null });
		expect(resolveKey('G', null)).toEqual({ action: 'bottom', pending: null });
		expect(resolveKey('?', null)).toEqual({ action: 'help', pending: null });
		expect(resolveKey('5', null)).toEqual({ action: 'jump:5', pending: null });
	});

	it('starts a g sequence', () => {
		expect(resolveKey('g', null)).toEqual({ action: null, pending: 'g' });
	});

	it('completes g sequences', () => {
		expect(resolveKey('g', 'g')).toEqual({ action: 'top', pending: null });
		expect(resolveKey('h', 'g')).toEqual({ action: 'goto:h', pending: null });
		expect(resolveKey('b', 'g')).toEqual({ action: 'goto:b', pending: null });
	});

	it('drops invalid g sequences', () => {
		expect(resolveKey('z', 'g')).toEqual({ action: null, pending: null });
	});

	it('ignores unbound keys', () => {
		expect(resolveKey('x', null)).toEqual({ action: null, pending: null });
		expect(resolveKey('0', null)).toEqual({ action: null, pending: null });
	});
});
