import React from "react";

interface HeadingProps {
  title: string;
  subTitle: string;
}

const Heading = ({ title, subTitle }: HeadingProps) => {
  return (
    <div className="uppercase text-center my-8">
      <h1 className="text-xl md:text-2xl">{title}</h1>
      <h2 className="text-lg md:text-xl">{subTitle}</h2>
    </div>
  );
};

export default Heading;
