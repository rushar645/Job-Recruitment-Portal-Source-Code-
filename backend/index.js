const express = require("express");
const port = 5000;
const cors = require("cors");
const mongodb = require("./database/init");

const app = express();
app.use((req,res,next) => {
  console.log(req.method, " ", req.url);
  next();
});
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome!");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.send("Req Success!");
});

app.post("/signup", (req, res) => {
  console.log(req.body);
  res.send("Signup Data Recieved!");
});

mongodb()
  .then(() => {
    console.log("Connected to database...");
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  })
  .catch((err) => {
    console.log("Encountered an error: \n", err);
  });
