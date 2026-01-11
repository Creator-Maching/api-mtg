export type Card = {
  id: string;
  name: string;
  mana_cost: string;
  type_line: string;
  oracle_text: string;
  image_uris?: {
    normal: string;
    large: string;
  };
  prices: {
    eur: string | null;
    usd: string | null;
    usd_foil: string | null;
  };
};