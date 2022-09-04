const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const app = express();

const { handlerRegister } = require("./controllers/register");
const { handleSignIn } = require("./controllers/signin");
const { handleProfile } = require("./controllers/profile");
const { handleImage, handleApiCall } = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DATABASE_URL,
    ssl: true,
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("success"));

app.post("/signin", (req, res) => handleSignIn(req, res, db, bcrypt));

app.post("/register", (req, res) => handlerRegister(req, res, db, bcrypt));

app.get("/profile/:id", (req, res) => handleProfile(req, res, db));

app.put("/image", (req, res) => handleImage(req, res, db));
app.post("/imageurl", (req, res) => handleApiCall(req, res));

app.listen(process.env.PORT || 8080, () =>
  console.log(`app is running on port ${process.env.PORT}`)
);
