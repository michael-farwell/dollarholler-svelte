<script lang="ts">
  import ThreeDots from "$lib/components/Icon/ThreeDots.svelte";
  import View from "$lib/components/Icon/View.svelte";
  import Tag from "$lib/components/Tag.svelte";
  import { convertDate, isLate } from "$lib/utils/dateHelpers";
  import { asCurrency, sumLineItems } from "$lib/utils/moneyHelpers";

  export let invoice: Invoice;

  const getInvoiceLabel = (): string => {
    if (invoice.invoiceStatus === "draft") {
      return "draft";
    } else if (invoice.invoiceStatus === "sent" && !isLate(invoice.dueDate)) {
      return "sent";
    } else if (invoice.invoiceStatus === "sent" && isLate(invoice.dueDate)) {
      return "late";
    } else if (invoice.invoiceStatus === "paid") {
      return "paid";
    }
  };
</script>

<div class="invoice-table invoice-row items-center bg-white py-3 lg:py-6 rounded-lg shadow-tableRow">
  <div class="status">
    <Tag
        className="ml-auto lg:ml-0"
        label={getInvoiceLabel()} />
  </div>
  <div class="text-sm lg:text-lg dueDate">
    {convertDate(invoice.dueDate)}
  </div>
  <div class="text-sm lg:text-lg invoiceNumber">{invoice.invoiceNumber}</div>
  <div class="text-base lg:text-xl font-bold clientName whitespace-nowrap truncate">
    {invoice.client.name}
  </div>
  <div class="text-sm lg:text-lg font-mono font-bold amount text-right">
    {asCurrency(sumLineItems(invoice.lineItems))}
  </div>
  <div class="viewButton hidden text-sm lg:block lg:text-lg lg:center">
    <a
        href="#"
        class="text-pastelPurple hover:text-daisyBush">
      <View />
    </a>
  </div>
  <div class="moreButton hidden text-sm lg:block lg:text-lg lg:center">
    <button class="text-pastelPurple hover:text-daisyBush">
      <ThreeDots />
    </button>
  </div>
</div>

<style lang="postcss">
  .invoice-row {
    grid-template-areas:
        "invoiceNumber invoiceNumber"
        "clientName amount"
        "dueDate status";
  }

  @media (min-width: 1024px) {
    .invoice-row {
      grid-template-areas: "status dueDate invoiceNumber clientName amount viewButton moreButton";
    }
  }

  .invoice-row .status {
    grid-area: status;
  }

  .invoice-row .dueDate {
    grid-area: dueDate;
  }

  .invoice-row .invoiceNumber {
    grid-area: invoiceNumber;
  }

  .invoice-row .clientName {
    grid-area: clientName;
  }

  .invoice-row .amount {
    grid-area: amount;
  }

  .invoice-row .viewButton {
    grid-area: viewButton;
  }

  .invoice-row .moreButton {
    grid-area: moreButton;
  }
</style>