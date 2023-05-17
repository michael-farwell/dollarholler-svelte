<script lang="ts">
  import CircledAmount from "$lib/components/CircledAmount.svelte";
  import ThreeDots from "$lib/components/Icon/ThreeDots.svelte";
  import View from "$lib/components/Icon/View.svelte";
  import Search from "$lib/components/Search.svelte";
  import Tag from "$lib/components/Tag.svelte";
</script>

<svelte:head>
  <title>Invoices | The Dollar Holler</title>
</svelte:head>

<div class="flex justify-between items-center mb-16">
  <!--  Search Field -->
  <Search />

  <!--  New Invoice Button -->
  <div>
    <button class="relative whitespace-nowrap rounded-lg bg-lavenderIndigo px-10 py-3 font-sansSerif text-xl font-black text-white shadow-colored hover:shadow-coloredHover translate-y-0 hover:-translate-y-2 transition-all">
      + Invoice
    </button>
  </div>
</div>

<!-- List of Invoices -->
<div>
  <!--  Header -->
  <div class="table-header invoice-table text-daisyBush">
    <h3>Status</h3>
    <h3>Due Date</h3>
    <h3>ID</h3>
    <h3>Client</h3>
    <h3>Amount</h3>
    <div></div>
    <div></div>
  </div>

  <!--  Invoices -->
  <div class="invoice-table items-center bg-white py-6 rounded-lg shadow-tableRow">
    <div>
      <Tag />
    </div>
    <div class="text-lg">1970-01-01</div>
    <div class="text-lg">12345</div>
    <div class="text-xl font-bold">Compress.fm</div>
    <div class="text-lg font-mono font-bold">$504.00</div>
    <div class="text-lg center">
      <a
          href="#"
          class="text-pastelPurple hover:text-daisyBush">
        <View />
      </a>
    </div>
    <div class="text-lg center">
      <button class="text-pastelPurple hover:text-daisyBush">
        <ThreeDots />
      </button>
    </div>
  </div>
</div>

<CircledAmount
    label="Total"
    amount="$1,144.00" />

<style lang="postcss">
  .table-header h3 {
    @apply text-xl font-black leading-snug;
  }
</style>