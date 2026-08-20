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

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const token = (session as any)?.apiToken;
  const itemsPerPage = 10;

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [editPassword, setEditPassword] = useState("");

  const fetchUsers = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/api/auth/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setUsers(data || []);
    } catch (err) {
      console.error(err);
    }
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
      (u.username || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/auth/user`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
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
    const res = await fetch(`${API_URL}/api/auth/users/${editUserId}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ newPassword: editPassword }),
    });
    if (res.ok) {
      setEditUserId(null);
      setEditPassword("");
      alert("Password updated successfully.");
    } else {
      alert("Error updating password");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user and all associated visa records?")) return;
    const res = await fetch(`${API_URL}/api/auth/users/${userId}`, { 
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) fetchUsers();
    else alert("Error deleting user");
  };

  if (status !== "authenticated") {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", color: "#6b7280" }}>Loading user accounts...</div>;
  }

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", padding: "35px 20px 60px", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Page Header Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "1px solid #e5e7eb", paddingBottom: "20px", marginBottom: "28px" }}>
          <div>
            <h1 style={{ fontSize: "32px", color: "#1E222C", margin: "0 0 6px 0", fontWeight: "400", letterSpacing: "-0.5px" }}>
              Manage Users
            </h1>
            <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
              Create applicant accounts, manage user access, and update login credentials.
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            style={{
              backgroundColor: "#c60c46",
              color: "#ffffff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "3px",
              fontWeight: "600",
              fontSize: "13px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 2px 4px rgba(198, 12, 70, 0.15)",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#a8093b")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#c60c46")}
          >
            <span>+</span> Create User
          </button>
        </div>

        {/* Toolbar & Search Controls */}
        <div style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "4px", padding: "16px 20px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <input
            type="text"
            placeholder="Search by username..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            style={{ width: "280px", padding: "8px 12px", borderRadius: "3px", border: "1px solid #d1d5db", outline: "none", fontSize: "14px", color: "#1f2937", backgroundColor: "#fff" }}
          />
          <div style={{ fontSize: "13px", color: "#6b7280" }}>
            Total User Accounts: <strong>{filteredUsers.length}</strong>
          </div>
        </div>

        {/* Data Table Container */}
        <div style={{ border: "1px solid #e5e7eb", borderRadius: "4px", overflow: "hidden", backgroundColor: "#ffffff" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ backgroundColor: "#f9fafb", borderBottom: "2px solid #e5e7eb" }}>
                  <th style={{ padding: "14px 20px", fontWeight: "600", fontSize: "12px", textTransform: "uppercase", color: "#4b5563", letterSpacing: "0.5px" }}>User Account</th>
                  <th style={{ padding: "14px 20px", fontWeight: "600", fontSize: "12px", textTransform: "uppercase", color: "#4b5563", letterSpacing: "0.5px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={2} style={{ padding: "40px 20px", textAlign: "center", color: "#9ca3af", fontSize: "14px" }}>
                      No user accounts found.
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user) => (
                    <tr
                      key={user._id}
                      style={{ borderBottom: "1px solid #e5e7eb", transition: "background 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <td style={{ padding: "16px 20px", fontSize: "14px", color: "#1E222C", fontWeight: "500" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#e5e7eb", color: "#4b5563", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: "600", fontSize: "13px" }}>
                            {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                          </span>
                          <span>{user.username}</span>
                        </div>
                      </td>
                      <td style={{ padding: "16px 20px", textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "8px", justifyContent: "flex-end" }}>
                          <button
                            onClick={() => setEditUserId(user._id)}
                            style={{ backgroundColor: "#1E222C", color: "#ffffff", border: "none", padding: "6px 14px", borderRadius: "3px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
                          >
                            Change Password
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            style={{ backgroundColor: "#ffffff", color: "#c60c46", border: "1px solid #fca5a5", padding: "6px 14px", borderRadius: "3px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
              <span style={{ fontSize: "13px", color: "#6b7280" }}>Page {currentPage} of {totalPages}</span>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  style={{ padding: "6px 14px", border: "1px solid #d1d5db", backgroundColor: currentPage === 1 ? "#f3f4f6" : "#ffffff", color: currentPage === 1 ? "#9ca3af" : "#374151", borderRadius: "3px", fontSize: "13px", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
                >
                  Previous
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  style={{ padding: "6px 14px", border: "1px solid #d1d5db", backgroundColor: currentPage === totalPages ? "#f3f4f6" : "#ffffff", color: currentPage === totalPages ? "#9ca3af" : "#374151", borderRadius: "3px", fontSize: "13px", cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Modal: Create User */}
      {isCreateModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#ffffff", padding: "28px 32px", borderRadius: "6px", width: "100%", maxWidth: "420px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", border: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #f3f4f6", paddingBottom: "12px" }}>
              <h2 style={{ fontSize: "20px", color: "#1E222C", margin: 0, fontWeight: "600" }}>Create New User</h2>
              <button onClick={() => setIsCreateModalOpen(false)} style={{ background: "none", border: "none", fontSize: "20px", color: "#9ca3af", cursor: "pointer" }}>&times;</button>
            </div>

            <form onSubmit={handleCreateUser} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Username</label>
                <input
                  required
                  type="text"
                  placeholder="Enter username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: "3px", fontSize: "14px", color: "#1f2937", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Password</label>
                <input
                  required
                  type="password"
                  placeholder="Enter initial password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: "3px", fontSize: "14px", color: "#1f2937", outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "8px", paddingTop: "12px", borderTop: "1px solid #f3f4f6" }}>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  style={{ flex: 1, padding: "10px", backgroundColor: "#f3f4f6", color: "#374151", border: "none", borderRadius: "3px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, padding: "10px", backgroundColor: "#c60c46", color: "#ffffff", border: "none", borderRadius: "3px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Change Password */}
      {editUserId && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#ffffff", padding: "28px 32px", borderRadius: "6px", width: "100%", maxWidth: "420px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", border: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #f3f4f6", paddingBottom: "12px" }}>
              <h2 style={{ fontSize: "20px", color: "#1E222C", margin: 0, fontWeight: "600" }}>Change User Password</h2>
              <button onClick={() => { setEditUserId(null); setEditPassword(""); }} style={{ background: "none", border: "none", fontSize: "20px", color: "#9ca3af", cursor: "pointer" }}>&times;</button>
            </div>

            <form onSubmit={handleChangePassword} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#374151" }}>New Password</label>
                <input
                  required
                  type="password"
                  placeholder="Enter new password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: "3px", fontSize: "14px", color: "#1f2937", outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "8px", paddingTop: "12px", borderTop: "1px solid #f3f4f6" }}>
                <button
                  type="button"
                  onClick={() => {
                    setEditUserId(null);
                    setEditPassword("");
                  }}
                  style={{ flex: 1, padding: "10px", backgroundColor: "#f3f4f6", color: "#374151", border: "none", borderRadius: "3px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, padding: "10px", backgroundColor: "#10b981", color: "#ffffff", border: "none", borderRadius: "3px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
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
