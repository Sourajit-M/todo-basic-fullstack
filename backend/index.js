const express = require("express");
const { todo } = require("./db");
const { createTodo, updateTodo } = require("./types");
const cors = require("cors")
const app = express();

app.use(express.json());
app.use(cors())

app.post("/todo", async (req, res) => {
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);

    if (!parsePayload.success) {
        return res.status(400).json({ msg: "You sent wrong inputs!" });
    }


    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false,
    });

    res.status(201).json({ msg: "Todo created" });
});


app.get("/todos", async (req, res) => {
    const todos = await todo.find({});
    res.json({ todos });
});


app.put('/completed', async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success) {
        return res.status(411).json({ msg: "You sent the wrong inputs" });
    }

    const result = await todo.findByIdAndUpdate(
        updatePayload.id,
        { completed: true },
        { new: true }
    );

    if (!result) {
        return res.status(404).json({ msg: "Todo not found" });
    }

    res.json({ msg: "Todo marked as completed", todo: result });
});


app.listen(4000, () => {
    console.log("Server running on port 4000");
});
