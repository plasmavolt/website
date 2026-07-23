<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import HelpOverlay from '$lib/components/HelpOverlay.svelte';
	import { handleKeydown } from '$lib/keyboard/nav';
	import { vim } from '$lib/keyboard/state.svelte';

	let { children } = $props();
	let help: HelpOverlay;

	const path = $derived(page.url.pathname === '/' ? '~' : `~${page.url.pathname}`);

	let time = $state('');
	$effect(() => {
		const tick = () =>
			(time = new Intl.DateTimeFormat('en-US', {
				timeZone: 'America/New_York',
				hour: '2-digit',
				minute: '2-digit',
				hour12: false
			}).format(new Date()));
		tick();
		const id = setInterval(tick, 15000);
		return () => clearInterval(id);
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<svelte:window onkeydown={(e) => handleKeydown(e, () => help.toggle())} />

<div class="flex justify-center px-5 pt-16 pb-24">
	<div class="w-full max-w-2xl">
		<header class="mb-8">
			<div>
				<span class="text-accent">~</span>
				<a href={resolve('/')} class="font-bold">frank (•˕ •マ</a>
				<span class="text-dim">/ math ∧ cs @nyu</span>
			</div>
			<div
				class="text-dim [&_a]:underline [&_a]:decoration-dim/50 [&_a]:underline-offset-4 [&_a:hover]:decoration-accent"
			>
				new york |
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
	<div class="flex w-full max-w-2xl justify-between gap-4">
		{#if vim.cmd !== null}
			<span class="text-fg">{vim.cmd}<span class="animate-pulse">▌</span></span>
		{:else if vim.message}
			<span class="truncate text-accent">{vim.message}</span>
		{:else}
			<span class="truncate"><span class="text-accent">[frank]</span> {path}</span>
		{/if}
		<span class="whitespace-nowrap"><span class="text-accent">[?]</span> help · nyc {time}</span>
	</div>
</footer>

<HelpOverlay bind:this={help} />
