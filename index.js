const express = require("express");
const app = express();
const courses = require("./routes/courses");
const home = require("./routes/home");

const config = require("config");
// const startupDebugger  = require("debug")("app:startup");
// const dbDebugger  = require("debug")("app:db");

const helmet = require("helmet");
const morgan = require("morgan");

// app.set("view engine", "pug");
// app.set("view", "./views");

const logger = require("./middleware/logger");

console.log(`NODE ENV: ${process.env.NODE_ENV}`);

app.use(express.json()); //req.body json parser
app.use(express.urlencoded({ extended: true })); //req.body urlencoded parser
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses); //courses routes
app.use("/", home); //courses routes

//configuration
console.log("Application Name:" + config.get("name"));
console.log("Mail Server:" + config.get("mail.host"));
// console.log("Mail Password:" + config.get("mail.password"));

if (app.get("env") === "development") {
  console.log("Morgan is enabled");
  app.use(morgan("tiny"));
}

app.use(logger);

app.use((req, res, next) => {
  console.log("Authenticating..");
  next();
});

const port = process.env.PORT || 3000;

app.listen(port);
