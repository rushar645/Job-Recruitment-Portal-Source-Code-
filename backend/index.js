const express = require("express");
const port = 5000;
const cors = require("cors");
const mongodb = require("./database/init");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("welcome!");
});

mongodb().then(() => {
    console.log("Connected to database...");
    app.listen(port, () => console.log(`Server listening on port ${port}`));
}).catch((err) => {
    console.log("Encountered an error: \n", err);
});
