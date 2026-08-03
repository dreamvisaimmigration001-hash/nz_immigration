"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UsersManagementPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [editPassword, setEditPassword] = useState("");

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    if (res.ok) setUsers(data.users);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      const role = (session?.user as any)?.role;
      if (role !== "employee" && role !== "admin") {
        router.push("/");
      } else {
        setTimeout(() => fetchUsers(), 0);
      }
    }
  }, [status, session, router]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      u.username.toLowerCase().includes(search.toLowerCase()),
    );
  }, [users, search]);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: newUsername, password: newPassword }),
    });
    if (res.ok) {
      setNewUsername("");
      setNewPassword("");
      setIsCreateModalOpen(false);
      fetchUsers();
    } else {
      alert("Error creating user");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: editUserId, newPassword: editPassword }),
    });
    if (res.ok) {
      setEditUserId(null);
      setEditPassword("");
      alert("Password updated");
    } else {
      alert("Error updating password");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (
      !confirm("Are you sure? This will delete the user and all their visas.")
    )
      return;
    const res = await fetch(`/api/users?id=${userId}`, { method: "DELETE" });
    if (res.ok) fetchUsers();
    else alert("Error deleting user");
  };

  if (status !== "authenticated")
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );

  return (
    <div
      style={{
        backgroundColor: "#f4f7f6",
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
      >
        {/* Header Section */}
        <div
          style={{
            padding: "30px",
            borderBottom: "1px solid #eaeaea",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#1E222C",
            color: "#fff",
          }}
        >
          <div>
            <Link
              href="/employers"
              style={{
                color: "#d54309",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "bold",
                display: "inline-block",
                marginBottom: "10px",
              }}
            >
              &larr; Back to Dashboard
            </Link>
            <h1 style={{ fontSize: "28px", margin: 0 }}>Manage Users</h1>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            style={{
              backgroundColor: "#d54309",
              color: "#fff",
              border: "none",
              padding: "12px 24px",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            + Create User
          </button>
        </div>

        {/* Toolbar (Search) */}
        <div
          style={{
            padding: "20px 30px",
            backgroundColor: "#fafbfc",
            borderBottom: "1px solid #eaeaea",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <input
            type="text"
            placeholder="Search by username..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              width: "300px",
              padding: "10px 15px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "15px",
            }}
          />
          <div style={{ fontSize: "14px", color: "#666", alignSelf: "center" }}>
            Total Users: <strong>{filteredUsers.length}</strong>
          </div>
        </div>

        {/* Data Table */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f9fafb",
                  color: "#6b7280",
                  borderBottom: "1px solid #eaeaea",
                }}
              >
                <th
                  style={{
                    padding: "16px 30px",
                    fontWeight: "600",
                    fontSize: "14px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Username
                </th>
                <th
                  style={{
                    padding: "16px 30px",
                    fontWeight: "600",
                    fontSize: "14px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    textAlign: "right",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={2}
                    style={{
                      padding: "40px",
                      textAlign: "center",
                      color: "#9ca3af",
                    }}
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr
                    key={user._id}
                    style={{
                      borderBottom: "1px solid #eaeaea",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f9fafb")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <td
                      style={{
                        padding: "20px 30px",
                        fontSize: "15px",
                        color: "#111827",
                        fontWeight: "500",
                      }}
                    >
                      {user.username}
                    </td>
                    <td style={{ padding: "20px 30px" }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          flexWrap: "nowrap",
                        }}
                      >
                        <button
                          onClick={() => setEditUserId(user._id)}
                          style={{
                            backgroundColor: "#1E222C",
                            color: "#fff",
                            border: "none",
                            padding: "8px 16px",
                            borderRadius: "4px",
                            fontSize: "13px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Change Password
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          style={{
                            backgroundColor: "#ef4444",
                            color: "#fff",
                            border: "none",
                            padding: "8px 16px",
                            borderRadius: "4px",
                            fontSize: "13px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              padding: "20px 30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #eaeaea",
            }}
          >
            <span style={{ fontSize: "14px", color: "#6b7280" }}>
              Page {currentPage} of {totalPages}
            </span>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                style={{
                  padding: "8px 16px",
                  border: "1px solid #d1d5db",
                  backgroundColor: currentPage === 1 ? "#f3f4f6" : "#fff",
                  color: currentPage === 1 ? "#9ca3af" : "#374151",
                  borderRadius: "6px",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                style={{
                  padding: "8px 16px",
                  border: "1px solid #d1d5db",
                  backgroundColor:
                    currentPage === totalPages ? "#f3f4f6" : "#fff",
                  color: currentPage === totalPages ? "#9ca3af" : "#374151",
                  borderRadius: "6px",
                  cursor:
                    currentPage === totalPages ? "not-allowed" : "pointer",
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "12px",
              width: "400px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "22px",
                marginBottom: "20px",
                color: "#111827",
              }}
            >
              Create New User
            </h2>
            <form
              onSubmit={handleCreateUser}
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <input
                required
                type="text"
                placeholder="Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                style={{
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "15px",
                }}
              />
              <input
                required
                type="password"
                placeholder="Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "15px",
                }}
              />
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    backgroundColor: "#f3f4f6",
                    color: "#374151",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "12px",
                    backgroundColor: "#d54309",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Password Modal */}
      {editUserId && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "12px",
              width: "400px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "22px",
                marginBottom: "20px",
                color: "#111827",
              }}
            >
              Change Password
            </h2>
            <form
              onSubmit={handleChangePassword}
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <input
                required
                type="password"
                placeholder="New Password"
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
                style={{
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "15px",
                }}
              />
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  type="button"
                  onClick={() => {
                    setEditUserId(null);
                    setEditPassword("");
                  }}
                  style={{
                    flex: 1,
                    padding: "12px",
                    backgroundColor: "#f3f4f6",
                    color: "#374151",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "12px",
                    backgroundColor: "#10b981",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Save Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
