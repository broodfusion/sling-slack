defmodule Sling.Repo.Migrations.AddPermissionColumn do
  use Ecto.Migration

  def change do
    create table(:users) do
      add(:username, :string, null: false)
      add(:email, :string, null: false)
      add(:password_hash, :string, null: false)
      add(:permissions, :map, null: false)

      timestamps()
    end

    create(unique_index(:users, [:username]))
    create(unique_index(:users, [:email]))
  end
end
