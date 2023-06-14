const express = require("express");
const app = express();
const path = require("path");

const port = 1000;

const staticPath = path.join(__dirname, "./public");

app.use(express.static(staticPath));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("Login");
});

app.get("/signup", (req, res) => {
  res.render("SignUp");
});

app.get("/registration", async (req, res) => {
  res.render("registration_form");
});

app.listen(port, () => {
  console.log(`we are listening at port number ${port}`);
});
