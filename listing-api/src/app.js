const express = require("express");
const listingRoutes = require("./routes/listingRoutes");

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "listing-api" });
});

app.use("/api/listings", listingRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: {
      code: "ROUTE_NOT_FOUND",
      message: `No route found for ${req.method} ${req.path}.`
    }
  });
});

module.exports = app;
