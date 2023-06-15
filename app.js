require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectBD = require("./models/config");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const userModal = require("./models/userModel");
const addUserModel = require("./models/addUserModel");
const bcrypt = require("bcryptjs");
const auth = require("./middleware/auth");
const path = require("path");
const {
  india,
  england,
  nepal,
  russia,
  sri_lanka,
  bangladesh,
  afghanistan,
  pakistan,
} = require("./models/regiatrationModel");

const port = process.env.PORT || 1000;

connectBD();

const staticPath = path.join(__dirname, "./public");

app.use(cookieParser());
app.use(express.static(staticPath));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

app.get("/", (req, res) => {
  res.render("Login", { message: req.session.logMsg });
});

app.get("/signup", (req, res) => {
  res.render("SignUp", { message: req.session.sigMessage });
});

app.get("/registration", auth, async (req, res) => {
  try {
    const indiaStateList = await india.find();
    const russiaStateList = await russia.find();
    const nepalStateList = await nepal.find();
    const sri_lankaStateList = await sri_lanka.find();
    const englandStateList = await england.find();
    const bangladeshStateList = await bangladesh.find();
    const afghanistanStateList = await afghanistan.find();
    const pakistanStateList = await pakistan.find();

    // console.log(nepalStateList);

    const allCountryState = [
      ...indiaStateList,
      ...afghanistanStateList,
      ...bangladeshStateList,
      ...russiaStateList,
      ...nepalStateList,
      ...sri_lankaStateList,
      ...pakistanStateList,
      ...englandStateList,
    ];

    if (req.user) {
      res.render("registration_form", {
        countryData: allCountryState,
        email: req.session.currentUser,
      });
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/signup", async (req, res) => {
  const newUsername = req.body.username;
  const newPassword = req.body.password;

  const newUser = new userModal({
    username: newUsername,
    password: newPassword,
  });

  try {
    const foundUser = await userModal.find({ username: newUsername });

    if (foundUser.length === 0) {
      const token = await newUser.generateAuthToken();

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 60000),
        httpOnly: true,
      }); // 60sec

      await newUser
        .save()
        .then(() => {
          // console.log("Successfully added........");
          req.session.sigMessage = "Successfully Signup please login!";
          res.redirect("/signup");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/signup");
        });
    } else {
      req.session.sigMessage = "User Already Exist!";
      res.redirect("/signup");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/login", async (req, res) => {
  const Username = req.body.username;
  const password = req.body.password;

  try {
    const foundData = await userModal.findOne({ username: Username });

    if (foundData) {
      const isMatch = await bcrypt.compare(password, foundData.password);

      const token = await foundData.generateAuthToken();

      res.cookie("jwt", token, { maxAge: 30 * 60 * 1000 });

      if (isMatch) {
        req.session.currentUser = foundData.username;
        res.redirect("/registration");
      } else {
        req.session.logMsg = "Incorrect Password!";
        res.redirect("/");
      }
    } else {
      req.session.logMsg = "user does not exists!";
      res.redirect("/");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/user", async (req, res) => {
  const userDetails = new addUserModel({
    first_name: req.body.fname,
    last_name: req.body.lname,
    email: req.body.email,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    date_of_birth: req.body.dob,
    age: req.body.age,
    gender: req.body.gender,
  });

  try {
    await userDetails.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

app.listen(port, () => {
  console.log(`we are listening at port number ${port}`);
});
