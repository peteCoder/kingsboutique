import { create } from "zustand";
import { ProductSanitySchemaResult } from "@/types";

interface PreviewModalStore {
  isOpen: boolean;
  data?: ProductSanitySchemaResult;
  onOpen: (data: ProductSanitySchemaResult) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: ProductSanitySchemaResult) => set({ data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;


