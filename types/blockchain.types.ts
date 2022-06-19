export interface ITransactionCreate {
  'block': number,
  'txnHash': string,
  'timestampString': string,
  'status': string,
  'value': number,
  'fromAddress': string,
  'toAddress': string,
  'currency': string
}
