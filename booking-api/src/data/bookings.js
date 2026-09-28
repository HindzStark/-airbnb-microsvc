const knownListingIds = new Set(["listing-101", "listing-102", "listing-103"]);
const bookings = [];
let nextId = 1;

function findAll() {
  return bookings;
}

function listingExists(listingId) {
  return knownListingIds.has(listingId);
}

function create(bookingDetails) {
  const booking = {
    id: `booking-${nextId++}`,
    ...bookingDetails,
    status: "confirmed"
  };
  bookings.push(booking);
  return booking;
}

module.exports = { findAll, listingExists, create };
