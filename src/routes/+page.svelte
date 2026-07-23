<script lang="ts">
	import { resolve } from '$app/paths';
	import { kbItem } from '$lib/keyboard/nav';
	import { projects } from '$lib/data/projects';

	const photos = import.meta.glob<string>('$lib/photos/*.{jpg,jpeg,png}', {
		eager: true,
		import: 'default',
		query: { enhanced: true }
	});
	const strip = Object.entries(photos).slice(0, 3);

	const entries = [
		{ href: resolve('/photos'), label: 'photos/', meta: 'placeholders' },
		{ href: resolve('/words'), label: 'words/', meta: 'wip' },
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

<section class="mb-12">
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

<section class="mb-12">
	<h2 class="mb-3 text-dim">$ ls ~/projects</h2>
	<ul>
		{#each projects as project (project.name)}
			<li class="grid grid-cols-[1ch_10ch_1fr_6ch] gap-4 px-3 py-1">
				<span class="marker">></span>
				<a href={project.href} use:kbItem class="no-underline">{project.name}</a>
				<span class="text-dim">{project.description}</span>
				<span class="text-right text-dim">{project.lang}</span>
			</li>
		{/each}
	</ul>
</section>

<section class="mb-12">
	<h2 class="mb-3 text-dim">$ sxiv ~/photos | head -3</h2>
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
			class="flex aspect-[16/10] items-center justify-center border border-line text-dim no-underline hover:border-accent focus:bg-fg focus:text-bg"
		>
			view all
		</a>
	</div>
</section>

<section>
	<h2 class="mb-3 text-dim">$ tail ~/words</h2>
	<p class="text-dim">nothing here yet.</p>
</section>
