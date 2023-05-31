<script lang="ts">
  import BlankRow from "$lib/components/BlankRow.svelte";
  import InvoiceRowHeader from "./InvoiceRowHeader.svelte";
</script>

<div>
  <div class="-mt-8 md:-mt-6 lg:-mt-14">
    <h2 class="font-handwriting text-2xl md:text-4xl font-bold text-caribbeanGreen bg-arrowLeftUp bg-left pl-28 md:bg-arrowRightUp bg-no-repeat md:bg-right pt-14 md:pl-0 md:pr-28 md:text-right mb-10">
      Add Your First Invoice
    </h2>
  </div>

  <!-- Invoice Header -->
  <InvoiceRowHeader className="text-fog" />

  <!-- Blank Rows -->
  <BlankRow />
  <BlankRow />
  <BlankRow />
</div>