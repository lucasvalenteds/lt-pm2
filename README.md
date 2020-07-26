# POC: PM2

It demonstrates how to run multiple Node.js processes that serve HTTP requests and manage them using [PM2](https://github.com/Unitech/pm2).

The goal is to restart the application as soon as its Node.js process (PID) is no longer active due to an unexpected error or any other reason.

We also want to have metrics about the environment and the application behavior like CPU usage, RAM usage and total of HTTP requests received.

## How to run

| Description | Command |
| :--- | :--- |
| Start the server | `make start` |
| Stop the server | `make stop` |
| Show monitoring dashboard | `make monitoring` |
| Show metrics | `make metrics` |
| Run stress test | `make test` |
| Shutdown a server | `make shutdown` |

> Running `SCALE=N make scale` will run N servers (e.g.: `SCALE=10 make scale` will run servers)

## Preview

```
$ make start
[PM2][WARN] Applications server not running, starting...
[PM2] App [server] launched (1 instances)
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ server             │ cluster  │ 0    │ online    │ 0%       │ 29.6mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

```
$ SCALE=4 make scale
[PM2] Scaling up application
[PM2] Scaling up application
[PM2] Scaling up application
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ server             │ cluster  │ 0    │ online    │ 13.3%    │ 38.3mb   │
│ 1  │ server             │ cluster  │ 0    │ online    │ 0%       │ 39.8mb   │
│ 2  │ server             │ cluster  │ 0    │ online    │ 0%       │ 37.1mb   │
│ 3  │ server             │ cluster  │ 0    │ online    │ 0%       │ 34.1mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

```
$ make stop
[PM2] Applying action deleteProcessId on app [server](ids: [ 0, 1, 2, 3 ])
[PM2] [server](1) ✓
[PM2] [server](0) ✓
[PM2] [server](2) ✓
[PM2] [server](3) ✓
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

```
$ make metrics
 Code metrics value 
┌────────────────────────┬─────────────────┐
│ Heap Size              │ 46.76 MiB       │
│ Heap Usage             │ 46.7 %          │
│ Used Heap Size         │ 21.84 MiB       │
│ Active requests        │ 0               │
│ Active handles         │ 2               │
│ Event Loop Latency     │ 0.84 ms         │
│ Event Loop Latency p95 │ 5.02 ms         │
│ HTTP Mean Latency      │ 0 ms            │
│ HTTP P95 Latency       │ 0 ms            │
│ HTTP                   │ 4822.61 req/min │
│ Requests total         │ 699568          │
└────────────────────────┴─────────────────┘
```
