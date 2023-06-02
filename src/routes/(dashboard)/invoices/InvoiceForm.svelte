<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Trash from "$lib/components/Icon/Trash.svelte";
  import { states } from "$lib/utils/states";
  import LineItemRows from "./LineItemRows.svelte";
  import { v4 as uuid } from "uuid";
  import { slide } from "svelte/transition";

  const blankLineItem: LineItem = {
    id: uuid(),
    description: "",
    quantity: 0,
    amount: 0,
  };
  let lineItems: LineItem[] = [
    { ...blankLineItem },
  ];
  let isNewClient: boolean = false;

  const addLineItem = () => lineItems = [...lineItems, { ...blankLineItem, id: uuid() }];
  const removeLineItem = (e: CustomEvent) => lineItems = lineItems.filter(x => x.id !== e.detail);
  const updateLineItem = () => lineItems = lineItems;
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">
  Add an Invoice
</h2>

<form class="grid grid-cols-6 gap-x-5">
  <!-- Client -->
  <div class="field col-span-4">
    {#if !isNewClient}
      <label for="client">Client</label>
      <div class="flex items-end gap-x-5">
        <select
            name="client"
            id="client">
          <option value="zeal">ZEAL</option>
        </select>
        <div class="text-base font-bold text-monsoon leading-[3.5rem]">
          or
        </div>
        <Button
            label="+ Client"
            style={"outline"}
            isAnimated={false}
            onClick={() => isNewClient = true} />
      </div>
    {:else}
      <label for="new-client">New Client</label>
      <div class="flex items-end gap-x-5">
        <input
            type="text"
            name="new-client"
            id="new-client">
        <div class="text-base font-bold text-monsoon leading-[3.5rem]">
          or
        </div>
        <Button
            label="Existing Client"
            style={"outline"}
            isAnimated={false}
            onClick={() => isNewClient = false} />
      </div>
    {/if}
  </div>
  <!-- Invoice ID -->
  <div class="field col-span-2">
    <label for="id">Invoice ID</label>
    <input
        type="number"
        name="id"
        id="id">
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
            id="email">
      </div>

      <div class="field col-span-6">
        <label for="street">Street</label>
        <input
            type="text"
            name="street"
            id="street">
      </div>

      <div class="field col-span-2">
        <label for="city">City</label>
        <input
            type="text"
            name="city"
            id="city">
      </div>
      <div class="field col-span-2">
        <label for="state">State</label>
        <select
            name="state"
            id="state">
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
            id="zip">
      </div>
    </div>
  {/if}

  <!-- Due Date -->
  <div class="field col-span-2">
    <label for="due_date">Due Date</label>
    <input
        type="date"
        name="due_date"
        id="due_date">
  </div>
  <!-- Issue Date -->
  <div class="field col-span-2 col-start-5">
    <label for="issue_date">Issue Date</label>
    <input
        type="date"
        name="issue_date"
        id="issue_date">
  </div>
  <!-- Subject -->
  <div class="field col-span-6">
    <label for="subject">Subject</label>
    <input
        type="text"
        name="subject"
        id="subject">
  </div>
  <!-- Line Items -->
  <div class="field col-span-6">
    <LineItemRows
        {lineItems}
        on:addLineItem={addLineItem}
        on:updateLineItem={updateLineItem}
        on:removeLineItem={removeLineItem} />
  </div>

  <!-- Notes -->
  <div class="field col-span-6">
    <label for="notes">Notes <span class="font-normal">(optional, displayed on invoice)</span></label>
    <textarea
        name="notes"
        id="notes"></textarea>
  </div>
  <!-- Terms -->
  <div class="field col-span-6">
    <label for="terms">Terms <span class="font-normal">(optional, enter your terms and conditions)</span></label>
    <textarea
        name="terms"
        id="terms"></textarea>
    <div class="text-xs text-gray-400">
      Formatting tips: <strong>*bold*</strong>, <em>_italics_</em>
    </div>
  </div>
  <!-- Buttons -->
  <div class="field col-span-2">
    <!-- Only if Editing -->
    <Button
        label="Delete"
        style={"textOnlyDestructive"}
        isAnimated={false}
        onClick={() => {}}
        iconLeft={Trash} />
  </div>
  <div class="field col-span-4 flex justify-end gap-x-5">
    <Button
        label="Cancel"
        style={"secondary"}
        isAnimated={false}
        onClick={() => {}} />

    <Button
        label="Save"
        onClick={() => {}} />
  </div>
</form>