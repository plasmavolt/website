const LINK_CLASS = 'underline decoration-dim/50 underline-offset-4 hover:decoration-accent';

/** renders markdown [text](url) links, escaping everything else */
export function renderInline(md: string): string {
	const escaped = md.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	return escaped.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, `<a class="${LINK_CLASS}" href="$2">$1</a>`);
}
