import * as Console from "console";
import * as HTTP from "http";
import * as URL from "url";
import Process from "process";

const port = Process.env.PORT;

const index: HTTP.RequestListener = (_request, response): void => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");
  response.write(JSON.stringify({ message: "Hello World" }));
  response.end();
};

const shutdown: HTTP.RequestListener = (_request, response): void => {
  response.statusCode = 204;
  response.end(() => {
    Process.exit(0);
  });
};

const notFound: HTTP.RequestListener = (_request, response): void => {
  response.statusCode = 404;
  response.end();
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

server.listen(port, () => {
  Console.debug("Server running on port %d", port);
});

Process.on("SIGTERM", () => {
  server.close(() => {
    Console.debug("Server stopped");
    Process.exit(0);
  });
});
