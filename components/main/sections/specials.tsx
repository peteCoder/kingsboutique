import { getSpecialOffers } from "@/actions/getSpecialOffers";
import React from "react";
import SpecialCard from "../special-card";
import { SpecialOfferSchemaResult } from "@/types";

const Specials = async () => {
  const specialOffers: SpecialOfferSchemaResult[] = await getSpecialOffers();
  // console.log("specialOffers: ", JSON.stringify(specialOffers));
  return (
    <>
      {specialOffers.length > 0 && (
        <section className="px-2 sm:container">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {specialOffers.map((offer) => (
              <SpecialCard key={offer?._id} offer={offer} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Specials;
