"use strict";

var express = require("express");

var app = express();

var PORT = 3000;
app.get("/", function (req, res) {
  res.json({
    msg: "Welcome to mean stack"
  });
});
app.listen(PORT, function () {
  return console.log("App is running on port " + PORT);
});
//# sourceMappingURL=index.js.map