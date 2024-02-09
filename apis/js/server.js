import { v4 as uuidv4 } from "uuid"; // Make sure to install uuid with Bun

Bun.serve({
  port: 8080,
  fetch(request) {
    const url = new URL(request.url);


    // Handle the /v1/resource route
    if (url.pathname === "/v1/resource") {
      return new Response(JSON.stringify({
        id: uuidv4(),
        name: "Hello from a JavaScript API",
      }), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Add healthz with 200
    if (url.pathname === "/healthz") {
      return new Response("OK", {
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    let path = url.pathname;

    // Default to index.html if the root is requested
    if (path === "/") path = "/index.html";

    // Construct the file path to the static folder
    const filePath = `./static${path}`;

    // Try to serve the file from the static folder
    try {
      const file = Bun.file(filePath);
      return new Response(file, {
        headers: {
          // You can add more content types based on your needs
          "Content-Type": path.endsWith(".css") ? "text/css" : "text/html",
        },
      });
    } catch (error) {
      // Return a 404 response if the file is not found
      return new Response("Not found", { status: 404 });
    }
  },
});