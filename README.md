An implementation to practice typescript from [roadmap.sh](https://roadmap.sh/projects/task-tracker).

# Start projet

## Requirements

Docker & Docker compose.

## Instructions

1. git clone ...
2. `docker compose build`
3. `docker compose run --rm app npm install`

# Use project

1. Run container : `docker compose run --rm app bash`
2. Run app : `npm run app`
3. Run test : `npm test`
4. Run linter : `npx eslint`

# Github action locally

1. Install [act](https://github.com/nektos/act) locally : `curl --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash`
2. Run act : `bin/act`
