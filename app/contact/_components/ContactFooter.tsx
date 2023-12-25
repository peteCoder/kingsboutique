import React from "react";
import Link from "next/link";
import Image from "next/image";
// import Logo from "../assets/Maisya.png";
function ContactFooter() {
  return (
    <footer className="py-10 w-full">
      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 justify-between items-center container mx-auto">
        {/* <Link href="/">
          <Image width={33} height={33} src="/j-logo-bg-removed-2.png" alt="" />
        </Link> */}

        {/* Copy Right */}
        <div>
          <span className="text-[#ffffff] text-[14px]">
            © 2023 KingsBoutique. All rights reserved.{" "}
          </span>
        </div>
        {/* Socials */}
        <div className="flex items-center space-x-4">
          <a
            className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-[#ffffff]"
            href="https://www.facebook.com"
          >
            <Image width={33} height={33}
              className="w-[8.93px] h-[14.39px]"
              src="/images/facebook.png"
              alt=""
            />
          </a>
          <a
            className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-[#ffffff]"
            href="https://www.instagram.com"
          >
            <Image width={33} height={33}
              className="w-[13px] h-[13px]"
              src="/images/instagram.png"
              alt=""
            />
          </a>
          <a
            className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-[#ffffff]"
            href="https://www.twitter.com"
          >
            <Image width={33} height={33}
              className="w-[14.29px] h-[11.69px]"
              src="/images/twitter.png"
              alt=""
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default ContactFooter;
