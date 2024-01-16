import "./App.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

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

const ariaLabel = { "aria-label": "description" };
function App() {
  const [rows, setRows] = useState<User[]>([]);
  const [name, setName] = useState("Jeff");
  const [avatar, setAvatar] = useState("");
  const [heroProject, setHeroProject] = useState("");
  const [notes, setNotes] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState("");
  const [status, setStatus] = useState(false);
  const [id, setId] = useState("");
  const [action, setAction] = useState("Choose an action");

  // fetch the data from the backend
  useEffect(() => {
    fetch("http://localhost:4000/api/bog/users")
      .then((response) => response.json())
      .then((data) => setRows(data));
  }, []);

  const handleActionClick = async () => {
    try {
      const inputData = {
        name: name,
        avatar: avatar,
        hero_project: heroProject,
        notes: notes,
        email: email,
        phone: phone,
        rating: rating,
        status: status,
        id: id,
      };
      console.log(inputData);
      // send the data to the backend
      if (action === "Add New Volunteer") {
        await fetch("http://localhost:4000/api/bog/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
        });
        //update the table by updating the rows state
        setRows([...rows, inputData]);
      } else if (action === "Update Volunteer") {
        
        await fetch(`http://localhost:4000/api/bog/users/update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputData),
        });
        //update the table with the updated data
        const updatedRows = rows.map((row) => {
          if (row.id === id) {
            return inputData;
          }
          return row;
        });
        setRows(updatedRows);

      } else if (action === "Delete Volunteer") {
        await fetch(`http://localhost:4000/api/bog/users/delete/${id}`, {
          method: 'DELETE',
        });
        //update the table by removing the deleted row
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
      }

    } catch (error) {
      console.error("Error adding data:", error);
    }
  };
  return (
    <div className="App">
      <div className="Table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Avatar</TableCell>
                <TableCell align="right">Hero Project</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
        {/* Add ability to add new volunteers to the table */}
      </div>
      <div className="select">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Action</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={action}
            label="Action"
            onChange={(e) => setAction(e.target.value)}
          >
            <MenuItem value={"Add New Volunteer"}>Add New Volunteer</MenuItem>
            <MenuItem value={"Update Volunteer"}>Update Volunteer</MenuItem>
            <MenuItem value={"Delete Volunteer"}>Delete Volunteer</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Card className="AddCard">
        <Typography variant="h5">{action}</Typography>
        {/* If action is delete, only display id */}
        {action === "Delete Volunteer" ? (
          <Input
            placeholder="ID"
            onChange={(e) => setId(e.target.value)}
            inputProps={ariaLabel}
          />
        ) : (
          <>
            <Input
              className="input"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              inputProps={ariaLabel}
            />
            <Input
              className="input"
              placeholder="Avatar"
              onChange={(e) => setAvatar(e.target.value)}
              inputProps={ariaLabel}
            />
            <Input
              className="input"
              placeholder="Hero Project"
              onChange={(e) => setHeroProject(e.target.value)}
              inputProps={ariaLabel}
            />
            <Input
              className="input"
              placeholder="Notes"
              onChange={(e) => setNotes(e.target.value)}
              inputProps={ariaLabel}
              multiline
            />
            <Input
              className="input"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              inputProps={ariaLabel}
            />
            <Input
              className="input"
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
              inputProps={ariaLabel}
            />
            <Input
              className="input"
              placeholder="Rating"
              onChange={(e) => setRating(e.target.value)}
              inputProps={ariaLabel}
            />
            <Input
              className="input"
              placeholder="ID"
              onChange={(e) => setId(e.target.value)}
              inputProps={ariaLabel}
            />
            <FormControlLabel
              control={
                <Checkbox
                  className="input"
                  defaultChecked={false}
                  onChange={(e) => setStatus(e.target.checked)}
                />
              }
              label="Status"
            />
          </>
        )}
        <div className="actionButton">
          <Button
            variant="contained"
            onClick={handleActionClick}
          >
            {action}
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default App;
