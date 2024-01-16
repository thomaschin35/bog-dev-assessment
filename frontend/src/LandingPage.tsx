import React, { useEffect, useState } from "react";
import TableComponent from "./TableComponent";
import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
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

const LandingPage = () => {
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
  const [clickId, setClickId] = useState("");
  const [clickCounts, setClickCounts] = useState<Record<string, number>>({});
  const ariaLabel = { "aria-label": "description" };
  useEffect(() => {
    fetch("http://localhost:4000/api/bog/users")
      .then((response) => response.json())
      .then((data) => setRows(data));
  }, []);

  const handleActionClick = async () => {
    try {
      const inputData = {
        name,
        avatar,
        hero_project: heroProject,
        notes,
        email,
        phone,
        rating,
        status,
        id,
      };

      console.log(inputData);

      if (action === "Add New Volunteer") {
        await addVolunteer(inputData);
      } else if (action === "Update Volunteer") {
        await updateVolunteer(inputData);
      } else if (action === "Delete Volunteer") {
        await deleteVolunteer();
      }
    } catch (error) {
      console.error("Error performing action:", error);
    }
  };

  const addVolunteer = async (inputData: User) => {
    try {
      await fetch("http://localhost:4000/api/bog/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      setRows([...rows, inputData]);
    } catch (error) {
      console.error("Error adding volunteer:", error);
    }
  };

  const updateVolunteer = async (inputData: User) => {
    try {
      await fetch(`http://localhost:4000/api/bog/users/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      const updatedRows = rows.map((row) => {
        if (row.id === id) {
          return inputData;
        }
        return row;
      });

      setRows(updatedRows);
    } catch (error) {
      console.error("Error updating volunteer:", error);
    }
  };

  const deleteVolunteer = async () => {
    try {
      await fetch(`http://localhost:4000/api/bog/users/delete/${id}`, {
        method: "DELETE",
      });

      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);
    } catch (error) {
      console.error("Error deleting volunteer:", error);
    }
  };
  return (
    <div className="App">
      <div className="title">
        <Typography variant="h4">
          HaHa Heroes Volunteer Management System
        </Typography>
      </div>
      <div className="Table">
        <TableComponent rows={rows} setClickCount={setClickCounts}/>
      </div>
      <Card className="ActionCard">
        <Typography variant="h5">{action}</Typography>
        <div className="select">
          <FormControl fullWidth>
            <InputLabel id="action-input">Action</InputLabel>
            <Select
              labelId="action-input-select"
              id="action-input-select-id"
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
        <div>
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
        </div>
        <div className="actionButton">
          <Button variant="contained" onClick={handleActionClick}>
            {action}
          </Button>
        </div>
      </Card>
      <div className="clickCountDiv">
        <u><Typography variant="h5">Retrieve Click Count</Typography></u>
        <Input
          className="input"
          placeholder="Enter ID"
          onChange={(e) => setClickId(e.target.value)}
          inputProps={ariaLabel}
        />
        <div className="countBox">
            <Typography variant="h6">Click Count: {clickCounts[clickId] == undefined ? 0 : clickCounts[clickId]}</Typography>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
