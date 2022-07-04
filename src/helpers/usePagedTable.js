import { useState, useRef } from "react";
import { TableRow, TableCell, TablePagination } from "@mui/material";
import TablePaginationActions from "components/TablePaginationActions";

const usePagedTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = () =>
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rows = function () {
    return rowsPerPage > 0
      ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : data;
  };

  const fillRows = function (props) {
    if (emptyRows())
      return (
        <TableRow {...props} style={{ height: 64 * emptyRows() }}>
          <TableCell colSpan={6} />
        </TableRow>
      );
  };

  const pagination = function () {
    return (
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        colSpan={6}
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: {
            "aria-label": "rows per page",
          },
          native: true,
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    );
  };

  return {
    page,
    rows,
    fillRows,
    pagination,
    setData,
  };
};

export default usePagedTable;
