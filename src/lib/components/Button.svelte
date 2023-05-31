<script lang="ts">
  export let label: string;
  export let onClick: () => void;
  export let style: "primary" | "secondary" | "destructive" = "primary";
  export let isAnimated: boolean = true;
</script>

<button
    class="relative whitespace-nowrap rounded-lg text-base px-5 py-2 lg:px-10 lg:py-3 font-sansSerif lg:text-xl font-black"
    class:isAnimated
    class:primary={style === "primary"}
    class:secondary={style === "secondary"}
    class:destructive={style === "destructive"}
    on:click|preventDefault={() => onClick()}>
  {label}
</button>

<style lang="postcss">
  .isAnimated {
    @apply shadow-colored hover:shadow-coloredHover translate-y-0 hover:-translate-y-2 transition-all;
  }

  .primary {
    @apply bg-lavenderIndigo text-white;
  }

  .secondary {
    @apply bg-gallery text-daisyBush;
  }

  .destructive {
    @apply bg-scarlet text-goldenFizz;
  }
</style>