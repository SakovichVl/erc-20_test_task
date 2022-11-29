import { FC, memo } from "react";
import { TableItemInfo } from "../../types/table";

import { TableCell, TableRow } from "./Table.styles";

type TableItemProps = {
  item: TableItemInfo;
};

const TableItem: FC<TableItemProps> = ({ item }) => {
  const { hash, walletTo, walletFrom, type, amount } = item;

  if (hash === "") return <TableRow></TableRow>;

  const hexToDecimal = (hex: string) => parseInt(hex, 16);

  return (
    <TableRow>
      <TableCell>{type || "..."}</TableCell>
      <TableCell>{hexToDecimal(amount) / 10 ** 18 || "..."}</TableCell>
      <TableCell>
        {walletFrom.slice(0, 4)}...{walletFrom.slice(-4)}
      </TableCell>
      <TableCell>
        {walletTo.slice(0, 4)}...{walletTo.slice(-4)}
      </TableCell>
    </TableRow>
  );
};

export default memo(TableItem);
