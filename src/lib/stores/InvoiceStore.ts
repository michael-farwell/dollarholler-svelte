import { writable } from "svelte/store";
import data from "../../seed.json";

export const invoices = writable<Invoice[]>([]);

export const loadInvoices = () => {
  invoices.set(data.invoices);
};

export const addInvoice = (invoiceToAdd: Invoice) => {
  invoices.update((prev: Invoice[]) => [...prev, { ...invoiceToAdd }]);
  return invoiceToAdd;
};

export const deleteInvoice = (invoiceToDelete: Invoice) => {
  invoices.update((prev: Invoice[]) => prev.filter(x => x.id !== invoiceToDelete.id));
  return invoiceToDelete;
};

export const updateInvoice = (invoiceToUpdate: Invoice) => {
  invoices.update((prev: Invoice[]) => {
    prev.map(x => {
      if (x.id === invoiceToUpdate.id) {
        return invoiceToUpdate;
      }
      return x;
    });
    return prev;
  });
};