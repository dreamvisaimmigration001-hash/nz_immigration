import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import Link from "next/link";

export default async function UserSponsorshipsPage() {
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
    console.error("Failed to fetch sponsorships", e);
  }

  const sponsorships = allData.filter((item: any) => item.applicationType === 'sponsorship');

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
        
        {/* Breadcrumb */}
        <div style={{ marginBottom: "20px", color: "#0062a4", fontSize: "14px" }}>
          <Link href="/dashboard" style={{ color: "#0062a4", textDecoration: "none" }}>My dashboard</Link>
          <span style={{ margin: "0 8px", color: "#9ca3af" }}>&gt;</span>
          <span style={{ color: "#6b7280" }}>My sponsorships</span>
        </div>

        {/* Title */}
        <div style={{ marginBottom: "35px", borderBottom: "1px solid #e5e7eb", paddingBottom: "20px" }}>
          <h1 style={{ fontSize: "40px", color: "#6b7280", margin: "0", fontWeight: "300", letterSpacing: "-0.5px" }}>
            My sponsorships
          </h1>
        </div>

        {/* Info Banner */}
        <div style={{ marginBottom: "40px", backgroundColor: "#f9fafb", padding: "20px 24px", borderRadius: "2px", borderLeft: "4px solid #0062a4" }}>
          <h2 style={{ fontSize: "18px", color: "#1a1f36", margin: "0 0 8px 0", fontWeight: "600" }}>About Sponsorships</h2>
          <p style={{ color: "#4b5563", margin: "0", fontSize: "14px", lineHeight: "1.6" }}>
            This section lists the sponsorships and employer accreditation records associated with your profile. 
            If you have been nominated by an employer, you can manage the requests here.
          </p>
        </div>

        {/* Sponsorship Records Section */}
        <div>
          <h2 style={{ fontSize: "22px", color: "#1a1f36", margin: "0 0 16px 0", fontWeight: "700" }}>
            Your Sponsorship Records
          </h2>
          
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
                  <th style={{...tableHeaderStyle, width: "28%"}}>Type</th>
                  <th style={tableHeaderStyle}>Employer</th>
                  <th style={tableHeaderStyle}>Validity</th>
                  <th style={tableHeaderStyle}>Status</th>
                  <th style={{...tableHeaderStyle, borderRight: "none", textAlign: "center", width: "130px"}}>Options</th>
                </tr>
              </thead>
              <tbody>
                {sponsorships.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: "30px", textAlign: "center", color: "#6b7280", fontSize: "14px" }}>
                      You have no sponsorship records.
                    </td>
                  </tr>
                ) : (
                  sponsorships.map((sponsorship: any, index: number) => (
                    <tr key={sponsorship._id} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb" }}>
                      <td style={{...tableCellStyle, fontWeight: "600"}}>{sponsorship.type || "Employer Accreditation"}</td>
                      <td style={tableCellStyle}>{sponsorship.employer || "Unspecified"}</td>
                      <td style={tableCellStyle}>
                        {sponsorship.validUntil ? `Valid until ${new Date(sponsorship.validUntil).toLocaleDateString()}` : "N/A"}
                      </td>
                      <td style={tableCellStyle}>
                        <span style={{ display: "inline-block", padding: "3px 10px", backgroundColor: "#d1fae5", color: "#065f46", fontWeight: "600", borderRadius: "12px", fontSize: "12px" }}>
                          {sponsorship.status || "Active"}
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
