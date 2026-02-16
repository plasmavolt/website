<script lang="ts">
	import { resolve } from '$app/paths';
	import Link from './Link.svelte';

	let tabs = [
		{ label: 'github', href: 'https://github.com/plasmavolt' },
		{ label: 'linkedin', href: 'https://linkedin.com/in/franktbh' },
		{ label: 'resume', href: '/resume' }
	];
</script>

<header
	class="fixed top-0 left-0 z-100 flex min-h-16 w-full flex-row items-center justify-between gap-1.5 overflow-hidden border-b p-5 text-sm backdrop-blur-md sm:gap-2.5"
>
	<div>
		<Link href="/">frank (•˕ •マ.ᐟ</Link>
	</div>
	<!-- navigation links -->
	<div>
		<nav>
			<ul class="flex flex-row space-x-8 pr-4">
				{#each tabs as tab (tab.label)}
					<li>
						<Link href={tab.href}>
							{tab.label}
						</Link>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</header>
