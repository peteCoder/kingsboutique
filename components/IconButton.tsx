import React, { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface IconButtonProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  Icon: React.ReactElement;
}

const IconButton: React.FC<IconButtonProps> = ({
  className,
  onClick,
  Icon,
}) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        `
          rounded-full flex items-center justify-center bg-white border shadow-md
          p-2 hover:scale-110 transition hover:bg-transparent
          `,
        className
      )}
    >
      {Icon}
    </Button>
  );
};

export default IconButton;
