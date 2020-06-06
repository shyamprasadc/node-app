const express = require("express");
const app = express();

const config = require("config");
// const startupDebugger  = require("debug")("app:startup");
// const dbDebugger  = require("debug")("app:db");
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require("joi");

const logger = require("./logger");

console.log(`NODE ENV: ${process.env.NODE_ENV}`);

app.use(express.json()); //req.body json parser
app.use(express.urlencoded({ extended: true })); //req.body urlencoded parser
app.use(express.static('public'));
app.use(helmet());

//configuration
console.log("Application Name:" + config.get("name"));
console.log("Mail Server:" + config.get("mail.host"));
// console.log("Mail Password:" + config.get("mail.password")); 

if (app.get("env") === "development"){
  // startupDebugger("morgan enabled")
  console.log("Morgan is enabled")
  app.use(morgan("tiny"));  
}

app.use(logger);

app.use((req,res,next) => {
console.log("Authenticating..");
next();
});

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

validateCourse = (course) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
};

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course)
    return res.status(404).send("the course with given id is not found");

  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(404).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  const { error } = validateCourse(req.body);

  if (!course)
    return res.status(404).send("the course with given id is not found");
  if (error) return res.status(404).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  const { error } = validateCourse(req.body);

  if (!course)
    return res.status(404).send("the course with given id is not found");
  if (error) return res.status(404).send(error.details[0].message);

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

const port = process.env.PORT || 3000;

app.listen(port);
