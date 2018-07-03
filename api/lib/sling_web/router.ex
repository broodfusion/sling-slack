defmodule SlingWeb.Router do
  use SlingWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])
  end

  pipeline :authenticated do
    plug(SlingWeb.Plug.AuthAccessPipeline)
  end

  scope "/api", SlingWeb do
    pipe_through(:api)

    scope "/auth" do
      post("/identity/callback", AuthController, :identity_callback)
      post("/signup", AuthController, :create)
    end

    # pipe_through(:authenticated)
    # post("/signin", UserController, :sign_in)
  end

  scope "/api", SlingWeb do
    pipe_through([:api, :authenticated])

    get("/myuser", UserController, :show)
  end
end
