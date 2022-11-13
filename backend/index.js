const express = require("express");
const app = express();

const cors = require("cors");

const pool = require("./db.js"); // get db pg commands

const port = 8800;

//middle ware

app.use(cors());
app.use(express.json()); // allows to get request.body

// opening server
app.listen(port, () => {
    console.log(`server started on ${port}`);

});

// routes

// // create a todo
// app.post("/todos", async(req, res) => {
//     try {
//         //console.log(req.body["description"]);
//         //query into db
//         const description = req.body["description"];
//         console.log(description);
//         const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
//         console.log(newTodo.rows);
//         //console.log("works");
//         res.json(newTodo.rows[0]); // sending back
//     } catch (error) {
//         console.error(error.message);
//     }
// });




// get all items of type

app.get("/items/:type", async (req, res) => {
    try {
        console.log(req.params);
        const item_type = req.params["type"];
        const table = await pool.query("SELECT * FROM menuitems WHERE foodtype=$1;", [item_type]);
        //console.log(table.rows);
        // table has a lot of extra parameters
        res.json(table.rows); // response
    } catch (error) {
        console.error(error.message);
    }
});

app.get("/combosizes", async (req, res) => {
    try {
        console.log(req.params);
        item_type = "combo";
        const table = await pool.query("SELECT * FROM mealsizes WHERE foodtype=$1;", [item_type]);
        //console.log(table.rows);
        // table has a lot of extra parameters
        res.json(table.rows); // response
    } catch (error) {
        console.error(error.message);
    }
});

app.get("/prices/:foodtype/:size", async (req, res) => {
    try {
        const food_type = req.params["foodtype"];
        const size = req.params["size"];
        const item_price = await pool.query("SELECT * FROM mealsizes WHERE foodtype=$1 AND name=$2;", [food_type, size]);
        res.json(item_price.rows);
    } catch (error) {
        console.error(error.message);
    }
});
// // get a todo
// app.get("/todos/:id", async(req,res)=> {
//     try {
//         const id = req.params["id"];
//         // console.log(id);
//         const todo = await pool.query("SELECT * FROM todo WHERE tid=$1", [id]);
//         res.json(todo.rows[0]) // send it 
//     } catch (error) {
//         console.error(error.message);
//     }
// });

// // /todos/:param1:param2
// // update a todo
// app.put("/todos/:id", async(req,res)=> {
//     try {
//         const id = req.params["id"];
//         const description = req.body["description"];
//         const todo = pool.query("UPDATE todo SET description = $1 WHERE tid = $2", [id, description]);
//         console.log(id);
//         res.json(todo.rows[0])
//     } catch (error) {
//         console.error(error.message);
//     }
// });
// // delete a todo
// app.delete("/todos/:id", async(req, res) => {
//     try {
//         const id = req.params["id"];
//         const todo = pool.query("DELETE FROM todo WHERE tid = $1", [id]);
//         res.json("Todo Deleted")
//     } catch (error) {
//         console.error(error.message);
//     }
// });
