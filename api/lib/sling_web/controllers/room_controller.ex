defmodule SlingWeb.RoomController do
  use SlingWeb, :controller

  alias Sling.Rooms
  alias Sling.Rooms.Room
  alias Sling.Rooms.UserRoom

  plug(Guardian.Plug.EnsureAuthenticated, handler: SlingWeb.AuthController)

  def index(conn, _params) do
    rooms = Rooms.list_rooms()
    render(conn, "index.json", rooms: rooms)
  end

  def create(conn, room_params) do
    current_user = Guardian.Plug.current_resource(conn)

    with {:ok, %Room{} = room} <- Rooms.create_room(room_params) do
      assoc_changeset =
        UserRoom.changeset(
          %UserRoom{},
          %{user_id: current_user.id, room_id: room.id}
        )

      Sling.Repo.insert(assoc_changeset)

      conn
      |> put_status(:created)
      # |> put_resp_header("location", room_path(conn, :show, room))
      |> render(SlingWeb.RoomView, "show.json", room: room)
    else
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(SlingWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def join(conn, %{"id" => room_id}) do
    current_user = Guardian.Plug.current_resource(conn)
    room = Sling.Repo.get(Room, room_id)

    changeset = UserRoom.changeset(%UserRoom{}, %{room_id: room_id, user_id: current_user.id})

    with {:ok, user_room} <- Sling.Repo.insert(changeset) do
      conn
      |> put_status(:created)
      |> render("show.json", %{room: room})
    else
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(SlingWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end
end
