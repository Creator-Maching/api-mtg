import { useState } from "react";
import type { Card } from "../types/Card";
import { convertToBRL } from "../utils/currency";

type Props = {
  card: Card;
  onAdd: (card: Card, quantity: number) => void;
  rate: number | null;
};

export function CardItem({ card, onAdd, rate }: Props) {
  const [quantity, setQuantity] = useState(1);

  const priceEURorUSD = card.prices?.eur ?? card.prices?.usd ?? null;
  const priceBRL = priceEURorUSD && rate
    ? convertToBRL(priceEURorUSD, rate)
    : null;

  return (
    <div className="relative group bg-zinc-900 rounded-lg p-4 text-white shadow hover:shadow-lg transition">

      <img
        src={card.image_uris?.normal}
        alt={card.name}
        className="rounded mb-3 w-full"
      />
      {card.image_uris?.large && (
        <div className="pointer-events-none absolute left-full top-0 ml-4 hidden group-hover:block z-50">
          <img
            src={card.image_uris.large}
            alt={card.name}
            className="w-64 rounded-lg shadow-2xl"
          />
        </div>
      )}


      <h3 className="font-semibold text-sm mb-2">{card.name}</h3>

      {priceBRL && (
        <div className="absolute top-2 right-2 bg-indigo-600 text-xs px-2 py-1 rounded">
          {priceBRL}
        </div>
      )}

      {/* INPUT DE QUANTIDADE */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
          className="w-16 bg-zinc-800 text-white text-sm rounded px-2 py-1"
        />

        <button
          onClick={() => onAdd(card, quantity)}
          className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-sm py-1 rounded"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
