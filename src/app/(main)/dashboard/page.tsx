import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import DashboardClient from "./DashboardClient";

export default async function UserDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !(session as any).apiToken) {
    redirect("/login");
  }

  const sharingId = "CSC-W2V2-2020--01005";
  
  const userId = (session.user as any).id;
  const token = (session as any).apiToken;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  let allData: any[] = [];
  try {
    const res = await fetch(`${API_URL}/api/visas/user/${userId}?origin=nz`, {
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
    console.error("Failed to fetch data", e);
  }

  // Filter based on applicationType
  const rawVisas = allData.filter((item: any) => item.applicationType === 'visa' || !item.applicationType);
  const sponsorships = allData.filter((item: any) => item.applicationType === 'sponsorship');

  const draftVisas = rawVisas.filter((v: any) => v.visaStatus === "Draft" || v.status === "Draft");
  const submittedVisas = rawVisas.filter((v: any) => v.visaStatus !== "Draft" && v.status !== "Draft");

  return (
    <DashboardClient
      user={session.user}
      sharingId={sharingId}
      draftVisas={draftVisas}
      submittedVisas={submittedVisas}
      sponsorships={sponsorships}
    />
  );
}
