const { getCardFormatData, validationData, getAge, getCardType } = require('../helper/utils');
const { createClientInputSchema } = require('../schema/input/createClientValidation');
const { getClientService } = require('../service/getClientService');
const { updateClientService } = require('../service/updateClientService');

const createCardDomain = async (eventPayload, eventMeta, _rawEvent) => {
    try {
        const body = JSON.parse(eventPayload.Message);
        const data = new createClientInputSchema(body, eventMeta).get();
        validationData(data);
        const client = await getClientService(data)

        if (!client.Item) {
            throw new Error("Client not found!");
        }

        const age = getAge(client.Item.birthday);
        const cardType = getCardType(age)

        const formatData = getCardFormatData(client, cardType);
        await updateClientService(formatData);

        return { body: 'Updated Card Client!' };
    } catch (error) {
        console.log(error);
    }
};

module.exports = { createCardDomain };