# OpenMind URL Screenshot API

The OpenMind URL Screenshot API allows you to capture screenshots of web pages programmatically. You can use this API to generate thumbnails, monitor web page changes, or create visual archives of websites.

## Getting Started

To use the API, you will need an API key. You can request an API key by contacting us at securedbox247@outlook.com.

### Base URL

The base URL for the API is `https://url-screenshot.onrender.com/`.

### Authentication

Authentication is required to access the API. Include your API key in the `X-API-Key` header of your HTTP request.

### Endpoint

To capture a screenshot, send a GET request to the `/screenshot` endpoint with the `url` query parameter set to the URL of the web page you want to capture.

Example:

```
GET https://url-screenshot.onrender.com/screenshot?url=https://example.com
```

### Response

The API will respond with a base64-encoded image of the screenshot. You can decode this image and use it as needed in your application.

## Rate Limiting

The API has a rate limit of 100 requests per hour per API key. If you exceed this limit, you will receive a 429 status code.

## Support

If you have any questions or need assistance, please contact us at securedbox247@outlook.com.

## Terms of Use

By using the OpenMind URL Screenshot API, you agree to abide by the [Terms of Use](#) outlined for the service.
