const listingStore = require("../data/listings");

function getListings(_req, res) {
  res.json({ data: listingStore.findAll() });
}

function getListingById(req, res) {
  const listing = listingStore.findById(req.params.id);

  if (!listing) {
    return res.status(404).json({
      error: {
        code: "LISTING_NOT_FOUND",
        message: `No listing found with id '${req.params.id}'.`
      }
    });
  }

  return res.json({ data: listing });
}

module.exports = { getListings, getListingById };
