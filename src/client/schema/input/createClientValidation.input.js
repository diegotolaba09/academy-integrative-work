const { InputValidation } = require("ebased/schema/inputValidation");

class createClientInputSchema extends InputValidation {
    constructor(payload, meta) {
        super({
            source: meta.status,
            payload: payload,
            source: 'CLIENT.CLIENT_CREATED',
            specversion: 'v1.0.0',
            schema: {
                strict: false,
                dni: { type: String, required: true },
                firstName: { type: String, required: true },
                lastName: { type: String, required: true },
                birthday: { type: String, required: true },
            },
        });
    }
};

module.exports = { createClientInputSchema };