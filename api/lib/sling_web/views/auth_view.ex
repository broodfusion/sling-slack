defmodule SlingWeb.AuthView do
  use SlingWeb, :view
  alias SlingWeb.AuthView

  def render("jwt.json", %{token: jwt}) do
    %{token: jwt}
  end

  def render("error.json", %{error: error}) do
    %{error: error}
  end
end
