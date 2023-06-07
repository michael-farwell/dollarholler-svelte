<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import { deleteInvoice } from "$lib/stores/InvoiceStore.js";
  import { asCurrency, sumLineItems } from "$lib/utils/moneyHelpers.js";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher()
  ;
  export let isModalShowing: boolean;
  export let invoice: Invoice;
</script>

<Modal
    isVisible={isModalShowing}
    on:close>
  <div class="flex flex-col justify-between items-center gap-6 h-full min-h-[175px]">
    <div class="text-center text-xl font-bold text-daisyBush">
      Are you sure you want to delete this invoice to
      <span class="text-scarlet">{invoice.client.name}</span> for
      <span class="text-scarlet">{asCurrency(sumLineItems(invoice.lineItems))}</span>?
    </div>
    <div class="flex gap-4">
      <Button
          label="Cancel"
          isAnimated={false}
          style={"secondary"}
          onClick={() => dispatch("close")} />
      <Button
          label="Yes, Delete It"
          isAnimated={false}
          style={"destructive"}
          onClick={() => {
            deleteInvoice(invoice)
            dispatch("close")
          }} />
    </div>
  </div>
</Modal>