import { toast } from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserInformation = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  country: string;
  orderNote: string;
  state: string;
  region: string;
  shippingFee: number;
};

type UserDetailStore = {
  details: UserInformation;
  setUserDetail: (detail: UserInformation) => void;
  removeUserDetail: () => void;
};

export const useUserDetails = create(
  persist<UserDetailStore>(
    (set, get) => ({
      details: {
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        phone: "",
        country: "",
        orderNote: "",
        state: "",
        region: "",
        shippingFee: 0,
      },
      setUserDetail: (detail) => {
        const details = { ...get().details, ...detail };
        set({ details });
        toast.success("Thank you!");
      },
      removeUserDetail: () => {
        const details = {
          email: "",
          firstName: "",
          lastName: "",
          address: "",
          phone: "",
          country: "",
          orderNote: "",
          state: "",
          region: "",
          shippingFee: 0
        };
        set({ details });
        toast.success("Fields are cleared!");
      },
    }),
    {
      name: "@shipping-data-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
