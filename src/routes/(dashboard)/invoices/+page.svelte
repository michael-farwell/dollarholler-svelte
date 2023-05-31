<script lang="ts">
  import CircledAmount from "$lib/components/CircledAmount.svelte";
  import Portal from "$lib/components/Portal.svelte";
  import Search from "$lib/components/Search.svelte";
  import { invoices, loadInvoices } from "$lib/stores/InvoiceStore";
  import { asCurrency, sumInvoices } from "$lib/utils/moneyHelpers";
  import { onMount } from "svelte";
  import BlankState from "./BlankState.svelte";
  import InvoiceRow from "./InvoiceRow.svelte";
  import InvoiceRowHeader from "./InvoiceRowHeader.svelte";

  onMount(() => {
    loadInvoices();
  });
</script>

<svelte:head>
  <title>Invoices | The Dollar Holler</title>
</svelte:head>

<div class="flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-y-6 md:gap-y-4 mb-7 lg:mb-16">
  <!--  Search Field -->
  {#if $invoices.length > 0}
    <Search />
  {:else}
    <div></div>
  {/if}

  <!--  New Invoice Button -->
  <div>
    <button class="relative whitespace-nowrap rounded-lg bg-lavenderIndigo text-base px-5 py-2 lg:px-10 lg:py-3 font-sansSerif lg:text-xl font-black text-white shadow-colored hover:shadow-coloredHover translate-y-0 hover:-translate-y-2 transition-all">
      + Invoice
    </button>
  </div>
</div>

<!-- List of Invoices -->
<div>
  <Portal><div>Invoice Form</div></Portal>

  <!--  Invoices -->
  {#if $invoices === null}
    Loading..
  {:else if $invoices.length === 0}
    <BlankState />
  {:else}
    <InvoiceRowHeader className="text-daisyBush" />
    <div class="flex flex-col-reverse">
      {#each $invoices as invoice}
        <InvoiceRow {invoice} />
      {/each}
    </div>
    <CircledAmount
        label="Total"
        amount={asCurrency(sumInvoices($invoices))} />
  {/if}
</div>