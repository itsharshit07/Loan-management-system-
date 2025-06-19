const express = require("express");
const router = express.Router();
const db = require("../config/db");

// POST /api/loans/apply
router.post("/apply", (req, res) => {
  const { C_ID, Loan_Type, Amount, Interest_Rate, Term_Years } = req.body;

  const query = `
    INSERT INTO Loan (C_ID, Loan_Type, Amount, Interest_Rate, Term_Years)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [C_ID, Loan_Type, Amount, Interest_Rate, Term_Years], (err, result) => {
    if (err) {
      console.error("Error applying for loan:", err);
      return res.status(500).send("Error applying for loan");
    }
    res.status(201).send("Loan application submitted successfully");
  });
});

module.exports = router;
