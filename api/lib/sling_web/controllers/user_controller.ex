defmodule SlingWeb.UserController do
  use SlingWeb, :controller

  alias Sling.Accounts
  alias Sling.Accounts.User
  alias Sling.Guardian

  action_fallback(SlingWeb.FallbackController)

  # plug(Guardian.Permissions.Bitwise, ensure: %{default: [:read_users]})

  # plug(
  #   Guardian.Permissions.Bitwise,
  #   [ensure: %{default: [:write_users]}] when action in [:update, :delete]
  # )

  def show(conn, _params) do
    user = Guardian.Plug.current_resource(conn)
    conn |> render("user.json", user: user)
  end

  # def index(conn, _params) do
  #   users = Accounts.list_users()
  #   render(conn, "index.json", users: users)
  # end

  # def create(conn, %{"user" => user_params}) do
  #   with {:ok, %User{} = user} <- Accounts.create_user(user_params),
  #        {:ok, token, _claims} <- Guardian.encode_and_sign(user, _claims) do
  #     conn
  #     |> render("jwt.json", jwt: token)
  #   end
  # end

  # def sign_in(conn, %{"username" => username, "password" => password}) do
  #   case Accounts.token_sign_in(username, password) do
  #     {:ok, token, _claims} ->
  #       conn
  #       |> render("jwt.json", jwt: token)

  #     _ ->
  #       {:error, :unauthorized}
  #   end
  # end

  # def show(conn, %{"id" => id}) do
  #   user = Accounts.get_user!(id)
  #   render(conn, "show.json", user: user)
  # end

  # def update(conn, %{"id" => id, "user" => user_params}) do
  #   user = Accounts.get_user!(id)

  #   with {:ok, %User{} = user} <- Accounts.update_user(user, user_params) do
  #     render(conn, "show.json", user: user)
  #   end
  # end

  # def delete(conn, %{"id" => id}) do
  #   user = Accounts.get_user!(id)

  #   with {:ok, %User{}} <- Accounts.delete_user(user) do
  #     send_resp(conn, :no_content, "")
  #   end
  # end
end
