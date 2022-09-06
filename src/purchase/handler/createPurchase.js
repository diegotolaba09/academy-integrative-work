const { commandMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');
const { createPurchaseDomain } = require('../domain/createPurchase.domain');

exports.handler = async (command, context) => {
    return commandMapper({ command, context }, inputMode, createPurchaseDomain, outputMode);
};