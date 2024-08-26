"use client";

import React, { useEffect, useState } from "react";
import Heading from "./heading";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import BeatLoader from "react-spinners/BeatLoader";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Form
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useCart } from "@/hooks/useCart";
import { UserShippingDataForCheckoutForm } from "@/types";
import { useUserDetails } from "@/hooks/useUserData";
import FlutterwaveButton from "@/components/gateways/FlutterwaveButton";
import { getNigerianRegionsAndShippingBasedOnState, getNigerianStates } from "@/actions/getNigerianStates";
import { cn, formatCurrency } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  address: z.string(),
  country: z.string(),
  phone: z.string(),
  orderNote: z.string(),
  region: z.string(),
  state: z.string(),
});

const FormData = ({
  shippingDetails,
}: {
  shippingDetails: UserShippingDataForCheckoutForm;
}) => {
  const { data: session } = useSession();

  // Local states
  const [hasMounted, setHasMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [shippingFee, setShippingFee] = useState(0);
  
  const [hasLoadedPaymentGateways, setHasLoadedPaymentGateways] =
    useState(false);

  // Global states
  const cart = useCart();
  const userShippingData = useUserDetails();

  const shippingFee = cart.shippingFee;

  const userFirstName = userShippingData?.details?.firstName;
  const userLastName = userShippingData?.details?.lastName;
  const userEmail = session?.user?.email;
  const userAddress = userShippingData?.details?.address;
  const userCountry = userShippingData?.details?.country;
  const userPhone = userShippingData?.details?.phone;
  const userOrderNote = userShippingData?.details?.orderNote;
  const userRegion = userShippingData?.details?.region;
  const userState = userShippingData?.details?.state;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: userFirstName ? userFirstName : "",
      lastName: userLastName ? userLastName : "",
      email: userEmail ? userEmail : "",
      address: userAddress ? userAddress : "",
      country: userCountry ? userCountry : "Nigeria",
      phone: userPhone ? userPhone : "",
      orderNote: userOrderNote ? userOrderNote : "",
      region: userRegion ? userRegion : "",
      state: userState ? userState : "",
      
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    const data = {...values, shippingFee}

    console.log("data for form: ", data);

    userShippingData.setUserDetail(data);

    setTimeout(() => {
      setIsLoading(false);
      setHasLoadedPaymentGateways(true);
    }, 3000);
    
  }

  const NigerianStates = getNigerianStates();

  const activeCountryState = form.watch("state");
  const regionAndShipping = getNigerianRegionsAndShippingBasedOnState(activeCountryState)
  const activeRegionWithShipping = regionAndShipping.regions;

  useEffect(() => {
    setHasMounted(true);
    cart.setShippingFee(0);
  }, []);

  if (!hasMounted) {
    return (
      <div className="min-h-[40vh] w-full flex justify-center items-center">
        {/* Manually change the color */}
        <BeatLoader color="#2563eb" />
      </div>
    );
  }

  return (
    <div className="md:container">
      <div className="relative mb-6">
        <Heading text="Order Details" />
      </div>
      {/* Form for checkout order */}
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="md:basis-1/2">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:font-light"
                        placeholder="John"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Enter your first name</FormDescription>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="md:basis-1/2">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:font-light"
                        placeholder="Doe"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Enter your last name</FormDescription>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder:font-light"
                      placeholder="email@gmail.com"
                      {...field}
                      required
                      readOnly={userEmail ? true : false}
                    />
                  </FormControl>
                  <FormDescription>Enter your email</FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder:font-light "
                      placeholder="09073828343"
                      {...field}
                      required
                      type="number"
                    />
                  </FormControl>
                  <FormDescription>Enter your phone</FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder:font-light"
                      placeholder="Type your address here"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter your address</FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder:font-light "
                      placeholder="Nigeria"
                      required
                      disabled={true}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter your country</FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>State</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? NigerianStates.find(
                            (state) => state.value === field.value
                          )?.label
                        : "Select State"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput required={true} placeholder="Search state..." />
                    <CommandList>
                      <CommandEmpty>No state found.</CommandEmpty>
                      <CommandGroup>
                        {NigerianStates.map((state) => (
                          <CommandItem
                            value={state.label}
                            key={state.value}
                            onSelect={() => {
                              form.setValue("state", state.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                state.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {state.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Region</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? activeRegionWithShipping.find(
                            (region) => region.value === field.value
                          )?.label
                        : "Select region"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput required={true} placeholder="Search region..." />
                    <CommandList>
                      <CommandEmpty>No region found.</CommandEmpty>
                      <CommandGroup>
                        {activeRegionWithShipping.map((region) => (
                          <CommandItem
                            value={region.value}
                            key={region.label}
                            onSelect={() => {
                              form.setValue("region", region.value);
                              // setShippingFee(Number(region.fee) || 0);
                              cart.setShippingFee(Number(region.fee) || 0);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                region.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {region.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription className="text-green-800 text-[13px]">
                {
                  shippingFee !== 0 && Boolean(shippingFee) && (
                    <>
                      Shipping fee: {formatCurrency(shippingFee)}
                    </>
                  )
                }
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
            <FormField
              control={form.control}
              name="orderNote"
              render={({ field }) => (
                <FormItem> 
                  <FormLabel>Order Note</FormLabel>
                  <FormControl>
                    <Textarea
                      className="placeholder:font-light "
                      placeholder="Type your order note."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter your order note</FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            {!hasLoadedPaymentGateways ? (
              <>
                <Button
                  className="w-full h-16 text-lg disabled:opacity-40 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={cart.cartItems.length <= 0}
                >
                  {isLoading ? (
                    <BeatLoader size={12} color="#ffffff" />
                  ) : (
                    <span>Process Order</span>
                  )}
                </Button>
              </>
            ) : (
              <>
                {/* Payment Gateways Buttons are here */}
                <h2 className="text-lg font-bold">Pay with:</h2>
                {/* <PaystackButton /> */}
                <FlutterwaveButton />
              </>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FormData;
