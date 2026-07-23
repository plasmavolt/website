<script lang="ts">
	import { resolve } from '$app/paths';
	import { kbItem } from '$lib/keyboard/nav';
	import { projects } from '$lib/data/projects';
	import { site } from '$lib/data/site';
	import aboutTxt from '$lib/data/about.md?raw';
	import nowTxt from '$lib/data/now.md?raw';
	import { renderInline } from '$lib/md';

	const photos = import.meta.glob<string>('$lib/photos/*.{jpg,jpeg,png}', {
		eager: true,
		import: 'default',
		query: { enhanced: true }
	});
	const strip = Object.entries(photos).slice(0, 3);

	const entries = site.menu;

	// each line of now.txt is "<key> <rest of line>"
	const now = nowTxt
		.trim()
		.split('\n')
		.map((line) => {
			const [key, ...rest] = line.split(' ');
			return { key, value: rest.join(' ') };
		});
</script>

<svelte:head><title>frank</title></svelte:head>

<section class="mb-8">
	<h2 class="mb-3 text-dim"><span class="text-accent">$</span> cat about.txt</h2>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- renderInline escapes repo-owned markdown -->
	<p>{@html renderInline(aboutTxt.trim())}</p>
</section>

<section class="mb-8">
	<h2 class="mb-3 text-dim"><span class="text-accent">$</span> cat now.txt</h2>
	<ul>
		{#each now as item (item.key)}
			<li class="grid grid-cols-[10ch_1fr] gap-3">
				<span class="text-dim">{item.key}</span>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -- renderInline escapes repo-owned markdown -->
				<span>{@html renderInline(item.value)}</span>
			</li>
		{/each}
	</ul>
</section>

<section class="mb-8">
	<h2 class="mb-3 text-dim"><span class="text-accent">$</span> ls ~/</h2>
	<ul>
		{#each entries as entry, i (entry.label)}
			<li class="flex gap-3 px-1 py-1">
				<span class="marker w-[1ch]">></span>
				<span class="text-dim">{i + 1}</span>
				<a href={entry.href} use:kbItem class="no-underline">{entry.label}</a>
				<span class="ml-auto whitespace-nowrap text-dim">{entry.meta}</span>
			</li>
		{/each}
	</ul>
</section>

<section class="mb-8">
	<h2 class="mb-3 text-dim"><span class="text-accent">$</span> ls ~/projects</h2>
	<ul>
		{#each projects as project, i (project.name)}
			<li class="grid grid-cols-[1ch_2ch_14ch_1fr] gap-x-3 px-1 py-1">
				<span class="marker">></span>
				<span class="text-dim">{entries.length + i + 1}</span>
				<a href={project.href} target="_blank" rel="noopener" use:kbItem class="no-underline"
					>{project.name}<span class="text-dim">{project.ext}</span></a
				>
				<span class="text-dim">{project.description}</span>
			</li>
		{/each}
	</ul>
</section>

<section class="mb-8">
	<h2 class="mb-3 text-dim"><span class="text-accent">$</span> sxiv ~/photos | head -3</h2>
	<div class="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
		{#each strip as [path, src] (path)}
			<a href={resolve('/photos')} tabindex="-1" aria-label="all photos">
				<enhanced:img
					{src}
					alt=""
					class="aspect-[16/10] w-full object-cover opacity-90 hover:opacity-100"
					sizes="160px"
					loading="lazy"
				/>
			</a>
		{/each}
		<a
			href={resolve('/photos')}
			use:kbItem
			class="relative flex aspect-[16/10] items-center justify-center border border-line text-dim no-underline hover:border-accent focus:bg-fg focus:text-bg"
		>
			<span class="absolute top-1 left-1.5 text-xs text-dim/50">{entries.length + projects.length + 1}</span>
			view all
		</a>
	</div>
</section>

<section>
	<h2 class="mb-3 text-dim"><span class="text-accent">$</span> tail ~/words</h2>
	<p class="text-dim">nothing here yet.</p>
</section>
