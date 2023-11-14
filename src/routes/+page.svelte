<script>
  // @ts-nocheck
  import Project from '$lib/components/Project.svelte'

  const DATASET_1 = {
    type: 'Project',
    name: 'Project A',
    description: 'This is a description for project A',
    body: [
      { type: 'paragraph', content: 'Lorem ipsum A1' },
      { type: 'paragraph', content: 'Lorem ipsum A2' },
      { type: 'paragraph', content: 'Lorem ipsum A3' },
    ]
  };

  const DATASET_2 = {
    type: 'Project',
    name: 'Project B',
    description: 'This is a description for project B',
    body: [
      { type: 'paragraph', content: 'Lorem ipsum B1' },
      { type: 'paragraph', content: 'Lorem ipsum B2' },
    ]
  };

  let data = $state(DATASET_1);
</script>

<button on:click={() => (data = DATASET_1) }>Dataset 1</button>
<button on:click={() => (data = DATASET_2) }>Dataset 2</button>

<Project {data} />
