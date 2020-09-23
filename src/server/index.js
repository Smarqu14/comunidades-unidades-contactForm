const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../../public")));

app.post(
  "https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users",
  (req, res) => {
    res.send(req.body);
    res.status(200);
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
