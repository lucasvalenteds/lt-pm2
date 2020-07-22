CONFIG = "package.json"
SERVICE = "server"
SERVICE_URL = "http://localhost:8080/"
SCALE ?= 1
BIN_PM2 = "./node_modules/.bin/pm2"
BIN_AUTOCANNON = "./node_modules/.bin/autocannon"

start:
	@npm install
	@npm run build
	@$(BIN_PM2) start $(CONFIG)

stop:
	@$(BIN_PM2) delete $(SERVICE)

scale:
	@$(BIN_PM2) scale $(SERVICE) $(SCALE)

logs:
	@$(BIN_PM2) logs

metrics:
	@$(BIN_PM2) monit

test:
	@$(BIN_AUTOCANNON) --connections 120 --method GET --duration 30 $(SERVICE_URL)
