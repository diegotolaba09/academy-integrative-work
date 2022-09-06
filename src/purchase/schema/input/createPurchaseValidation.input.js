const { InputValidation } = require("ebased/schema/inputValidation");

class createPurchaseInputSchema extends InputValidation {
    constructor(payload, meta) {
        super({
            source: meta.status,
            payload: payload,
            source: 'PURCHASE.PURCHASE_CREATED',
            specversion: 'v1.0.0',
            schema: {
                strict: false,
                id: { type: String, required: true },
                clientDni: { type: String, required: true },
                products: { type: [], min: 1, required: true },
            },
        });
    }
};

module.exports = { createPurchaseInputSchema };