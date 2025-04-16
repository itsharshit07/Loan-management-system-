// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const customerRoutes = require("./routes/customerRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use customer routes
app.use("/api", customerRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
