const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET /api/transactions
router.get("/transactions", (req, res) => {
  const query = `
    SELECT 
      t.T_ID,
      t.A_ID,
      t.C_ID,
      c.name   AS customerName,
      t.Type,
      t.Date,
      t.Amount,
      t.Status
    FROM \`Transaction\` t
    LEFT JOIN Customer c ON t.C_ID = c.C_ID
    ORDER BY t.Date DESC, t.T_ID DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching transactions:", err);
      return res.status(500).send("Error fetching transactions");
    }
    res.json(results);
  });
});

module.exports = router;
