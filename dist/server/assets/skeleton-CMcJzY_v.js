import { jsx } from "react/jsx-runtime";
import { c as cn } from "./router-CR-vLeYt.js";
const fmtPrice = (cents, currency = "ngn") => new Intl.NumberFormat("en-NG", { style: "currency", currency: currency.toUpperCase() }).format(
  cents / 100
);
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("animate-pulse rounded-md bg-primary/10", className), ...props });
}
export {
  Skeleton as S,
  fmtPrice as f
};
