CONFIG = "package.json"
SERVICE = "server"
SERVICE_URL = "http://localhost:8080/"
SCALE ?= 1
BIN = "./node_modules/.bin/pm2"

start:
	@npm install
	@npm run build
	@$(BIN) start $(CONFIG)

stop:
	@$(BIN) delete $(SERVICE)

scale:
	@$(BIN) scale $(SERVICE) $(SCALE)

logs:
	@$(BIN) logs

metrics:
	@$(BIN) monit

test:
	npx autocannon --connections 120 --method GET --duration 30 $(SERVICE_URL)
