interface ToastItem {
  message: string;
  type: "success" | "error";
}

interface ToastItemWithId extends ToastItem {
  id: number;
}
