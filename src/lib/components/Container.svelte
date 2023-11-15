<script>
  // @ts-nocheck
  import ContainerAPI from '$lib/ContainerAPI.svelte';
  import Paragraph from '$lib/components/Paragraph.svelte';
  let { blocks } = $props();

  const BLOCK_TYPES = {
    "paragraph": Paragraph
  };

  let el = $state(undefined);
  
  // We encapsulate the data with an API for manipulating it
  let container = new ContainerAPI(blocks);

  // When new data arrives from parent we reinit the container
	$effect(() => {
    container.init(blocks);
    console.log('We received new data', blocks);
	});

  function clearSelection(e) {
    if (el && !el.contains(e.target) && !e.defaultPrevented) {
      container.clearSelection();
    }
  }
</script>

<div style="height:40px;">
  {#if container.selected_index >= 0}
    <button on:click|preventDefault={() => { container.moveBlock('up')}}>Up</button>
    <button on:click|preventDefault={() => { container.moveBlock('down')}}>Down</button>
  {/if}
</div>

<div bind:this={el}>
  {#if container.blocks.length > 0}
    {#each container.blocks as block, i}
      <!--
        HELP NEEDED: bind:block={container.blocks} breaks the reactivity chain
        entry.props in Project.svelte is not updated). How can we fix this?

        The problem here is that `container.blocks` is its own instance (state), and thus is detached from `blocks`
        That's why the parent is not seing the updates. It's good on one hand (fine-grained reactivity, but that also means that our "tree"
        gets out of sync)

        For instance we want to have a global <Toolbar> that we render inside <Project> and give it access to the currently active container
        to run a tools for manipulating the container (moveBlock, deleteBlock, etc.)

        How can we make sure that <Toolbar> and <Container> use the same `Collection` instance, so updates are propagated both ways?
      -->
      <svelte:component
        this={BLOCK_TYPES[block.type] || UnknownBlock}
        bind:block={container.blocks[i]}
        selected={container.selected_index === i}
        on:click={() => container.selected_index = i}
      />
    {/each}
  {/if}
</div>

<svelte:document on:click={clearSelection} />
