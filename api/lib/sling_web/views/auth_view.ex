defmodule SlingWeb.AuthView do
  use SlingWeb, :view
  alias SlingWeb.AuthView

  def render("jwt.json", %{token: jwt, user: user}) do
    %{token: jwt, id: user.id}
  end

  def render("error.json", %{error: error}) do
    %{error: error}
  end
end
