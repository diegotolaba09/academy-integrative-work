const { getClientFormatData } = require("../helper/utils.helper");
const { ClientCreatedEvent } = require("../schema/event/clientCreated.event");
const { createClientInputSchema } = require("../schema/input/createClientValidation.input");
const { emitClientCreated } = require("../service/emitClientCreated.service");
const { updateClientService } = require("../service/updateClient.service");

const updateClientDomain = async (commandPayload, commandMeta) => {
    try {
        const client = new createClientInputSchema(commandPayload, commandMeta).get();
        const data = getClientFormatData(client)
        await updateClientService(data);
        await emitClientCreated(new ClientCreatedEvent(commandPayload, commandMeta));
        return { body: client };
    } catch (error) {
        console.log(error);
    }
};

module.exports = { updateClientDomain };