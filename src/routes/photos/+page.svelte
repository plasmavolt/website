<script lang="ts">
	// drop landscape jpgs into src/lib/photos/ and they show up here,
	// optimized to avif/webp at build time
	const photos = import.meta.glob<string>('$lib/photos/*.{jpg,jpeg,png}', {
		eager: true,
		import: 'default',
		query: { enhanced: true }
	});
</script>

<svelte:head><title>frank / photos</title></svelte:head>

<section>
	<h2 class="mb-3 text-dim"><span class="text-accent">$</span> sxiv ~/photos</h2>
	{#if Object.keys(photos).length === 0}
		<p class="text-dim">total 0</p>
	{:else}
		<div class="columns-1 gap-1.5 sm:columns-2">
			{#each Object.entries(photos) as [path, src] (path)}
				<enhanced:img
					{src}
					alt=""
					class="mb-1.5 block w-full break-inside-avoid opacity-90 hover:opacity-100"
					sizes="(min-width: 640px) 330px, 100vw"
					loading="lazy"
				/>
			{/each}
		</div>
		<p class="mt-3 text-dim">(placeholders for now, real landscapes soon)</p>
	{/if}
</section>
