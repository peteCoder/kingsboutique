"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useForm } from "react-hook-form";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
// import { toast } from "react-hot-toast";

import { useToast } from "@/components/ui/use-toast"


const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const ContactSchema = yup.object({
    name: yup.string().required("Please enter your name."),
    email: yup.string().email("Invalid email").required("Email is required."),
    subject: yup.string().required("Please enter the subject of your message."),
    message: yup.string().required("Please enter your message."),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ContactSchema),
  });

  const onSubmit = async (values: yup.InferType<typeof ContactSchema>) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/contact`, values);
      const data = response.data;
      console.log(data);
      if (data.status === 200) {
        // toast.success(data.message);
        toast({
          description: data.message,
        })
      } else {
        // toast.error(data.message);
        toast({
          description: data.message,
        })
      }
    } catch (error) {
      setIsLoading(false);

      // toast.error("Someething went wrong. Try again.");
      toast({
        description: "Something went wrong. Try again.",
      })
    } finally {
      setIsLoading(false);
      setValue("email", "");
      setValue("name", "");
      setValue("message", "");
      setValue("subject", "");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      action=""
      className="bg-[#FFFFFF] shadow-md w-[100%] md:w-[564px] min-h-[620px] mt-6 rounded-[20px] p-[25px] sm:p-[30px] md:p-[40px] space-y-3 flex flex-col"
    >
      {/* Input 1 */}
      <div className="border-[#5e5d5d] border h-[55px] md:h-[60px] rounded-[5px] outline-none overflow-hidden">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full h-full outline-none text-[15px] px-[20px] bg-white dark:text-black"
          {...register("name")}
        />
      </div>
      <p className="text-red-500 text-sm">{errors.name?.message}</p>
      <div className="border-[#5e5d5d] border h-[55px] md:h-[60px] rounded-[5px] outline-none overflow-hidden">
        <input
          type="text"
          placeholder="Your Email"
          className="w-full h-full outline-none text-[15px] px-[20px] placeholder:text-gray bg-white dark:text-black"
          {...register("email")}
        />
      </div>
      <p className="text-red-500 text-sm">{errors.email?.message}</p>
      <div className="border-[#5e5d5d] border h-[55px] md:h-[60px] rounded-[5px] outline-none overflow-hidden">
        <input
          type="text"
          placeholder="Subject"
          className="w-full h-full outline-none text-[15px] px-[20px] bg-white dark:text-black"
          {...register("subject")}
        />
      </div>
      <p className="text-red-500 text-sm">{errors.subject?.message}</p>

      <div className="border-[#5e5d5d] border rounded-[5px] outline-none overflow-hidden">
        <textarea
          placeholder="Message"
          className="w-full h-full outline-none text-[15px] px-[20px] py-[10px] bg-white dark:text-black"
          id=""
          cols={30}
          rows={10}
          {...register("message")}
        ></textarea>
      </div>
      <p className="text-red-500 text-sm">{errors.message?.message}</p>

      <div className="flex flex-row items-center"></div>

      <div>
        <Button className="h-16 text-[19px] w-full inline-block bg-primary dark:bg-muted text-white rounded-[10px]">
          {isLoading ? <BeatLoader size={15} color="#ffffff" /> : <>Send</>}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
