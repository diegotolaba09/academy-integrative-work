const dynamodb = require('ebased/service/storage/dynamo');
const config = require('ebased/util/config');

const CLIENT_TABLE = config.get('CLIENT_TABLE');

const createService = async (item) => dynamodb.putItem({ TableName: CLIENT_TABLE, Item: item });

module.exports = { createService };