// backend/config/db.js
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",         // Your MySQL username
  password: "Prateek@497",         // Your MySQL password
  database: "loan_management_system", // Database name
});

db.connect((err) => {
  if (err) {
    console.error("MySQL Connection Error: " + err.message);
    return;
  }
  console.log("✅ Connected to MySQL Database!");
});

module.exports = db;
