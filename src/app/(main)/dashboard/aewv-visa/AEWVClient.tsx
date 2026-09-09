"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";

interface AEWVClientProps {
  visas: any[];
  initialSelectedId?: string;
}

export default function AEWVClient({ visas, initialSelectedId }: AEWVClientProps) {
  const [search, setSearch] = useState("");
  const [selectedVisaId, setSelectedVisaId] = useState<string | null>(initialSelectedId || null);

  const selectedVisa = useMemo(() => {
    if (!selectedVisaId) return null;
    return visas.find((v) => v._id === selectedVisaId) || null;
  }, [selectedVisaId, visas]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    try {
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? dateStr : d.toISOString().split("T")[0];
    } catch {
      return dateStr;
    }
  };

  const filteredVisas = useMemo(() => {
    if (!search.trim()) return visas;
    const q = search.toLowerCase();
    return visas.filter((v) => {
      const name = (v.fullName || `${v.givenNames || ""} ${v.familyName || ""}` || v.visaApplicant || "").toLowerCase();
      const job = (v.jobTitle || "").toLowerCase();
      const employer = (v.employer || "").toLowerCase();
      const doc = (v.documentNumber || v.passportNumber || "").toLowerCase();
      const status = (v.status || v.visaStatus || "").toLowerCase();
      return name.includes(q) || job.includes(q) || employer.includes(q) || doc.includes(q) || status.includes(q);
    });
  }, [visas, search]);

  const tableHeaderStyle = {
    padding: "12px 16px",
    textAlign: "left" as const,
    fontWeight: "bold",
    color: "#1a1f36",
    borderRight: "1px solid #d1d5db",
    borderBottom: "2px solid #1a1f36",
    backgroundColor: "#f9fafb",
    fontSize: "13px",
  };

  const tableCellStyle = {
    padding: "14px 16px",
    borderRight: "1px solid #e5e7eb",
    borderBottom: "1px solid #e5e7eb",
    verticalAlign: "middle" as const,
    fontSize: "13px",
    color: "#374151",
  };

  const getStatusBadge = (status: string) => {
    const s = status || "Draft";
    switch (s) {
      case "Approved":
        return (
          <span
            style={{
              display: "inline-block",
              padding: "3px 10px",
              backgroundColor: "#d1fae5",
              color: "#065f46",
              fontWeight: "600",
              borderRadius: "12px",
              fontSize: "12px",
            }}
          >
            Approved
          </span>
        );
      case "Declined":
        return (
          <span
            style={{
              display: "inline-block",
              padding: "3px 10px",
              backgroundColor: "#fee2e2",
              color: "#991b1b",
              fontWeight: "600",
              borderRadius: "12px",
              fontSize: "12px",
            }}
          >
            Declined
          </span>
        );
      case "Submitted":
      case "Under Assessment":
      case "Pending":
        return (
          <span
            style={{
              display: "inline-block",
              padding: "3px 10px",
              backgroundColor: "#fef3c7",
              color: "#92400e",
              fontWeight: "600",
              borderRadius: "12px",
              fontSize: "12px",
            }}
          >
            {s}
          </span>
        );
      default:
        return (
          <span
            style={{
              display: "inline-block",
              padding: "3px 10px",
              backgroundColor: "#f3f4f6",
              color: "#4b5563",
              fontWeight: "600",
              borderRadius: "12px",
              fontSize: "12px",
            }}
          >
            {s}
          </span>
        );
    }
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
        <div
          style={{
            marginBottom: "40px",
            backgroundColor: "#f9fafb",
            padding: "20px 24px",
            borderRadius: "2px",
            borderLeft: "4px solid #0062a4",
          }}
        >
          <h2 style={{ fontSize: "18px", color: "#1a1f36", margin: "0 0 8px 0", fontWeight: "600" }}>
            Accredited Employer Work Visa (AEWV)
          </h2>
          <p style={{ color: "#4b5563", margin: "0", fontSize: "14px", lineHeight: "1.6" }}>
            From here you can manage your Accredited Employer Work Visa applications, view accredited employer nominations, and check application status.
          </p>
        </div>

        {/* My AEWV Applications Section */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <h2 style={{ fontSize: "22px", color: "#1a1f36", margin: "0 0 4px 0", fontWeight: "700" }}>
                My AEWV applications
              </h2>
              <p style={{ color: "#6b7280", margin: 0, fontSize: "14px" }}>
                Draft and submitted AEWV applications.
              </p>
            </div>

            <Link
              href="/visas"
              style={{
                backgroundColor: "#c60c46",
                color: "#fff",
                textDecoration: "none",
                padding: "12px 28px",
                fontWeight: "bold",
                fontSize: "14px",
                letterSpacing: "0.5px",
                borderRadius: "2px",
                whiteSpace: "nowrap",
                display: "inline-block",
              }}
            >
              APPLY FOR AEWV
            </Link>
          </div>

          {/* Search Bar */}
          <div style={{ display: "flex", marginBottom: "16px", maxWidth: "320px" }}>
            <input
              type="text"
              placeholder="Search AEWV applications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                padding: "9px 12px",
                border: "1px solid #d1d5db",
                borderRight: "none",
                outline: "none",
                fontSize: "14px",
                borderRadius: "2px 0 0 2px",
              }}
            />
            <button
              style={{
                padding: "9px 14px",
                border: "1px solid #d1d5db",
                backgroundColor: "#f9fafb",
                cursor: "pointer",
                color: "#0062a4",
                borderRadius: "0 2px 2px 0",
              }}
            >
              🔍
            </button>
          </div>

          <div style={{ border: "1px solid #d1d5db", borderRadius: "2px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Applicant name</th>
                  <th style={{ ...tableHeaderStyle, width: "32%" }}>Job Title & Employer</th>
                  <th style={tableHeaderStyle}>Status</th>
                  <th style={{ ...tableHeaderStyle, borderRight: "none", textAlign: "center", width: "130px" }}>
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredVisas.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ padding: "30px", textAlign: "center", color: "#6b7280", fontSize: "14px" }}>
                      {search ? "No matching AEWV applications found." : "No AEWV applications found."}
                    </td>
                  </tr>
                ) : (
                  filteredVisas.map((visa: any, index: number) => {
                    const applicantName =
                      visa.fullName ||
                      (visa.givenNames ? `${visa.givenNames} ${visa.familyName || ""}`.trim() : "") ||
                      visa.visaApplicant ||
                      "Unspecified";
                    const jobTitle = visa.jobTitle || visa.visaType || "Accredited Employer Work Visa";
                    const employer = visa.employer;
                    const status = visa.status || visa.visaStatus || "Submitted";

                    return (
                      <tr key={visa._id} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb" }}>
                        <td style={{ ...tableCellStyle, fontWeight: "600" }}>
                          <div>{applicantName}</div>
                          {visa.documentNumber && (
                            <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px", fontFamily: "monospace" }}>
                              Doc: {visa.documentNumber}
                            </div>
                          )}
                        </td>
                        <td style={tableCellStyle}>
                          <div style={{ fontWeight: "500" }}>{jobTitle}</div>
                          {employer && (
                            <div style={{ fontSize: "12px", color: "#0062a4", marginTop: "2px" }}>
                              Employer: {employer}
                            </div>
                          )}
                        </td>
                        <td style={tableCellStyle}>{getStatusBadge(status)}</td>
                        <td style={{ ...tableCellStyle, borderRight: "none", textAlign: "center" }}>
                          <button
                            onClick={() => setSelectedVisaId(visa._id)}
                            style={{
                              backgroundColor: "#ffffff",
                              border: "1px solid #0062a4",
                              color: "#0062a4",
                              padding: "6px 14px",
                              fontWeight: "600",
                              fontSize: "12px",
                              cursor: "pointer",
                              borderRadius: "2px",
                            }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: View Visa Details */}
        {selectedVisa && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(2px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
              padding: "20px",
            }}
            onClick={() => setSelectedVisaId(null)}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "28px 32px",
                borderRadius: "6px",
                width: "100%",
                maxWidth: "600px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                border: "1px solid #e5e7eb",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                  borderBottom: "1px solid #f3f4f6",
                  paddingBottom: "12px",
                }}
              >
                <div>
                  <h2 style={{ fontSize: "20px", color: "#1E222C", margin: 0, fontWeight: "600" }}>
                    AEWV Application Details
                  </h2>
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "4px",
                      fontSize: "11px",
                      textTransform: "uppercase",
                      padding: "2px 8px",
                      borderRadius: "3px",
                      backgroundColor: "#ede9fe",
                      color: "#6d28d9",
                      fontWeight: "700",
                    }}
                  >
                    Accredited Employer Work Visa
                  </span>
                </div>
                <button
                  onClick={() => setSelectedVisaId(null)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "24px",
                    color: "#9ca3af",
                    cursor: "pointer",
                    lineHeight: 1,
                  }}
                >
                  &times;
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600" }}>Applicant Name</div>
                  <div style={{ fontSize: "14px", color: "#111827", fontWeight: "600", marginTop: "2px" }}>
                    {selectedVisa.fullName ||
                      `${selectedVisa.givenNames || ""} ${selectedVisa.familyName || ""}`.trim() ||
                      selectedVisa.visaApplicant ||
                      "N/A"}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600" }}>Status</div>
                  <div style={{ marginTop: "4px" }}>
                    {getStatusBadge(selectedVisa.status || selectedVisa.visaStatus)}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600" }}>Job Title</div>
                  <div style={{ fontSize: "14px", color: "#111827", marginTop: "2px" }}>
                    {selectedVisa.jobTitle || selectedVisa.visaType || "Accredited Employer Work Visa"}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600" }}>Accredited Employer</div>
                  <div style={{ fontSize: "14px", color: "#111827", marginTop: "2px" }}>
                    {selectedVisa.employer || "Unspecified"}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600" }}>Passport / Document Number</div>
                  <div style={{ fontSize: "14px", color: "#111827", fontFamily: "monospace", marginTop: "2px" }}>
                    {selectedVisa.documentNumber || selectedVisa.passportNumber || "N/A"}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600" }}>Nationality</div>
                  <div style={{ fontSize: "14px", color: "#111827", marginTop: "2px" }}>
                    {selectedVisa.nationality || "N/A"}
                  </div>
                </div>

                {selectedVisa.dateOfBirth && (
                  <div>
                    <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600" }}>Date of Birth</div>
                    <div style={{ fontSize: "14px", color: "#111827", marginTop: "2px" }}>
                      {formatDate(selectedVisa.dateOfBirth)}
                    </div>
                  </div>
                )}

                {selectedVisa.visaGrantNumber && (
                  <div>
                    <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600" }}>Visa Grant Number</div>
                    <div style={{ fontSize: "14px", color: "#111827", fontFamily: "monospace", marginTop: "2px" }}>
                      {selectedVisa.visaGrantNumber}
                    </div>
                  </div>
                )}

                {selectedVisa.createdAt && (
                  <div>
                    <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600" }}>Created On</div>
                    <div style={{ fontSize: "14px", color: "#111827", marginTop: "2px" }}>
                      {formatDate(selectedVisa.createdAt)}
                    </div>
                  </div>
                )}

                {selectedVisa.visaExpiryDate && (
                  <div>
                    <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600" }}>Visa Expiry Date</div>
                    <div style={{ fontSize: "14px", color: "#111827", marginTop: "2px" }}>
                      {formatDate(selectedVisa.visaExpiryDate)}
                    </div>
                  </div>
                )}
              </div>

              {/* Documents Section if available */}
              {selectedVisa.document && Array.isArray(selectedVisa.document) && selectedVisa.document.length > 0 && (
                <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "16px", marginBottom: "16px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
                    Attached Documents
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {selectedVisa.document.map((doc: any, i: number) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "#f9fafb",
                          padding: "8px 12px",
                          borderRadius: "4px",
                          fontSize: "13px",
                        }}
                      >
                        <span>📄 {doc.name || "Document"}</span>
                        {doc.url && (
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: "#0062a4", textDecoration: "none", fontWeight: "600" }}
                          >
                            View
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end", borderTop: "1px solid #f3f4f6", paddingTop: "14px" }}>
                <button
                  type="button"
                  onClick={() => setSelectedVisaId(null)}
                  style={{
                    padding: "8px 20px",
                    backgroundColor: "#1E222C",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "3px",
                    fontSize: "13px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
