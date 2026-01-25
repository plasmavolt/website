<script lang="ts">
	import { resolve } from '$app/paths';
	let { href, children } = $props();

	let isExternal = (href: string) =>
		href.startsWith('http') || href.startsWith('https');
</script>

<a
	href={isExternal(href) ? href : resolve(href)}
	class="transition-[background-size, colors] relative bg-linear-to-r from-primary-hover to-primary-hover
         bg-size-[0%_1px] bg-bottom-left bg-no-repeat
         pb-px text-primary duration-250
         ease-out hover:bg-size-[100%_1px] hover:text-primary-hover"
>
	{@render children()}
</a>
