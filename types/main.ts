export interface ToastItem {
  message: string;
  type: "success" | "error";
}

export interface ToastItemWithId extends ToastItem {
  id: number;
}
