const listings = require("../data/listings");

function searchListings(req, res) {
  const query = (req.query.q ?? "").trim().toLocaleLowerCase();
  const city = (req.query.city ?? "").trim().toLocaleLowerCase();
  const guests = req.query.guests === undefined ? null : Number(req.query.guests);

  if (guests !== null && (!Number.isInteger(guests) || guests < 1)) {
    return res.status(400).json({
      error: {
        code: "INVALID_SEARCH_FILTER",
        message: "The guests filter must be a positive integer."
      }
    });
  }

  const results = listings.filter((listing) => {
    const matchesQuery = !query ||
      `${listing.title} ${listing.description}`.toLocaleLowerCase().includes(query);
    const matchesCity = !city || listing.location.city.toLocaleLowerCase() === city;
    const matchesGuests = guests === null || listing.maxGuests >= guests;
    return matchesQuery && matchesCity && matchesGuests;
  });

  return res.json({ data: results });
}

module.exports = { searchListings };
