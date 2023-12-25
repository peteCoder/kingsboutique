import { Image, ProductSanitySchemaResult } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

import { toast } from "react-hot-toast";

interface FavouriteItems {
  _id: string;
  qty: number;
  price: number;
  totalPrice: number;
  imageUrl: Image;
  name: string | undefined;
  _key: string | undefined;
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
}
[];

interface FavouritesStore {
  favouriteItems: ProductSanitySchemaResult[];
  addItemToFavourites: (data: ProductSanitySchemaResult) => void;
  removeItemFromFavourites: (_id: string) => void;
  resetFavourites: () => void;
  deleteItemFromFavourites: (_id: string) => void;
  numberOfItemsInFavourites: () => number;
  displayFavouritesData: () => ProductSanitySchemaResult[];
}

export const useFavourites = create(
  persist<FavouritesStore>(
    (set, get) => ({
      favouriteItems: [],
      addItemToFavourites: (data) => {
        const favourites = get().favouriteItems;
        //   Check if data _id already exists in exisingData
        //   If it does, increase the number of items
        //   If not number of items should be 1

        //   Check by filtering data
        const existingProductData = favourites.find(
          (item) => item._id === data._id
        );

        if (existingProductData) {
          toast.success("Item already in favourites");
          return;
        } else {
          const items = [...get().favouriteItems, data];
          set({ favouriteItems: items });

          // Replace console.log with toast provider
          // console.log("Item was added to favourites successfully.");
          toast.success("Item was added to favourites successfully.");
        }
      },

      removeItemFromFavourites: (_id) => {
        const currentItems = get().favouriteItems;

        const items = get().favouriteItems.filter((item) => item._id !== _id);
        set({ favouriteItems: items });
        console.log("Item was removed from favourites successfully.");

        toast.success("Item was removed from favourites successfully.");
      },
      deleteItemFromFavourites: (_id) => {
        const items = get().favouriteItems.filter((item) => item._id !== _id);
        set({ favouriteItems: items });
      },
      resetFavourites: () => {
        set({ favouriteItems: [] });

        console.log("Favourites is empty");
        toast.success("Favourites is empty.");
      },

      numberOfItemsInFavourites: () => {
        const currentItems = get().favouriteItems;
        return currentItems.length;
      },

      displayFavouritesData: () => {
        const favourites = get().favouriteItems;
        favourites.sort((a, b) => a._id.localeCompare(b._id));
        return favourites;
      },
    }),
    {
      name: "@favourites-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
