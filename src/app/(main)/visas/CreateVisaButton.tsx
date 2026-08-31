"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateVisaButton({ userId, token }: { userId: string, token: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  
  const handleCreate = async (visaType: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    await fetch(`${API_URL}/api/visas?origin=nz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        userId,
        visaType,
        status: "Draft",
        fullName: "New Applicant"
      })
    });
    setIsOpen(false);
    router.refresh();
  };

  return (
    <div style={{ position: "relative" }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          backgroundColor: "#c60c46", 
          color: "#fff", 
          border: "none",
          padding: "12px 28px", 
          fontWeight: "bold", 
          fontSize: "14px", 
          letterSpacing: "0.5px",
          borderRadius: "2px",
          cursor: "pointer",
          whiteSpace: "nowrap"
        }}>
        APPLY FOR A VISA
      </button>
      
      {isOpen && (
        <div style={{ position: "absolute", top: "100%", right: 0, marginTop: "8px", backgroundColor: "#fff", border: "1px solid #d1d5db", borderRadius: "4px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", zIndex: 10, minWidth: "260px" }}>
          <button 
            onClick={() => handleCreate("Accredited Employer Work Visa")}
            style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 16px", border: "none", backgroundColor: "transparent", cursor: "pointer", borderBottom: "1px solid #e5e7eb", fontSize: "14px", color: "#111827" }}>
            Accredited Employer Work Visa
          </button>
          <button 
            onClick={() => handleCreate("Specific Purpose Work Visa")}
            style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 16px", border: "none", backgroundColor: "transparent", cursor: "pointer", fontSize: "14px", color: "#111827" }}>
            Specific Purpose Work Visa
          </button>
        </div>
      )}
    </div>
  );
}
