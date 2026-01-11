import type { DeckCard } from "../hooks/useDeck";

const STORAGE_KEY = "mtg-coffe-deck";

export function loadDeck(): DeckCard[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveDeck(deck: DeckCard[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
  } catch {}
}
