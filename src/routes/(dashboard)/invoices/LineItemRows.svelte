<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import CircledAmount from "$lib/components/CircledAmount.svelte";
  import { asCurrency, sumLineItems } from "$lib/utils/moneyHelpers";
  import { createEventDispatcher } from "svelte";
  import LineItemRow from "./LineItemRow.svelte";

  const dispatch = createEventDispatcher();
  export let lineItems: LineItem[] | undefined = undefined;

  let subtotal: number = 0;
  export let discount: number = 0;
  let discountedAmount: number = 0;
  let total: number;

  $: if (sumLineItems(lineItems) > 0) {
    subtotal = sumLineItems(lineItems);
  }
  $: discountedAmount = sumLineItems(lineItems) * (discount / 100);
  $: total = subtotal - discountedAmount;
</script>

<div class="invoice-line-item border-b-2 border-daisyBush pb-2">
  <div class="table-header">Description</div>
  <div class="table-header text-right">Unit Price</div>
  <div class="table-header text-center">Qty</div>
  <div class="table-header text-right">Amount</div>
</div>

{#if lineItems}
  {#each lineItems as lineItem, index}
    <LineItemRow
        {lineItem}
        on:updateLineItem
        on:removeLineItem
        isRequired={index === 0}
        canDelete={index !== 0} />
  {/each}
{/if}

<div class="invoice-line-item">
  <div class="col-span-2">
    <Button
        label="+ Line Item"
        style={"textOnly"}
        isAnimated={false}
        onClick={() => dispatch("addLineItem")} />
  </div>
  <div class="font-bold py-5 text-right text-monsoon">Subtotal</div>
  <div class="py-5 text-right font-mono">{asCurrency(subtotal)}</div>
</div>

<div class="invoice-line-item">
  <div class="col-span-2 font-bold py-5 text-right text-monsoon">
    Discount
  </div>
  <div class="relative">
    <input
        class="line-item h-10 w-full border-b-2 border-dashed border-stone-300 pr-4 text-right focus:border-solid focus:border-lavenderIndigo focus:outline-none"
        type="number"
        name="discount"
        id="discount"
        min="0"
        max="100"
        bind:value={discount}>
    <span class="absolute right-0 top-2 font-mono">%</span>
  </div>
  <div class="py-5 text-right font-mono">{asCurrency(discountedAmount)}</div>
</div>

<div class="invoice-line-item">
  <div class="col-span-6">
    <CircledAmount
        label="Total:"
        amount={asCurrency(total)} />
  </div>
</div>

<style lang="postcss">
  .table-header {
    @apply text-sm font-bold text-daisyBush;
  }
</style>