const express = require("express");

const path = require("path");

const app = express();

app.use(express.static(__dirname + "/dist/mega-front"));

const port = process.env.PORT || 4200;

app.listen(port);

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/dist/mega-front/index.html");
});
