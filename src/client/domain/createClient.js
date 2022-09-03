const { validationData } = require('../helper/utils');
const { ClientCreatedEvent } = require('../schema/event/clientCreated');
const { createClientInputSchema } = require('../schema/input/createClientValidation');
const { emitClientCreated } = require('../service/emitClientCreated');
const { createService } = require('../service/saveClientCreated');

const createClientDomain = async (commandPayload, commandMeta) => {
    try {
        validationData(commandPayload)
        const client = new createClientInputSchema(commandPayload, commandMeta).get();
        await createService(client);
        await emitClientCreated(new ClientCreatedEvent(commandPayload, commandMeta));
        return { body: client };
    } catch (error) {
        console.log(error);
    }
};

module.exports = { createClientDomain };