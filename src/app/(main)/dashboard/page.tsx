import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import Link from "next/link";
import connectToDatabase from "@/lib/mongodb";
import { Visa } from "@/models/Visa";
import { Sponsorship } from "@/models/Sponsorship";

export default async function UserDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const sharingId = "CSC-W2V2-2020--01005";

  await connectToDatabase();
  
  const userId = (session.user as any).id;
  const rawVisas = await Visa.find({ userid: userId }).sort({ createdAt: -1 });
  const rawSponsorships = await Sponsorship.find({ userid: userId }).sort({ createdAt: -1 });

  // Serialize data to avoid passing Mongoose documents to client components if we were using them,
  // but it's safe for simple rendering as well.
  const visas = JSON.parse(JSON.stringify(rawVisas));
  const sponsorships = JSON.parse(JSON.stringify(rawSponsorships));

  const draftVisas = visas.filter((v: any) => v.status === "Draft");
  const submittedVisas = visas.filter((v: any) => v.status !== "Draft");

  const tableHeaderStyle = { padding: "15px 12px", textAlign: "left" as const, fontWeight: "bold", borderRight: "1px solid #d1d5db", borderBottom: "2px solid #1a1f36", verticalAlign: "bottom" as const };
  const tableCellStyle = { padding: "15px 12px", borderRight: "1px solid #d1d5db", verticalAlign: "top" as const };

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", padding: "40px 20px", fontFamily: "'Inter', 'Fira Sans', sans-serif" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Title */}
        <div style={{ marginBottom: "20px", borderBottom: "1px solid #eaeaea", paddingBottom: "20px" }}>
          <h1 style={{ fontSize: "42px", color: "#6b7280", margin: "0", fontWeight: "300", letterSpacing: "-0.5px" }}>
            Welcome to Immigration Online
          </h1>
        </div>

        {/* Intro text */}
        <div style={{ color: "#6b7280", fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>
          <p>
            From here you can access &apos;My visas&apos; to apply for a visa and manage your applications. You can locate your sharing ID, and create and view networks to easily share applications.
          </p>
        </div>

        {/* Sharing ID Info */}
        <div style={{ marginBottom: "40px", color: "#6b7280", fontSize: "14px", lineHeight: "1.6" }}>
          <p style={{ margin: "0 0 10px 0", color: "#1E222C" }}>
            <strong>My sharing ID is</strong> {sharingId} <span style={{ cursor: "pointer", color: "#0062a4", marginLeft: "5px" }}>&#128203;</span>
          </p>
          <p style={{ margin: 0 }}>
            People will need to enter your sharing ID in their online application in order to give you access to an application or network, or to nominate you as a sponsor. If you want to share your application or network with another person, ask for their sharing ID.
          </p>
        </div>

        {/* Action Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
          
          {/* My Visas Section */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px" }}>
              <div style={{ flex: 1, paddingRight: "20px" }}>
                <h2 style={{ fontSize: "28px", color: "#1a1f36", margin: "0 0 15px 0", fontWeight: "700" }}>My visas</h2>
                <p style={{ color: "#6b7280", margin: 0, fontSize: "14px" }}>
                  Draft and submitted visa applications.
                </p>
              </div>
              <Link href="/visas" style={{ 
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
                APPLY FOR A VISA
              </Link>
            </div>

            {/* Draft Visas Table */}
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", color: "#1a1f36", margin: "0 0 10px 0", fontWeight: "600" }}>Draft applications</h3>
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

            {/* Submitted Visas Table */}
            <div>
              <h3 style={{ fontSize: "18px", color: "#1a1f36", margin: "0 0 10px 0", fontWeight: "600" }}>Submitted applications</h3>
              <table style={{ width: "100%", borderCollapse: "collapse", color: "#4b5563", fontSize: "13px", borderTop: "1px solid #d1d5db", borderLeft: "1px solid #d1d5db", borderRight: "1px solid #d1d5db" }}>
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>Principal applicant</th>
                    <th style={{...tableHeaderStyle, width: "25%"}}>Application type</th>
                    <th style={tableHeaderStyle}>Status</th>
                    <th style={{...tableHeaderStyle, borderRight: "none", textAlign: "center"}}>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedVisas.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ padding: "20px", textAlign: "center" }}>No submitted applications.</td>
                    </tr>
                  ) : (
                    submittedVisas.map((visa: any, index: number) => (
                      <tr key={visa._id} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f3f4f6", borderBottom: "1px solid #d1d5db" }}>
                        <td style={tableCellStyle}>{visa.fullName || "Unspecified"}</td>
                        <td style={tableCellStyle}>{visa.visaType || "Unspecified"}</td>
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

          {/* My Sponsorships Section */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px" }}>
              <div style={{ flex: 1, paddingRight: "20px" }}>
                <h2 style={{ fontSize: "28px", color: "#1a1f36", margin: "0 0 15px 0", fontWeight: "700" }}>My sponsorships</h2>
                <p style={{ color: "#6b7280", margin: 0, fontSize: "14px" }}>
                  View and manage your sponsorships and employer accreditation records.
                </p>
              </div>
              <Link href="/sponsorships" style={{ 
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
                ALL SPONSORSHIPS
              </Link>
            </div>
            
            <table style={{ width: "100%", borderCollapse: "collapse", color: "#4b5563", fontSize: "13px", borderTop: "1px solid #d1d5db", borderLeft: "1px solid #d1d5db", borderRight: "1px solid #d1d5db" }}>
              <thead>
                <tr>
                  <th style={{...tableHeaderStyle, width: "30%"}}>Type</th>
                  <th style={tableHeaderStyle}>Employer</th>
                  <th style={tableHeaderStyle}>Status</th>
                  <th style={{...tableHeaderStyle, borderRight: "none", textAlign: "center"}}>Options</th>
                </tr>
              </thead>
              <tbody>
                {sponsorships.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ padding: "20px", textAlign: "center" }}>No sponsorship records found.</td>
                  </tr>
                ) : (
                  sponsorships.map((sponsorship: any, index: number) => (
                    <tr key={sponsorship._id} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f3f4f6", borderBottom: "1px solid #d1d5db" }}>
                      <td style={{...tableCellStyle, fontWeight: "600"}}>{sponsorship.type || "Unspecified"}</td>
                      <td style={tableCellStyle}>{sponsorship.employer || "Unspecified"}</td>
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

          {/* Networks Section */}
          <div style={{ marginTop: "20px" }}>
            <h2 style={{ fontSize: "28px", color: "#1a1f36", margin: "0 0 15px 0", fontWeight: "700" }}>Networks</h2>
            <p style={{ color: "#6b7280", margin: "0 0 30px 0", fontSize: "14px", lineHeight: "1.6" }}>
              You can create a network in order to share your visa application with members in your network. This is useful if you have several people involved in your application.
            </p>
            
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginBottom: "20px" }}>
              <button style={{ 
                backgroundColor: "#c60c46", 
                color: "#fff", 
                border: "none",
                cursor: "pointer",
                padding: "10px 24px", 
                fontWeight: "bold", 
                fontSize: "14px", 
                textTransform: "uppercase",
                borderRadius: "2px",
                whiteSpace: "nowrap"
              }}>
                CREATE A NETWORK
              </button>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", borderBottom: "1px solid #eaeaea", color: "#4b5563", fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #eaeaea" }}>
                  <th style={{ padding: "12px 0", textAlign: "left", fontWeight: "bold" }}>Network name &#8593;</th>
                  <th style={{ padding: "12px 0", textAlign: "left", fontWeight: "bold" }}>Network sharing ID</th>
                  <th style={{ padding: "12px 0", textAlign: "right", fontWeight: "bold" }}>Options</th>
                </tr>
              </thead>
              <tbody>
                {/* Empty table state */}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}
