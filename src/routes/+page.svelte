<script lang="ts">
	import { resolve } from '$app/paths';
	import { kbItem } from '$lib/keyboard/nav';
	import { projects } from '$lib/data/projects';

	const entries = [
		{ href: resolve('/projects'), label: 'projects/', meta: `${projects.length} items` },
		{ href: resolve('/photos'), label: 'photos/', meta: 'placeholders' },
		{ href: resolve('/blog'), label: 'blog/', meta: 'wip' },
		{ href: '/resume.pdf', label: 'resume.pdf', meta: 'soon' }
	];
</script>

<svelte:head><title>frank</title></svelte:head>

<section class="mb-12">
	<h2 class="mb-3 text-dim">$ cat about.txt</h2>
	<p>
		hello, i'm frank. i study math and cs at nyu and want to build tools that matter, lately by way
		of formal methods, category theory, and functional programming. off the keyboard it's piano,
		photography, and crosswords.
	</p>
</section>

<section>
	<h2 class="mb-3 text-dim">$ ls ~/</h2>
	<ul>
		{#each entries as entry, i (entry.label)}
			<li class="flex gap-4 px-3 py-1">
				<span class="marker w-[1ch]">></span>
				<span class="text-dim">{i + 1}</span>
				<a href={entry.href} use:kbItem class="no-underline">{entry.label}</a>
				<span class="ml-auto whitespace-nowrap text-dim">{entry.meta}</span>
			</li>
		{/each}
	</ul>
</section>
