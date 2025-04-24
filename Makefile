export USER_UID=$(shell id -u)
export USER_GID=$(shell id -g)
export DIR_PATH=$(shell pwd)

# Docker
docker-build:
	docker compose build

# Node
node-install:
	docker compose run --rm app npm install

node-sh:
	docker compose run --rm app bash

# App
app-init: docker-build node-install

app-run:
	docker compose run --rm app npm run app

app-test:
	docker compose run --rm app npm test

app-linter:
	docker compose run --rm app npx tsc
	docker compose run --rm app npx eslint
