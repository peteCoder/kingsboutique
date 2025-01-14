import React from "react";

const Heading = ({ text }: { text: string }) => {
  return (
    <div className="relative">
      <h2 className="relative text-xl md:text-2xl after:absolute after:-bottom-4 after:h-[2px] after:w-10 after:bg-black after:left-0">
        {text}
      </h2>
    </div>
  );
};

export default Heading;
