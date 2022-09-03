const { getGiftFormatData, getBirthdayGift, validationData } = require('../helper/utils.helper');
const { createClientInputSchema } = require('../schema/input/createClientValidation.input');
const { getClientService } = require('../service/getClient.service');
const { updateClientService } = require('../service/updateClient.service');

const createGiftDomain = async (eventPayload, eventMeta, _rawEvent) => {
    try {
        const body = JSON.parse(eventPayload.Message);
        const data = new createClientInputSchema(body, eventMeta).get();
        validationData(data);
        const client = await getClientService(body)

        if (!client.Item) {
            throw new Error("Client not found!");
        }

        const birthdayGift = getBirthdayGift(client.Item.birthday);
        const formatData = getGiftFormatData(client, birthdayGift);
        await updateClientService(formatData);

        return { body: 'Updated Birthday Gift' };
    } catch (error) {
        console.log(error);
    }
};

module.exports = { createGiftDomain };