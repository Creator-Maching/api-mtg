import type { DeckCard } from "../hooks/useDeck";

export function exportToLigaMagic(deck: DeckCard[]): string {
  return deck
    .map(({ card, quantity }) => `${quantity} ${card.name}`)
    .join("\n");
}
