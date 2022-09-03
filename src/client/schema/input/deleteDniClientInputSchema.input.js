const { InputValidation } = require("ebased/schema/inputValidation");

class deleteDniClientInputSchema extends InputValidation {
    constructor(payload, meta) {
        super({
            source: meta.status,
            payload: payload,
            source: 'CLIENT.CLIENT_DELETED',
            specversion: 'v1.0.0',
            schema: {
                strict: false,
                dni: { type: String, required: true },
            },
        });
    }
};

module.exports = { deleteDniClientInputSchema };