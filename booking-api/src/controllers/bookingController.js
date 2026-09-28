const bookingStore = require("../data/bookings");

function getBookings(_req, res) {
  return res.json({ data: bookingStore.findAll() });
}

function createBooking(req, res) {
  const { listingId, guestName, checkIn, checkOut, guests } = req.body ?? {};

  if (
    typeof listingId !== "string" || !listingId.trim() ||
    typeof guestName !== "string" || !guestName.trim() ||
    typeof checkIn !== "string" || typeof checkOut !== "string" ||
    !Number.isInteger(guests) || guests < 1
  ) {
    return res.status(400).json({
      error: {
        code: "INVALID_BOOKING_REQUEST",
        message: "Provide listingId, guestName, checkIn, checkOut, and a positive integer guests value."
      }
    });
  }

  const checkInDate = new Date(`${checkIn}T00:00:00Z`);
  const checkOutDate = new Date(`${checkOut}T00:00:00Z`);
  if (
    Number.isNaN(checkInDate.getTime()) || Number.isNaN(checkOutDate.getTime()) ||
    checkInDate.toISOString().slice(0, 10) !== checkIn ||
    checkOutDate.toISOString().slice(0, 10) !== checkOut ||
    checkOutDate <= checkInDate
  ) {
    return res.status(400).json({
      error: {
        code: "INVALID_BOOKING_DATES",
        message: "Provide valid ISO dates with checkOut later than checkIn."
      }
    });
  }

  if (!bookingStore.listingExists(listingId)) {
    return res.status(404).json({
      error: {
        code: "LISTING_NOT_FOUND",
        message: `No listing found with id '${listingId}'.`
      }
    });
  }

  const booking = bookingStore.create({
    listingId: listingId.trim(),
    guestName: guestName.trim(),
    checkIn,
    checkOut,
    guests
  });

  return res.status(201).json({ data: booking });
}

module.exports = { getBookings, createBooking };
