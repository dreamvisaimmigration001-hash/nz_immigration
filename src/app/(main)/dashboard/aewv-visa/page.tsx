import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import AEWVClient from "./AEWVClient";

export default async function AEWVVisaDashboardPage(props: {
  searchParams?: Promise<{ id?: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !(session as any).apiToken) {
    redirect("/login");
  }

  const userId = (session.user as any).id;
  const token = (session as any).apiToken;
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  const selectedId = searchParams?.id;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  let aewvVisas: any[] = [];
  try {
    // Hit the dedicated AEWV route
    const res = await fetch(`${API_URL}/api/visas/aewv?origin=nz&userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      aewvVisas = data.visas || [];
    } else {
      // Fallback to user query route if needed
      const fallbackRes = await fetch(`${API_URL}/api/visas/user/${userId}?origin=nz&applicationType=aewv`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });
      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json();
        aewvVisas = fallbackData.visas || [];
      }
    }
  } catch (e) {
    console.error("Failed to fetch AEWV visas", e);
  }

  return <AEWVClient visas={aewvVisas} initialSelectedId={selectedId} />;
}
