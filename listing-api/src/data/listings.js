const listings = [
  {
    id: "listing-101",
    title: "Sunny apartment near the old town",
    description: "A bright, comfortable apartment within walking distance of cafes and local sights.",
    location: {
      city: "Lisbon",
      country: "Portugal"
    },
    pricePerNight: 92,
    currency: "EUR",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ["Wi-Fi", "Kitchen", "Air conditioning"]
  },
  {
    id: "listing-102",
    title: "Quiet cabin in the pines",
    description: "A peaceful cabin with a deck, surrounded by forest and close to hiking trails.",
    location: {
      city: "Bend",
      country: "United States"
    },
    pricePerNight: 145,
    currency: "USD",
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    amenities: ["Wi-Fi", "Kitchen", "Free parking"]
  },
  {
    id: "listing-103",
    title: "Family home by the beach",
    description: "A spacious home with a sunny patio, a short walk from the shore.",
    location: {
      city: "Málaga",
      country: "Spain"
    },
    pricePerNight: 180,
    currency: "EUR",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ["Wi-Fi", "Kitchen", "Washer", "Free parking"]
  }
];

function findAll() {
  return listings;
}

function findById(id) {
  return listings.find((listing) => listing.id === id) ?? null;
}

module.exports = { findAll, findById };
