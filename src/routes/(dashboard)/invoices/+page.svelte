<script lang="ts">
  import CircledAmount from "$lib/components/CircledAmount.svelte";
  import Search from "$lib/components/Search.svelte";
  import { invoices, loadInvoices } from "$lib/stores/InvoiceStore";
  import { asCurrency, sumInvoices } from "$lib/utils/moneyHelpers";
  import { onMount } from "svelte";
  import InvoiceRow from "./InvoiceRow.svelte";

  onMount(() => {
    loadInvoices();
  });
</script>

<svelte:head>
  <title>Invoices | The Dollar Holler</title>
</svelte:head>

<div class="flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-y-6 md:gap-y-4 mb-7 lg:mb-16">
  <!--  Search Field -->
  <Search />

  <!--  New Invoice Button -->
  <div>
    <button class="relative whitespace-nowrap rounded-lg bg-lavenderIndigo text-base px-5 py-2 lg:px-10 lg:py-3 font-sansSerif lg:text-xl font-black text-white shadow-colored hover:shadow-coloredHover translate-y-0 hover:-translate-y-2 transition-all">
      + Invoice
    </button>
  </div>
</div>

<!-- List of Invoices -->
<div>
  <!--  Header -->
  <div class="table-header invoice-table text-daisyBush hidden lg:grid">
    <h3>Status</h3>
    <h3>Due Date</h3>
    <h3>ID</h3>
    <h3>Client</h3>
    <h3 class="text-right">Amount</h3>
    <div></div>
    <div></div>
  </div>

  <!--  Invoices -->
  <div class="flex flex-col-reverse">
    {#each $invoices as invoice}
      <InvoiceRow {invoice} />
    {/each}
  </div>
</div>

<CircledAmount
    label="Total"
    amount={asCurrency(sumInvoices($invoices))} />

<style lang="postcss">
  .table-header h3 {
    @apply text-xl font-black leading-snug;
  }
</style>