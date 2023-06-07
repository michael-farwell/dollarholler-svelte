<script lang="ts">
  export let className: string = "z-overlay";
</script>

<svelte:head>
  <style lang="postcss">
    body {
      @apply overflow-hidden;
    }
  </style>
</svelte:head>

<div class="fixed inset-0 bg-blueGem opacity-60 {className}"></div>

