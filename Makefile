BIN_PM2 = "./node_modules/.bin/pm2"
BIN_AUTOCANNON = "./node_modules/.bin/autocannon"

SERVICE = "server"
URL = "http://localhost:8080"
SCALE ?= 1

start:
	@npm install
	@npm run build
	@$(BIN_PM2) start package.json

stop:
	@$(BIN_PM2) delete $(SERVICE)

scale:
	@$(BIN_PM2) scale $(SERVICE) $(SCALE)

monitoring:
	@$(BIN_PM2) monit

metrics:
	@$(BIN_PM2) show $(SERVICE)

test:
	@$(BIN_AUTOCANNON) --connections 120 --method GET --duration 30 $(URL)/

shutdown:
	@curl --verbose $(URL)/shutdown
