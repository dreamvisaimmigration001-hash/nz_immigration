"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VisasManagementPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  const [visas, setVisas] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  // Search & Pagination & Filtering
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Create Form State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newUserId, setNewUserId] = useState<string>(""); 
  const [newFullName, setNewFullName] = useState("");
  const [newPassportNumber, setNewPassportNumber] = useState("");
  const [newNationality, setNewNationality] = useState("");
  const [newDateOfBirth, setNewDateOfBirth] = useState("");
  const [newVisaType, setNewVisaType] = useState("Visitor Visa");
  const [newStatus, setNewStatus] = useState("Draft");

  // Edit Form State
  const [editVisaId, setEditVisaId] = useState<string | null>(null);
  const [editUserId, setEditUserId] = useState<string>("");
  const [editFullName, setEditFullName] = useState("");
  const [editPassportNumber, setEditPassportNumber] = useState("");
  const [editNationality, setEditNationality] = useState("");
  const [editDateOfBirth, setEditDateOfBirth] = useState("");
  const [editVisaType, setEditVisaType] = useState("Visitor Visa");
  const [editStatus, setEditStatus] = useState("Draft");

  const fetchVisas = async () => {
    const res = await fetch("/api/visas");
    const data = await res.json();
    if (res.ok) setVisas(data.visas);
  };

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    if (res.ok) setUsers(data.users);
  };

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.push("/login");
    } else if (sessionStatus === "authenticated") {
      const role = (session?.user as any)?.role;
      if (role !== "employee" && role !== "admin") {
        router.push("/");
      } else {
        setTimeout(() => {
          fetchVisas();
          fetchUsers();
        }, 0);
      }
    }
  }, [sessionStatus, session, router]);

  const handleCreateVisa = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/visas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userid: newUserId === "" ? undefined : newUserId,
        fullName: newFullName,
        passportNumber: newPassportNumber,
        nationality: newNationality,
        dateOfBirth: newDateOfBirth,
        visaType: newVisaType,
        status: newStatus
      }),
    });
    if (res.ok) {
      setNewUserId("");
      setNewFullName("");
      setNewPassportNumber("");
      setNewNationality("");
      setNewDateOfBirth("");
      setNewVisaType("Visitor Visa");
      setNewStatus("Draft");
      setIsCreateModalOpen(false);
      fetchVisas();
    } else {
      alert("Error creating visa");
    }
  };

  const startEdit = (visa: any) => {
    setEditVisaId(visa._id);
    setEditUserId(visa.userid ? visa.userid._id : "");
    setEditFullName(visa.fullName || "");
    setEditPassportNumber(visa.passportNumber || "");
    setEditNationality(visa.nationality || "");
    setEditDateOfBirth(visa.dateOfBirth ? new Date(visa.dateOfBirth).toISOString().split('T')[0] : "");
    setEditVisaType(visa.visaType || "Visitor Visa");
    setEditStatus(visa.status || "Draft");
  };

  const handleEditVisa = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/visas", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visaId: editVisaId,
        userid: editUserId === "" ? null : editUserId,
        fullName: editFullName,
        passportNumber: editPassportNumber,
        nationality: editNationality,
        dateOfBirth: editDateOfBirth,
        visaType: editVisaType,
        status: editStatus,
      }),
    });
    if (res.ok) {
      setEditVisaId(null);
      fetchVisas();
    } else {
      alert("Error updating visa");
    }
  };

  const handleDeleteVisa = async (visaId: string) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`/api/visas?id=${visaId}`, { method: "DELETE" });
    if (res.ok) fetchVisas();
    else alert("Error deleting visa");
  };

  const filteredVisas = useMemo(() => {
    return visas.filter(v => {
      const matchesSearch = (v.userid?.username || "").toLowerCase().includes(search.toLowerCase()) || 
                            (v.fullName || "").toLowerCase().includes(search.toLowerCase()) ||
                            (v.passportNumber || "").toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || v.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [visas, search, statusFilter]);

  const paginatedVisas = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredVisas.slice(start, start + itemsPerPage);
  }, [filteredVisas, currentPage]);

  const totalPages = Math.ceil(filteredVisas.length / itemsPerPage);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved": return <span style={{ backgroundColor: "#d1fae5", color: "#065f46", padding: "4px 8px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold" }}>Approved</span>;
      case "Declined": return <span style={{ backgroundColor: "#fee2e2", color: "#991b1b", padding: "4px 8px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold" }}>Declined</span>;
      case "Submitted": 
      case "Under Assessment":
      case "Pending": return <span style={{ backgroundColor: "#fef3c7", color: "#92400e", padding: "4px 8px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold" }}>{status}</span>;
      default: return <span style={{ backgroundColor: "#f3f4f6", color: "#374151", padding: "4px 8px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold" }}>{status}</span>;
    }
  };

  if (sessionStatus !== "authenticated") return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Loading...</div>;

  return (
    <div style={{ backgroundColor: "#f4f7f6", minHeight: "100vh", padding: "40px 20px", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", overflow: "hidden" }}>
        
        {/* Header Section */}
        <div style={{ padding: "30px", borderBottom: "1px solid #eaeaea", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#1E222C", color: "#fff" }}>
          <div>
            <Link href="/employers" style={{ color: "#d54309", textDecoration: "none", fontSize: "14px", fontWeight: "bold", display: "inline-block", marginBottom: "10px" }}>
              &larr; Back to Dashboard
            </Link>
            <h1 style={{ fontSize: "28px", margin: 0 }}>Manage Visas</h1>
          </div>
          <button onClick={() => setIsCreateModalOpen(true)} style={{ backgroundColor: "#d54309", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", transition: "background 0.2s" }}>
            + Create Visa
          </button>
        </div>

        {/* Toolbar (Search & Filter) */}
        <div style={{ padding: "20px 30px", backgroundColor: "#fafbfc", borderBottom: "1px solid #eaeaea", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
          <div style={{ display: "flex", gap: "15px" }}>
            <input 
              type="text" 
              placeholder="Search user, name or passport..." 
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              style={{ width: "250px", padding: "10px 15px", borderRadius: "6px", border: "1px solid #ccc", outline: "none", fontSize: "15px" }}
            />
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} style={{ padding: "10px 15px", borderRadius: "6px", border: "1px solid #ccc", outline: "none", fontSize: "15px", backgroundColor: "#fff" }}>
              <option value="All">All Statuses</option>
              <option value="Draft">Draft</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Assessment">Under Assessment</option>
              <option value="Approved">Approved</option>
              <option value="Declined">Declined</option>
            </select>
          </div>
          <div style={{ fontSize: "14px", color: "#666", alignSelf: "center" }}>
            Total Visas: <strong>{filteredVisas.length}</strong>
          </div>
        </div>

        {/* Data Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: "#f9fafb", color: "#6b7280", borderBottom: "1px solid #eaeaea" }}>
                <th style={{ padding: "16px 30px", fontWeight: "600", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Applicant</th>
                <th style={{ padding: "16px 30px", fontWeight: "600", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Visa Type</th>
                <th style={{ padding: "16px 30px", fontWeight: "600", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Passport</th>
                <th style={{ padding: "16px 30px", fontWeight: "600", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Status</th>
                <th style={{ padding: "16px 30px", fontWeight: "600", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedVisas.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "#9ca3af" }}>No visas found.</td>
                </tr>
              ) : (
                paginatedVisas.map(visa => (
                  <tr key={visa._id} style={{ borderBottom: "1px solid #eaeaea", transition: "background 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                    <td style={{ padding: "20px 30px", fontSize: "15px", color: "#111827", fontWeight: "500" }}>
                      <div>{visa.fullName || <span style={{ color: "#9ca3af", fontStyle: "italic" }}>No Name</span>}</div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>User: {visa.userid ? visa.userid.username : "Unassigned"}</div>
                    </td>
                    <td style={{ padding: "20px 30px", fontSize: "14px", color: "#4b5563" }}>{visa.visaType || "-"}</td>
                    <td style={{ padding: "20px 30px", fontSize: "14px", color: "#4b5563" }}>{visa.passportNumber || "-"}</td>
                    <td style={{ padding: "20px 30px" }}>{getStatusBadge(visa.status)}</td>
                    <td style={{ padding: "20px 30px" }}>
                      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", alignItems: "center", flexWrap: "nowrap" }}>
                        <button onClick={() => startEdit(visa)} style={{ backgroundColor: "#1E222C", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "4px", fontSize: "13px", fontWeight: "bold", cursor: "pointer", whiteSpace: "nowrap" }}>Edit</button>
                        <button onClick={() => handleDeleteVisa(visa._id)} style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "4px", fontSize: "13px", fontWeight: "bold", cursor: "pointer", whiteSpace: "nowrap" }}>Delete</button>
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
          <div style={{ padding: "20px 30px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #eaeaea" }}>
            <span style={{ fontSize: "14px", color: "#6b7280" }}>Page {currentPage} of {totalPages}</span>
            <div style={{ display: "flex", gap: "10px" }}>
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} style={{ padding: "8px 16px", border: "1px solid #d1d5db", backgroundColor: currentPage === 1 ? "#f3f4f6" : "#fff", color: currentPage === 1 ? "#9ca3af" : "#374151", borderRadius: "6px", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}>Previous</button>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} style={{ padding: "8px 16px", border: "1px solid #d1d5db", backgroundColor: currentPage === totalPages ? "#f3f4f6" : "#fff", color: currentPage === totalPages ? "#9ca3af" : "#374151", borderRadius: "6px", cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}>Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "12px", width: "500px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ fontSize: "22px", marginBottom: "20px", color: "#111827" }}>Create New Visa</h2>
            <form onSubmit={handleCreateVisa} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>Assign User</label>
                <select value={newUserId} onChange={(e) => setNewUserId(e.target.value)} style={{ width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "15px" }}>
                  <option value="">-- Unassigned --</option>
                  {users.map(u => <option key={u._id} value={u._id}>{u.username}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>Full Name</label>
                <input type="text" value={newFullName} onChange={(e) => setNewFullName(e.target.value)} style={{ width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "15px" }} />
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>Passport Number</label>
                  <input type="text" value={newPassportNumber} onChange={(e) => setNewPassportNumber(e.target.value)} style={{ width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "15px" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>Nationality</label>
                  <input type="text" value={newNationality} onChange={(e) => setNewNationality(e.target.value)} style={{ width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "15px" }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>Date of Birth</label>
                  <input type="date" value={newDateOfBirth} onChange={(e) => setNewDateOfBirth(e.target.value)} style={{ width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "15px" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>Visa Type</label>
                  <select value={newVisaType} onChange={(e) => setNewVisaType(e.target.value)} style={{ width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "15px" }}>
                    <option value="Visitor Visa">Visitor Visa</option>
                    <option value="Student Visa">Student Visa</option>
                    <option value="Accredited Employer Work Visa">Accredited Employer Work Visa</option>
                    <option value="Resident Visa">Resident Visa</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>Status</label>
                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} style={{ width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "15px" }}>
                  <option value="Draft">Draft</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Under Assessment">Under Assessment</option>
                  <option value="Approved">Approved</option>
                  <option value="Declined">Declined</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button type="button" onClick={() => setIsCreateModalOpen(false)} style={{ flex: 1, padding: "12px", backgroundColor: "#f3f4f6", color: "#374151", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: "12px", backgroundColor: "#d54309", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>Create Visa</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editVisaId && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "12px", width: "500px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ fontSize: "22px", marginBottom: "20px", color: "#111827" }}>Edit Visa</h2>
            <form onSubmit={handleEditVisa} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>Assign User</label>
                <select value={editUserId} onChange={(e) => setEditUserId(e.target.value)} style={{ width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "15px" }}>
                  <option value="">-- Unassigned --</option>
                  {users.map(u => <option key={u._id} value={u._id}>{u.username}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>Full Name</label>
                <input type="text" value={editFullName} onChange={(e) => setEditFullName(e.target.value)} style={{ width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "15px" }} />
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>Passport Number</label>
                  <input type="text" value={editPassportNumber} onChange={(e) => setEditPassportNumber(e.target.value)} style={{ width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "15px" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>Nationality</label>
                  <input type="text" value={editNationality} onChange={(e) => setEditNationality(e.target.value)} style={{ width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "15px" }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>Date of Birth</label>
                  <input type="date" value={editDateOfBirth} onChange={(e) => setEditDateOfBirth(e.target.value)} style={{ width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "15px" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>Visa Type</label>
                  <select value={editVisaType} onChange={(e) => setEditVisaType(e.target.value)} style={{ width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "15px" }}>
                    <option value="Visitor Visa">Visitor Visa</option>
                    <option value="Student Visa">Student Visa</option>
                    <option value="Accredited Employer Work Visa">Accredited Employer Work Visa</option>
                    <option value="Resident Visa">Resident Visa</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>Status</label>
                <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} style={{ width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "15px" }}>
                  <option value="Draft">Draft</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Under Assessment">Under Assessment</option>
                  <option value="Approved">Approved</option>
                  <option value="Declined">Declined</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button type="button" onClick={() => setEditVisaId(null)} style={{ flex: 1, padding: "12px", backgroundColor: "#f3f4f6", color: "#374151", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: "12px", backgroundColor: "#10b981", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
