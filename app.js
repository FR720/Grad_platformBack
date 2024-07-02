require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const dbUrl = process.env.DB_URL;
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const student = require("./routes/students");
const parents = require("./routes/parents");
const data = require("./routes/dataRouter");
const Task = require("./routes/Task");
const feedback = require("./routes/feedbackRouter");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

app.use(bodyParser.json());
app.use(cors());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin",  "http://localhost:4000");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// })

// app.use(express.static(path.join(__dirname, '/dist')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/dist', 'index.html'));
// });

app.use("/image", express.static(path.join("Image")));
app.use("/StudentProfilePic", express.static(path.join("StudentProfilePic")));
app.use("/Profile", express.static(path.join("Profile")));
app.use("/ParentProfilePic", express.static(path.join("ParentProfilePic")));
app.use("/student", student);
app.use("/parent", parents);
app.use("/Task", Task);
app.use("/data", data);
app.use("/feedback", feedback);

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the Database");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

app.listen(port, (error) => {
  if (error) {
    console.error("Server startup error:", error);
  } else {
    console.log(`Server listening on port ${port}`);
  }
});
