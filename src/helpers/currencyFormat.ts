
export const currencyFormat = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'ARS',
    }).format(value);
}