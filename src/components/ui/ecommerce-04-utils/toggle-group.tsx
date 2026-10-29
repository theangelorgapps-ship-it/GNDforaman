import type { ComponentProps } from "react";
import { ToggleGroup as Base } from "../toggle-group";
export { ToggleGroupItem } from "../toggle-group";
export function ToggleGroup({
  spacing: _,
  ...props
}: ComponentProps<typeof Base> & { spacing?: number }) {
  return <Base {...props} />;
}
