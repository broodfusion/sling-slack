defmodule Sling.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field(:email, :string)
    field(:password_hash, :string)
    field(:username, :string)
    field(:permissions, :map)
    field(:password, :string, virtual: true)

    timestamps()
  end

  @doc false
  def changeset(user, attrs \\ %{}) do
    user
    |> cast(attrs, [:username, :email, :password, :permissions])
    |> validate_required([:username, :email, :password, :permissions])
    |> unique_constraint(:username)
    |> unique_constraint(:email)
  end

  def registration_changeset(user, params \\ {}) do
    user
    |> changeset(params)
    |> cast(params, [:password])
    |> validate_length(:password, min: 6, max: 100)
    |> put_password_hash()
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(changeset, :password_hash, Comeonin.Argon2.hashpwsalt(password))

      _ ->
        changeset
    end
  end
end
