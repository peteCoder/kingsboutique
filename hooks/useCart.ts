import { Image, ProductSanitySchemaResult } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export interface CartItems {
  _id: string;
  qty: number;
  price: number;
  totalPrice: number;
  imageUrl: Image;
  name: string | undefined;
  _key: string | undefined;
  colourId: string | undefined;
  sizeId: string | undefined;
  qty_available: number;
}

interface DataForOrderedItemsType {
  product: {
    _ref: string;
    _type: string;
  };
  name: string | undefined;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  colourId: string | undefined;
  sizeId: string | undefined;
}[];

interface CartStore {
  cartItems: CartItems[];
  addItemToCart: (
    data: ProductSanitySchemaResult,
    otherProperties:
      | { colourId: string | undefined; sizeId: string | undefined }
      | undefined
  ) => void;
  removeItemFromCart: (_id: string) => void;
  resetCart: () => void;
  addSizeAndColour: (
    data: ProductSanitySchemaResult,
    otherProperties:
      | { colourId: string | undefined; sizeId: string | undefined }
      | undefined
  ) => void;
  incrementProductInCart: (_id: string) => void;
  deleteItemFromCart: (_id: string) => void;
  numberOfItemsInCart: () => number;
  absoluteTotal: () => number;
  getAllOrderItems: () => DataForOrderedItemsType[];
  displayCartData: () => CartItems[];
  shippingFee: number;
  setShippingFee: (fee: number) => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      shippingFee: 0,
      cartItems: [],
      setShippingFee(fee) {
        set({shippingFee: fee});
      },
      addItemToCart: (data, otherProperties) => {
        const cart = get().cartItems;
        //   Check if data _id already exists in exisingData
        //   If it does, increase the number of items
        //   If not number of items should be 1

        //   Check by filtering data
        const existingProductData = cart.find((item) => item._id === data._id);

        if (existingProductData) {
          const itemToConsider = {
            ...existingProductData,
            qty: existingProductData.qty + 1,
            totalPrice: (existingProductData.qty + 1) * data?.price,
            imageUrl: data?.gallery[0]?.imageUrl,
            name: data?.name,
            sizeId: otherProperties?.sizeId,
            colourId: otherProperties?.colourId,
            _key: existingProductData._key,
          };
          const otherProductDataInList = cart.filter(
            (item) => item._id !== data._id
          );
          // Check how you can best sort this array of items
          const items = [itemToConsider, ...otherProductDataInList];

          set({ cartItems: items });

          // Replace console.log with toast provider
        } else {
          const itemToConsider: CartItems = {
            _id: data._id,
            qty: 1,
            price: data.price,
            totalPrice: data.price * 1,
            imageUrl: data?.gallery[0]?.imageUrl,
            name: data?.name,
            sizeId: otherProperties?.sizeId,
            colourId: otherProperties?.colourId,
            qty_available: data?.qty_available,
            _key: uuidv4().toString(),
          };

          const items = [...get().cartItems, itemToConsider];
          set({ cartItems: items });
        }
      },

      addSizeAndColour: (data, otherProperties) => {
        const cart = get().cartItems;
        //   Check if data _id already exists in exisingData
        //   If it does, increase the number of items
        //   If not number of items should be 1

        //   Check by filtering data
        const existingProductData = cart.find((item) => item._id === data._id);

        if (existingProductData) {
          const itemToConsider = {
            ...existingProductData,
            qty: existingProductData.qty,
            totalPrice: (existingProductData.qty) * data?.price,
            imageUrl: data?.gallery[0]?.imageUrl,
            name: data?.name,
            sizeId: otherProperties?.sizeId,
            colourId: otherProperties?.colourId,
            _key: existingProductData._key,
          };
          const otherProductDataInList = cart.filter(
            (item) => item._id !== data._id
          );
          // Check how you can best sort this array of items
          const items = [itemToConsider, ...otherProductDataInList];

          set({ cartItems: items });
        }

      },
      incrementProductInCart: (_id) => {
        const cart = get().cartItems;
        const existingProductData = cart.find((item) => item._id === _id);

        if (existingProductData) {
          const itemToConsider = {
            ...existingProductData,
            _key: existingProductData._key,
            qty: existingProductData.qty + 1,
            totalPrice:
              (existingProductData.qty + 1) * existingProductData.price,
            imageUrl: existingProductData.imageUrl,
            name: existingProductData?.name,
            sizeId: existingProductData.sizeId,
            colourId: existingProductData.colourId,
          };

          // Get all other items in the cart that is not existingProduct Data
          const otherProductDataInList = cart.filter(
            (item) => item._id !== _id
          );
          const items = [itemToConsider, ...otherProductDataInList];

          set({ cartItems: items });
        } else {
          return;
        }
      },
      removeItemFromCart: (_id) => {
        const currentItems = get().cartItems;
        const existingItem = currentItems.find((item) => item._id === _id);

        if (existingItem) {
          if (existingItem.qty > 1) {
            const itemToConsider = {
              ...existingItem,
              qty: existingItem.qty - 1,
              totalPrice: existingItem.price * (existingItem.qty - 1),
            };
            const removedExistingItemsFromList = get().cartItems.filter(
              (item) => item._id !== existingItem._id
            );
            const items = [itemToConsider, ...removedExistingItemsFromList];

            set({ cartItems: items });
          } else {
            const items = get().cartItems.filter((item) => item._id !== _id);

            set({ cartItems: items });
          }
        } else {
          return;
        }
      },
      deleteItemFromCart: (_id) => {
        const items = get().cartItems.filter((item) => item._id !== _id);
        set({ cartItems: items });
      },
      resetCart: () => {
        set({ cartItems: [] });
      },

      numberOfItemsInCart: () => {
        const currentItems = get().cartItems;
        return currentItems.length;
      },

      absoluteTotal: () => {
        const price = get().cartItems.reduce((a, b) => a + b.totalPrice, 0);
        const shippingFee = get().shippingFee;
        const pricePlusShipping = price + shippingFee;
        return pricePlusShipping;
      },

      getAllOrderItems: () => {
        // This is function will come in handy when working with sanity
        // when we need to update the order status
        const currentItems = get().cartItems;
        const dataForOrderedItems = currentItems.map((item) => ({
          product: {
            _ref: item._id,
            _type: "reference",
          },
          _key: item._key,
          name: item.name,
          quantity: item.qty,
          sizeId: item.sizeId,
          colourId: item.colourId,
          unitPrice: item.price,
          subtotal: item.totalPrice,
        }));
        // After creating orderItems we will create an order
        // with the orderItems ids in the sanity database
        return dataForOrderedItems;
      },
      displayCartData: () => {
        const cart = get().cartItems;
        cart.sort((a, b) => a._id.localeCompare(b._id));
        return cart;
      },
    }),
    {
      name: "@cart-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
