const express = require("express");
const app = express();

const cors = require("cors");

const pool = require("./db.js"); // get db pg commands
const e = require("express");

const port = 8800;

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// doc options

const swaggerOptions = {
    swaggerDefinition: {
        info : {
            title: 'Panda Express API',
            version: '1.0.0'
        }
    },
    apis: ['index.js'],
}

const options = {
    swaggerOptions: {
        supportedSubmitMethods:['get']
    },
    customSiteTitle: "Panda Express Team 55 API Documentation",
    customfavIcon: "peFav.png"
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerDocs, options));
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

/**
 * @swagger
 * /items/{type}:
 *  get:
 *      parameters: 
 *          - name: type
 *            type: string
 *            description: string that is type of meal item. Could be drink, appetizer, premium entree, entree, or side
 *            in: path
 *            required: true
 *            minimum: 1
 *      description: Gets all menuitems of type
 *      responses: 
 *          200:
 *              description: Success
 */
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
        res.sendStatus(404).send(Error);
    }
});

/**
 * @swagger
 * /combosizes:
 *  get:
 *      description: Gets all combo meal sizes
 *      responses: 
 *          201:
 *              description: Success
 */
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

/**
 * @swagger
 * /mealsizes:
 *  get:
 *      description: Gets all meal sizes and meal types
 *      responses: 
 *          202:
 *              description: Success
 */
app.get("/mealsizes", async (req,res) => {
    try {
        console.log(req.params);
        const table = await pool.query("SELECT * FROM mealsizes");
        res.json(table.rows);
    } catch (error) {
        console.error(error.message);
    }
});

/**
 * @swagger
 * /prices/{foodtype}/{size}:
 *  get:
 *      description: Gets mealsizes item object needed for pricing
 *      parameters:
 *          - name: foodtype
 *            type: String
 *            required: true
 *            in: path
 *            description: string type of food, could be entree, premium entree, drink, combo, side
 *            minimum: 1
 *          - name: size
 *            type: String
 *            required: true
 *            in: path
 *            description: name of mealitem of foodtype
 *            minimum: 1
 *      responses: 
 *          202:
 *              description: Success
 */
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

/**
 * @swagger
 * /order:
 *  post:
 *      description: Submits order items in request body to order and order items database. Body has order items, total price, etc
 *      responses: 
 *          201:
 *              description: Success
 */
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


            let mealtype = item["type"]["name"];
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
        const update_inventory = await pool.query(`
            update inventory
            set currentamount = currentamount - amountneeded
            from orderingredients
            where orderingredients.inventoryid = inventory.id and orderingredients.orderid = $1
            returning inventory.*;`, [orderid]);
        console.log(`Updated inventory for order ${orderid} : `, update_inventory.rows);

        res.json(newOrder.rows); // sending back
    } catch (error) {
        console.error(error.message);
        console.log("Error generated");
    }
});

// TODO
// manager view functions

// get table of orders

/**
 * @swagger
 * /orders:
 *  get:
 *      description: gives all orders from order database
 *      responses: 
 *          200:
 *              description: Success
 */
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

/**
 * @swagger
 * /sales:
 *  get:
 *      description: gives float of total revenue (including tax) over the past week
 *      responses: 
 *          200:
 *              description: Success
 */
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

/**
 * @swagger
 * /salestoday:
 *  get:
 *      description: gives float of total revenue (including tax) during the current day
 *      responses: 
 *          200:
 *              description: Success
 */
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

/**
 * @swagger
 * /menuitems:
 *  get:
 *      description: gives all menu items in menu items database
 *      responses: 
 *          200:
 *              description: Success
 */
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

/**
 * @swagger
 * /inventory:
 *  get:
 *      description: gives all inventory items in inventory database
 *      responses: 
 *          200:
 *              description: Success
 */
app.get("/inventory", async (req, res) => {
    try {
        console.log(req.params);
        const table = await pool.query("SELECT * FROM inventory ORDER BY id;");
        //console.log(table.rows);
        // table has a lot of extra parameters
        res.json(table.rows); // response
    } catch (error) {
        console.error(error.message);
    }
});


// add inventory item

/**
 * @swagger
 * /inventoryitem/{ingredient}/{unit}/{amount}:
 *  post:
 *      description: creates and submits new inventory item to inventory database of ingredient, unit, and amount
 *      parameters:
 *          - name: ingredient
 *            type: String
 *            description: name of ingredient
 *            required: true
 *            in: path
 *          - name: unit
 *            type: String
 *            description: name of unit (example - oz)
 *            required: true
 *            in: path
 *          - name: amount
 *            type: float
 *            description: amount of inventory ingredient in size units
 *            required: true
 *            in: path
 *      responses: 
 *          200:
 *              description: Success
 */
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

/**
 * @swagger
 * /inventoryitem/{id}/amount={amount}:
 *  put:
 *      description: changes current amount of inventory item of id to amount
 *      parameters:
 *          - name: id
 *            type: int
 *            description: id of ingredient item
 *            required: true
 *            in: path
 *          - name: amount
 *            type: float
 *            description: new amount of ingredient item
 *            required: true
 *            in: path
 *      responses: 
 *          200:
 *              description: Success
 */
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

// TODO - add to proportions table
// remove inventory item

/**
 * @swagger
 * /inventoryitem/{ingredient}:
 *  delete:
 *      description: deletes inventory item of name inventory from database
 *      parameters:
 *          - name: ingredient
 *            type: String
 *            description: String name of inventory item to delete
 *            required: true
 *            in: path
 *      responses: 
 *          200:
 *              description: Success
 */
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

/**
 * @swagger
 *  /menuitem/name={name}/foodtype={foodtype}:
 *  post:
 *      description: Inserts menu item of name and foodtype into database
 *      parameters:
 *          - name: name
 *            type: String
 *            description: String name of new menu item
 *            required: true
 *            in: path      
 *          - name: foodtype
 *            type: String
 *            description: String foodtype in which the new menu item belongs in
 *            required: true
 *            in: path      
 *      responses: 
 *          200:
 *              description: Success
 */
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

/**
 * @swagger
 *   /menuitem:
 *   post:
 *     description: Inserts a new menu item into the database
 *     requestBody:
 *          description: asdf
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      additionalProperties:
 *                          type: string
 *                          properties:
 *                              name: 
 *                                  type: string
 *                              foodtype: 
 *                                  type: string
 *                              description:
 *                                  type: array
 *                                  items:
 *                                      type: string
 *                              ingredients:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      additionalProperties: true
 *     responses:
 *          200:
 *              description: Success
 */
app.post("/menuitem", async (req, res) => {
    try {
        console.log(req.body);
        const {name, foodtype, description, ingredients} = req.body;

        // TODO: return error if not true
        console.assert(ingredients.reduce((acc,i) => acc + i.porportion, 0) == 1);
        const table = await pool.query("INSERT INTO menuitems (name, foodtype, description) VALUES ($1, $2, $3) RETURNING *", [name, foodtype, description ? description : "Not Available"]);

        const menuid = table.rows[0].id;
        let rows = []
        for(const ingredient of ingredients) {
            const table = await pool.query("INSERT INTO menuingredients (menuid, inventoryid, proportion) VALUES ($1,$2,$3) RETURNING *", [menuid, ingredient.id,ingredient.porportion]);
            rows.push(table.rows);
        }

        res.json({menuitem: table.rows[0], ingredients: rows});
    } catch (error) {
        console.error(error);
    }
})

// edit menu item

/**
 * @swagger
 *  /menuitem/{id}/name={name}/foodtype={foodtype}:
 *  put:
 *      description: edits menu item of id to a new name and/or foodtype
 *      parameters:
 *          - name: id
 *            type: int
 *            description: int id of menu item to be edited
 *            required: true
 *            in: path  
 *          - name: name
 *            type: String
 *            description: String new name of menu item to be edited
 *            required: true
 *            in: path      
 *          - name: foodtype
 *            type: String
 *            description: String new foodtype in which the edited menu item belongs in
 *            required: true
 *            in: path     
 *      responses: 
 *          200:
 *              description: Success
 */
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

/**
 * @swagger
 *  /menuitem/{menuid}:
 *  delete:
 *      description: removes menu item of menu id from menuitems database
 *      parameters:
 *          - name: menuid
 *            type: int
 *            description: int id of menu item to be deleted
 *            required: true
 *            in: path  
 *      responses: 
 *          200:
 *              description: Success
 */
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

// add mealsize

/**
 * @swagger
 * /inventoryitem/{ingredient}/{unit}/{amount}:
 *  post:
 *      description: creates and submits new inventory item to inventory database of ingredient, unit, and amount
 *      parameters:
 *          - name: ingredient
 *            type: String
 *            description: name of ingredient
 *            required: true
 *            in: path
 *          - name: unit
 *            type: String
 *            description: name of unit (example - oz)
 *            required: true
 *            in: path
 *          - name: amount
 *            type: float
 *            description: amount of inventory ingredient in size units
 *            required: true
 *            in: path
 *      responses: 
 *          200:
 *              description: Success
 */
 app.put("/mealsizeitem/:foodtype/:name/:price", async (req, res) => {
    try {
        console.log(req.params);
        const foodtype = req.params["foodtype"];
        const name = req.params["name"];
        const price = Number(req.params["price"]);
        const table = await pool.query("UPDATE mealsizes SET price = $3 WHERE foodtype = $1 AND name = $2 RETURNING *", [foodtype, name, price]);
        //console.log(table.rows);
        // table has a lot of extra parameters
        res.json(table.rows[0]); // response
        
    } catch (error) {
        console.error(error.message);
    }
});

// helpful stuff to make the functinos

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
