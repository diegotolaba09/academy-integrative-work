const { validationData } = require('../helper/utils.helper');
const { ClientCreatedEvent } = require('../schema/event/clientCreated.event');
const { createClientInputSchema } = require('../schema/input/createClientValidation.input');
const { emitClientCreated } = require('../service/emitClientCreated.service');
const { createService } = require('../service/saveClientCreated.service');

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