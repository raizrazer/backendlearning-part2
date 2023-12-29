require("dotenv").config();
let express = require("express");
let app = express();

// console.log("Hello World");
// app.get("/", (req, res) => {
//   res.send("Hello Express");
// });

app.use("/public", express.static(__dirname + "/public"));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/", (req, res) => {
  const path = __dirname + "/views/index.html";
  res.sendFile(path);
});

app.get("/json", (req, res) => {
  const str = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: str.toUpperCase() });
  } else {
    res.json({ message: str });
  }
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get("/:word/echo", (req, res, next) => {
  res.json({ echo: req.params.word });
});

module.exports = app;
