// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const customerRoutes = require("./routes/customerRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const accountRoutes = require('./routes/accountRoutes');
const investmentRoutes = require('./routes/investments');
const loanRoutes = require("./routes/loan");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use customer routes
app.use("/api", customerRoutes);
app.use("/api", transactionRoutes);
app.use('/api', accountRoutes);
app.use('/api', investmentRoutes);
app.use("/api/loans", loanRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
