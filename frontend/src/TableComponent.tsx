/**
 * This is the TableComponent that displays the volunteers in a table.
 *
 * It contains the table, pagination, and sorting logic.
 * @param rows - the list of volunteers
 * @param setClickCount - the function to set the click count
 */

import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Avatar from "@mui/material/Avatar";
import TablePagination from "@mui/material/TablePagination";
import { useState } from "react";
import { Button, TableHead, TextField, Typography } from "@mui/material";

interface User {
  name: string;
  avatar: string;
  hero_project: string;
  notes: string;
  email: string;
  phone: string;
  rating: string;
  status: boolean;
  id: string;
}
// const [clickCounts, setClickCounts] = useState<Record<string, number>>({});
const TableComponent = ({
  rows,
  setClickCount,
}: {
  rows: any[];
  setClickCount: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState("none");
  const [filterValue, setFilterValue] = useState("");
  const [sortLabel, setSortLabel] = useState("Ascending Sort by Hero Project");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleRowClick = (row: User) => {
    console.log(row.name);
    setClickCount((prevClickCount) => ({
      ...prevClickCount,
      [row.id]: (prevClickCount[row.id] || 0) + 1,
    }));
    window.open(`/notes/${row.id}`);
  };
  const handleSort = () => {
    if (sortDirection === "asc") {
      setSortDirection("desc");
      setSortLabel("Ascending Sort by Hero Project");
    } else if (sortDirection === "desc") {
      setSortDirection("asc");
      setSortLabel("Descending Sort by Hero Project");
    } else {
      setSortDirection("asc");
      setSortLabel("Descending Sort by Hero Project");
    }
  };

  const sortedAndFilteredRows = rows
    .filter((row) =>
      row.hero_project.toLowerCase().includes(filterValue.toLowerCase())
    )
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a.hero_project.localeCompare(b.hero_project);
      } else if (sortDirection === "desc") {
        return b.hero_project.localeCompare(a.hero_project);
      }
      return 0;
    });

  return (
    <div className="Table">
      <div className="topBar">
        <Typography variant="h6">Table of Volunteers</Typography>
        {/* <Typography variant="h6">Click on a row to view notes</Typography> */}
        <div className="toolBar">
          <Button
            sx={{ margin: 3 }}
            onClick={handleSort}
            style={{ backgroundColor: "#5F634F", color: "white" }}
          >
            {sortLabel}
          </Button>
          <TextField
            label="Filter by Hero Project"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            size="small"
          />
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Avatar</TableCell>
              <TableCell align="right">Hero Project</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedAndFilteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => handleRowClick(row)}
                >
                  <TableCell scope="row">{row.name}</TableCell>
                  <TableCell align="right">
                    {<Avatar src={row.avatar}></Avatar>}
                  </TableCell>
                  <TableCell align="right">{row.hero_project}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                  <TableCell align="right">{row.rating}</TableCell>
                  <TableCell align="right">
                    {row.status ? "true" : "false"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default TableComponent;
