const express = require("express");
const port = 5000;
const cors = require('cors');

const app = express();

app.use(cors());

app.get("/", (req, res) => { 
    res.send("welcome!");
});

app.listen(port,()=>console.log(`Server listening on port ${port}`));