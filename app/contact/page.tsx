import Navbar from "@/components/main/sections/navbar";
import React from "react";
import ContactForm from "./_components/ContactForm";
import ContactFooter from "./_components/ContactFooter";

const ContactPage = () => {
  return (
    <main>
      <Navbar />

      <div
        style={{
          backgroundImage: `url('/j-logo-bg-removed-2.png')`,
          backgroundBlendMode: "multiply",
        }}
        className=" bg-left bg-no-repeat bg-fixed w-full bg-primary dark:bg-muted px-2 py-10 md:py-0"
      >
        <div className="flex justify-center items-center flex-col">
          <div className="w-full flex flex-col justify-start pt-16 items-center relative">
            <div className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
              Contact us
            </div>
            {/* Form */}
            <ContactForm />
          </div>
        </div>
        <ContactFooter />
      </div>
    </main>
  );
};

export default ContactPage;
