const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/graph-ql").then(()=>console.log("connected to db"))