const dynamodb = require('ebased/service/storage/dynamo');
const config = require('ebased/util/config');

const CLIENT_TABLE = config.get('CLIENT_TABLE');

const getAllClientsService = async () => dynamodb.scanTable({ TableName: CLIENT_TABLE });

module.exports = { getAllClientsService };