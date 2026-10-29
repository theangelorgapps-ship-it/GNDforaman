import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
export * from "../sheet";
export function SheetBody({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("overflow-y-auto px-1", className)} {...props} />;
}
