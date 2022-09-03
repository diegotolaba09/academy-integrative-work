const { getClientFormatData } = require("../helper/utils");
const { ClientCreatedEvent } = require("../schema/event/clientCreated");
const { createClientInputSchema } = require("../schema/input/createClientValidation");
const { emitClientCreated } = require("../service/emitClientCreated");
const { updateClientService } = require("../service/updateClientService");

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