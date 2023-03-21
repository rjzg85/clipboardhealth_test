const { deterministicPartitionKey } = require('./dpk');

jest.mock('crypto', () => {
  return {
    createHash: () => ({
      update: () => ({
        digest: () => 'hash_mock',
      }),
    }),
  };
});

const TEXT_GREATER_THAN_256 =
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum';

describe('deterministicPartitionKey', () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe('0');
  });

  it('Returns the literal partitionKey value', () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: 'test',
    });
    expect(trivialKey).toBe('test');
  });

  it('Returns a hash when there is not partitionKey value', () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: null,
    });
    expect(trivialKey).toBe('hash_mock');
  });

  it('Returns a hash when partitionKey length is greater then 256', () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: TEXT_GREATER_THAN_256,
    });
    expect(trivialKey).not.toBe(TEXT_GREATER_THAN_256);
    expect(trivialKey).toBe('hash_mock');
  });

  it('Returns a string when partitionKey value is not a string', () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: 1234,
    });
    expect(trivialKey).toBe('1234');
  });
});
