const express = require("express");
const router = express.Router();
const db = require("../config/db");

// 1️⃣ Get all customers
router.get("/customers", (req, res) => {
  const query = "SELECT * FROM customer";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching customers");
    }
    res.json(results);
  });
});

// 2️⃣ Check if an email already exists
router.get("/customers/check-email", (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).send("Email query parameter is required");
  }

  const query = "SELECT 1 FROM customer WHERE email = ? LIMIT 1";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error checking email");
    }
    res.json({ exists: results.length > 0 });
  });
});

// 3️⃣ Add a new customer
router.post("/customers", (req, res) => {
  const { name, email,dob, a_c_type } = req.body;
  const query =
    "INSERT INTO customer (name, email, dob, a_c_type) VALUES (?, ?, ?, ?)";

  db.query(query, [name, email, dob, a_c_type], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error adding customer");
    }
    res
      .status(201)
      .json({ message: "Customer added successfully", C_ID: result.insertId });
  });
});

// ✅ 4️⃣ Get a specific customer by C_ID
router.get("/customer/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM customer WHERE C_ID = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching customer");
    }

    if (results.length === 0) {
      return res.status(404).send("Customer not found");
    }

    res.json(results[0]);
  });
});

// ✅ 5️⃣ Update a customer by C_ID
router.put("/customer/:id", (req, res) => {
  const { id } = req.params;
  const { Name, Email, DOB, A_C_Type } = req.body;

  const query =
    "UPDATE Customer SET Name = ?, Email = ?, DOB = ?, A_C_Type = ? WHERE C_ID = ?";

  db.query(query, [Name, Email, DOB, A_C_Type, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error updating customer");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("Customer not found");
    }

    res.json({ message: "Customer updated successfully" });
  });
});

module.exports = router;
