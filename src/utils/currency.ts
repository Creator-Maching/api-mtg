export function convertToBRL(
  value: string | null,
  rate: number | null
): number | null {
  if (!value || !rate) return null;
  return Number((Number(value) * rate).toFixed(2));
}
