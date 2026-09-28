# Mid-Level Data Workflow

This document describes the intended data movement between the services and supporting systems. Kafka and Elasticsearch are part of the conceptual design only; neither is connected by the current in-memory sample applications.

## Listing changes and search indexing

When listing data changes, the Listing API (or a future listing-management component) would publish a listing event such as `ListingCreated` or `ListingUpdated` to a Kafka topic. The Search API would consume those events and update the corresponding document in Elasticsearch. Search requests could then query Elasticsearch and return matching listing summaries to the client through the API Gateway.

```text
Listing change -> Kafka topic -> Search API consumer -> Elasticsearch index
Client search -> API Gateway -> Search API -> Elasticsearch -> response
```

Kafka decouples the producer of listing changes from the search index updater. In a production design, consumers would handle retries and duplicate events safely, and indexing would be eventually consistent: a new or changed listing might take a short time to appear in search. The current Search API instead filters a small hardcoded array synchronously.

## Booking availability check

When a client submits a booking request, the API Gateway routes it to the Booking API. The Booking API would validate the request and ask the Listing API for the requested listing and its availability for the requested dates. If the listing is valid and available, the Booking API creates a booking and returns it. If the listing is missing or unavailable, it returns an appropriate error.

```text
Client -> API Gateway -> Booking API -> Listing API (listing/availability check)
                                      <- result
Client <- API Gateway <- Booking API (booking result)
```

Availability ownership and the exact internal endpoint are design choices to settle before production. The current Booking API uses hardcoded listing IDs and an in-memory booking array; it does not call the Listing API or enforce date conflicts. Its success response is only a practice example, not a reservation guarantee.
