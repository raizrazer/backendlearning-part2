require("dotenv").config();
let express = require("express");
let app = express();

// console.log("Hello World");
// app.get("/", (req, res) => {
//   res.send("Hello Express");
// });

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  const path = __dirname + "/views/index.html";
  res.sendFile(path);
});

app.get("/json", (req, res) => {
  const str =
    process.env.MESSAGE_STYLE === "uppercase"
      ? "Hello json".toUpperCase()
      : "Hello json";
  const messageObj = { message: str };
  res.json(messageObj);
});

module.exports = app;
