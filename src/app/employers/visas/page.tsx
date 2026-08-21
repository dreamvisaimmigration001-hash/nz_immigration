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

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const token = (session as any)?.apiToken;

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
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/api/visas?origin=nz`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setVisas(data.visas || []);
    } catch (err) {
      console.error(err);
    }
  };

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
    const res = await fetch(`${API_URL}/api/visas?origin=nz`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        userId: newUserId === "" ? undefined : newUserId,
        fullName: newFullName,
        documentNumber: newPassportNumber,
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
    setEditUserId(visa.userId ? (visa.userId._id || visa.userId) : "");
    setEditFullName(visa.fullName || "");
    setEditPassportNumber(visa.documentNumber || visa.passportNumber || "");
    setEditNationality(visa.nationality || "");
    setEditDateOfBirth(visa.dateOfBirth ? new Date(visa.dateOfBirth).toISOString().split('T')[0] : "");
    setEditVisaType(visa.visaType || "Visitor Visa");
    setEditStatus(visa.status || "Draft");
  };

  const handleEditVisa = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/visas/${editVisaId}?origin=nz`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        userId: editUserId === "" ? null : editUserId,
        fullName: editFullName,
        documentNumber: editPassportNumber,
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
    if (!confirm("Are you sure you want to delete this visa record?")) return;
    const res = await fetch(`${API_URL}/api/visas/${visaId}?origin=nz`, { 
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) fetchVisas();
    else alert("Error deleting visa");
  };

  const filteredVisas = useMemo(() => {
    return visas.filter(v => {
      const matchesSearch = (v.userId?.username || "").toLowerCase().includes(search.toLowerCase()) || 
                            (v.fullName || "").toLowerCase().includes(search.toLowerCase()) ||
                            (v.documentNumber || v.passportNumber || "").toLowerCase().includes(search.toLowerCase());
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
      case "Approved": 
        return <span style={{ backgroundColor: "#d1fae5", color: "#065f46", padding: "4px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "600", border: "1px solid #a7f3d0" }}>Approved</span>;
      case "Declined": 
        return <span style={{ backgroundColor: "#fee2e2", color: "#991b1b", padding: "4px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "600", border: "1px solid #fca5a5" }}>Declined</span>;
      case "Submitted": 
      case "Under Assessment":
      case "Pending": 
        return <span style={{ backgroundColor: "#fef3c7", color: "#92400e", padding: "4px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "600", border: "1px solid #fde68a" }}>{status}</span>;
      default: 
        return <span style={{ backgroundColor: "#f3f4f6", color: "#4b5563", padding: "4px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "600", border: "1px solid #e5e7eb" }}>{status || "Draft"}</span>;
    }
  };

  if (sessionStatus !== "authenticated") {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", color: "#6b7280" }}>Loading visa management console...</div>;
  }

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", padding: "35px 20px 60px", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Page Header Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "1px solid #e5e7eb", paddingBottom: "20px", marginBottom: "28px" }}>
          <div>
            <h1 style={{ fontSize: "32px", color: "#1E222C", margin: "0 0 6px 0", fontWeight: "400", letterSpacing: "-0.5px" }}>
              Manage Visas
            </h1>
            <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
              Review, assign, and update applicant visa records and status assessments.
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
              transition: "all 0.15s ease" 
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#a8093b")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#c60c46")}
          >
            <span>+</span> Create Visa
          </button>
        </div>

        {/* Toolbar & Search Controls */}
        <div style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "4px", padding: "16px 20px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <input 
              type="text" 
              placeholder="Search name, user or passport..." 
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              style={{ width: "260px", padding: "8px 12px", borderRadius: "3px", border: "1px solid #d1d5db", outline: "none", fontSize: "14px", color: "#1f2937", backgroundColor: "#fff" }}
            />
            <select 
              value={statusFilter} 
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} 
              style={{ padding: "8px 12px", borderRadius: "3px", border: "1px solid #d1d5db", outline: "none", fontSize: "14px", color: "#1f2937", backgroundColor: "#fff", cursor: "pointer" }}
            >
              <option value="All">All Statuses</option>
              <option value="Draft">Draft</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Assessment">Under Assessment</option>
              <option value="Approved">Approved</option>
              <option value="Declined">Declined</option>
            </select>
          </div>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>
            Showing <strong>{filteredVisas.length}</strong> visa application records
          </div>
        </div>

        {/* Data Table Container */}
        <div style={{ border: "1px solid #e5e7eb", borderRadius: "4px", overflow: "hidden", backgroundColor: "#ffffff" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ backgroundColor: "#f9fafb", borderBottom: "2px solid #e5e7eb" }}>
                  <th style={{ padding: "14px 20px", fontWeight: "600", fontSize: "12px", textTransform: "uppercase", color: "#4b5563", letterSpacing: "0.5px" }}>Applicant Info</th>
                  <th style={{ padding: "14px 20px", fontWeight: "600", fontSize: "12px", textTransform: "uppercase", color: "#4b5563", letterSpacing: "0.5px" }}>Visa Type</th>
                  <th style={{ padding: "14px 20px", fontWeight: "600", fontSize: "12px", textTransform: "uppercase", color: "#4b5563", letterSpacing: "0.5px" }}>Passport</th>
                  <th style={{ padding: "14px 20px", fontWeight: "600", fontSize: "12px", textTransform: "uppercase", color: "#4b5563", letterSpacing: "0.5px" }}>Status</th>
                  <th style={{ padding: "14px 20px", fontWeight: "600", fontSize: "12px", textTransform: "uppercase", color: "#4b5563", letterSpacing: "0.5px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedVisas.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: "40px 20px", textAlign: "center", color: "#9ca3af", fontSize: "14px" }}>
                      No visa records match your search query.
                    </td>
                  </tr>
                ) : (
                  paginatedVisas.map(visa => (
                    <tr 
                      key={visa._id} 
                      style={{ borderBottom: "1px solid #e5e7eb", transition: "background 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")} 
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <td style={{ padding: "16px 20px", fontSize: "14px", color: "#1E222C", fontWeight: "500" }}>
                        <div>{visa.fullName || <span style={{ color: "#9ca3af", fontStyle: "italic" }}>Unspecified Name</span>}</div>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>
                          Account: {visa.userId ? (visa.userId.username || "Linked") : "Unassigned"}
                        </div>
                      </td>
                      <td style={{ padding: "16px 20px", fontSize: "13px", color: "#374151" }}>
                        {visa.visaType || "-"}
                      </td>
                      <td style={{ padding: "16px 20px", fontSize: "13px", color: "#374151", fontFamily: "monospace" }}>
                        {visa.documentNumber || visa.passportNumber || "-"}
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        {getStatusBadge(visa.status)}
                      </td>
                      <td style={{ padding: "16px 20px", textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "8px", justifyContent: "flex-end" }}>
                          <button 
                            onClick={() => startEdit(visa)} 
                            style={{ backgroundColor: "#1E222C", color: "#ffffff", border: "none", padding: "6px 14px", borderRadius: "3px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteVisa(visa._id)} 
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
                  onClick={() => setCurrentPage(p => p - 1)} 
                  style={{ padding: "6px 14px", border: "1px solid #d1d5db", backgroundColor: currentPage === 1 ? "#f3f4f6" : "#ffffff", color: currentPage === 1 ? "#9ca3af" : "#374151", borderRadius: "3px", fontSize: "13px", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
                >
                  Previous
                </button>
                <button 
                  disabled={currentPage === totalPages} 
                  onClick={() => setCurrentPage(p => p + 1)} 
                  style={{ padding: "6px 14px", border: "1px solid #d1d5db", backgroundColor: currentPage === totalPages ? "#f3f4f6" : "#ffffff", color: currentPage === totalPages ? "#9ca3af" : "#374151", borderRadius: "3px", fontSize: "13px", cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Modal: Create Visa */}
      {isCreateModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#ffffff", padding: "28px 32px", borderRadius: "6px", width: "100%", maxWidth: "520px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", border: "1px solid #e5e7eb", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #f3f4f6", paddingBottom: "12px" }}>
              <h2 style={{ fontSize: "20px", color: "#1E222C", margin: 0, fontWeight: "600" }}>Create Visa Application</h2>
              <button onClick={() => setIsCreateModalOpen(false)} style={{ background: "none", border: "none", fontSize: "20px", color: "#9ca3af", cursor: "pointer" }}>&times;</button>
            </div>

            <form onSubmit={handleCreateVisa} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Assign to User Account</label>
                <select value={newUserId} onChange={(e) => setNewUserId(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: "3px", fontSize: "14px", color: "#1f2937", outline: "none" }}>
                  <option value="">-- Unassigned --</option>
                  {users.map(u => <option key={u._id} value={u._id}>{u.username}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Full Legal Name</label>
                <input required type="text" placeholder="e.g. Johnathan Doe" value={newFullName} onChange={(e) => setNewFullName(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: "3px", fontSize: "14px", color: "#1f2937", outline: "none" }} />
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Passport Number</label>
                  <input type="text" placeholder="Passport No." value={newPassportNumber} onChange={(e) => setNewPassportNumber(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: "3px", fontSize: "14px", color: "#1f2937", outline: "none" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Nationality</label>
                  <input type="text" placeholder="Country" value={newNationality} onChange={(e) => setNewNationality(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: "3px", fontSize: "14px", color: "#1f2937", outline: "none" }} />
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Date of Birth</label>
                  <input type="date" value={newDateOfBirth} onChange={(e) => setNewDateOfBirth(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: "3px", fontSize: "14px", color: "#1f2937", outline: "none" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Visa Category</label>
                  <select value={newVisaType} onChange={(e) => setNewVisaType(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: "3px", fontSize: "14px", color: "#1f2937", outline: "none" }}>
                    <option value="Visitor Visa">Visitor Visa</option>
                    <option value="Student Visa">Student Visa</option>
                    <option value="Accredited Employer Work Visa">Accredited Employer Work Visa</option>
                    <option value="Resident Visa">Resident Visa</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Initial Status</label>
                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: "3px", fontSize: "14px", color: "#1f2937", outline: "none" }}>
                  <option value="Draft">Draft</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Under Assessment">Under Assessment</option>
                  <option value="Approved">Approved</option>
                  <option value="Declined">Declined</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #f3f4f6" }}>
                <button type="button" onClick={() => setIsCreateModalOpen(false)} style={{ flex: 1, padding: "10px", backgroundColor: "#f3f4f6", color: "#374151", border: "none", borderRadius: "3px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: "10px", backgroundColor: "#c60c46", color: "#ffffff", border: "none", borderRadius: "3px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>Create Visa Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Visa */}
      {editVisaId && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#ffffff", padding: "28px 32px", borderRadius: "6px", width: "100%", maxWidth: "520px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", border: "1px solid #e5e7eb", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #f3f4f6", paddingBottom: "12px" }}>
              <h2 style={{ fontSize: "20px", color: "#1E222C", margin: 0, fontWeight: "600" }}>Edit Visa Record</h2>
              <button onClick={() => setEditVisaId(null)} style={{ background: "none", border: "none", fontSize: "20px", color: "#9ca3af", cursor: "pointer" }}>&times;</button>
            </div>

            <form onSubmit={handleEditVisa} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Assigned User Account</label>
                <select value={editUserId} onChange={(e) => setEditUserId(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: "3px", fontSize: "14px", color: "#1f2937", outline: "none" }}>
                  <option value="">-- Unassigned --</option>
                  {users.map(u => <option key={u._id} value={u._id}>{u.username}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Full Legal Name</label>
                <input required type="text" value={editFullName} onChange={(e) => setEditFullName(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: "3px", fontSize: "14px", color: "#1f2937", outline: "none" }} />
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Passport Number</label>
                  <input type="text" value={editPassportNumber} onChange={(e) => setEditPassportNumber(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: "3px", fontSize: "14px", color: "#1f2937", outline: "none" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Nationality</label>
                  <input type="text" value={editNationality} onChange={(e) => setEditNationality(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: "3px", fontSize: "14px", color: "#1f2937", outline: "none" }} />
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Date of Birth</label>
                  <input type="date" value={editDateOfBirth} onChange={(e) => setEditDateOfBirth(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: "3px", fontSize: "14px", color: "#1f2937", outline: "none" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Visa Category</label>
                  <select value={editVisaType} onChange={(e) => setEditVisaType(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: "3px", fontSize: "14px", color: "#1f2937", outline: "none" }}>
                    <option value="Visitor Visa">Visitor Visa</option>
                    <option value="Student Visa">Student Visa</option>
                    <option value="Accredited Employer Work Visa">Accredited Employer Work Visa</option>
                    <option value="Resident Visa">Resident Visa</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Assessment Status</label>
                <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: "3px", fontSize: "14px", color: "#1f2937", outline: "none" }}>
                  <option value="Draft">Draft</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Under Assessment">Under Assessment</option>
                  <option value="Approved">Approved</option>
                  <option value="Declined">Declined</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #f3f4f6" }}>
                <button type="button" onClick={() => setEditVisaId(null)} style={{ flex: 1, padding: "10px", backgroundColor: "#f3f4f6", color: "#374151", border: "none", borderRadius: "3px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: "10px", backgroundColor: "#10b981", color: "#ffffff", border: "none", borderRadius: "3px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
