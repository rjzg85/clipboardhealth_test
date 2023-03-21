const crypto = require('crypto');

const evaluateEventData = (event) => {
  if (event.partitionKey) {
    return typeof event.partitionKey !== 'string'
      ? JSON.stringify(event.partitionKey)
      : event.partitionKey;
  }
  const data = JSON.stringify(event);
  return crypto.createHash('sha3-512').update(data).digest('hex');
};

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = '0';
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    candidate = evaluateEventData(event);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash('sha3-512').update(candidate).digest('hex');
  }

  return candidate;
};
