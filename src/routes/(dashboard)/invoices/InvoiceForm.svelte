<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Trash from "$lib/components/Icon/Trash.svelte";
  import LineItemRows from "./LineItemRows.svelte";
  import { v4 as uuid } from "uuid";

  const blankLineItem: LineItem = {
    id: uuid(),
    description: "",
    quantity: 0,
    amount: 0,
  };
  let lineItems: LineItem[] = [
    { ...blankLineItem },
  ];

  const addLineItem = () => lineItems = [...lineItems, { ...blankLineItem, id: uuid() }];
  const removeLineItem = (e: CustomEvent) => lineItems = lineItems.filter(x => x.id !== e.detail);
  const updateLineItem = () => lineItems = lineItems;
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">
  Add an Invoice
</h2>

<form class="grid grid-cols-6 gap-x-5">
  <!-- Client -->
  <div class="field col-span-2">
    <label for="client">Client</label>
    <select
        name="client"
        id="client">
      <option value="zeal">ZEAL</option>
    </select>
  </div>
  <div class="field col-span-2 flex items-end gap-x-5">
    <div class="text-base font-bold text-monsoon leading-[3.5rem]">
      or
    </div>
    <Button
        label="+ Client"
        style={"outline"}
        isAnimated={false}
        onClick={() => {}} />
  </div>
  <!-- Invoice ID -->
  <div class="field col-span-2">
    <label for="id">Invoice ID</label>
    <input
        type="number"
        name="id"
        id="id">
  </div>
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