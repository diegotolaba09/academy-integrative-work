const { deleteDniClientInputSchema } = require('../schema/input/deleteDniClientInputSchema.input');
const { deleteClientService } = require('../service/deleteClient.service');

const deleteClientDomain = async (commandPayload, commandMeta) => {
    try {
        const { dni } = new deleteDniClientInputSchema(commandPayload, commandMeta).get();
        await deleteClientService(dni);
        return { body: `Client with DNI: ${dni} deleted successfully!` };
    } catch (error) {
        console.log(error);
    }
};

module.exports = { deleteClientDomain };