export enum TxType {
  PURCHASED = 'purchased',
  SOLD = 'sold',
}

export interface Transaction {
  id: number;
  sku: number;
  tx_type: TxType;
  quantity: number;
  total_cost?: number;
  client: string;
  tx_date: Date;
}
