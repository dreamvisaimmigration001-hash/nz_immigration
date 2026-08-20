"use client";

import React, { useState } from "react";
import Link from "next/link";

interface DashboardClientProps {
  user: any;
  sharingId: string;
  draftVisas: any[];
  submittedVisas: any[];
  sponsorships: any[];
}

export default function DashboardClient({
  user,
  sharingId,
  draftVisas,
  submittedVisas,
  sponsorships,
}: DashboardClientProps) {
  const [copied, setCopied] = useState(false);

  const handleCopySharingId = () => {
    navigator.clipboard.writeText(sharingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tableHeaderStyle = { 
    padding: "14px 16px", 
    textAlign: "left" as const, 
    fontWeight: "bold", 
    color: "#1a1f36",
    borderRight: "1px solid #d1d5db", 
    borderBottom: "2px solid #1a1f36", 
    backgroundColor: "#f9fafb",
    fontSize: "14px"
  };

  const tableCellStyle = { 
    padding: "16px 16px", 
    borderRight: "1px solid #e5e7eb", 
    borderBottom: "1px solid #e5e7eb",
    verticalAlign: "middle" as const,
    fontSize: "14px",
    color: "#374151"
  };

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", padding: "40px 20px", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ maxWidth: "1050px", margin: "0 auto" }}>

        {/* Title */}
        <div style={{ marginBottom: "20px", borderBottom: "1px solid #e5e7eb", paddingBottom: "20px" }}>
          <h1 style={{ fontSize: "40px", color: "#6b7280", margin: "0", fontWeight: "300", letterSpacing: "-0.5px" }}>
            Welcome to Immigration Online
          </h1>
        </div>

        {/* Intro text */}
        <div style={{ color: "#4b5563", fontSize: "14px", lineHeight: "1.6", marginBottom: "24px" }}>
          <p style={{ margin: 0 }}>
            From here you can access &apos;My visas&apos; to apply for a visa and manage your applications. You can locate your sharing ID, and create and view networks to easily share applications.
          </p>
        </div>

        {/* Sharing ID Card */}
        <div style={{ backgroundColor: "#f9fafb", border: "1px solid #d1d5db", borderLeft: "4px solid #0062a4", padding: "20px 24px", borderRadius: "2px", marginBottom: "50px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "8px" }}>
            <div style={{ fontSize: "15px", color: "#1E222C" }}>
              <strong>My sharing ID is:</strong>{" "}
              <span style={{ fontFamily: "monospace", fontSize: "16px", fontWeight: "bold", color: "#0062a4", letterSpacing: "0.5px", padding: "3px 10px", backgroundColor: "#eff6ff", borderRadius: "4px", border: "1px solid #bfdbfe", marginLeft: "6px" }}>
                {sharingId}
              </span>
            </div>
            <button
              onClick={handleCopySharingId}
              style={{
                backgroundColor: copied ? "#059669" : "#0062a4",
                color: "#ffffff",
                border: "none",
                padding: "8px 18px",
                fontSize: "13px",
                fontWeight: "bold",
                borderRadius: "2px",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {copied ? "COPIED ✓" : "COPY SHARING ID"}
            </button>
          </div>
          <p style={{ margin: 0, color: "#6b7280", fontSize: "13px", lineHeight: "1.5" }}>
            People will need to enter your sharing ID in their online application in order to give you access to an application or network, or to nominate you as a sponsor.
          </p>
        </div>

        {/* Action Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>

          {/* 1. My Visas Section */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <h2 style={{ fontSize: "28px", color: "#1a1f36", margin: "0 0 6px 0", fontWeight: "700" }}>My visas</h2>
                <p style={{ color: "#6b7280", margin: 0, fontSize: "14px" }}>
                  Draft and submitted visa applications.
                </p>
              </div>
              <Link href="/visas" style={{
                backgroundColor: "#c60c46",
                color: "#ffffff",
                textDecoration: "none",
                padding: "14px 32px",
                fontWeight: "bold",
                fontSize: "14px",
                letterSpacing: "0.5px",
                borderRadius: "2px",
                whiteSpace: "nowrap",
                display: "inline-block",
                boxShadow: "0 2px 4px rgba(198, 12, 70, 0.2)"
              }}>
                APPLY FOR A VISA
              </Link>
            </div>

            {/* Draft Visas Table */}
            <div style={{ marginBottom: "30px" }}>
              <h3 style={{ fontSize: "18px", color: "#1a1f36", margin: "0 0 12px 0", fontWeight: "600" }}>Draft applications</h3>
              <div style={{ border: "1px solid #d1d5db", borderRadius: "2px", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={tableHeaderStyle}>Principal applicant</th>
                      <th style={{ ...tableHeaderStyle, width: "25%" }}>Application type</th>
                      <th style={tableHeaderStyle}>Created on</th>
                      <th style={{ ...tableHeaderStyle, borderRight: "none", textAlign: "center", width: "140px" }}>Options</th>
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
                          <td style={{ ...tableCellStyle, fontWeight: "600" }}>{visa.fullName || "Unspecified"}</td>
                          <td style={tableCellStyle}>{visa.visaType || "Visa Application"}</td>
                          <td style={tableCellStyle}>{new Date(visa.createdAt).toLocaleDateString()}</td>
                          <td style={{ ...tableCellStyle, borderRight: "none", textAlign: "center" }}>
                            <Link
                              href={`/dashboard/aewv-visa?id=${visa._id}`}
                              style={{ backgroundColor: "#ffffff", border: "1px solid #0062a4", color: "#0062a4", padding: "7px 16px", textDecoration: "none", fontWeight: "600", fontSize: "13px", borderRadius: "2px", display: "inline-block" }}
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

            {/* Submitted Visas Table */}
            <div>
              <h3 style={{ fontSize: "18px", color: "#1a1f36", margin: "0 0 12px 0", fontWeight: "600" }}>Submitted applications</h3>
              <div style={{ border: "1px solid #d1d5db", borderRadius: "2px", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={tableHeaderStyle}>Principal applicant</th>
                      <th style={{ ...tableHeaderStyle, width: "25%" }}>Application type</th>
                      <th style={tableHeaderStyle}>Status</th>
                      <th style={{ ...tableHeaderStyle, borderRight: "none", textAlign: "center", width: "140px" }}>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submittedVisas.length === 0 ? (
                      <tr>
                        <td colSpan={4} style={{ padding: "30px", textAlign: "center", color: "#6b7280", fontSize: "14px" }}>
                          No submitted applications.
                        </td>
                      </tr>
                    ) : (
                      submittedVisas.map((visa: any, index: number) => (
                        <tr key={visa._id} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb" }}>
                          <td style={{ ...tableCellStyle, fontWeight: "600" }}>{visa.fullName || "Unspecified"}</td>
                          <td style={tableCellStyle}>{visa.visaType || "Visa Application"}</td>
                          <td style={tableCellStyle}>
                            <span style={{ display: "inline-block", padding: "3px 10px", backgroundColor: "#d1fae5", color: "#065f46", fontWeight: "600", borderRadius: "12px", fontSize: "12px" }}>
                              {visa.status || "Submitted"}
                            </span>
                          </td>
                          <td style={{ ...tableCellStyle, borderRight: "none", textAlign: "center" }}>
                            <button style={{ backgroundColor: "#ffffff", border: "1px solid #0062a4", color: "#0062a4", padding: "7px 16px", fontWeight: "600", fontSize: "13px", cursor: "pointer", borderRadius: "2px" }}>
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

          {/* 2. My Sponsorships Section */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <h2 style={{ fontSize: "28px", color: "#1a1f36", margin: "0 0 6px 0", fontWeight: "700" }}>My sponsorships</h2>
                <p style={{ color: "#6b7280", margin: 0, fontSize: "14px" }}>
                  View and manage your sponsorships and employer accreditation records.
                </p>
              </div>
              <Link href="/sponsorships" style={{
                backgroundColor: "#1a1f36",
                color: "#ffffff",
                textDecoration: "none",
                padding: "14px 28px",
                fontWeight: "bold",
                fontSize: "14px",
                borderRadius: "2px",
                whiteSpace: "nowrap",
                display: "inline-block"
              }}>
                ALL SPONSORSHIPS
              </Link>
            </div>

            <div style={{ border: "1px solid #d1d5db", borderRadius: "2px", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ ...tableHeaderStyle, width: "30%" }}>Type</th>
                    <th style={tableHeaderStyle}>Employer</th>
                    <th style={tableHeaderStyle}>Status</th>
                    <th style={{ ...tableHeaderStyle, borderRight: "none", textAlign: "center", width: "140px" }}>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {sponsorships.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ padding: "30px", textAlign: "center", color: "#6b7280", fontSize: "14px" }}>
                        No sponsorship records found.
                      </td>
                    </tr>
                  ) : (
                    sponsorships.map((sponsorship: any, index: number) => (
                      <tr key={sponsorship._id} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb" }}>
                        <td style={{ ...tableCellStyle, fontWeight: "600" }}>{sponsorship.type || "Employer Accreditation"}</td>
                        <td style={tableCellStyle}>{sponsorship.employer || "Unspecified"}</td>
                        <td style={tableCellStyle}>
                          <span style={{
                            display: "inline-block",
                            padding: "3px 10px",
                            borderRadius: "12px",
                            fontSize: "12px",
                            fontWeight: "600",
                            backgroundColor: (sponsorship.status === "Active" || sponsorship.status === "Approved") ? "#d1fae5" : "#fef3c7",
                            color: (sponsorship.status === "Active" || sponsorship.status === "Approved") ? "#065f46" : "#92400e"
                          }}>
                            {sponsorship.status || "Active"}
                          </span>
                        </td>
                        <td style={{ ...tableCellStyle, borderRight: "none", textAlign: "center" }}>
                          <button style={{ backgroundColor: "#ffffff", border: "1px solid #0062a4", color: "#0062a4", padding: "7px 16px", fontWeight: "600", fontSize: "13px", cursor: "pointer", borderRadius: "2px" }}>
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Networks Section */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "16px", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <h2 style={{ fontSize: "28px", color: "#1a1f36", margin: "0 0 6px 0", fontWeight: "700" }}>Networks</h2>
                <p style={{ color: "#6b7280", margin: 0, fontSize: "14px", lineHeight: "1.5" }}>
                  You can create a network in order to share your visa application with members in your network.
                </p>
              </div>
              <button style={{
                backgroundColor: "#c60c46",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
                padding: "14px 28px",
                fontWeight: "bold",
                fontSize: "14px",
                borderRadius: "2px",
                whiteSpace: "nowrap"
              }}>
                CREATE A NETWORK
              </button>
            </div>

            <div style={{ border: "1px solid #d1d5db", borderRadius: "2px", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>Network name</th>
                    <th style={tableHeaderStyle}>Network sharing ID</th>
                    <th style={{ ...tableHeaderStyle, borderRight: "none", textAlign: "center", width: "140px" }}>Options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={3} style={{ padding: "30px", textAlign: "center", color: "#6b7280", fontSize: "14px" }}>
                      No active networks created yet.
                    </td>
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
