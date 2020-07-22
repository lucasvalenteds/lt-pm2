import * as Console from "console";
import * as HTTP from "http";
import * as URL from "url";
import Process from "process";
import PM2 from "@pm2/io";

const requestsTotal = PM2.counter({
  name: "Requests total",
  historic: false,
});

const health: HTTP.RequestListener = (_request, response) => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");
  response.write(JSON.stringify({ status: "up" }));
  response.end(() => {
    requestsTotal.inc();
  });
};

const shutdown: HTTP.RequestListener = (_request, response) => {
  response.statusCode = 204;
  response.end(() => {
    Process.kill(Process.pid, "SIGTERM");
  });
};

const server = HTTP.createServer((request, response) => {
  const url = URL.parse(request.url!);

  if (url.path === "/shutdown") {
    shutdown(request, response);
  } else {
    health(request, response);
  }
});

const port = Process.env.PORT;

server.listen(port, () => {
  Console.debug("Server running on port %d (PID %d)", port, Process.pid);
});

Process.on("SIGTERM", () => {
  server.close(() => {
    Console.debug("Server stopped (PID %d)", Process.pid);
    Process.exit(0);
  });
});
