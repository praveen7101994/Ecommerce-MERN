// src/components/SortableTable.js

import React, { useState } from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { blue, red } from "@mui/material/colors";

function SortableTable({ columns, rows, buttonTitle, onButtonClick }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(columns[0].id);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const isDateString = (str) => {
    return !isNaN(Date.parse(str));
  };

  const formatDateString = (str) => {
    const date = new Date(str);
    return date.toLocaleDateString();
  };

  const isAmountOrTotalKey = (key) => {
    const amountKeywords = ["amount", "total", "price", "cost"];
    return amountKeywords.some((keyword) =>
      key.toLowerCase().includes(keyword)
    );
  };

  const formatAmount = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  const isBoolean = (value) => {
    return typeof value === "boolean";
  };

  const renderBooleanIcon = (value) => {
    return value ? (
      <CheckIcon style={{ color: blue[500] }} />
    ) : (
      <ClearIcon style={{ color: red[500] }} />
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                sortDirection={orderBy === column.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : "asc"}
                  onClick={() => handleRequestSort(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
            {buttonTitle && <TableCell>Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy)).map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  {isDateString(row[column.id])
                    ? formatDateString(row[column.id])
                    : isAmountOrTotalKey(column.id)
                    ? formatAmount(row[column.id])
                    : isBoolean(row[column.id])
                    ? renderBooleanIcon(row[column.id])
                    : row[column.id]}
                </TableCell>
              ))}
              {buttonTitle && (
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => onButtonClick(row)}
                  >
                    {buttonTitle}
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

SortableTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  buttonTitle: PropTypes.string,
  onButtonClick: PropTypes.func,
};

export default SortableTable;
