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

app.get("/mealsizes", async (req,res) => {
    try {
        console.log(req.params);
        const table = await pool.query("SELECT * FROM mealsizes");
        res.json(table.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// get price of foodtype and name(size)
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

app.post("/order", async(req, res) => {
    try {
        const d = new Date();
        const date = (d.getFullYear() + "-"+ (d.getMonth()+1) + "-" +d.getDate());

        const subtotal = req.body["subtotal"];
        const total = subtotal * 1.0825;
        const employee = 1;
        const newOrder = await pool.query("INSERT INTO orders (date, subtotal, total, employeeid) VALUES ($1, $2, $3) RETURNING *", [date, subtotal, total, employee]);
        console.log("date: "+ date);

        const orderid = newOrder["id"];
        const orderitems = req.body["items"];

        for (i = 0; i < orderitems.size(); i++) {
            const item = orderitems[i];
            console.log("item " + i + " :" + item);
            const mealtype = item["mealtype"];
            const s1 = item["parts"][0];
            const s2 = item["parts"][1];
            const m1 = item["parts"][2];
            const m2 = item["parts"][3];
            const m3 = item["parts"][4];
            const instruction = item["custom_instructions"];

            const order_item = await pool.query(
                "INSERT INTO orderitems (orderid, mealtype, menuitem1, menuitem2, menuitem3, side1, side2, custominstructions) VALUES ($1, $2, $3, $4, $5, $6,$7,$8) RETURNING *", 
                [orderid, mealtype, m1, m2, m3, s1, s2, instruction]);
        }
        res.json(newOrder.rows); // sending back
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
