<script lang="ts">
  import Cancel from "$lib/components/Icon/Cancel.svelte";
  import Overlay from "$lib/components/Overlay.svelte";
  import Portal from "$lib/components/Portal.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let isVisible: boolean = false;
</script>

<svelte:window
    on:keydown={(event) => {
  if(event.key === "Escape") dispatch("close")
}} />

{#if isVisible}
  <Portal>
    <Overlay />

    <div class="fixed inset-0 z-modal center">
      <div class="relative max-w-[450px] min-h-[230px] w-full rounded-lg bg-white px-10 py-7">
        <button
            class="right-4 top-4 absolute text-pastelPurple hover:text-daisyBush"
            on:click={() => dispatch("close")}>
          <Cancel />
        </button>

        <slot />
      </div>
    </div>
  </Portal>
{/if}
