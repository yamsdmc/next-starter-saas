export const formatPriceByCurrency = (amount: number, currency = 'EUR') => {
    const numericAmount = amount / 100;

    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numericAmount);
};