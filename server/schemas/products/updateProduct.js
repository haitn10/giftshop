module.exports = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        quantity: { type: 'integer' },
        price: { type: 'string' },
        status: { type: 'string' },
        cateid: { type: 'string' },
        detail: { type: 'string' },
        salerid: { type: 'string' },
    },
    required: ['name', 'quantity', 'price'],
};
