import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import Link from "next/link";

export default async function EmployersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const role = (session.user as any).role;
  if (!["employee", "admin"].includes(role)) {
    redirect("/");
  }

  return (
    <div
      style={{
        backgroundColor: "#f4f7f6",
        minHeight: "100vh",
        padding: "60px 20px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            backgroundColor: "#1E222C",
            borderRadius: "12px",
            padding: "40px",
            marginBottom: "30px",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h1
            style={{ fontSize: "36px", color: "#d54309", margin: "0 0 10px 0" }}
          >
            Employer Dashboard
          </h1>
          <p style={{ fontSize: "18px", color: "#d1d5db", margin: 0 }}>
            Welcome back, <strong>{session.user?.name}</strong>. What would you
            like to manage today?
          </p>
        </div>

        {/* Dashboard Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "25px",
          }}
        >
          {/* Users Card */}
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              transition: "transform 0.2s",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                color: "#111827",
                margin: "0 0 15px 0",
              }}
            >
              Manage Users
            </h2>
            <p
              style={{
                color: "#6b7280",
                margin: "0 0 25px 0",
                flex: 1,
                lineHeight: "1.5",
              }}
            >
              Create new customer accounts, reset passwords, and manage user
              access to the system.
            </p>
            <Link
              href="/employers/users"
              style={{
                display: "inline-block",
                textAlign: "center",
                padding: "12px 20px",
                backgroundColor: "#1E222C",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              View Users &rarr;
            </Link>
          </div>

          {/* Visas Card */}
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              transition: "transform 0.2s",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                color: "#111827",
                margin: "0 0 15px 0",
              }}
            >
              Manage Visas
            </h2>
            <p
              style={{
                color: "#6b7280",
                margin: "0 0 25px 0",
                flex: 1,
                lineHeight: "1.5",
              }}
            >
              Create, update, or assign visas. Track statuses and manage
              unassigned visa pools.
            </p>
            <Link
              href="/employers/visas"
              style={{
                display: "inline-block",
                textAlign: "center",
                padding: "12px 20px",
                backgroundColor: "#1E222C",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              View Visas &rarr;
            </Link>
          </div>

          {/* Create Employee Card (Admin Only) */}
          {role === "admin" && (
            <div
              style={{
                backgroundColor: "#fff",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                transition: "transform 0.2s",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  color: "#111827",
                  margin: "0 0 15px 0",
                }}
              >
                Create Employee
              </h2>
              <p
                style={{
                  color: "#6b7280",
                  margin: "0 0 25px 0",
                  flex: 1,
                  lineHeight: "1.5",
                }}
              >
                Generate new accounts with administrative privileges to help
                manage the dashboard.
              </p>
              <Link
                href="/employers/employees"
                style={{
                  display: "inline-block",
                  textAlign: "center",
                  padding: "12px 20px",
                  backgroundColor: "#d54309",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                }}
              >
                Create Employee &rarr;
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
