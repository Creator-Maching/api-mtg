import { CardItem } from "./CardItem";
import type { Card } from "../types/Card";

type Props = {
  cards: Card[];
  onAdd: (card: Card, quantity: number) => void;
  rate: number | null;
};

export function CardList({ cards, onAdd, rate }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {cards.map(card => (
        <CardItem
          key={card.id}
          card={card}
          onAdd={onAdd}  
          rate={rate}
        />
      ))}
    </div>
  );
}
