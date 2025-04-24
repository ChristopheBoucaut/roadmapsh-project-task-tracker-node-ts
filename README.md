An implementation to practice typescript from [roadmap.sh](https://roadmap.sh/projects/task-tracker).

# Start projet

## Requirements

Docker & Docker compose.

## Instructions

1. git clone ...
2. `make init`

# Use project

1. Run app : `make app-run`
2. Run test : `make app-test`
   1. To dev, you can run `make app-test-watch`.
3. Run linter : `make app-linter`

# Github action locally

1. Install [act](https://github.com/nektos/act) locally : `curl --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash`
2. Run act : `bin/act`
