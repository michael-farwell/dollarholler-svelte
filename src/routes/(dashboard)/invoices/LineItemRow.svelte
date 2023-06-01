<script lang="ts">
  import Trash from "$lib/components/Icon/Trash.svelte";
  import { twoDecimals } from "$lib/utils/moneyHelpers";
  import { dollarsToCents } from "$lib/utils/moneyHelpers.js";
  import { createEventDispatcher } from "svelte";

  export let lineItem: LineItem;
  export let canDelete: boolean = false;

  let unitPrice: string = twoDecimals(lineItem?.amount / lineItem?.quantity);
  let amount: string;

  $: {
    amount = twoDecimals(lineItem?.quantity * +unitPrice);
    if (lineItem) lineItem.amount = dollarsToCents(+amount);
  }

  const dispatch = createEventDispatcher();
</script>

<div class="invoice-line-item border-b-2 border-fog py-2">
  <div>
    <input
        class="line-item"
        type="text"
        name="description"
        id="description"
        bind:value={lineItem.description}>
  </div>

  <div>
    <input
        class="line-item text-right"
        type="number"
        name="unitPrice"
        id="unitPrice"
        step="0.01"
        min="0"
        bind:value={unitPrice}
        on:blur={() => unitPrice = twoDecimals(+unitPrice)}>
  </div>

  <div>
    <input
        class="line-item text-center"
        type="number"
        name="quantity"
        id="quantity"
        min="0"
        bind:value={lineItem.quantity}>
  </div>

  <div>
    <input
        class="line-item text-right"
        type="number"
        name="amount"
        id="amount"
        step="0.01"
        min="0"
        bind:value={amount}
        disabled>
  </div>

  <div>
    {#if canDelete}
      <button
          class="center h-10 w-10 text-pastelPurple hover:text-lavenderIndigo"
          on:click|preventDefault={() => dispatch("removeLineItem", lineItem.id)}>
        <Trash />
      </button>
    {/if}
  </div>
</div>

<style lang="postcss">
  input[type="text"],
  input[type="number"] {
    @apply h-10 w-full border-b-2 border-dashed border-stone-300;
  }

  input[type="text"] {
    @apply font-sansSerif text-xl font-bold;
  }

  input[type="number"] {
    @apply font-mono text-base;
  }

  input[type="text"]:focus,
  input[type="number"]:focus {
    @apply border-solid border-lavenderIndigo outline-none;
  }

  input[type="number"]:disabled,
  input[type="text"]:disabled {
    @apply border-b-0 bg-transparent px-0;
  }
</style>