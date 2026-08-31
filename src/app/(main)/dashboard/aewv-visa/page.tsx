import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import Link from "next/link";

export default async function AEWVVisaDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !(session as any).apiToken) {
    redirect("/login");
  }

  const userId = (session.user as any).id;
  const token = (session as any).apiToken;
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  let aewvApplications: any[] = [];
  try {
    const res = await fetch(`${API_URL}/api/visas/user/${userId}?origin=nz`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      const allVisas = data.visas || [];
      aewvApplications = allVisas.filter((item: any) => item.applicationType === 'aewv');
    }
  } catch (e) {
    console.error("Failed to fetch AEWV data", e);
  }

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
    padding: "16px",
    borderRight: "1px solid #e5e7eb",
    borderBottom: "1px solid #e5e7eb",
    color: "#374151",
    fontSize: "14px"
  };

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", padding: "40px 20px", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ maxWidth: "1050px", margin: "0 auto" }}>
        
        {/* Title */}
        <div style={{ marginBottom: "35px", borderBottom: "1px solid #e5e7eb", paddingBottom: "20px" }}>
          <h1 style={{ fontSize: "40px", color: "#6b7280", margin: "0", fontWeight: "300", letterSpacing: "-0.5px" }}>
            AEWV Visa Management
          </h1>
        </div>

        {/* Info Banner */}
        <div style={{ marginBottom: "40px", backgroundColor: "#f9fafb", padding: "20px 24px", borderRadius: "2px", borderLeft: "4px solid #0062a4" }}>
          <h2 style={{ fontSize: "18px", color: "#1a1f36", margin: "0 0 8px 0", fontWeight: "600" }}>Accredited Employer Work Visa (AEWV)</h2>
          <p style={{ color: "#4b5563", margin: "0", fontSize: "14px", lineHeight: "1.6" }}>
            From here you can manage your Accredited Employer Work Visa applications, job tokens, and job check details.
          </p>
        </div>

        {/* My AEWV Applications Section */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h2 style={{ fontSize: "22px", color: "#1a1f36", margin: "0 0 4px 0", fontWeight: "700" }}>
                My AEWV applications
              </h2>
              <p style={{ color: "#6b7280", margin: 0, fontSize: "14px" }}>
                Draft and submitted AEWV applications.
              </p>
            </div>

            <Link href="#" style={{ 
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
              APPLY FOR AEWV
            </Link>
          </div>

          <div style={{ border: "1px solid #d1d5db", borderRadius: "2px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Applicant name</th>
                  <th style={tableHeaderStyle}>Passport Number</th>
                  <th style={tableHeaderStyle}>Nationality</th>
                  <th style={tableHeaderStyle}>Date of Birth</th>
                  <th style={{...tableHeaderStyle, width: "30%"}}>Job Title</th>
                  <th style={tableHeaderStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {aewvApplications.length > 0 ? (
                  aewvApplications.map((app: any, idx: number) => (
                    <tr key={app._id || idx} style={{ backgroundColor: idx % 2 === 0 ? "#ffffff" : "#f9fafb" }}>
                      <td style={{ ...tableCellStyle, fontWeight: "600", color: "#111827" }}>
                        {app.name || app.applicantName || app.fullName || "N/A"}
                      </td>
                      <td style={tableCellStyle}>{app.documentNumber || "N/A"}</td>
                      <td style={tableCellStyle}>{app.nationality || "N/A"}</td>
                      <td style={tableCellStyle}>{app.dateOfBirth ? new Date(app.dateOfBirth).toLocaleDateString() : "N/A"}</td>
                      <td style={tableCellStyle}>{app.jobTitle || "N/A"}</td>
                      <td style={tableCellStyle}>
                        <span style={{ 
                          display: "inline-block", 
                          padding: "4px 8px", 
                          borderRadius: "9999px", 
                          fontSize: "12px", 
                          fontWeight: "500", 
                          backgroundColor: (app.visaStatus === "Draft" || app.status === "Draft") ? "#f3f4f6" : "#def7ec", 
                          color: (app.visaStatus === "Draft" || app.status === "Draft") ? "#4b5563" : "#03543f" 
                        }}>
                          {app.visaStatus || app.status || "Draft"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} style={{ padding: "30px", textAlign: "center", color: "#6b7280", fontSize: "14px" }}>
                      No AEWV applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
