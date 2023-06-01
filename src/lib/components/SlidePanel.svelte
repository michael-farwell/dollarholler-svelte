<script lang="ts">
  import Arrow from "$lib/components/Icon/Arrow.svelte";
  import Overlay from "$lib/components/Overlay.svelte";
  import Portal from "$lib/components/Portal.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<svelte:window
    on:keydown={(event) => {
  if(event.key === "Escape") dispatch("close")
}} />

<Portal>
  <Overlay />
  <div class="bg-white fixed w-3/4 h-screen py-20 px-32 right-0 top-0 z-slidePanel shadow-slidePanel">
    <button
        class="absolute top-5 left-7 text-pastelPurple hover:text-daisyBush"
        on:click={() => dispatch("close")}>
      <Arrow />
    </button>
    <slot></slot>
  </div>
</Portal>