export const isValidAirportCode = (code: string): boolean => {
  // Basic IATA airport code validation (3 uppercase letters)
  return /^[A-Z]{3}$/.test(code);
};

export const formatFlightDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const formatPrice = (
  price: number,
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(price);
};
