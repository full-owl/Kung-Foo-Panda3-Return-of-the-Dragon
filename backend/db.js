const Pool = require("pg").Pool;

const pool = new Pool({
    // add password
    user: "csce331_904_evan",
    host: "csce-315-db.engr.tamu.edu",
    database: "csce331_904_55",
    password: "12345wer",
    port: "5432",
    ssl: {rejectUnauthorized: false}
});

module.exports = pool;