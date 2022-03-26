const express = require('express');
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan")


dotenv.config();
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, () => { console.log("Connected to Database") });

app.listen(port, () => {
    console.log("server is running!");
})