<script lang="ts">
	import type { ImageData } from '../lib/types.ts';
	interface Props extends ImageData {
		idx?: number;
	}

	let { src, alt, class: className, caption, idx }: Props = $props();
</script>

<figure class="flex w-fit flex-col gap-y-1 border border-dotted">
	<img {src} {alt} class="{className} m-2 mb-0" />
	{#if caption}
		<figcaption
			class="mb-1 text-center text-sm font-normal text-secondary italic"
		>
			{#if idx}
				fig {String(idx).padStart(2, '0') + '. '}
			{/if}{caption}
		</figcaption>
	{/if}
</figure>
