const express = require("express");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

const users = [
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
  res.status(200).send(users);
});

app.post("/addUser", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send({ status: "user added" });
  } catch {
    res.status(500).send({ status: "user not added" });
  }
});

app.get("/user/login", async (req, res) => {
  const findUser = users.find((user) => user.name == req.body.name);
  if (findUser == null) {
    res.status(400).send({ status: "user not found" });
  } else {
    try {
      if (await bcrypt.compare(req.body.password, findUser.password)) {
        res.status(200).send({ status: "Success" });
      } else {
        res.status(200).send({ status: "Not allowed" });
      }
    } catch {
      res.status(500).send({ status: "wrong user" });
    }
  }
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
