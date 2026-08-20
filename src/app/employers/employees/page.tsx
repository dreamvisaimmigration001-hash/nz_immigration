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
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const token = (session as any)?.apiToken;

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
    setSuccessMsg("");
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/employe`, {
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
        setSuccessMsg("Employee account created successfully!");
      } else {
        setErrorMsg("Failed to create employee account. Please try again.");
      }
    } catch (err) {
      setErrorMsg("An unexpected server error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status !== "authenticated") {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", color: "#6b7280" }}>Loading portal controls...</div>;
  }

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", padding: "35px 20px 60px", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Page Header Bar */}
        <div style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "20px", marginBottom: "35px" }}>
          <h1 style={{ fontSize: "32px", color: "#1E222C", margin: "0 0 6px 0", fontWeight: "400", letterSpacing: "-0.5px" }}>
            Create Employee Account
          </h1>
          <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
            Provision internal staff accounts with administrator and officer management permissions.
          </p>
        </div>

        {/* Form Container */}
        <div style={{ maxWidth: "580px" }}>
          
          {/* Notification Alerts */}
          {successMsg && (
            <div style={{ backgroundColor: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46", padding: "12px 16px", borderRadius: "4px", fontSize: "14px", marginBottom: "20px" }}>
              ✓ {successMsg}
            </div>
          )}
          {errorMsg && (
            <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fca5a5", color: "#991b1b", padding: "12px 16px", borderRadius: "4px", fontSize: "14px", marginBottom: "20px" }}>
              ✕ {errorMsg}
            </div>
          )}

          {/* Info Card */}
          <div style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderLeft: "4px solid #0062a4", padding: "16px 20px", borderRadius: "3px", marginBottom: "24px" }}>
            <h3 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: "600", color: "#1E222C" }}>Administrative Privileges</h3>
            <p style={{ margin: 0, fontSize: "13px", color: "#4b5563", lineHeight: "1.5" }}>
              Employees created through this console will have full access to view, update, create, and delete visa applications and user accounts.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleCreateEmployee} style={{ border: "1px solid #e5e7eb", borderRadius: "4px", padding: "28px", backgroundColor: "#ffffff" }}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#374151" }}>
                Employee Username <span style={{ color: "#c60c46" }}>*</span>
              </label>
              <input 
                required 
                type="text" 
                placeholder="Enter staff username" 
                value={newUsername} 
                onChange={(e) => setNewUsername(e.target.value)} 
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: "3px", fontSize: "14px", color: "#1f2937", outline: "none" }} 
              />
            </div>
            
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#374151" }}>
                Initial Password <span style={{ color: "#c60c46" }}>*</span>
              </label>
              <input 
                required 
                type="password" 
                placeholder="Enter secure password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: "3px", fontSize: "14px", color: "#1f2937", outline: "none" }} 
              />
            </div>

            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <button 
                type="submit" 
                disabled={isSubmitting}
                style={{ 
                  backgroundColor: "#c60c46", 
                  color: "#ffffff", 
                  border: "none", 
                  padding: "10px 24px", 
                  borderRadius: "3px", 
                  fontSize: "14px", 
                  fontWeight: "600", 
                  cursor: isSubmitting ? "not-allowed" : "pointer", 
                  transition: "background 0.15s ease",
                  boxShadow: "0 2px 4px rgba(198, 12, 70, 0.15)",
                  opacity: isSubmitting ? 0.7 : 1
                }}
                onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = "#a8093b")}
                onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = "#c60c46")}
              >
                {isSubmitting ? "Creating..." : "Create Employee Account"}
              </button>

              <Link 
                href="/employers" 
                style={{ color: "#6b7280", textDecoration: "none", fontSize: "13px", fontWeight: "500", padding: "10px 16px" }}
              >
                Cancel
              </Link>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}
