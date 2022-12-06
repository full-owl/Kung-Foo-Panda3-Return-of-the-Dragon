const express = require("express");
const app = express();

const cors = require("cors");

const pool = require("./db.js"); // get db pg commands
const e = require("express");

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
        const table = await pool.query("SELECT * FROM menuitems WHERE foodtype=$1 ORDER BY name;", [item_type]);
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
        // orders query
        const d = new Date();
        const date = (d.getFullYear() + "-"+ (d.getMonth()+1) + "-" +d.getDate());

        // console.log(req.body);

        if (req.body["items"].length === 0) {
            throw new Error("Invalid Order Type");
        }

        // console.log(req.body["items"]);

        // console.log("ITEMS");
        // console.log(req.body["items"])
        // throw "ERROR";

        const subtotal = req.body["subtotal"];
        const total = subtotal * 1.0825;
        const employee = 1;
        const newOrder = await pool.query("INSERT INTO orders (date, subtotal, total, employeeid) VALUES ($1, $2, $3, $4) RETURNING *", [date, subtotal, total, employee]);
        
        // console.log("date: "+ date);
        // console.log("New order: " + newOrder);
        
        const orderid = newOrder.rows[0]["id"];

        console.log(orderid);

        const orderitems = req.body["items"];

        for (i = 0; i < orderitems.length; i++) {
            // console.log("In Loop");
            let entree_ids = [];
            let side_ids = [];
            const item = orderitems[i];
            let description = "none"; // custom instructions
            let foodtype = "";
            for (j = 0; j < item["mealItems"].length; j++){
                const mealItem = item["mealItems"][j];
                console.log("meal item:");
                console.log(mealItem);

                description = "none";
             
                const mealItemId = mealItem["id"];
                foodtype = mealItem["foodtype"];

                if (foodtype === "side") {
                    side_ids.push(mealItemId);
                }
                else if (foodtype === "entree")  {
                    entree_ids.push(mealItemId);
                }
                else {
                    description = item["type"]["name"];
                    entree_ids.push(mealItemId);
                }
            }

            // filling rest of side and entree with zeroes
            // unpack arrays and fill rest with zero if need be
            if (side_ids.length < 2) { 
                const adderArray = new Array(2-side_ids.length).fill(0);
                side_ids = [...side_ids, ...adderArray];
            }

            if (entree_ids.length < 3) { 
                const adderArray = new Array(3-entree_ids.length).fill(0);
                entree_ids = [...entree_ids, ...adderArray];
            }

            console.log("CHECKING IDS");
            console.log("Entree Ids: ", entree_ids.toString());
            console.log("Side Ids: ", side_ids.toString());


            let mealtype = item["type"]["foodtype"];
            if (!mealtype) {
                mealtype = foodtype;
                // description = item["type"]["name"];
            }
            console.log("MEALTYPE: "+ mealtype);
            console.log("Description: "+ description);
            // const s1 = item["parts"][0];
            // const s2 = item["parts"][1];
            // const m1 = item["parts"][2];
            // const m2 = item["parts"][3];
            // const m3 = item["parts"][4];
            // const instruction = item["custom_instructions"];

            const order_item = await pool.query(
                "INSERT INTO orderitems (orderid, mealtype, menuitem1, menuitem2, menuitem3, side1, side2, custominstructions) VALUES ($1, $2, $3, $4, $5, $6,$7,$8) RETURNING *", 
                [orderid, mealtype, entree_ids[0], entree_ids[1], entree_ids[2], side_ids[0], side_ids[1], description]);
        }
        res.json(newOrder.rows); // sending back
    } catch (error) {
        console.error(error.message);
        console.log("Error generated");
    }
});

// TODO
// manager view functions

// get table of orders
app.get("/orders", async (req, res) => {
    try {
        console.log(req.params);
        const table = await pool.query("SELECT * FROM orders;");
        //console.log(table.rows);
        // table has a lot of extra parameters
        res.json(table.rows); // response
    } catch (error) {
        console.error(error.message);
    }
});

// get revenue over past week
app.get("/sales", async (req, res) => {
    try {
        console.log(req.params);
        const sd = new Date(); 
        const ed = new Date();
        
        sd.setDate(ed.getDate() - 7)
        const sdate = (sd.getFullYear() + "-"+ (sd.getMonth()+1) + "-" +(sd.getDate()));
        console.log("Start:"+sdate)
        const edate = (ed.getFullYear() + "-"+ (ed.getMonth()+1) + "-" +(ed.getDate()));
        console.log("End:"+edate)

        
        const table = await pool.query("SELECT SUM(total) FROM orders WHERE date>=$1;", [sdate]);
        //console.log(table.rows);
        // table has a lot of extra parameters
        let revenue = parseFloat(table.rows[0].sum);
        if (!revenue) {
            revenue = 0.00;
        }
        res.json(revenue); // response
    } catch (error) {
        console.error(error.message);
    }
});

// get sales of today
app.get("/salestoday", async (req, res) => {
    try {
        console.log(req.params);
        const ed = new Date(); 
        
        const edate = (ed.getFullYear() + "-"+ (ed.getMonth()+1) + "-" +(ed.getDate()));
        console.log("End:"+edate);
        
        const table = await pool.query("SELECT SUM(total) FROM orders WHERE date=$1;", [edate]);
        //console.log(table.rows);
        // table has a lot of extra parameters
        let revenue = parseFloat(table.rows[0].sum);
        if (!revenue) {
            revenue = 0.00;
        }
        res.json(revenue); // response
    } catch (error) {
        console.error(error.message);
    }
});
// get table of menu items
app.get("/menuitems", async (req, res) => {
    try {
        const table = await pool.query("SELECT * FROM menuitems;");
        //console.log(table.rows);
        // table has a lot of extra parameters
        res.json(table.rows); // response
    } catch (error) {
        console.error(error.message);
    }
});
// get table of inventory items
app.get("/inventory", async (req, res) => {
    try {
        console.log(req.params);
        const table = await pool.query("SELECT * FROM inventory;");
        //console.log(table.rows);
        // table has a lot of extra parameters
        res.json(table.rows); // response
    } catch (error) {
        console.error(error.message);
    }
});

// add inventory item
app.post("/inventoryitem/:ingredient/:unit/:amount", async (req, res) => {
    try {
        console.log(req.params);
        const ingred = req.params["ingredient"];
        const unit = req.params["unit"];
        const amount = req.params["amount"];
        const table = await pool.query("INSERT INTO inventory (ingredient, currentamount, unit) VALUES ($1, $2, $3) RETURNING *", [ingred, amount, unit]);
        //console.log(table.rows);
        // table has a lot of extra parameters
        res.json(table.rows[0]); // response
        
    } catch (error) {
        console.error(error.message);
    }
});

// edit inventory item
app.put("/inventoryitem/:id/amount=:amount", async (req, res) => {
    try {
        console.log(req.params);
        const amount = req.params["amount"];
        const id = req.params["id"];
        const table = await pool.query("UPDATE inventory SET currentamount = $1 WHERE id = $2 RETURNING *", [amount, id]);
        //console.log(table.rows);
        // table has a lot of extra parameters
        res.json(table.rows[0]); // response
    } catch (error) {
        console.error(error.message);
    }
});

// remove inventory item
app.delete("/inventoryitem/:ingredient", async (req, res) => {
    try {
        console.log(req.params);
        const ingred = req.params["ingredient"];
        const table = await pool.query("DELETE FROM inventory WHERE ingredient=$1 RETURNING *", [ingred]);
        //console.log(table.rows);
        // table has a lot of extra parameters
        if (table.rows.length === 0) {
            res.json("Error: item does not exist")
        }
        else {
            res.json(table.rows[0]); // response
        }
    } catch (error) {
        console.error(error.message);
        res.json("item does not exist")
    }
});

// menu items

// add menu item
app.post("/menuitem/name=:name/foodtype=:foodtype", async (req, res) => {
    try {
        console.log(req.params);
        const {name} =req.params;
        const {foodtype} =req.params;
        const table = await pool.query("INSERT INTO menuitems (name, foodtype, description) VALUES ($1, $2, 'Not Available') RETURNING *",[name, foodtype]);
        //console.log(table.rows);
        // table has a lot of extra parameters
        res.json(table.rows[0]); // response
    } catch (error) {
        console.error(error.message);
    }
});

// edit menu item
app.put("/menuitem/:id/name=:name/foodtype=:foodtype", async (req, res) => {
    try {
        console.log(req.params);
        const {id} = req.params;
        const {name} = req.params;
        const{foodtype} = req.params;
        const table = await pool.query("UPDATE menuitems SET name=$1, foodtype=$2 WHERE id=$3 RETURNING *;",[name,foodtype,id]);
        //console.log(table.rows);
        // table has a lot of extra parameters
        res.json(table.rows[0]); // response
    } catch (error) {
        console.error(error.message);
    }
});

// remove menu item
app.delete("/menuitem/:menuid", async (req, res) => {
    try {
        console.log(req.params);
        const id = req.params["menuid"];
        const table = await pool.query("DELETE FROM menuitems WHERE id=$1 RETURNING *", [id]);
        //console.log(table.rows);
        // table has a lot of extra parameters
        if (table.rows.length === 0) {
            res.json("Menu Item Error: item does not exist");
        }
        else {
            res.json(table.rows[0]); // response
        }
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
