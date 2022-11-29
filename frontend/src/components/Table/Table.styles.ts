import styled from "styled-components";

export const TableWrapper = styled.table`
  width: 600px;
  border-spacing: 0 16px;
`;

export const TableHead = styled.thead`
  width: 100%;
  height: 44px;
  background-color: #0d0e12;
`;

export const TableHeadRow = styled.tr`
  width: 100%;
  background-color: #0d0e12;
  height: 44px;
`;

export const TableRow = styled.tr`
  background-color: #1f2231;
  border-radius: 14px;
`;

export const ColumnName = styled.span`
  color: #ffffff;
  font-family: "Inter";
  font-weight: 400;
  font-size: 16px;
  width: 25%;
`;

export const TableHeadCell = styled.td`
  &:first-child {
    border-top-left-radius: 14px;
    border-bottom-left-radius: 14px;
    padding-left: 34px;
  }

  &:last-child {
    border-top-right-radius: 14px;
    border-bottom-right-radius: 14px;
  }
`;

export const TableCell = styled.td`
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  height: 83px;

  &:first-child {
    padding-left: 26px;
    border-top-left-radius: 14px;
    border-bottom-left-radius: 14px;
  }

  &:last-child {
    border-top-right-radius: 14px;
    border-bottom-right-radius: 14px;
  }
`;
