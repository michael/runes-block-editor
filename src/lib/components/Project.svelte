<script>
  // @ts-nocheck
  import EntryAPI from '$lib/EntryAPI.svelte.js';
  import Container from './Container.svelte';

  let { data } = $props();
  let entry = $state(new EntryAPI(data));

  $effect(() => {
    entry = new EntryAPI(data);
  });
</script>

<hr />
<div style="margin-top: 60px;">
  <button onclick={() => { entry.discardChanges() }}>Discard changes</button>
</div>

<div>
  Name: <input type="text" bind:value={entry.props.name} />
</div>

<Container bind:blocks={entry.props.body} />

<pre>{JSON.stringify(entry.props,null,2)}</pre>