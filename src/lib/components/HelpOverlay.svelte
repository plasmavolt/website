<script lang="ts">
	import { bindings } from '$lib/keyboard/keymap';

	let dialog: HTMLDialogElement;

	export function toggle() {
		if (dialog.open) dialog.close();
		else dialog.showModal();
	}
</script>

<dialog
	bind:this={dialog}
	class="m-auto w-[90%] max-w-md border border-line bg-bg p-8 text-sm text-fg outline-none backdrop:bg-bg/85"
	onkeydown={(e) => {
		if (e.key === '?') {
			e.preventDefault();
			dialog.close();
		}
	}}
>
	<h2 class="mb-4 text-dim">$ man frank</h2>
	<table class="w-full">
		<tbody>
			{#each bindings as binding (binding.keys)}
				<tr>
					<td class="w-28 py-0.5 align-top whitespace-nowrap text-accent">{binding.keys}</td>
					<td class="py-0.5">{binding.description}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<p class="mt-4 text-dim">press Esc or ? to close</p>
</dialog>
