import { urlFor } from "@/lib/client";
import { SpecialOfferSchemaResult } from "@/types";
import Link from "next/link";
import React from "react";

const SpecialCard = ({ offer }: { offer: SpecialOfferSchemaResult }) => {
  // console.log(offer.firstBannerImage);
  return (
    <Link
      href={"#"}
      style={{
        backgroundImage: `url(${urlFor(offer?.firstBannerImage).url()})`,
      }}
      className="h-[316px] bg-cover bg-center bg-[#f1f5f9] rounded-xl flex justify-center items-center p-[10px] md:p-[20px] group duration-700 relative"
    >
      {/* Continue modifying the  styles */}
      <div className="bg-white/70 p-4 rounded-lg text-center group-hover:scale-[1.05] duration-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="text-center uppercase">
          <h2 className="text-sm text-center">{offer?.title}</h2>
          <h3 className="text-lg text-primary font-bold text-center">
            {offer?.subTitle}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default SpecialCard;
