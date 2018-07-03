# Sling-Slack

Sling-Slack is a Slack clone made with React/Redux as the frontend and Elixir/Phoenix as the backend API

# Prerequisite
- This project assumes you have at least Elixir v1.6 (Erlang/OTP20) and Phoenix v1.3
- This project assumes you have Postgres installed at least locally
- This project obviously does not include db connection details and assumes you can create your own dev.secret.exs file.

# Installation

First, clone the repository
```sh
    $ git clone https://github.com/broodfusion/sling-slack.git
    $ cd sling-slack
```
#### Starting the server (API)
```sh
    $ cd api
    $ mix deps.get
    $ mix phx.server
```
By default, server should run on http://localhost:4000

#### Starting the client
```sh
    $ cd web
    $ yarn
    $ yarn start
```
If you don't have yarn, use npm:
```sh
    $ cd web
    $ npm install
    $ npm start
```
By default, client should run on http://localhost:3000
