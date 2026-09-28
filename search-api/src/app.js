const express = require("express");
const searchRoutes = require("./routes/searchRoutes");

const app = express();

app.get("/health", (_req, res) => res.json({ status: "ok", service: "search-api" }));
app.use("/api/search", searchRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: { code: "ROUTE_NOT_FOUND", message: `No route found for ${req.method} ${req.path}.` }
  });
});

module.exports = app;
