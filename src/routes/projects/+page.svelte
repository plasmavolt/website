<script lang="ts">
	import { kbItem } from '$lib/keyboard/nav';
	import { projects } from '$lib/data/projects';
</script>

<svelte:head><title>frank / projects</title></svelte:head>

<section>
	<h2 class="mb-3 text-dim">$ ls ~/projects</h2>
	<ul>
		{#each projects as project, i (project.name)}
			<li class="flex gap-4 px-3 py-1">
				<span class="marker w-[1ch]">></span>
				<span class="text-dim">{i + 1}</span>
				<div class="flex min-w-0 flex-1 flex-col gap-x-4 sm:flex-row">
					<a href={project.href} use:kbItem class="whitespace-nowrap no-underline">{project.name}</a
					>
					<span class="text-dim">{project.description}</span>
				</div>
				<span class="ml-auto whitespace-nowrap text-dim">{project.lang}</span>
			</li>
		{/each}
	</ul>
</section>
