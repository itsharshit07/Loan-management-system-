const express = require("express");
const router = express.Router();
const db = require("../config/db");

// 🔹 1. Create a new account
// POST /api/accounts
router.post("/accounts", (req, res) => {
  const { C_ID, type, status, opening_date, balance } = req.body;

  const query = `
    INSERT INTO Account (C_ID, Type, Status, Opening_Date, Balance)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [C_ID, type, status, opening_date, balance], (err, result) => {
    if (err) {
      console.error("Error creating account:", err);
      return res.status(500).send("Error creating account");
    }

    res.status(201).json({
      message: "Account created successfully",
      A_ID: result.insertId,
    });
  });
});

// 🔹 2. Get all accounts
// GET /api/accounts
router.get("/accounts", (req, res) => {
  const query = `
    SELECT a.*, c.name AS customer_name
    FROM Account a
    JOIN Customer c ON a.C_ID = c.C_ID
    ORDER BY a.A_ID DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching accounts:", err);
      return res.status(500).send("Error fetching accounts");
    }

    res.json(results);
  });
});

// 🔹 3. Get account by ID
// GET /api/accounts/:id
router.get("/accounts/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM Account WHERE A_ID = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching account:", err);
      return res.status(500).send("Error fetching account");
    }

    if (results.length === 0) {
      return res.status(404).send("Account not found");
    }

    res.json(results[0]);
  });
});

// 🔹 4. Update an account
// PUT /api/accounts/:id
router.put("/accounts/:id", (req, res) => {
  const { id } = req.params;
  const { type, status, opening_date, balance } = req.body;

  const query = `
    UPDATE Account 
    SET Type = ?, Status = ?, Opening_Date = ?, Balance = ? 
    WHERE A_ID = ?
  `;

  db.query(query, [type, status, opening_date, balance, id], (err, result) => {
    if (err) {
      console.error("Error updating account:", err);
      return res.status(500).send("Error updating account");
    }

    res.json({ message: "Account updated successfully" });
  });
});

// 🔹 5. Delete an account
// DELETE /api/accounts/:id
router.delete("/accounts/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM Account WHERE A_ID = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting account:", err);
      return res.status(500).send("Error deleting account");
    }

    res.json({ message: "Account deleted successfully" });
  });
});

module.exports = router;
