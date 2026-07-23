<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import HelpOverlay from '$lib/components/HelpOverlay.svelte';
	import { handleKeydown } from '$lib/keyboard/nav';

	let { children } = $props();
	let help: HelpOverlay;
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<svelte:window onkeydown={(e) => handleKeydown(e, () => help.toggle())} />

<div class="flex justify-center px-5 pt-16 pb-24">
	<div class="w-full max-w-2xl">
		<header class="mb-12">
			<div>
				<span class="text-accent">~</span>
				<a href={resolve('/')} class="font-bold">frank (•˕ •マ.ᐟ</a>
				<span class="text-dim">/ software, photos, occasional words</span>
			</div>
			<div class="text-dim">
				new york ·
				<a href="https://github.com/plasmavolt">github</a> ·
				<a href="https://linkedin.com/in/franktbh">linkedin</a> ·
				<a href="mailto:frank@superscript.nyc">email</a>
			</div>
		</header>

		<main>
			{@render children()}
		</main>
	</div>
</div>

<footer
	class="fixed right-0 bottom-0 left-0 flex justify-center border-t border-line bg-bg px-5 py-2.5 text-sm text-dim"
>
	<div class="flex w-full max-w-2xl justify-between">
		<span>
			<span class="text-accent">[j][k]</span> move
			<span class="text-accent">[g]</span> goto
			<span class="text-accent">[Enter]</span> open
		</span>
		<span><span class="text-accent">[?]</span> help</span>
	</div>
</footer>

<HelpOverlay bind:this={help} />
