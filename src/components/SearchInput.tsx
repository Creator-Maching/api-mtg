 type Props = {
  onSearch: (query: string) => void;
};

export function SearchInput({ onSearch }: Props) {
  return (
    <input
      type="text"
      placeholder="Digite o nome da carta em inglês..."
      className="
        w-full p-3 rounded-xl
        bg-zinc-800 text-white
        border border-zinc-700
        focus:outline-none focus:ring-2 focus:ring-indigo-500
      "
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSearch(e.currentTarget.value);
        }
      }}
    />
  );
}
