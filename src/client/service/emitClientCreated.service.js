const config = require('ebased/util/config');
const sns = require('ebased/service/downstream/sns');

const CLIENT_CREATED_TOPIC = config.get('TOPIC_CLIENT');

const emitClientCreated = async (clientCreatedEvent) => {
  const { eventPayload, eventMeta } = clientCreatedEvent.get();
  const snsPublishParams = {
    TopicArn: CLIENT_CREATED_TOPIC,
    Message: eventPayload,
  };
  await sns.publish(snsPublishParams, eventMeta);
}

module.exports = { emitClientCreated };