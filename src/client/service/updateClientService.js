const dynamodb = require('ebased/service/storage/dynamo');
const config = require('ebased/util/config');

const CLIENT_TABLE = config.get('CLIENT_TABLE');

const updateClientService = async (item) => dynamodb.updateItem({ TableName: CLIENT_TABLE, ...item });

module.exports = { updateClientService };