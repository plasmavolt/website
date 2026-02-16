<script lang="ts">
	import Card from '../components/Card.svelte';
</script>

<div class="flex h-screen flex-col items-center justify-center">
	<div class="flex flex-col p-16">
		<div class="flex flex-col">
			<Card
				title="Hi!"
				images={[
					{
						src: 'src/lib/assets/images/me.jpg',
						alt: 'me',
						class: 'h-96',
						caption: 'me!'
					}
				]}
				idx={1}
			>
				{#snippet description()}
					<p>hello, i'm frank</p>

					<p>
						i'm an undergrad at nyu studying math and cs. as a software
						developer, i want to build tools and applications that matter.
						recently, i've been interested in formal methods, category theory, and
						functional programming. i also enjoy piano, photography, and
						crosswords!
					</p>
					<p>email me! frank [dot] lin [at] nyu [dot] edu</p>
				{/snippet}
			</Card>
			
		</div>
	</div>
</div>
