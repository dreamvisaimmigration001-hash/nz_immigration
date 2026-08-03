"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EmployeesManagementPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      if ((session?.user as any)?.role !== "admin") {
        router.push("/");
      }
    }
  }, [status, session, router]);

  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: newUsername, password: newPassword }),
    });
    if (res.ok) {
      setNewUsername("");
      setNewPassword("");
      alert("Employee created successfully!");
    } else {
      alert("Error creating employee");
    }
  };

  if (status !== "authenticated") return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Loading...</div>;

  return (
    <div style={{ backgroundColor: "#f4f7f6", minHeight: "100vh", padding: "40px 20px", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", overflow: "hidden" }}>
        
        {/* Header Section */}
        <div style={{ padding: "30px", borderBottom: "1px solid #eaeaea", backgroundColor: "#1E222C", color: "#fff" }}>
          <Link href="/employers" style={{ color: "#d54309", textDecoration: "none", fontSize: "14px", fontWeight: "bold", display: "inline-block", marginBottom: "10px" }}>
            &larr; Back to Dashboard
          </Link>
          <h1 style={{ fontSize: "28px", margin: 0 }}>Create Employee</h1>
        </div>

        {/* Content Section */}
        <div style={{ padding: "40px 30px" }}>
          <p style={{ marginBottom: "25px", color: "#6b7280", fontSize: "15px", lineHeight: "1.6" }}>
            Create a new account with employee privileges. They will have full access to this management dashboard.
          </p>
          
          <form onSubmit={handleCreateEmployee} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "bold", color: "#374151" }}>Employee Username</label>
              <input 
                required 
                type="text" 
                placeholder="Enter username" 
                value={newUsername} 
                onChange={(e) => setNewUsername(e.target.value)} 
                style={{ width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "15px", outline: "none" }} 
              />
            </div>
            
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "bold", color: "#374151" }}>Employee Password</label>
              <input 
                required 
                type="password" 
                placeholder="Enter password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                style={{ width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "15px", outline: "none" }} 
              />
            </div>

            <button type="submit" style={{ padding: "14px", backgroundColor: "#d54309", color: "#fff", border: "none", borderRadius: "6px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", marginTop: "10px", transition: "background 0.2s" }}>
              Create Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
