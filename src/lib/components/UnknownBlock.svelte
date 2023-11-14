<script>
  import { classNames } from '$lib/util';

  let { block, selected } = $props();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click class={classNames("cursor-default py-4 px-6 border text-gray-400", selected ? "border-blue-600" : "border-transparent")}>
  Block type {block.type} is unknown.
</div>
