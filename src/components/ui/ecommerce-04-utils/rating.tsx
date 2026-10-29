import { Star } from "lucide-react";
import type { HTMLAttributes } from "react";
export function Rating({
  value,
  readOnly: _,
  size: __,
  step: ___,
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  value: number;
  readOnly?: boolean;
  size?: string;
  step?: number;
}) {
  return (
    <span className="inline-flex text-amber-500" {...props}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={13}
          fill={i < Math.round(value) ? "currentColor" : "none"}
          aria-hidden
        />
      ))}
    </span>
  );
}
