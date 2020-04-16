const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const authPassport = require("./authPassport/authRoutes");
const passportSetup = require("./passport/passportSetup");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
const cors = require("cors");
const tocToHtml = require("toc-to-html");
const { jsonToTableHtmlString } = require("json-table-converter");
const config = require("./config");

let UserInformation = require("./models/Schema");
let monthReportSchema = require("./models/monthReportSchema");

let app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authPassport);

// NODEMAILER

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: config.email,
    pass: config.password,
  },
});

const mailOptions = {
  from: config.email,
  to: config.email,
  subject: "Timelog",
  text: "{{userName.userId}}" + "Here are your working hours. Great job!",
};

// CONNECT TO MY DB
mongoose
  .connect(
    `mongodb+srv://LejlaDolovac:guess123@cluster0-gxwz7.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.info("Connected.");
  })
  .catch((err) => {
    console.error(err);
  });

//ROUTES

let postGetInformation = require("./routes/postGetInformation");
let monthCount = require("./routes/monthCount");
let editPosts = require("./routes/editPosts");

app
  .route("/postGetInformation")
  .post(postGetInformation.post)
  .get(postGetInformation.get);

app.route("/postGetSpanInformation").post(postGetInformation.getSpan);

app.route("/editPosts").post(editPosts.post);

app.route("/monthCount").post(monthCount.post);

//SLACK

app.post("/slack", async (req, res) => {
  let msg = req.body.text;
  let userName = req.body.user_name;
  let comment = req.body.msg;
  let date = req.body.date;

  const data = {
    userId: userName,
    comment: msg,
    date: new Date(),
  };

  await UserInformation.create(data);

  const message = {
    text: "Bra jobbat! Vi registrerar detta :)",
  };

  res.send(message);
});

// NODEMAILER

app.post("/mail", (req, res) => {
  const htmlMailTop =
    '<!DOCTYPE html><html style="margin: 0; padding: 0;"><head><title>One | Email template!</title></head><body style="margin: 0; padding: 0;">';
  const htmlMailBottom = "</body></html>";

  const userData = req.body;
  mailOptions.html =
    htmlMailTop + jsonToTableHtmlString(userData) + htmlMailBottom;

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

// VIEW ENGINE SETUP

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.listen(3000, () => {
  console.info("Server is running on: 3000.");
});
