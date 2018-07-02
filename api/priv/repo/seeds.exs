# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Sling.Repo.insert!(%Sling.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

{:ok, _user} =
  Sling.Accounts.create_user(%{
    username: "writer",
    password: "hello123",
    email: "writer@gmail.com",
    permissions: %{default: [:read_users, :write_users]}
  })

{:ok, _user} =
  Sling.Accounts.create_user(%{
    username: "reader",
    password: "hello123",
    email: "reader@gmail.com",
    permissions: %{default: [:read_users]}
  })

{:ok, _user} =
  Sling.Accounts.create_user(%{
    username: "rubbish",
    password: "hello123",
    email: "rubbish@gmail.com",
    permissions: %{default: []}
  })
