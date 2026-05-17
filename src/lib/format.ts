export const fmtPrice = (cents: number, currency = "ngn") =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: currency.toUpperCase() }).format(
    cents / 100,
  );
