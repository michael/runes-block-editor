<script>
  // @ts-nocheck
  import CollectionAPI from '$lib/CollectionAPI.svelte';
  import Paragraph from '$lib/components/Paragraph.svelte';
  let { blocks } = $props();

  const BLOCK_TYPES = {
    "paragraph": Paragraph
  };

  let el = $state(undefined);
  let collection = $state(new CollectionAPI(blocks));

  // NOTE: we currently can't reinitialize the collection, as we will loose the selected index
	$effect(() => {
    collection.init(blocks);
	});

  function clearSelection(e) {
    if (el && !el.contains(e.target) && !e.defaultPrevented) {
      collection.clearSelection();
    } else {
      console.log('skipped');
    }
  }
</script>

<div style="height:40px;">
  {#if collection.selected_index >= 0}
    <button on:click|preventDefault={() => { collection.moveBlock('up')}}>Up</button>
    <button on:click|preventDefault={() => { collection.moveBlock('down')}}>Down</button>
  {/if}
</div>

<div bind:this={el}>
  {#if collection.blocks.length > 0}
    {#each collection.blocks as block, i}
      <!--
        HELP NEEDED: bind:block={collection.blocks} breaks the reactivity chain
        entry.props in Project.svelte is not updated). How can we fix this?
      -->
      <svelte:component
        this={BLOCK_TYPES[block.type] || UnknownBlock}
        bind:block={collection.blocks[i]}
        selected={collection.selected_index === i}
        on:click={() => collection.selected_index = i}
      />
    {/each}
  {/if}
</div>

<svelte:document on:click={clearSelection} />
