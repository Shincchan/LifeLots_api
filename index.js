const express = require('express');
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute=require('./routes/users');
const authRoute=require('./routes/auth');
const postRoute=require('./routes/posts');
dotenv.config();

//Database connection setup
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, () => { console.log("Connected to Database") });

//Middlewares 
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//Routes for users
app.use("/api/users",userRoute);

//Routes for auth
app.use("/api/auth",authRoute);

//Routes for posts
app.use('/api/posts/',postRoute);

app.listen(port, () => {
    console.log("server is running!");
})