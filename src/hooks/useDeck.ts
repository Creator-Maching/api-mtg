import { useEffect, useState } from "react";
import type { Card } from "../types/Card";
import { loadDeck, saveDeck } from "../utils/storage";

export type DeckCard = {
  card: Card;
  quantity: number;
};

export function useDeck() {
  const [deck, setDeck] = useState<DeckCard[]>(() => loadDeck());

  useEffect(() => {
    saveDeck(deck);
  }, [deck]);

  function addCard(card: Card, amount = 1) {
    setDeck(prev => {
      const existing = prev.find(c => c.card.id === card.id);

      if (existing) {
        return prev.map(c =>
          c.card.id === card.id
            ? { ...c, quantity: c.quantity + amount }
            : c
        );
      }

      return [...prev, { card, quantity: amount }];
    });
  }

  function removeCard(cardId: string) {
    setDeck(prev =>
      prev
        .map(c =>
          c.card.id === cardId
            ? { ...c, quantity: c.quantity - 1 }
            : c
        )
        .filter(c => c.quantity > 0)
    );
  }

  function clearDeck() {
    setDeck([]);
  }

  return { deck, addCard, removeCard, clearDeck };
}
