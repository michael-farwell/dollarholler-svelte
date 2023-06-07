<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Trash from "$lib/components/Icon/Trash.svelte";
  import { addClient, clients, loadClients } from "$lib/stores/ClientStore";
  import { addInvoice, updateInvoice } from "$lib/stores/InvoiceStore.js";
  import { today } from "$lib/utils/dateHelpers";
  import { states } from "$lib/utils/states";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import { v4 as uuid } from "uuid";
  import ConfirmDelete from "./ConfirmDelete.svelte";
  import LineItemRows from "./LineItemRows.svelte";

  const blankLineItem: LineItem = {
    id: uuid(),
    description: "",
    quantity: 0,
    amount: 0,
  };
  let isModalShowing: boolean = false;
  let isNewClient: boolean = false;
  let newClient: Partial<Client> = {} as Client;
  export let invoice: Invoice = {
    client: {} as Client,
    lineItems: [{ ...blankLineItem }] as LineItem[],
  } as Invoice;
  export let formState: "create" | "edit" = "create";
  export let closePanel: () => void = () => {};

  const addLineItem = () => invoice.lineItems = [...invoice.lineItems, { ...blankLineItem, id: uuid() }];
  const handleSubmit = () => {
    if (isNewClient) {
      addClient(newClient as Client);
      invoice.client = newClient as Client;
    }
    if (formState === "create") {
      addInvoice(invoice);
    } else {
      updateInvoice(invoice);
    }
    closePanel();
  };
  const removeLineItem = (e: CustomEvent) => invoice.lineItems = invoice.lineItems &&
                                                                 invoice.lineItems.filter(x => x.id !== e.detail);
  const updateLineItem = () => invoice.lineItems = invoice.lineItems;

  onMount(() => loadClients());
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">
  {formState === "create" ? "Create" : "Edit"} an Invoice
</h2>

<form
    class="grid grid-cols-6 gap-x-5"
    on:submit|preventDefault={handleSubmit}>
  <!-- Client -->
  <div class="field col-span-4">
    {#if !isNewClient}
      <label for="client">Client</label>
      <div class="flex items-end gap-x-5">
        <select
            name="client"
            id="client"
            required="{!isNewClient}"
            bind:value={invoice.client.id}
            on:change={() => {
          const selectedClient = $clients.find(x => x.id === invoice.client.id);
          invoice.client.name = selectedClient ? selectedClient.name : "";
        }}>
          <option></option>
          {#each $clients as client}
            <option value={client.id}>{client.name}</option>
          {/each}
        </select>
        <div class="text-base font-bold text-monsoon leading-[3.5rem]">
          or
        </div>
        <Button
            label="+ Client"
            style={"outline"}
            isAnimated={false}
            onClick={() => {
              isNewClient = true;
              invoice.client.email = "";
              invoice.client.name = "";
            }} />
      </div>
    {:else}
      <label for="new-client">New Client</label>
      <div class="flex items-end gap-x-5">
        <input
            type="text"
            name="new-client"
            id="new-client"
            required={isNewClient}
            bind:value={newClient.name}>
        <div class="text-base font-bold text-monsoon leading-[3.5rem]">
          or
        </div>
        <Button
            label="Existing Client"
            style={"outline"}
            isAnimated={false}
            onClick={() => {
              isNewClient = false;
              newClient = {};
            }} />
      </div>
    {/if}
  </div>
  <!-- Invoice ID -->
  <div class="field col-span-2">
    <label for="invoice-number">Invoice ID</label>
    <input
        type="number"
        name="invoice-number"
        id="invoice-number"
        required
        bind:value={invoice.invoiceNumber}>
  </div>

  <!-- New Client Information -->
  {#if isNewClient}
    <div
        class="field grid col-span-6 gap-x-5"
        transition:slide>
      <div class="field col-span-6">
        <label for="email">Client's Email</label>
        <input
            type="email"
            name="email"
            id="email"
            required
            bind:value={newClient.email}>
      </div>

      <div class="field col-span-6">
        <label for="street">Street</label>
        <input
            type="text"
            name="street"
            id="street"
            bind:value={newClient.street}>
      </div>

      <div class="field col-span-2">
        <label for="city">City</label>
        <input
            type="text"
            name="city"
            id="city"
            bind:value={newClient.city}>
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
        <label for="zip">Zip Code</label>
        <input
            type="text"
            name="zip"
            id="zip"
            bind:value={newClient.zip}>
      </div>
    </div>
  {/if}

  <!-- Due Date -->
  <div class="field col-span-2">
    <label for="due-date">Due Date</label>
    <input
        type="date"
        name="due-date"
        id="due-date"
        min={today}
        required
        bind:value={invoice.dueDate}>
  </div>
  <!-- Issue Date -->
  <div class="field col-span-2 col-start-5">
    <label for="issue-date">Issue Date</label>
    <input
        type="date"
        name="issue-date"
        id="issue-date"
        min={today}
        bind:value={invoice.issueDate}>
  </div>
  <!-- Subject -->
  <div class="field col-span-6">
    <label for="subject">Subject</label>
    <input
        type="text"
        name="subject"
        id="subject"
        bind:value={invoice.subject}>
  </div>
  <!-- Line Items -->
  <div class="field col-span-6">
    <LineItemRows
        lineItems={invoice.lineItems}
        discount={invoice.discount}
        on:addLineItem={addLineItem}
        on:updateLineItem={updateLineItem}
        on:removeLineItem={removeLineItem} />
  </div>

  <!-- Notes -->
  <div class="field col-span-6">
    <label for="notes">Notes <span class="font-normal">(optional, displayed on invoice)</span></label>
    <textarea
        name="notes"
        id="notes"
        bind:value={invoice.notes}></textarea>
  </div>
  <!-- Terms -->
  <div class="field col-span-6">
    <label for="terms">Terms <span class="font-normal">(optional, enter your terms and conditions)</span></label>
    <textarea
        name="terms"
        id="terms"
        bind:value={invoice.terms}></textarea>
    <div class="text-xs text-gray-400">
      Formatting tips: <strong>*bold*</strong>, <em>_italics_</em>
    </div>
  </div>
  <!-- * Buttons -->
  <div class="field col-span-2">
    <!-- ? Only if Editing -->
    {#if formState === "edit"}
      <Button
          label="Delete"
          style={"textOnlyDestructive"}
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
        type="submit"
        class="button bg-lavenderIndigo text-white shadow-colored hover:shadow-coloredHover translate-y-0 hover:-translate-y-2 transition-all">
      Save
    </button>
  </div>
</form>

<ConfirmDelete
    {invoice}
    {isModalShowing}
    on:close={() => {
      isModalShowing = false
      closePanel()
    }} />