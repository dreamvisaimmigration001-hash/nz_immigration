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

  let allData = [];
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

  const tableHeaderStyle = { padding: "15px 12px", textAlign: "left" as const, fontWeight: "bold", borderRight: "1px solid #d1d5db", borderBottom: "2px solid #1a1f36", verticalAlign: "bottom" as const };
  const tableCellStyle = { padding: "15px 12px", borderRight: "1px solid #d1d5db", verticalAlign: "top" as const };

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", padding: "40px 20px", fontFamily: "'Inter', 'Fira Sans', sans-serif" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Breadcrumb */}
        <div style={{ marginBottom: "20px", color: "#0062a4", fontSize: "14px" }}>
          <Link href="/dashboard" style={{ color: "#0062a4", textDecoration: "none" }}>My dashboard</Link>
          <span style={{ margin: "0 5px", color: "#6b7280" }}>&gt;</span>
          <span style={{ color: "#6b7280" }}>My visas</span>
        </div>

        {/* Title */}
        <div style={{ marginBottom: "30px", borderBottom: "1px solid #eaeaea", paddingBottom: "20px" }}>
          <h1 style={{ fontSize: "42px", color: "#6b7280", margin: "0", fontWeight: "300", letterSpacing: "-0.5px" }}>
            My visas
          </h1>
        </div>

        {/* Draft applications Section */}
        <div style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "24px", color: "#1a1f36", margin: "0 0 15px 0", fontWeight: "700" }}>Draft applications</h2>
          <p style={{ color: "#4b5563", margin: "0 0 20px 0", fontSize: "14px" }}>
            Select the Apply for a visa button to create a new application or select Continue from Options dropdown to open and complete a draft application.
          </p>
          
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginBottom: "15px" }}>
            <div style={{ display: "flex" }}>
              <input type="text" placeholder="Search" style={{ padding: "8px 12px", border: "1px solid #ccc", borderRight: "none", outline: "none", fontSize: "14px", width: "200px" }} />
              <button style={{ padding: "8px 12px", border: "1px solid #ccc", backgroundColor: "#fff", cursor: "pointer", color: "#0062a4" }}>
                &#128269;
              </button>
            </div>
            <button style={{ 
              backgroundColor: "#c60c46", 
              color: "#fff", 
              border: "none",
              cursor: "pointer",
              padding: "10px 24px", 
              fontWeight: "bold", 
              fontSize: "14px", 
              borderRadius: "2px",
              whiteSpace: "nowrap"
            }}>
              APPLY FOR A VISA
            </button>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", color: "#4b5563", fontSize: "13px", borderTop: "1px solid #d1d5db", borderLeft: "1px solid #d1d5db", borderRight: "1px solid #d1d5db" }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Principal applicant</th>
                <th style={{...tableHeaderStyle, width: "20%"}}>Application type</th>
                <th style={tableHeaderStyle}>Created on</th>
                <th style={{...tableHeaderStyle, borderRight: "none", textAlign: "center"}}>Options</th>
              </tr>
            </thead>
            <tbody>
              {draftVisas.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: "20px", textAlign: "center" }}>No draft applications.</td>
                </tr>
              ) : (
                draftVisas.map((visa: any, index: number) => (
                  <tr key={visa._id} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f3f4f6", borderBottom: "1px solid #d1d5db" }}>
                    <td style={tableCellStyle}>{visa.fullName || "Unspecified"}</td>
                    <td style={tableCellStyle}>{visa.visaType || "Unspecified"}</td>
                    <td style={tableCellStyle}>{new Date(visa.createdAt).toLocaleDateString()}</td>
                    <td style={{...tableCellStyle, borderRight: "none", textAlign: "center", verticalAlign: "middle"}}>
                      <button style={{ backgroundColor: "#fff", border: "1px solid #0062a4", color: "#0062a4", padding: "4px 8px", cursor: "pointer", borderRadius: "2px" }}>
                        &#8964;
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Submitted applications Section */}
        <div>
          <h2 style={{ fontSize: "24px", color: "#1a1f36", margin: "0 0 15px 0", fontWeight: "700" }}>Submitted applications</h2>
          <p style={{ color: "#4b5563", margin: "0 0 20px 0", fontSize: "14px", lineHeight: "1.6" }}>
            Displays applications submitted by you and submitted applications shared with you. Click on the headers to update the order of applications or select the All items drop down to filter by Status. Use the Options dropdown to identify actions you are able to take.
          </p>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
              <button style={{ display: "flex", alignItems: "center", backgroundColor: "#f0f4f8", border: "1px solid #d1d5db", padding: "8px 12px", color: "#0062a4", cursor: "pointer", fontSize: "14px", borderRadius: "2px" }}>
                <span style={{ marginRight: "5px" }}>&#9776;</span> All items <span style={{ fontSize: "10px", marginLeft: "5px" }}>&#9660;</span>
              </button>
            </div>
            <div style={{ display: "flex" }}>
              <input type="text" placeholder="Search" style={{ padding: "8px 12px", border: "1px solid #ccc", borderRight: "none", outline: "none", fontSize: "14px", width: "200px" }} />
              <button style={{ padding: "8px 12px", border: "1px solid #ccc", backgroundColor: "#fff", cursor: "pointer", color: "#0062a4" }}>
                &#128269;
              </button>
            </div>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", color: "#4b5563", fontSize: "13px", borderTop: "1px solid #d1d5db", borderLeft: "1px solid #d1d5db", borderRight: "1px solid #d1d5db" }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Principal applicant</th>
                <th style={{...tableHeaderStyle, width: "25%"}}>Application type</th>
                <th style={tableHeaderStyle}>Submitted on</th>
                <th style={tableHeaderStyle}>Status reason</th>
                <th style={{...tableHeaderStyle, borderRight: "none", textAlign: "center"}}>Options</th>
              </tr>
            </thead>
            <tbody>
              {submittedVisas.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "20px", textAlign: "center" }}>No submitted applications.</td>
                </tr>
              ) : (
                submittedVisas.map((visa: any, index: number) => (
                  <tr key={visa._id} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f3f4f6", borderBottom: "1px solid #d1d5db" }}>
                    <td style={tableCellStyle}>{visa.fullName || "Unspecified"}</td>
                    <td style={tableCellStyle}>{visa.visaType || "Unspecified"}</td>
                    <td style={tableCellStyle}>{visa.submittedAt ? new Date(visa.submittedAt).toLocaleDateString() : new Date(visa.createdAt).toLocaleDateString()}</td>
                    <td style={tableCellStyle}>{visa.status}</td>
                    <td style={{...tableCellStyle, borderRight: "none", textAlign: "center", verticalAlign: "middle"}}>
                      <button style={{ backgroundColor: "#fff", border: "1px solid #0062a4", color: "#0062a4", padding: "4px 8px", cursor: "pointer", borderRadius: "2px" }}>
                        &#8964;
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
  );
}
