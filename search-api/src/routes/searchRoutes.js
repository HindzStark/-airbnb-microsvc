const express = require("express");
const searchController = require("../controllers/searchController");

const router = express.Router();

router.get("/listings", searchController.searchListings);

module.exports = router;
