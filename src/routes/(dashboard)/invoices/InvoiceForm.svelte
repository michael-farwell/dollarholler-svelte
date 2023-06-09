<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Trash from "$lib/components/Icon/Trash.svelte";
  import { addClient, clients, loadClients } from "$lib/stores/ClientStore";
  import { addInvoice, updateInvoice } from "$lib/stores/InvoiceStore";
  import { today } from "$lib/utils/dateHelpers";
  import { states } from "$lib/utils/states";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import { v4 as uuid } from "uuid";
  import ConfirmDelete from "./ConfirmDelete.svelte";
  import LineItemRows from "./LineItemRows.svelte";
  import { snackbar } from "$lib/stores/SnackbarStore";

  const blankLineItem = {
    id: uuid(),
    description: "",
    quantity: 0,
    amount: 0,
  };

  let isNewClient: boolean = false;
  export let invoice: Invoice = {
    client: {} as Client,
    lineItems: [{ ...blankLineItem }] as LineItem[],
  } as Invoice;
  let newClient: Partial<Client> = {};

  export let formState: "create" | "edit" = "create";

  export let closePanel: () => void = () => {};

  let isModalShowing = false;

  const initialDiscount = invoice.discount || 0;

  const addLineItem = () => invoice.lineItems = [...(invoice.lineItems as []), { ...blankLineItem, id: uuid() }];
  const removeLineItem = (event: CustomEvent) => invoice.lineItems = invoice?.lineItems && invoice.lineItems.filter(
      (item) => item.id !== event.detail);
  const updateLineItem = () => invoice.lineItems = invoice.lineItems;
  const handleSubmit = () => {
    if (isNewClient) {
      addClient(newClient as Client);
      invoice.client = newClient as Client;
    }
    if (formState === "create") {
      addInvoice(invoice);
      snackbar.send({
        message: "Your invoice was successfully created.",
        type: "success",
      });
    } else {
      updateInvoice(invoice);
      snackbar.send({
        message: "Your invoice was successfully updated.",
        type: "success",
      });
    }
    closePanel();
  };
  const updateDiscount = (event: CustomEvent) => invoice.discount = event.detail.discount;

  onMount(() => loadClients());
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">
  {formState === "create" ? "Create" : "Edit"} an Invoice
</h2>

<form
    class="grid grid-cols-6 gap-x-5"
    on:submit|preventDefault={handleSubmit}>
  <!-- *Client -->
  <div class="field col-span-6 md:col-span-4">
    {#if !isNewClient}
      <label for="client">Client</label>
      <div class="flex items-end gap-x-2 md:gap-x-5 flex-wrap sm:flex-nowrap">
        <select
            class="mb-2 sm:mb-0"
            name="client"
            id="client"
            required={!isNewClient}
            bind:value={invoice.client.id}
            on:change={() => {
            const selectedClient = $clients.find((client) => client.id === invoice.client.id);
            invoice.client.name = selectedClient?.name !== undefined ? selectedClient.name : '';
          }}
        >
          <option></option>
          {#each $clients as client}
            <option value={client.id}>{client.name}</option>
          {/each}
        </select>
        <div class="text-base font-bold leading-[2.5rem] lg:leading-[3.5rem] text-monsoon">or</div>
        <Button
            label="+ Client"
            onClick={() => {
            isNewClient = true;
            invoice.client.name = "";
            invoice.client.email = "";
          }}
            style={"outline"}
            isAnimated={false} />
      </div>
    {:else}
      <label for="new-client">New Client</label>
      <div class="flex items-end gap-x-2 md:gap-x-5 flex-wrap sm:flex-nowrap">
        <input
            class="mb-2 sm:mb-0"
            type="text"
            id="new-client"
            name="new-client"
            required={isNewClient}
            bind:value={newClient.name} />
        <div class="text-base font-bold leading-[2.5rem] lg:leading-[3.5rem] text-monsoon">or</div>
        <Button
            label="Existing Client"
            onClick={() => {
            isNewClient = false;
            newClient = {};
          }}
            style={"outline"}
            isAnimated={false} />
      </div>
    {/if}
  </div>

  <!-- *Invoice ID -->
  <div class="field col-span-6 md:col-span-2 row-start-1 md:row-start-auto">
    <label for="invoice-number">Invoice ID</label>
    <input
        type="number"
        id="invoice-number"
        name="invoice-number"
        required
        bind:value={invoice.invoiceNumber} />
  </div>

  <!-- *New Client -->
  {#if isNewClient}
    <div
        class="field col-span-6 grid gap-x-5"
        transition:slide>
      <div class="field col-span-6">
        <label for="email">Client's Email</label>
        <input
            type="email"
            name="email"
            id="email"
            required={isNewClient}
            bind:value={newClient.email}
        />
      </div>

      <div class="field col-span-6">
        <label for="street">Street</label>
        <input
            type="text"
            name="street"
            id="street"
            bind:value={newClient.street} />
      </div>

      <div class="field col-span-2">
        <label for="city">City</label>
        <input
            type="text"
            name="city"
            id="city"
            bind:value={newClient.city} />
      </div>

      <div class="field col-span-2">
        <label for="state">State</label>
        <select
            name="state"
            id="state"
            bind:value={newClient.state}>
          <option></option>
          {#each states as state}
            <option value={state.value}>{state.name}</option>
          {/each}
        </select>
      </div>

      <div class="field col-span-2">
        <label for="zip">Zip</label>
        <input
            type="text"
            name="zip"
            id="zip"
            bind:value={newClient.zip} />
      </div>
    </div>
  {/if}

  <!-- *Due Date -->
  <div class="field col-span-3 sm:col-span-2">
    <label for="due-date">Due Date</label>
    <input
        type="date"
        id="due-date"
        name="due-date"
        min={today}
        required
        bind:value={invoice.dueDate} />
  </div>

  <!-- *Issue Date -->
  <div class="field col-span-3 sm:col-span-2 md:col-start-5">
    <label for="issue-date">Issue Date</label>
    <input
        type="date"
        name="issue-date"
        id="issue-date"
        min={today}
        bind:value={invoice.issueDate} />
  </div>

  <!-- *Subject -->
  <div class="field col-span-6">
    <label for="subject">Subject</label>
    <input
        type="text"
        name="subject"
        id="subject"
        bind:value={invoice.subject} />
  </div>

  <!-- *Line Items -->
  <div class="field col-span-6">
    <LineItemRows
        discount={invoice.discount}
        lineItems={invoice.lineItems}
        on:addLineItem={addLineItem}
        on:removeLineItem={removeLineItem}
        on:updateLineItem={updateLineItem}
        on:updateDiscount={updateDiscount}
    />
  </div>

  <!-- *Notes -->
  <div class="field col-span-6">
    <label for="notes">Notes <span class="font-normal">(optional, displayed on invoice)</span></label>
    <textarea
        name="notes"
        id="notes"
        bind:value={invoice.notes}></textarea>
  </div>

  <!-- *Terms -->
  <div class="field col-span-6">
    <label for="terms">Terms <span class="font-normal">(optional, enter your terms and conditions)</span></label>
    <textarea
        name="terms"
        id="terms"
        bind:value={invoice.terms}></textarea>
    <div class="text-xs text-gray-400">
      Formatting tips: <strong>*bold*</strong>, <em>_italics_</em>.
    </div>
  </div>

  <!-- *Buttons -->
  <div class="field col-span-2">
    <!-- ?Only be visible if editing -->
    {#if formState === 'edit'}
      <Button
          style={"textOnlyDestructive"}
          label="Delete"
          isAnimated={false}
          onClick={() => isModalShowing = true}
          iconLeft={Trash} />
    {/if}
  </div>
  <div class="field col-span-4 flex justify-end gap-x-5">
    <Button
        label="Cancel"
        style={"secondary"}
        isAnimated={false}
        onClick={() => closePanel()} />
    <button
        class="button translate-y-0 bg-lavenderIndigo text-white shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHover"
        type="submit">
      Save
    </button>
  </div>
</form>

<ConfirmDelete
    {invoice}
    {isModalShowing}
    on:close={() => {
    isModalShowing = false;
    closePanel();
  }} />