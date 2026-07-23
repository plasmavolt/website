import { describe, expect, it } from 'vitest';
import { renderInline } from './md';

describe('renderInline', () => {
	it('passes plain text through', () => {
		expect(renderInline('hello world')).toBe('hello world');
	});

	it('escapes html', () => {
		expect(renderInline('<script>alert(1)</script>')).not.toContain('<script>');
	});

	it('renders markdown links', () => {
		const out = renderInline('reading [rejection](https://example.com), by tony');
		expect(out).toContain('href="https://example.com"');
		expect(out).toContain('>rejection</a>');
		expect(out).toContain(', by tony');
	});

	it('renders multiple links in one line', () => {
		const out = renderInline('[a](https://a.com) and [b](https://b.com)');
		expect(out.match(/<a /g)).toHaveLength(2);
	});
});
