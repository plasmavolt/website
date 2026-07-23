<script lang="ts">
	// edit the cat here. {L} and {R} are the eyes, swapped out on hover.
	// leading whitespace is preserved but kept outside the link, so only
	// the glyphs themselves are clickable.
	const art = [
		'            ╱|、',
		'          =({L}˕ {R}7',
		'           |、 ~〵',
		'           じし ˍ,)づ'
	];

	// width pins the eye's slot so the swap can't shift the rest of the
	// line (。 is a 1em cjk glyph, its hover replacement isn't)
	const eyes = {
		L: { rest: '˚', hover: 'ˉ', width: undefined as string | undefined },
		R: { rest: '。', hover: '-', width: '1em' as string | undefined }
	};

	const href = 'https://en.wikipedia.org/wiki/Cat_(Unix)';

	type Segment = { text: string } | { eye: (typeof eyes)[keyof typeof eyes] };

	const lines = art.map((line) => {
		const lead = line.match(/^\s*/)![0];
		const segments: Segment[] = line
			.slice(lead.length)
			.split(/(\{[LR]\})/)
			.filter(Boolean)
			.map((part) => {
				const m = part.match(/^\{([LR])\}$/);
				return m ? { eye: eyes[m[1] as keyof typeof eyes] } : { text: part };
			});
		return { lead, segments };
	});
</script>

<pre
	class="cat m-0 leading-none text-dim select-none [&:has(a:hover)]:text-accent">{#each lines as line, i (i)}{i >
		0
			? '\n'
			: ''}{line.lead}<a {href} target="_blank" rel="noopener" class="cursor-grab no-underline"
			>{#each line.segments as seg, j (j)}{#if 'text' in seg}{seg.text}{:else}<span
						class="inline-block"
						style:width={seg.eye.width}
						><span class="cat-rest">{seg.eye.rest}</span><span class="cat-hover"
							>{seg.eye.hover}</span
						></span
					>{/if}{/each}</a
		>{/each}</pre>

<style>
	/* hovering anywhere on the cat closes its eyes */
	.cat-hover {
		display: none;
	}
	.cat:has(a:hover) .cat-rest {
		display: none;
	}
	.cat:has(a:hover) .cat-hover {
		display: inline;
	}
</style>
