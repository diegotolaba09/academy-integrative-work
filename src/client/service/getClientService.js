const dynamodb = require('ebased/service/storage/dynamo');
const config = require('ebased/util/config');

const CLIENT_TABLE = config.get('CLIENT_TABLE');

const getClientService = async ({ dni }) => dynamodb.getItem({ TableName: CLIENT_TABLE, Key: { dni } });

module.exports = { getClientService };