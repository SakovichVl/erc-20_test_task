import { FC, memo } from "react";

import { TableHeadItem } from "../../types/table";

import { ColumnName, TableHeadCell } from "./Table.styles";

type TableHeadCellItemProps = {
  item: TableHeadItem;
};

const TableHeadCellItem: FC<TableHeadCellItemProps> = ({ item }) => {
  const { name } = item;

  return (
    <TableHeadCell>
      <ColumnName>{name}</ColumnName>
    </TableHeadCell>
  );
};

export default memo(TableHeadCellItem);
