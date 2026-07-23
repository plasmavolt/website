const LINK_CLASS = 'underline decoration-dim/50 underline-offset-4 hover:decoration-accent';

/** renders markdown [text](url) links, escaping everything else */
export function renderInline(md: string): string {
	const escaped = md.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	return escaped.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, href) => {
		const target = href.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
		return `<a class="${LINK_CLASS}" href="${href}"${target}>${text}</a>`;
	});
}
