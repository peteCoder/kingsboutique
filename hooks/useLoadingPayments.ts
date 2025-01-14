import { create } from "zustand";

type LoadingPaymentStore = {
  isLoading: boolean;
  setLoadingTrue: () => void;
  setLoadingFalse: () => void;
};

// This global state management hook enables us track the payment loading state
// so we can know if any of the payment buttons is pressed...

export const useLoadingPayments = create<LoadingPaymentStore>((set, _) => ({
  isLoading: false,
  setLoadingFalse: () => {
    set({ isLoading: false });
  },
  setLoadingTrue: () => {
    set({ isLoading: false });
  },
}));


