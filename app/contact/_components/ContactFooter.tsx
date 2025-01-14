import React from "react";
import Link from "next/link";
import Image from "next/image";
// import Logo from "../assets/Maisya.png";
function ContactFooter() {
  return (
    <footer className="py-10 w-full">
      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 justify-between items-center container mx-auto">
        {/* Copy Right */}
        <div>
          <span className="text-[#ffffff] text-[14px]">
            © 2023 Kings Boutiques. All rights reserved.{" "}
          </span>
        </div>
        {/* Socials */}
        <div className="flex items-center space-x-4">
          <a
            className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-[#ffffff]"
            href="https://www.facebook.com/profile.php?id=100035665735925"
          >
            <Image
              width={33}
              height={33}
              // className="w-[13.93px] h-[19.39px]"
              className="w-[28px] h-[28px]"
              src="/images/facebook.svg"
              alt=""
            />
          </a>
          <a
            className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-[#ffffff]"
            href="https://wa.me/c/2348039591896"
          >
            <Image
              width={33}
              height={33}
              className="w-[30px] h-[30px]"
              src="/images/whatsapp.svg"
              alt=""
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default ContactFooter;
