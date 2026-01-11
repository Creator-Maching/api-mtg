import { useEffect, useState } from "react";
import axios from "axios";

export function useExchangeRate() {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRate() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("https://open.er-api.com/v6/latest/EUR");
        const brlRate = res.data.rates.BRL;

        if (!brlRate) throw new Error("Taxa BRL não encontrada");

        setRate(brlRate);
      } catch (err) {
        console.error("Erro ao buscar taxa de câmbio:", err);
        setError("Erro ao buscar taxa de câmbio");
      } finally {
        setLoading(false);
      }
    }

    fetchRate();
  }, []);

  return { rate, loading, error };
}
