const uuid = require('uuid');
const { getClientService } = require("../../client/service/getClient.service");
const { createService: createServiceClient } = require('../../client/service/saveClientCreated.service');
const { descByClient } = require('../helper/utils.helper');
const { createPurchaseInputSchema } = require("../schema/input/createPurchaseValidation.input");
const { createServicePurchase } = require('../service/savePurchaseCreated.service');


const createPurchaseDomain = async (commandPayload, commandMeta) => {
    try {
        commandPayload.id = uuid.v4();
        const purchase = new createPurchaseInputSchema(commandPayload, commandMeta).get();
        const { Item: client } = await getClientService({ dni: purchase.clientDni });

        if (!client) {
            throw new Error("client not found!");
        }

        const { purchaseData, clientData } = descByClient(purchase, client);
        await createServicePurchase(purchaseData);
        await createServiceClient(clientData);
        return { body: { purchaseData, clientData } };
    } catch (error) {
        console.log(error);
    }
};

module.exports = { createPurchaseDomain };