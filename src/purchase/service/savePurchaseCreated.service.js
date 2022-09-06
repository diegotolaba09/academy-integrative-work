const dynamodb = require('ebased/service/storage/dynamo');
const config = require('ebased/util/config');

const PURCHASE_TABLE = config.get('PURCHASE_TABLE');

const createServicePurchase = async (item) => dynamodb.putItem({ TableName: PURCHASE_TABLE, Item: item });

module.exports = { createServicePurchase };