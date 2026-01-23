<script lang="ts">
	import { resolve } from '$app/paths';
	import Link from './Link.svelte';

	let tabs = [
		{ label: 'projects', href: '/projects' as '/' },
		{ label: 'resume', href: '/resume' as '/' }
	];
</script>

<header
	class="fixed top-0 left-0 z-100 flex w-full flex-row items-center justify-between gap-1.5 overflow-hidden border-b p-5 text-sm backdrop-blur-md sm:gap-2.5"
>
	<Link href={resolve('/')}>frank</Link>
	<!-- navigation links -->
	<nav>
		<ul class="flex flex-row space-x-8 pr-4">
			{#each tabs as tab (tab.label)}
				<li>
					<Link href={resolve(tab.href)}>
						{tab.label}
					</Link>
				</li>
			{/each}
		</ul>
	</nav>
</header>
