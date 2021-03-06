defmodule Sling.Guardian do
  @moduledoc """
  Integration with Guardian
  """
  use Guardian, otp_app: :sling
  use Guardian.Permissions.Bitwise

  def subject_for_token(user, _claims) do
    sub = to_string(user.id)
    {:ok, sub}
  end

  def subject_for_token(_, _) do
    {:error, :no_resource_id}
  end

  def resource_from_claims(claims) do
    id = claims["sub"]
    resource = Sling.Accounts.get_user!(id)
    {:ok, resource}
  end

  def resource_from_claims(_claims) do
    {:error, :no_claims_sub}
  end

  def build_claims(claims, _resource, opts) do
    claims =
      claims
      |> encode_permissions_into_claims!(Keyword.get(opts, :permissions))

    {:ok, claims}
  end
end
