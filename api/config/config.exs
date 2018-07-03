# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :sling,
  ecto_repos: [Sling.Repo]

# Configures the endpoint
config :sling, SlingWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "4j+uQMLITuCwpRaLAi4MJHA+HrnPVxE5VsTeYgLb9p5QLQaSZIuuuo0SSEGYAhB3",
  render_errors: [view: SlingWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: Sling.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.

config :ueberauth, Ueberauth,
  base_path: "/api/auth",
  providers: [
    identity:
      {Ueberauth.Strategy.Identity,
       [
         callback_methods: ["POST"],
         nickname_field: :username,
         #  param_nesting: "user",
         uid_field: :username
       ]}
  ]

config :sling, Sling.Guardian,
  issuer: "Sling",
  secret_key: "use mix phx.gen.secret hello",
  permissions: %{
    default: [:read_users, :write_users]
  }

config :sling, SlingWeb.Plug.AuthAccessPipeline,
  module: Sling.Guardian,
  error_handler: SlingWeb.Plug.AuthErrorHandler

import_config "#{Mix.env()}.exs"
