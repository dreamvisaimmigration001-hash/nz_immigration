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
    console.error("Failed to fetch sponsorships", e);
  }

  const sponsorships = allData.filter((item: any) => item.applicationType === 'sponsorship');

  const tableHeaderStyle = { padding: "15px 12px", textAlign: "left" as const, fontWeight: "bold", borderRight: "1px solid #d1d5db", borderBottom: "2px solid #1a1f36", verticalAlign: "bottom" as const };
  const tableCellStyle = { padding: "15px 12px", borderRight: "1px solid #d1d5db", verticalAlign: "top" as const };

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", padding: "40px 20px", fontFamily: "'Inter', 'Fira Sans', sans-serif" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Breadcrumb */}
        <div style={{ marginBottom: "20px", color: "#0062a4", fontSize: "14px" }}>
          <Link href="/dashboard" style={{ color: "#0062a4", textDecoration: "none" }}>My dashboard</Link>
          <span style={{ margin: "0 5px", color: "#6b7280" }}>&gt;</span>
          <span style={{ color: "#6b7280" }}>My sponsorships</span>
        </div>

        {/* Title */}
        <div style={{ marginBottom: "30px", borderBottom: "1px solid #eaeaea", paddingBottom: "20px" }}>
          <h1 style={{ fontSize: "42px", color: "#6b7280", margin: "0", fontWeight: "300", letterSpacing: "-0.5px" }}>
            My sponsorships
          </h1>
        </div>

        {/* About Sponsorships Section */}
        <div style={{ marginBottom: "40px", backgroundColor: "#f9fafb", padding: "20px", borderRadius: "4px", borderLeft: "4px solid #0062a4" }}>
          <h2 style={{ fontSize: "20px", color: "#1a1f36", margin: "0 0 10px 0", fontWeight: "600" }}>About Sponsorships</h2>
          <p style={{ color: "#4b5563", margin: "0", fontSize: "14px", lineHeight: "1.6" }}>
            This section lists the sponsorships and employer accreditation records associated with your profile. 
            If you have been nominated by an employer, you can manage the requests here.
          </p>
        </div>

        {/* Sponsorship Records Section */}
        <div>
          <h2 style={{ fontSize: "24px", color: "#1a1f36", margin: "0 0 15px 0", fontWeight: "700" }}>Your Sponsorship Records</h2>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
              <button style={{ display: "flex", alignItems: "center", backgroundColor: "#f0f4f8", border: "1px solid #d1d5db", padding: "8px 12px", color: "#0062a4", cursor: "pointer", fontSize: "14px", borderRadius: "2px" }}>
                <span style={{ marginRight: "5px" }}>&#9776;</span> All items <span style={{ fontSize: "10px", marginLeft: "5px" }}>&#9660;</span>
              </button>
            </div>
            <div style={{ display: "flex", gap: "15px" }}>
              <div style={{ display: "flex" }}>
                <input type="text" placeholder="Search" style={{ padding: "8px 12px", border: "1px solid #ccc", borderRight: "none", outline: "none", fontSize: "14px", width: "200px" }} />
                <button style={{ padding: "8px 12px", border: "1px solid #ccc", backgroundColor: "#fff", cursor: "pointer", color: "#0062a4" }}>
                  &#128269;
                </button>
              </div>
            </div>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", color: "#4b5563", fontSize: "13px", borderTop: "1px solid #d1d5db", borderLeft: "1px solid #d1d5db", borderRight: "1px solid #d1d5db" }}>
            <thead>
              <tr>
                <th style={{...tableHeaderStyle, width: "30%"}}>Type</th>
                <th style={tableHeaderStyle}>Employer</th>
                <th style={tableHeaderStyle}>Date / Validity</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={{...tableHeaderStyle, borderRight: "none", textAlign: "center"}}>Options</th>
              </tr>
            </thead>
            <tbody>
              {sponsorships.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "20px", textAlign: "center" }}>You have no sponsorship records.</td>
                </tr>
              ) : (
                sponsorships.map((sponsorship: any, index: number) => (
                  <tr key={sponsorship._id} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f3f4f6", borderBottom: "1px solid #d1d5db" }}>
                    <td style={{...tableCellStyle, fontWeight: "600"}}>{sponsorship.type || "Unspecified"}</td>
                    <td style={tableCellStyle}>{sponsorship.employer || "Unspecified"}</td>
                    <td style={tableCellStyle}>{sponsorship.validUntil ? `Valid until ${new Date(sponsorship.validUntil).toLocaleDateString()}` : "N/A"}</td>
                    <td style={tableCellStyle}>
                      <span style={{ 
                        display: "inline-block", 
                        padding: "2px 8px", 
                        borderRadius: "12px", 
                        fontSize: "12px", 
                        fontWeight: "600",
                        backgroundColor: (sponsorship.status === "Active" || sponsorship.status === "Approved") ? "#d1fae5" : "#fef3c7", 
                        color: (sponsorship.status === "Active" || sponsorship.status === "Approved") ? "#065f46" : "#92400e" 
                      }}>
                        {sponsorship.status}
                      </span>
                    </td>
                    <td style={{...tableCellStyle, borderRight: "none", textAlign: "center", verticalAlign: "middle"}}>
                      <button style={{ backgroundColor: "#fff", border: "1px solid #0062a4", color: "#0062a4", padding: "4px 8px", cursor: "pointer", borderRadius: "2px", fontWeight: "600", fontSize: "12px" }}>
                        VIEW DETAILS
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
