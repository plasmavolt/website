<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import HelpOverlay from '$lib/components/HelpOverlay.svelte';
	import Cat from '$lib/components/Cat.svelte';
	import { handleKeydown } from '$lib/keyboard/nav';
	import { vim } from '$lib/keyboard/state.svelte';
	import { site } from '$lib/data/site';

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
				hour12: false,
				timeZoneName: 'short'
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
		<header class="mb-8 flex items-start justify-between">
			<div>
				<div>
					<span class="text-accent">~</span>
					<a href={resolve('/')} class="font-bold">{site.name}</a>
					<span class="text-dim">/ {site.tagline}</span>
				</div>
				<div
					class="text-dim [&_a]:underline [&_a]:decoration-dim/50 [&_a]:underline-offset-4 [&_a:hover]:decoration-accent"
				>
					{site.location} /
					{#each site.links as link, i (link.label)}
						<a
							href={link.href}
							target={link.href.startsWith('http') ? '_blank' : undefined}
							rel={link.href.startsWith('http') ? 'noopener' : undefined}>{link.label}</a
						>{i < site.links.length - 1 ? ' · ' : ''}
					{/each}
				</div>
			</div>
			<Cat />
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
		<span class="whitespace-nowrap">
			<span class="text-accent">[j/k]</span> move · <span class="text-accent">[?]</span> help ·
			{time}
		</span>
	</div>
</footer>

<HelpOverlay bind:this={help} />
