import { useState } from "react";
import { searchCards } from "../services/scryfall";
import type { Card } from "../types/Card";

export function useScryfall() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function search(query: string) {
    try {
      setLoading(true);
      setError(null);
      const result = await searchCards(query);
      setCards(result);
    } catch {
      setError("Erro ao buscar cartas");
    } finally {
      setLoading(false);
    }
  }

  return {
    cards,
    loading,
    error,
    search,
  };
}
