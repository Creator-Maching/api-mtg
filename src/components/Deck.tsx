import { useState } from "react";
import type { DeckCard } from "../hooks/useDeck";
import type { Card } from "../types/Card";
import { convertToBRL } from "../utils/currency";
import { exportToLigaMagic } from "../utils/exportDeck";


type Props = {
  deck: DeckCard[];
  rate: number | null;
  onAdd: (card: Card, amount?: number) => void;
  onRemove: (cardId: string) => void;
};

export function Deck({ deck, rate, onAdd, onRemove }: Props) {
  const [hovered, setHovered] = useState<DeckCard | null>(null);


  const totalPrice = deck.reduce((acc, { card, quantity }) => {
    const eurOrUsd = card.prices?.eur ?? card.prices?.usd ?? null;
    const priceBRL = convertToBRL(eurOrUsd, rate);
    return priceBRL ? acc + priceBRL * quantity : acc;
  }, 0);

  function handleExport() {
  const text = exportToLigaMagic(deck);
  navigator.clipboard.writeText(text);
  alert("Deck copiado! Cole na LigaMagic 🙂");
}


  return (
    <div className="bg-zinc-900 p-4 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-4">Deck</h2>

      {deck.length === 0 && (
        <p className="text-zinc-400">Nenhuma carta adicionada</p>
      )}

      <ul className="space-y-2">
        {deck.map(deckCard => {
          const eurOrUsd =
            deckCard.card.prices?.eur ??
            deckCard.card.prices?.usd ??
            null;

          const priceBRL = convertToBRL(eurOrUsd, rate);
          const isExpensive = priceBRL !== null && priceBRL > 15;

          const colorClass = isExpensive
            ? "text-red-400"
            : "text-green-400";

          return (
            <li
              key={deckCard.card.id}
              className="flex items-center justify-between bg-zinc-800 px-3 py-2 rounded"
            >
              {/* NOME + PREÇO */}
              <span
                className={`cursor-pointer underline underline-offset-2 ${colorClass}`}
                onMouseEnter={() => setHovered(deckCard)}
                onMouseLeave={() => setHovered(null)}
              >
                {deckCard.card.name}
                {priceBRL !== null && (
                  <span className="ml-2 text-sm">
                    R$ {priceBRL.toFixed(2)}
                  </span>
                )}
              </span>

              {/* CONTROLES */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onRemove(deckCard.card.id)}
                  className="px-2 rounded bg-zinc-700 hover:bg-red-600"
                >
                  −
                </button>

                <span className="w-6 text-center text-zinc-300">
                  {deckCard.quantity}
                </span>

                <button
                  onClick={() => onAdd(deckCard.card, 1)}
                  className="px-2 rounded bg-zinc-700 hover:bg-green-600"
                >
                  +
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      
      {deck.length > 0 && (
        <div className="mt-4 pt-3 border-t border-zinc-700 flex justify-between font-semibold">
          <span>Total do deck</span>
          <span>R$ {totalPrice.toFixed(2)}</span>
        </div>
      )}
      <button
      onClick={handleExport}
      className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded font-semibold"
        >Exportar para LigaMagic
      </button>


    
      {hovered?.card.image_uris?.large && (
        <div className="fixed top-1/2 right-6 -translate-y-1/2 z-[9999] pointer-events-none">
          <img
            src={hovered.card.image_uris.large}
            alt={hovered.card.name}
            className="w-72 rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
