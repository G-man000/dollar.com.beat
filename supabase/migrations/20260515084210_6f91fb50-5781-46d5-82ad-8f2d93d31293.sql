
-- Add single price to beats
ALTER TABLE public.beats
  ADD COLUMN IF NOT EXISTS price_cents INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'ngn';

-- Backfill price from cheapest existing license (if any)
UPDATE public.beats b
SET price_cents = sub.min_price,
    currency    = sub.currency
FROM (
  SELECT beat_id, MIN(price_cents) AS min_price, MIN(currency) AS currency
  FROM public.beat_licenses
  GROUP BY beat_id
) sub
WHERE b.id = sub.beat_id AND b.price_cents = 0;

-- Make license_type optional on cart_items and purchases
ALTER TABLE public.cart_items  ALTER COLUMN license_type DROP NOT NULL;
ALTER TABLE public.purchases   ALTER COLUMN license_type DROP NOT NULL;
