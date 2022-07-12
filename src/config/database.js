const Pool = require("pg").Pool;
require('dotenv').config()

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'task-app',
  password: 'postgres',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  }
});


pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => { 
  release(); 
    if (err) {
      return console.error("Error acquiring client", err.stack);
    }
    console.log(`Connected to Database ${pool.options.database}`);
  });
});

module.exports = pool
