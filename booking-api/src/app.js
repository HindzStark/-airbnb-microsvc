const express = require("express");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(express.json());
app.get("/health", (_req, res) => res.json({ status: "ok", service: "booking-api" }));
app.use("/api/bookings", bookingRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: { code: "ROUTE_NOT_FOUND", message: `No route found for ${req.method} ${req.path}.` }
  });
});

module.exports = app;
