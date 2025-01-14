import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  // shadowColorCode #f1f5f9
  return <div className={cn(" rounded-md !bg-muted", className)} {...props} />;
}

export { Skeleton };
