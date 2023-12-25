"use client";

import usePreviewModal from "@/hooks/usePreviewModal";
import Modal from "@/components/main/modal";
import Gallery from "./gallery";
import ProductInfo from "./product-info";
// import Gallery from "@/components/Gallery";
// import Info from "@/components/Info";

const ProductPreviewModal = () => {
  const previewModal = usePreviewModal();
  const product = usePreviewModal((state) => state.data);

  if (!product) {
    return null;
  }

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <div className="grid w-full grid-cols-1 items-center gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <Gallery product={product} />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <ProductInfo data={product} />
        </div>
      </div>
    </Modal>
  );
};
export default ProductPreviewModal;
