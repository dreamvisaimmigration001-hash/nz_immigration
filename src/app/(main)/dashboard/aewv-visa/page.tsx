import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import Link from "next/link";

export default async function AEWVVisaDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const tableHeaderStyle = { padding: "15px 12px", textAlign: "left" as const, fontWeight: "bold", borderRight: "1px solid #d1d5db", borderBottom: "2px solid #1a1f36", verticalAlign: "bottom" as const };
  const tableCellStyle = { padding: "15px 12px", borderRight: "1px solid #d1d5db", verticalAlign: "top" as const };

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", padding: "40px 20px", fontFamily: "'Inter', 'Fira Sans', sans-serif" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Title */}
        <div style={{ marginBottom: "20px", borderBottom: "1px solid #eaeaea", paddingBottom: "20px" }}>
          <h1 style={{ fontSize: "42px", color: "#6b7280", margin: "0", fontWeight: "300", letterSpacing: "-0.5px" }}>
            AEWV Visa Management
          </h1>
        </div>

        {/* Intro text */}
        <div style={{ color: "#6b7280", fontSize: "14px", lineHeight: "1.6", marginBottom: "40px" }}>
          <p>
            From here you can manage your Accredited Employer Work Visa (AEWV) applications and job checks.
          </p>
        </div>

        {/* Action Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
          
          {/* My AEWV Visas Section */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px" }}>
              <div style={{ flex: 1, paddingRight: "20px" }}>
                <h2 style={{ fontSize: "28px", color: "#1a1f36", margin: "0 0 15px 0", fontWeight: "700" }}>My AEWV applications</h2>
                <p style={{ color: "#6b7280", margin: 0, fontSize: "14px" }}>
                  Draft and submitted AEWV applications.
                </p>
              </div>
              <Link href="#" style={{ 
                backgroundColor: "#c60c46", 
                color: "#fff", 
                textDecoration: "none", 
                padding: "10px 24px", 
                fontWeight: "bold", 
                fontSize: "14px", 
                textTransform: "uppercase",
                borderRadius: "2px",
                whiteSpace: "nowrap"
              }}>
                APPLY FOR AEWV
              </Link>
            </div>

            {/* Empty Visas Table */}
            <div>
              <table style={{ width: "100%", borderCollapse: "collapse", color: "#4b5563", fontSize: "13px", borderTop: "1px solid #d1d5db", borderLeft: "1px solid #d1d5db", borderRight: "1px solid #d1d5db" }}>
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>Applicant name</th>
                    <th style={{...tableHeaderStyle, width: "25%"}}>Job Title</th>
                    <th style={tableHeaderStyle}>Status</th>
                    <th style={{...tableHeaderStyle, borderRight: "none", textAlign: "center"}}>Options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={4} style={{ padding: "20px", textAlign: "center" }}>No AEWV applications found.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
