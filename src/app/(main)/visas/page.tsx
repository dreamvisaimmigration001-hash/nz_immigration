import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import Link from "next/link";

export default async function UserVisasPage() {
  const session = await getServerSession(authOptions);

  if (!session || !(session as any).apiToken) {
    redirect("/login");
  }

  const userId = (session.user as any).id;
  const token = (session as any).apiToken;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  let allData: any[] = [];
  try {
    const res = await fetch(`${API_URL}/api/visas/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      allData = data.visas || [];
    }
  } catch (e) {
    console.error("Failed to fetch visas", e);
  }

  const visas = allData.filter((item: any) => item.applicationType === 'visa' || !item.applicationType);
  const draftVisas = visas.filter((v: any) => v.status === "Draft" || v.visaStatus === "Draft");
  const submittedVisas = visas.filter((v: any) => v.status !== "Draft" && v.visaStatus !== "Draft");

  const tableHeaderStyle = { 
    padding: "12px 16px", 
    textAlign: "left" as const, 
    fontWeight: "bold", 
    color: "#1a1f36",
    borderRight: "1px solid #d1d5db", 
    borderBottom: "2px solid #1a1f36", 
    backgroundColor: "#f9fafb",
    fontSize: "13px"
  };
  
  const tableCellStyle = { 
    padding: "14px 16px", 
    borderRight: "1px solid #e5e7eb", 
    borderBottom: "1px solid #e5e7eb",
    verticalAlign: "middle" as const,
    fontSize: "13px",
    color: "#374151"
  };

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", padding: "40px 20px", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ maxWidth: "1050px", margin: "0 auto" }}>
        
        {/* Title */}
        <div style={{ marginBottom: "35px", borderBottom: "1px solid #e5e7eb", paddingBottom: "20px" }}>
          <h1 style={{ fontSize: "40px", color: "#6b7280", margin: "0", fontWeight: "300", letterSpacing: "-0.5px" }}>
            My visas
          </h1>
        </div>

        {/* 1. Draft applications Section */}
        <div style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "22px", color: "#1a1f36", margin: "0 0 12px 0", fontWeight: "700" }}>
            Draft applications
          </h2>
          <p style={{ color: "#4b5563", margin: "0 0 24px 0", fontSize: "14px", lineHeight: "1.6" }}>
            Select the <strong>APPLY FOR A VISA</strong> button to create a new application or select <strong>Continue</strong> to open and complete a draft application.
          </p>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ display: "flex", width: "260px" }}>
              <input 
                type="text" 
                placeholder="Search" 
                style={{ flex: 1, padding: "9px 12px", border: "1px solid #d1d5db", borderRight: "none", outline: "none", fontSize: "14px", borderRadius: "2px 0 0 2px" }} 
              />
              <button style={{ padding: "9px 14px", border: "1px solid #d1d5db", backgroundColor: "#f9fafb", cursor: "pointer", color: "#0062a4", borderRadius: "0 2px 2px 0" }}>
                🔍
              </button>
            </div>

            <Link href="/dashboard/aewv-visa" style={{ 
              backgroundColor: "#c60c46", 
              color: "#fff", 
              textDecoration: "none",
              padding: "12px 28px", 
              fontWeight: "bold", 
              fontSize: "14px", 
              letterSpacing: "0.5px",
              borderRadius: "2px",
              whiteSpace: "nowrap",
              display: "inline-block"
            }}>
              APPLY FOR A VISA
            </Link>
          </div>

          <div style={{ border: "1px solid #d1d5db", borderRadius: "2px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Principal applicant</th>
                  <th style={{...tableHeaderStyle, width: "28%"}}>Application type</th>
                  <th style={tableHeaderStyle}>Created on</th>
                  <th style={{...tableHeaderStyle, borderRight: "none", textAlign: "center", width: "130px"}}>Options</th>
                </tr>
              </thead>
              <tbody>
                {draftVisas.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ padding: "30px", textAlign: "center", color: "#6b7280", fontSize: "14px" }}>
                      No draft applications.
                    </td>
                  </tr>
                ) : (
                  draftVisas.map((visa: any, index: number) => (
                    <tr key={visa._id} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb" }}>
                      <td style={{...tableCellStyle, fontWeight: "600"}}>{visa.fullName || "Unspecified"}</td>
                      <td style={tableCellStyle}>{visa.visaType || "Visa Application"}</td>
                      <td style={tableCellStyle}>{new Date(visa.createdAt).toLocaleDateString()}</td>
                      <td style={{...tableCellStyle, borderRight: "none", textAlign: "center"}}>
                        <Link 
                          href={`/dashboard/aewv-visa?id=${visa._id}`}
                          style={{ backgroundColor: "#ffffff", border: "1px solid #0062a4", color: "#0062a4", padding: "6px 14px", textDecoration: "none", fontWeight: "600", fontSize: "12px", borderRadius: "2px", display: "inline-block" }}
                        >
                          Continue
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Submitted applications Section */}
        <div>
          <h2 style={{ fontSize: "22px", color: "#1a1f36", margin: "0 0 12px 0", fontWeight: "700" }}>
            Submitted applications
          </h2>
          <p style={{ color: "#4b5563", margin: "0 0 24px 0", fontSize: "14px", lineHeight: "1.6" }}>
            Displays applications submitted by you and submitted applications shared with you. Use the Options dropdown to identify actions you are able to take.
          </p>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <button style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#ffffff", border: "1px solid #d1d5db", padding: "9px 16px", color: "#0062a4", cursor: "pointer", fontSize: "14px", borderRadius: "2px" }}>
                <span>☰</span> All items <span>▼</span>
              </button>
            </div>

            <div style={{ display: "flex", width: "260px" }}>
              <input 
                type="text" 
                placeholder="Search" 
                style={{ flex: 1, padding: "9px 12px", border: "1px solid #d1d5db", borderRight: "none", outline: "none", fontSize: "14px", borderRadius: "2px 0 0 2px" }} 
              />
              <button style={{ padding: "9px 14px", border: "1px solid #d1d5db", backgroundColor: "#f9fafb", cursor: "pointer", color: "#0062a4", borderRadius: "0 2px 2px 0" }}>
                🔍
              </button>
            </div>
          </div>

          <div style={{ border: "1px solid #d1d5db", borderRadius: "2px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Principal applicant</th>
                  <th style={{...tableHeaderStyle, width: "28%"}}>Application type</th>
                  <th style={tableHeaderStyle}>Submitted on</th>
                  <th style={tableHeaderStyle}>Status</th>
                  <th style={{...tableHeaderStyle, borderRight: "none", textAlign: "center", width: "130px"}}>Options</th>
                </tr>
              </thead>
              <tbody>
                {submittedVisas.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: "30px", textAlign: "center", color: "#6b7280", fontSize: "14px" }}>
                      No submitted applications.
                    </td>
                  </tr>
                ) : (
                  submittedVisas.map((visa: any, index: number) => (
                    <tr key={visa._id} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb" }}>
                      <td style={{...tableCellStyle, fontWeight: "600"}}>{visa.fullName || "Unspecified"}</td>
                      <td style={tableCellStyle}>{visa.visaType || "Visa Application"}</td>
                      <td style={tableCellStyle}>{visa.submittedAt ? new Date(visa.submittedAt).toLocaleDateString() : new Date(visa.createdAt).toLocaleDateString()}</td>
                      <td style={tableCellStyle}>
                        <span style={{ display: "inline-block", padding: "3px 10px", backgroundColor: "#d1fae5", color: "#065f46", fontWeight: "600", borderRadius: "12px", fontSize: "12px" }}>
                          {visa.status || "Submitted"}
                        </span>
                      </td>
                      <td style={{...tableCellStyle, borderRight: "none", textAlign: "center"}}>
                        <button style={{ backgroundColor: "#ffffff", border: "1px solid #0062a4", color: "#0062a4", padding: "6px 14px", fontWeight: "600", fontSize: "12px", cursor: "pointer", borderRadius: "2px" }}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
