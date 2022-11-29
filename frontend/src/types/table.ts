export type TableItem = {
  id: number;
  fields: (string | number)[];
};

export type TableHeadItem = {
  filedName?: string;
  name: string;
};

export type TableItemInfo = {
  hash: string;
  walletFrom: string;
  walletTo: string;
  amount: string;
  type: string;
};
