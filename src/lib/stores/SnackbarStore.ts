import { writable } from "svelte/store";
import { v4 as uuid } from "uuid";

const newSnackbar = () => {
  const { update, subscribe } = writable<Snackbar[]>([]);

  function send (content: { message: string, type: NotificationType }) {
    const newContent = { ...content, id: uuid() };
    update((prev) => [...prev, newContent]);
  }

  function remove (id: string | null = null) {
    update((prev) => {
      if (id) return prev.filter(x => x.id !== id);
      const [first, ...rest] = prev;
      return [...rest];
    });
  }

  return { subscribe, send, remove };
};

export const snackbar = newSnackbar();