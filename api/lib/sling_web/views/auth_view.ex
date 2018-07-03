defmodule SlingWeb.AuthView do
  use SlingWeb, :view
  alias SlingWeb.AuthView

  def render("jwt.json", %{token: jwt}) do
    %{token: jwt}
  end
end
