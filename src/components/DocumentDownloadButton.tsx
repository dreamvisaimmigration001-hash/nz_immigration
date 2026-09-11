"use client";

import React from "react";
import { extractDocumentUrl, extractDocumentName } from "@/lib/sponsorshipUtils";

interface DocumentDownloadButtonProps {
  documentUrl?: string | null;
  documentName?: string;
  item?: any;
}

export default function DocumentDownloadButton({
  documentUrl,
  documentName,
  item,
}: DocumentDownloadButtonProps) {
  const url = documentUrl || extractDocumentUrl(item);
  const name = documentName || extractDocumentName(item);

  if (!url) {
    return <span style={{ color: "#9ca3af", fontSize: "13px" }}>No document</span>;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (url.startsWith("data:")) {
      e.preventDefault();
      try {
        const arr = url.split(",");
        const mimeMatch = arr[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : "application/octet-stream";
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, "_blank");
      } catch (err) {
        console.error("Failed to open data URL in new tab:", err);
        window.open(url, "_blank");
      }
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      download={name}
      onClick={handleClick}
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #0062a4",
        color: "#0062a4",
        padding: "6px 14px",
        fontWeight: "600",
        fontSize: "12px",
        borderRadius: "2px",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        textDecoration: "none",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "background-color 0.15s, color 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#f0f9ff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#ffffff";
      }}
      title="Open document in new tab and download"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Download
    </a>
  );
}
