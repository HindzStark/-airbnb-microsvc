# High-Level Request Workflow

This document describes the intended high-level path for web traffic through the backend.

1. A user interacts with the web or mobile client, which sends an HTTP request to the backend's public API address.
2. The API Gateway receives the request. It uses the request path (and, where configured, method) to select the responsible microservice.
3. The gateway forwards the request to the selected service:
   - Listing-related requests go to the **Listing API**.
   - Booking-related requests go to the **Booking API**.
   - Search-related requests go to the **Search API**.
4. The selected service performs its operation and returns an HTTP response to the gateway.
5. The gateway relays the response to the client, where the result is shown to the user.

For this iteration, only the Listing API is available as an implementation. The gateway and the Booking and Search services are architectural components only; their implementation and more detailed workflows are deferred to later iterations.
