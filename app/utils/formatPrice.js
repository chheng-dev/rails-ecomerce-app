export const currencyUsd = (price) => {
  if (price || price === 0) {
    return `$${parseFloat(price).toFixed(2)}`;
  }

  return "$0.00"
}
