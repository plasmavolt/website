<script lang="ts">
	import Header from '../components/Header.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	import '../app.css';
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex h-screen min-h-screen flex-col">
	<Header />
	<!-- spacer -->
	<div class="h-16"></div>
	<div class="flex-1">
		<main class="flex-1">
			{@render children()}
		</main>
	</div>
</div>
