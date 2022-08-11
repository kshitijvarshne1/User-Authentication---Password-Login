const express = require("express");

const app = express();

const user = [
  {
    name: "Kshitij",
    password: "123456",
  },
  {
    name: "Varun",
    password: "654321",
  },
];

app.get("/", (req, res) => {
  res.send({ status: "Working" });
});

app.get("/getAllUsers", (req, res) => {
  res.status(200).send(user);
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
