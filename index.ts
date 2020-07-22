import * as HTTP from "http";
import * as URL from "url";

const port = process.env.PORT;

const index: HTTP.RequestListener = (_request, response): void => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");
  response.write(JSON.stringify({ message: "Hello World" }));
  response.end(() => {
    console.debug("%s: Request received to index", new Date());
  });
};

const shutdown: HTTP.RequestListener = (_request, response): void => {
  response.statusCode = 204;
  response.end(() => {
    console.debug("%s: Request received to shutdown", new Date());
    process.exit(0);
  });
};

const notFound: HTTP.RequestListener = (_request, response): void => {
  response.statusCode = 404;
  response.end(() => {
    console.debug("%s: Request ended with status 404", new Date());
  });
};

const server = HTTP.createServer((request, response): void => {
  const url = URL.parse(request.url!);

  if (url.path === "/") {
    return index(request, response);
  }

  if (url.path === "/shutdown") {
    return shutdown(request, response);
  }

  return notFound(request, response);
});

server
  .listen(port)
  .once("listening", () => console.debug("Server running on port %d", port));
