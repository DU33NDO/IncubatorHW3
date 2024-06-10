const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

let posts = [];

app.post("/posts", (req, res) => {
  const post = req.body;
  console.log("Received post:", post);
  posts.push(post);
  res.status(201).send(post);
});

app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
