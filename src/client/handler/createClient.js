const { commandMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');
const { createClientDomain } = require('../domain/createClient.domain');

exports.handler = async (command, context) => {
    return commandMapper({ command, context }, inputMode, createClientDomain, outputMode);
};