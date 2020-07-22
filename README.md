# LT: PM2

It demonstrates how to run multiple Node.js processes that serve HTTP requests and manage them using [PM2](https://github.com/Unitech/pm2).

The goal is to restart the application as soon as its Node.js process (PID) is no longer active due to an unexpected error or any other reason.

We also want to have metrics about the environment and the application behavior like CPU usage, RAM usage and total of HTTP requests received.

## How to run

| Description | Command |
| :--- | :--- |
| Start the server | `make start` |
| Stop the server | `make stop` |
| Show logs | `make logs` |
| Show metrics | `make metrics` |
| Run stress test | `make test` |
| Shutdown a server | `make shutdown` |

> Running `SCALE=N make scale` will run N servers (e.g.: `SCALE=10 make scale` will run servers)
