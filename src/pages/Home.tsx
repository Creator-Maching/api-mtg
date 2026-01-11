import { useScryfall } from "../hooks/useScryfall";
import { useDeck } from "../hooks/useDeck";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { SearchInput } from "../components/SearchInput";
import { CardList } from "../components/CardList";
import { Deck } from "../components/Deck";
import img from '../assets/images/Coffe_and_Friend_mtg.png'

export default function Home() {
  const { cards, loading, error, search } = useScryfall();
  const { deck, addCard, removeCard } = useDeck();
  const { rate, loading: rateLoading } = useExchangeRate();

  return (
    <div className="min-h-screen bg-zinc-950 p-8 flex flex-col">
      <img src={img} alt="Coffee and Friend mtg" className="mb-6 w-64 rounded-lg shadow-lg mx-auto" />

      <h1 className="text-3xl text-white font-bold mb-6 text-center">
        MTG Coffee Deck Builder
      </h1>

      <SearchInput onSearch={search} />

      {loading && <p className="text-zinc-400 mt-4">Carregando cartas...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {rateLoading && <p className="text-zinc-400 mt-2">Carregando taxa de câmbio...</p>}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8 w-full overflow-visible">
        <div className="md:col-span-3">
          <CardList cards={cards} onAdd={addCard} rate={rate} />
        </div>

        <div className="overflow-visible">
          <Deck deck={deck} rate={rate} onAdd={addCard} onRemove={removeCard} />
        </div>
      </div>

      <footer className="mt-8">
        <p className="text-blue-500 text-center text-sm bg-zinc-900 p-2 rounded">
          2026 Desenvolvido por Pedro Dias Mendes Vianna <br />
          Contato: pdiasmendesvianna@gmail.com
        </p>
      </footer>
    </div>
  );
}



