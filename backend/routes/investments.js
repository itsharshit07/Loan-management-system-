const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET /api/investments
router.get("/investments", (req, res) => {
  const query = `
    SELECT 
      i.I_ID,
      i.C_ID,
      c.name AS customerName,
      i.Type,
      i.Purchase_Price,
      i.Current_Market_Value
    FROM Investment i
    LEFT JOIN Customer c ON i.C_ID = c.C_ID
    ORDER BY i.I_ID DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching investments:", err);
      return res.status(500).send("Error fetching investments");
    }
    res.json(results);
  });
});

module.exports = router;
