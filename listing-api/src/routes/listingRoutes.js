const express = require("express");
const listingController = require("../controllers/listingController");

const router = express.Router();

router.get("/", listingController.getListings);
router.get("/:id", listingController.getListingById);

module.exports = router;
