// backend/routes/customerRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all customers
router.get("/customers", (req, res) => {
  const query = "SELECT * FROM customer";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error fetching customers");
    } else {
      res.json(results);
    }
  });
});

// Add a new customer
router.post("/customers", (req, res) => {
  const { name, email, dob, a_c_type } = req.body;
  const query =
    "INSERT INTO customer (name, email, dob, a_c_type) VALUES (?, ?, ?, ?)";
  db.query(query, [name, email, dob, a_c_type], (err, result) => {
    if (err) {
      res.status(500).send("Error adding customer");
    } else {
      res.send("Customer added successfully!");
    }
  });
});

module.exports = router;
