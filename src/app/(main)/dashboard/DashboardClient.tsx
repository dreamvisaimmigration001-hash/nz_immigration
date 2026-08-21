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
    if (typeof window !== "undefined" && navigator?.clipboard) {
      navigator.clipboard.writeText(sharingId).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch((err) => {
        console.error("Failed to copy sharing ID:", err);
      });
    }
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
        <div
          style={{
            backgroundColor: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "20px 24px",
            marginBottom: "40px",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.02)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#6b7280",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0062a4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                My Sharing ID
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  backgroundColor: "#ffffff",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  padding: "5px 12px",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#111827",
                    letterSpacing: "0.03em",
                  }}
                >
                  {sharingId}
                </span>
                <button
                  onClick={handleCopySharingId}
                  title="Copy Sharing ID"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: copied ? "#ecfdf5" : "#0062a4",
                    color: copied ? "#047857" : "#ffffff",
                    border: copied ? "1px solid #a7f3d0" : "1px solid #0062a4",
                    padding: "5px 12px",
                    fontSize: "12px",
                    fontWeight: "600",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "all 0.15s ease-in-out",
                  }}
                >
                  {copied ? (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <div style={{ maxWidth: "440px" }}>
              <p
                style={{
                  margin: 0,
                  color: "#6b7280",
                  fontSize: "13px",
                  lineHeight: "1.5",
                }}
              >
                People will need to enter your sharing ID in their online application to give you access to an application or network, or to nominate you as a sponsor.
              </p>
            </div>
          </div>
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
