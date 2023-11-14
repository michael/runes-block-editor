<script>
  // @ts-nocheck
  import { classNames } from '$lib/util';
  let { block, selected } = $props();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<p on:click class={classNames("py-4 px-6 border", selected ? "selected" : "")} contenteditable="true" bind:textContent={block.content}>
  
</p>

<style>
  p {
    outline: none;
  }

  p.selected {
    outline: 1px solid blue;
  }
</style>