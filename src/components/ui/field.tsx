import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
export function FieldSet({ className, ...props }: ComponentProps<"fieldset">) {
  return (
    <fieldset className={cn("flex min-w-0 flex-col", className)} {...props} />
  );
}
export function FieldLegend({
  className,
  variant: _,
  ...props
}: ComponentProps<"legend"> & { variant?: string }) {
  return <legend className={cn("mb-3", className)} {...props} />;
}
export function Field({
  className,
  orientation,
  ...props
}: ComponentProps<"div"> & { orientation?: string }) {
  return (
    <div
      className={cn(
        "flex gap-3",
        orientation === "horizontal" ? "items-center" : "flex-col",
        className,
      )}
      {...props}
    />
  );
}
export function FieldLabel({ className, ...props }: ComponentProps<"label">) {
  return (
    <label className={cn("flex flex-1 gap-2 text-sm", className)} {...props} />
  );
}
