const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://sourajitm19:cgan01DOeZCTdx8A@sourajit-19.9gv3awc.mongodb.net/todos",
);

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
});

const todo = mongoose.model("todos", todoSchema);

module.exports = { todo };
