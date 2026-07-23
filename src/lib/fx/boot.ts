import { browser } from '$app/environment';

// true only for the first render of the homepage per page load, so the
// startup animation doesn't replay on client-side navs back to /.
// the animations themselves live outside kit: the dropdown is pure css
// (.boot in layout.css) and the cypher is an inline script in app.html,
// so neither waits for hydration. this flag just controls whether the
// .boot/.cypher classes are rendered at all.
export function takeBoot(): boolean {
	if (!browser) return true;
	// the inline script only animates .cypher elements present at document
	// load, so only keep the classes when hydrating the prerendered homepage.
	// on client-side navs (no .cypher in the document) render plain content.
	return document.querySelector('.cypher') !== null;
}
