export const getEmployerName = (item: any): string => {
  if (!item) return "Unspecified";
  return (
    item.employer ||
    item.employerName ||
    item.companyName ||
    item.company ||
    item.organization ||
    item.sponsor ||
    item.sponsorName ||
    (typeof item.employerId === "object" && (item.employerId?.username || item.employerId?.name || item.employerId?.companyName)) ||
    (typeof item.userId === "object" && item.userId?.employer) ||
    "Unspecified"
  );
};

export const formatValidity = (sponsorship: any): string => {
  const val = sponsorship?.validUntil || sponsorship?.validity || sponsorship?.expiryDate || sponsorship?.visaExpiryDate;
  if (!val) return "N/A";
  if (typeof val === "string" && val.toLowerCase().startsWith("valid until")) {
    return val;
  }
  const d = new Date(val);
  if (!isNaN(d.getTime()) && (typeof val !== "string" || /^\d{4}-\d{2}-\d{2}/.test(val) || !isNaN(Number(val)))) {
    return `Valid until ${d.toLocaleDateString("en-GB")}`;
  }
  return String(val);
};

export const extractDocumentUrl = (item: any): string | null => {
  if (!item) return null;
  if (typeof item.documentUrl === "string" && item.documentUrl.trim()) return item.documentUrl;
  if (typeof item.document === "string" && item.document.trim()) return item.document;
  if (Array.isArray(item.document) && item.document.length > 0) {
    const first = item.document[0];
    if (typeof first === "string" && first.trim()) return first;
    if (first && typeof first.url === "string" && first.url.trim()) return first.url;
  }
  if (item.document && typeof item.document === "object" && typeof item.document.url === "string" && item.document.url.trim()) {
    return item.document.url;
  }
  if (typeof item.file === "string" && item.file.trim()) return item.file;
  if (typeof item.fileUrl === "string" && item.fileUrl.trim()) return item.fileUrl;
  if (typeof item.url === "string" && item.url.trim()) return item.url;
  return null;
};

export const extractDocumentName = (item: any): string => {
  if (!item) return "sponsorship_document";
  if (item.documentName) return item.documentName;
  if (Array.isArray(item.document) && item.document.length > 0 && item.document[0]?.name) {
    return item.document[0].name;
  }
  return "sponsorship_document";
};
