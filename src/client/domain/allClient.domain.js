const { getAllClientsService } = require('../service/allClient.service');

const allClientDomain = async (_commandPayload, _commandMeta) => {
    try {
        const allClients = await getAllClientsService();
        return {
            body: {
                data: allClients.Items
            }
        };
    } catch (error) {
        console.log(error);
    }
};

module.exports = { allClientDomain };