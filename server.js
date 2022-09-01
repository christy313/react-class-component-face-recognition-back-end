const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const database = {
  users: [
    {
      id: "1",
      name: "Mary",
      email: "mary@gmail.com",
      password: "hi",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "2",
      name: "Sally",
      email: "sally@gmail.com",
      password: "hello",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send("hi");
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("error logging in");
  }
  res.json("signing");
});

app.listen(8080, () => {
  console.log("app is running on port 8080");
});
