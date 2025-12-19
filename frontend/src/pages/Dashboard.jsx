import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import socket from "../socket";
import { Loader2 } from "lucide-react";

function Dashboard() {
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState({
  status: "",
  priority: "",
  sort: ""
});

  const [view, setView] = useState("all");


  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/users");
      return res.data;
    }
  });

  const { data: tasks = [], isLoading } = useQuery({
  queryKey: ["tasks", view, filters],
  queryFn: async () => {
    let url = "/tasks";

    if (view === "assigned") url = "/tasks/assigned/me";
    if (view === "created") url = "/tasks/created/me";
    if (view === "overdue") url = "/tasks/overdue";

    const res = await api.get(url, { params: filters });
    return res.data;
  }
});


  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    assignedToId: ""
  });

  useEffect(() => {
    socket.on("taskUpdated", () => {
      queryClient.invalidateQueries(["tasks"]);
    });

    return () => socket.off("taskUpdated");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.assignedToId || !form.priority || !form.dueDate) {
    alert("All fields are required");
    return;
  }


    await api.post("/tasks", form);
    setForm({
      title: "",
      description: "",
      dueDate: "",
      priority: "",
      assignedToId: ""
    });
    queryClient.invalidateQueries(["tasks"]);
  };

  if (isLoading) return <div className="flex p-6 justify-center items-center h-screen">
    {/* Loading... */}
  <Loader2 className="h-10 w-10 animate-spin"/>
  </div>;

  return (
    <div className="min-h-screen bg-gray-100 ">
    <nav className="bg-blue-900 text-white px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between gap-3 sm:items-center">
        <h1 className="text-xl font-bold text-center sm:text-left">Task Manager</h1>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <span className="text-sm opacity-90">Logged in User</span>
          <button
            onClick={handleLogout}
            className="bg-red-800 px-4 py-1 rounded hover:bg-red-900 w-full sm:w-auto"
          >
            Logout
          </button>
        </div>
      </nav>

        <div className="flex flex-wrap my-6 gap-2 justify-center sm:w-auto" >
          {["all", "assigned", "created", "overdue"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 rounded ${
                view === v
                  ? "bg-blue-900 text-white"
                  : "bg-gray-200"
              }`}
            >
              {v.toUpperCase()}
            </button>
          ))}
        </div>


      <div className="max-w-5xl mx-auto p-6 space-y-8 sm:p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-6 rounded shadow space-y-4"
        >
          <h2 className="text-lg font-semibold text-center sm:text-left">Create Task</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            placeholder="Title"
            className="border p-2 w-full rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

            <input
              type="date"
              className="border p-2 w-full rounded"
              value={form.dueDate}
              onChange={(e) =>
                setForm({ ...form, dueDate: e.target.value })
              }
            />

            <select
              className="border p-2 w-full rounded"
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>

          <select
            className="border p-2 w-full rounded"
            value={form.assignedToId}
            onChange={(e) =>
              setForm({ ...form, assignedToId: e.target.value })
            }
          >
            <option value="">Assign To</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>

            <textarea
            placeholder="Description"
            className="border p-2 w-full rounded"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

            </div>
          <button className="bg-blue-900 text-white px-4 py-2 rounded">
            Create Task
          </button>
        </form>

      <div className="bg-white p-4 rounded shadow flex gap-4 flex-wrap sm:w-auto">
      <select
        className="border p-2 rounded"
        value={filters.status}
        onChange={(e) =>
          setFilters({ ...filters, status: e.target.value })
        }
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <select
        className="border p-2 rounded"
        value={filters.priority}
        onChange={(e) =>
          setFilters({ ...filters, priority: e.target.value })
        }
      >
        <option value="">All Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Urgent">Urgent</option>
      </select>

      <select
        className="border p-2 rounded"
        value={filters.sort}
        onChange={(e) =>
          setFilters({ ...filters, sort: e.target.value })
        }
      >
        <option value="">No Sorting</option>
        <option value="dueDate">Sort by Due Date</option>
      </select>
      </div>


        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-5 sm:p-5 rounded shadow flex flex-col sm:flex-row justify-between gap-4"
            >
              <div>
                <h3 className="font-semibold text-lg">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-sm mt-1">
                  Status: <b>{task.status}</b>
                </p>
              </div>

              <div className="flex flex-col gap-2 w-full sm:w-40">
                <select
                  value={task.status}
                  onChange={async (e) => {
                    await api.patch(`/tasks/${task._id}/status`, {
                      status: e.target.value
                    });
                    queryClient.invalidateQueries(["tasks"]);
                  }}
                  className="border p-1 rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <button
                  onClick={async () => {
                    await api.delete(`/tasks/${task._id}`);
                    queryClient.invalidateQueries(["tasks"]);
                  }}
                  className="bg-red-800 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
