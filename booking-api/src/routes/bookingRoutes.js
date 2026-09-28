const express = require("express");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

router.get("/", bookingController.getBookings);
router.post("/", bookingController.createBooking);

module.exports = router;
