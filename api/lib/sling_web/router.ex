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
    end

    pipe_through(:authenticated)

    resources("/users", UserController, except: [:new, :edit])
  end
end
