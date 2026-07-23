<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<svelte:head><title>frank / {page.status}</title></svelte:head>

<section>
	<h2 class="mb-3 text-dim"><span class="text-accent">$</span> cd {page.url.pathname}</h2>
	<p>cd: no such file or directory ({page.status})</p>
	<pre class="my-10 leading-snug text-dim select-none" aria-hidden="true">{`
 __ __       __   __ __
/\\ \\\\ \\    /'__\`\\/\\ \\\\ \\
\\ \\ \\\\ \\  /\\ \\/\\ \\ \\ \\\\ \\
 \\ \\ \\\\ \\_\\ \\ \\ \\ \\ \\ \\\\ \\_
  \\ \\__ ,__\\ \\ \\_\\ \\ \\__ ,__\\
   \\/_/\\_\\_/\\ \\____/\\/_/\\_\\_/
      \\/_/   \\/___/    \\/_/
`}</pre>

	<p class="mt-4"><a href={resolve('/')}>cd ~</a></p>
</section>
