<script lang="ts">
	let tabs = [
		{ label: 'home', href: '/' },
		{ label: 'projects', href: '/projects' },
		{ label: 'resume', href: '/resume' },
		{ label: 'github', href: 'https://github.com/plasmavolt' }
	];
</script>

<header class="max-h-8 bg-slate-200">
	<div class="flex flex-row justify-between px-2 py-1">
		<h3>Frank Lin</h3>
		<!-- navigation links -->
		<nav class="flex flex-row space-x-8 pr-4">
			{#each tabs as tab (tab.label)}
				<a href={tab.href} class="text-slate-800 hover:text-slate-600">
					<p>{tab.label}</p>
				</a>
			{/each}
		</nav>
	</div>
</header>
