/** vim-style command line state, rendered in the footer */
export const vim = $state({
	cmd: null as string | null,
	message: ''
});

let timer: ReturnType<typeof setTimeout>;

export function flashMessage(text: string) {
	vim.message = text;
	clearTimeout(timer);
	timer = setTimeout(() => (vim.message = ''), 4000);
}
