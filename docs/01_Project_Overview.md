# Project Overview

This project is a microservices backend for an Airbnb-style accommodation platform. An API Gateway provides the public entry point for clients and routes requests to separate services based on the requested capability.

## High-level architecture

```text
Web or mobile client
        |
        v
    API Gateway
     /   |   \
    v    v    v
Listing Booking Search
 API     API    API
```

- **API Gateway** — Receives client API requests, applies cross-cutting entry-point concerns such as routing and authentication, and forwards each request to the appropriate service.
- **Listing API** — Owns listing-related operations, such as retrieving accommodation details. In this first iteration it serves sample hardcoded data from memory.
- **Booking API** — Will own booking operations and booking-related rules. It is part of the target architecture but is not implemented in this iteration.
- **Search API** — Will handle listing discovery and search-specific behavior. It is part of the target architecture but is not implemented in this iteration.

Each service is an independently scoped application behind the gateway. This iteration implements only the Listing API and does not define persistence, deployment, or service-to-service details.
