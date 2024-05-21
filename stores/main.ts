import { defineStore } from "pinia";
import type { ToastItem, ToastItemWithId } from "~/types/main";

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useMainStore = defineStore("main", {
  // a function that returns a fresh state
  state: () => ({
    toastMessageList: [] as ToastItemWithId[],
  }),
  // optional getters
  getters: {
    getToastMessages: (state) => state.toastMessageList,
  },
  // optional actions
  actions: {
    addToastMessage(toastMessage: ToastItem) {
      const id =
        this.toastMessageList[this.toastMessageList.length - 1]?.id + 1 || 0;
      this.toastMessageList.push({
        message: toastMessage.message,
        id,
        type: toastMessage.type,
      });
      setTimeout(() => {
        const index = this.toastMessageList.findIndex((item) => item.id === id);
        if (index !== -1) {
          this.removeToastMessage(index);
        }
      }, 5000);
    },
    removeToastMessage(index: number) {
      this.toastMessageList.splice(index, 1);
    },
    reset() {
      // `this` is the store instance
      this.toastMessageList = [];
    },
  },
});
