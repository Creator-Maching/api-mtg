import type { Card } from "../types/Card";

const BASE_URL = "https://api.scryfall.com";

export async function searchCards(query: string): Promise<Card[]> {
  const response = await fetch(
    `${BASE_URL}/cards/search?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar cartas");
  }

  const data = await response.json();
  return data.data;
}
