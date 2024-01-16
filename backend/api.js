import express from "express";
import { database } from "./database.js";
import cors from "cors";

const app = express();
const port = 4000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/bog/users", (req, res) => {
  res.json(database).status(200);
});

app.post("/api/bog/users/add", (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  database.push(newUser);
  res.json(newUser).status(200);
});
app.put("/api/bog/users/update/:id", (req, res) => {
  const user = database.filter((user) => user.id === req.params.id)[0];
  const index = database.indexOf(user);
  const keys = Object.keys(req.body);
  keys.forEach((key) => {
    if (req.body[key] !== undefined || req.body[key] !== null || req.body[key] !== "") {
      user[key] = req.body[key];
    }
  });
  database[index] = user;
  res.json(user).status(200);
});
app.delete("/api/bog/users/delete/:id", (req, res) => {
  const user = database.filter((user) => user.id === req.params.id)[0];
  const index = database.indexOf(user);
  database.splice(index, 1);
  res.json(user).status(200);
});

app.get("/api/bog/users/:id", (req, res) => {
  const user = database.filter((user) => user.id === req.params.id)[0];
  res.json(user).status(200);
});
// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
