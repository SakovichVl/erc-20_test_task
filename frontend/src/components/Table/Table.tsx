import { FC, memo } from "react";
import { TableHeadItem, TableItemInfo } from "../../types/table";

import TableHeadCellItem from "./TableHeadCellItem";
import TableItem from "./TableItem";

import { TableHead, TableHeadRow, TableWrapper } from "./Table.styles";

type TableProps = {
  items: TableItemInfo[];
  headItems: TableHeadItem[];
};

const Table: FC<TableProps> = ({ items, headItems }) => {
  return (
    <TableWrapper>
      <TableHead>
        <TableHeadRow>
          {headItems.map((item) => (
            <TableHeadCellItem item={item} key={item.name} />
          ))}
        </TableHeadRow>
      </TableHead>
      <tbody>
        {Array.isArray(items)
          ? items.map((item) => <TableItem item={item} key={item.hash} />)
          : null}
      </tbody>
    </TableWrapper>
  );
};

export default memo(Table);
