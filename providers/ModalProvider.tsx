"use client";

import ProductPreviewModal from "@/components/main/preview-product";
import React, { useEffect, useState } from "react";

const ModalProvider = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  } else {
    return (
      <>
        <ProductPreviewModal />
      </>
    );
  }
};

export default ModalProvider;
