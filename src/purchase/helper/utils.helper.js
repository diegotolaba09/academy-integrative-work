const descByClient = (purchase, client) => {
    const AMOUNT_BY_POINT = 200;
    let total = 0;
    const products = purchase.products.map(data => {
        const amount = data.price - (data.price * (client.cardType === 'Gold' ? 0.12 : 0.08))
        total += amount
        return {
            ...data,
            amount: amount
        }
    })
    const point = Math.floor(total / AMOUNT_BY_POINT);
    const totalPoints = client.points ? client.points + point : point
    const purchaseData = {
        ...purchase,
        products
    }
    client['points'] = totalPoints
    return { purchaseData, clientData: client }
}

module.exports = { descByClient }