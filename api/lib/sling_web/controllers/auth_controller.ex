defmodule SlingWeb.AuthController do
  use SlingWeb, :controller

  alias Sling.Accounts
  alias Sling.Accounts.User
  alias Sling.Guardian

  plug(Ueberauth)
  action_fallback(SlingWeb.FallbackController)

  def create(conn, user_params) do
    with {:ok, %User{} = user} <- Accounts.create_user(user_params),
         {:ok, jwt, _claims} <- Guardian.encode_and_sign(user, %{}) do
      conn
      |> render("jwt.json", token: jwt)
    end
  end

  def identity_callback(%{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    username = auth.uid
    password = auth.credentials.other.password
    handle_user_conn(Accounts.get_user_by_username_and_password(username, password), conn)
  end

  defp handle_user_conn(user, conn) do
    case user do
      {:ok, user} ->
        {:ok, jwt, _full_claims} =
          Guardian.encode_and_sign(user, %{}, permissions: user.permissions)

        conn
        |> put_resp_header("authorization", "Bearer #{jwt}")
        |> render("jwt.json", token: jwt)

      # |> json(%{token: jwt})

      # Handle our own error to keep it generic
      _ ->
        {:error, :unauthorized}
        # {:error, _reason} ->
        #   conn
        #   |> put_status(401)
        #   |> json(%{message: "user not found"})
    end
  end

  def delete(conn, _) do
    jwt = Guardian.Plug.current_token(conn)
    Guardian.revoke!(jwt)
  end
end
