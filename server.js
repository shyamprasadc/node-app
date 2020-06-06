const express = require("express");
const app = express();

app.get("/profile", Token, Validation, (req, res) => {
  console.log("user logged");
  res.send("<h1>Success</h2>");
});

function Token(req, res, next) {
  console.log("creating token...");
  req.token = true;
  next();
}
function Validation(req, res, next) {
  if (req.token) {
    console.log("Token Approved");
    next();
    return;
  }
  console.log("No Token");
  res.send("<h1>Auth Faild</h1>");
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server running on ${PORT}`));
