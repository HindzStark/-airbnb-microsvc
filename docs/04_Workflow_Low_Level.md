# Low-Level API Workflow

The endpoint paths below are service-relative. When fronted by a gateway, public paths may be prefixed or rewritten by gateway configuration. Responses are JSON. All data is sample in-memory data and resets when a service restarts.

## Listing API

Base path: `/api/listings` (default port `3001`)

### `GET /health`

No request body.

```json
{ "status": "ok", "service": "listing-api" }
```

### `GET /api/listings`

Returns all hardcoded listings. No request body.

```json
{
  "data": [
    {
      "id": "listing-101",
      "title": "Sunny apartment near the old town",
      "description": "A bright, comfortable apartment within walking distance of cafes and local sights.",
      "location": { "city": "Lisbon", "country": "Portugal" },
      "pricePerNight": 92,
      "currency": "EUR",
      "bedrooms": 1,
      "bathrooms": 1,
      "maxGuests": 2,
      "amenities": ["Wi-Fi", "Kitchen", "Air conditioning"]
    }
  ]
}
```

The real response contains all sample listings; this and subsequent examples show a representative item.

### `GET /api/listings/:id`

Example: `GET /api/listings/listing-101`. No request body.

```json
{
  "data": {
    "id": "listing-101",
    "title": "Sunny apartment near the old town",
    "description": "A bright, comfortable apartment within walking distance of cafes and local sights.",
    "location": { "city": "Lisbon", "country": "Portugal" },
    "pricePerNight": 92,
    "currency": "EUR",
    "bedrooms": 1,
    "bathrooms": 1,
    "maxGuests": 2,
    "amenities": ["Wi-Fi", "Kitchen", "Air conditioning"]
  }
}
```

Unknown ID returns `404`:

```json
{
  "error": {
    "code": "LISTING_NOT_FOUND",
    "message": "No listing found with id 'missing'."
  }
}
```

## Booking API

Base path: `/api/bookings` (default port `3002`)

### `GET /health`

No request body.

```json
{ "status": "ok", "service": "booking-api" }
```

### `POST /api/bookings`

Creates an in-memory booking. Required JSON body:

```json
{
  "listingId": "listing-101",
  "guestName": "Alex Morgan",
  "checkIn": "2026-10-12",
  "checkOut": "2026-10-15",
  "guests": 2
}
```

Successful creation returns `201`:

```json
{
  "data": {
    "id": "booking-1",
    "listingId": "listing-101",
    "guestName": "Alex Morgan",
    "checkIn": "2026-10-12",
    "checkOut": "2026-10-15",
    "guests": 2,
    "status": "confirmed"
  }
}
```

Invalid or missing fields return `400` with an `error` object. Unknown listing IDs return `404` with code `LISTING_NOT_FOUND`. The sample implementation checks IDs from a local fake list only; it does not verify real availability.

### `GET /api/bookings`

Returns all in-memory bookings; no request body.

```json
{ "data": [] }
```

After a successful example POST, the array contains the created booking object shown above.

## Search API

Base path: `/api/search` (default port `3003`)

### `GET /health`

No request body.

```json
{ "status": "ok", "service": "search-api" }
```

### `GET /api/search/listings`

Searches the hardcoded listing set. Supported optional query parameters are `q` (matches title or description, case-insensitive), `city` (case-insensitive exact city match), and `guests` (minimum capacity). No request body.

Example: `GET /api/search/listings?city=Lisbon&guests=2`

```json
{
  "data": [
    {
      "id": "listing-101",
      "title": "Sunny apartment near the old town",
      "description": "A bright, comfortable apartment within walking distance of cafes and local sights.",
      "location": { "city": "Lisbon", "country": "Portugal" },
      "pricePerNight": 92,
      "currency": "EUR",
      "bedrooms": 1,
      "bathrooms": 1,
      "maxGuests": 2,
      "amenities": ["Wi-Fi", "Kitchen", "Air conditioning"]
    }
  ]
}
```

Search currently filters local fake data. Kafka event consumption and Elasticsearch indexing/querying are conceptual future integrations.
