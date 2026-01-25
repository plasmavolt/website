<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ImageData } from '../lib/types.ts';
	import Image from './Image.svelte';

	interface Props {
		title: string;
		description: Snippet;
		images?: ImageData[];
		idx: number;
	}

	let { title, description, images, idx }: Props = $props();
</script>

<div class="flex flex-row">
	<div class="flex w-1/2 flex-col justify-center">
		<div class="flex flex-col">
			<p class="text-md mb-1 text-muted">
				{String(idx).padStart(2, '0')}
			</p>
			<h2>{title}</h2>
		</div>
		<div>
			{@render description()}
		</div>
	</div>
	<div class="flex w-1/2 flex-col">
		{#each images as image, i (i)}
			<Image {...image} idx={i + 1} />
		{/each}
	</div>
</div>
