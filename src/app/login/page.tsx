"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const primaryOrange = "#d54309";
  const lightGray = "#f4f4f4";
  const inputGray = "#f0f0f0";

  const [mobileMode, setMobileMode] = useState("existing");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid username or password.");
      setIsLoading(false);
    } else {
      const session = await getSession();
      if (session?.user && (session.user as any).role === "employee") {
        router.push("/employers");
      } else {
        router.push("/dashboard");
      }
      router.refresh();
    }
  };

  const handleCreateClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsModalOpen(true);
    }, 600);
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        fontFamily: "'Arial', sans-serif",
        overflowX: "hidden",
      }}
      className="flex flex-col"
    >
      <div id="app" className="grow flex flex-col">
        <div id="header">
          {/* Black Header */}
          <header style={{ backgroundColor: "#000", padding: "18px 0", width: "100%" }}>
            <div
              style={{
                maxWidth: "1024px",
                margin: "0 auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 20px",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <Image
                src="/realme-header-logo-white.png"
                alt="RealMe"
                width={400}
                height={200}
                style={{ height: "auto", width: "100%", maxWidth: "260px" }}
              />
              <Image
                src="/agency-branding.png"
                alt="New Zealand Immigration"
                width={300}
                height={150}
                style={{ height: "auto", width: "100%", maxWidth: "240px" }}
              />
            </div>
          </header>

          {/* Go Back Banner */}
          <div
            style={{
              backgroundColor: lightGray,
              padding: "15px 0",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <div
              style={{
                maxWidth: "1024px",
                margin: "0 auto",
                padding: "0 20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#666"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "10px" }}
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 8 8 12 12 16"></polyline>
                <line x1="16" y1="12" x2="8" y2="12"></line>
              </svg>
              <Link
                href="/"
                style={{
                  color: "#444",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Go back to Immigration New Zealand
              </Link>
            </div>
          </div>

          {/* Maintenance Banner */}
          <div
            style={{
              backgroundColor: "#f9f9f9",
              color: "#666",
              padding: "20px 0",
            }}
          >
            <div
              style={{
                maxWidth: "1024px",
                margin: "0 auto",
                padding: "0 20px",
              }}
            >
              <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.5" }}>
                We are performing maintenance on the RealMe service from 8:00 pm to 10:00 pm NZT. You may experience some degradation of service during this time. Please try again later.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ padding: "60px 0", backgroundColor: "#fff" }} className="flex-grow">
          <div
            style={{ maxWidth: "1024px", margin: "0 auto", padding: "0 20px" }}
          >
            {/* Desktop View */}
            <div className="hidden md:flex flex-nowrap bg-white relative">
              {/* Left Side: Login */}
              <div
                style={{
                  flex: "1 1 50%",
                  paddingRight: "50px",
                  borderRight: "1px solid #ddd",
                  boxSizing: "border-box",
                }}
              >
                <h2
                  style={{
                    fontSize: "36px",
                    fontWeight: "normal",
                    color: primaryOrange,
                    marginBottom: "20px",
                  }}
                >
                  Log in with <b style={{ fontWeight: "bold" }}>RealMe</b>
                </h2>
                <p
                  style={{
                    color: "#333",
                    marginBottom: "30px",
                    fontSize: "16px",
                  }}
                >
                  You&apos;ve been redirected here so you can log in with RealMe
                </p>

                <form onSubmit={handleLogin} style={{ maxWidth: "420px" }}>
                  {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}
                  <div style={{ marginBottom: "20px" }}>
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      style={{
                        width: "100%",
                        padding: "15px 20px",
                        border: "1px solid #ccc",
                        borderRadius: "16px",
                        fontSize: "16px",
                        backgroundColor: inputGray,
                        color: "#333",
                        outline: "none",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "25px" }}>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{
                        width: "100%",
                        padding: "15px 20px",
                        border: "1px solid #ccc",
                        borderRadius: "16px",
                        fontSize: "16px",
                        backgroundColor: inputGray,
                        color: "#333",
                        outline: "none",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "30px" }}>
                    <button
                      type="submit"
                      disabled={isLoading}
                      style={{
                        backgroundColor: primaryOrange,
                        color: "white",
                        border: "none",
                        padding: "14px 28px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        borderRadius: "16px",
                        cursor: isLoading ? "not-allowed" : "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{
                        width: "26px",
                        height: "26px",
                        borderRadius: "50%",
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "10px"
                      }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={primaryOrange}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                      {isLoading ? "Logging in..." : "Log in"}
                    </button>
                  </div>
                </form>

                <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                  <span style={{ color: primaryOrange, cursor: "pointer" }}>
                    Forgot Username
                  </span>
                  <span style={{ margin: "0 5px", color: "#333", fontWeight: "normal" }}>or</span>
                  <span style={{ color: primaryOrange, cursor: "pointer" }}>
                    Forgot Password?
                  </span>
                </div>
              </div>

              {/* Right Side: Create Login */}
              <div
                style={{
                  flex: "1 1 50%",
                  paddingLeft: "50px",
                  boxSizing: "border-box",
                }}
              >
                <h2
                  style={{
                    fontSize: "36px",
                    fontWeight: "normal",
                    color: primaryOrange,
                    marginBottom: "20px",
                  }}
                >
                  Create a <b style={{ fontWeight: "bold" }}>RealMe</b> login
                </h2>
                <p
                  style={{
                    color: "#333",
                    marginBottom: "20px",
                    fontSize: "16px",
                  }}
                >
                  To access this service you need a RealMe login.
                </p>
                <p
                  style={{
                    color: "#333",
                    marginBottom: "35px",
                    lineHeight: "1.5",
                    fontSize: "16px",
                    maxWidth: "420px",
                  }}
                >
                  You&apos;ll be able to access a range of services with a single
                  username and password. RealMe is designed to protect your
                  privacy and security.
                </p>
                <div>
                  <button
                    type="button"
                    onClick={handleCreateClick}
                    style={{
                      backgroundColor: primaryOrange,
                      color: "white",
                      border: "none",
                      padding: "14px 28px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      borderRadius: "16px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <span style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      backgroundColor: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "10px"
                    }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={primaryOrange}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                    Create a RealMe login
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile View */}
            <div className="flex flex-col md:hidden bg-white">
              <h2
                style={{
                  fontSize: "32px",
                  fontWeight: "normal",
                  color: primaryOrange,
                  marginBottom: "20px",
                }}
              >
                Log in with <b style={{ fontWeight: "bold" }}>RealMe</b>
              </h2>
              <p
                style={{
                  color: "#333",
                  marginBottom: "20px",
                  fontSize: "16px",
                }}
              >
                To access this service you need a RealMe login.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginBottom: "30px",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="mobile-mode"
                    value="existing"
                    checked={mobileMode === "existing"}
                    onChange={() => setMobileMode("existing")}
                    style={{
                      accentColor: primaryOrange,
                      width: "18px",
                      height: "18px",
                    }}
                  />
                  I have an existing RealMe login
                </label>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="mobile-mode"
                    value="create"
                    checked={mobileMode === "create"}
                    onChange={() => setMobileMode("create")}
                    style={{
                      accentColor: primaryOrange,
                      width: "18px",
                      height: "18px",
                    }}
                  />
                  I need to create a login
                </label>
              </div>

              {mobileMode === "existing" ? (
                <div>
                  <form onSubmit={handleLogin}>
                    {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}
                    <div style={{ marginBottom: "20px" }}>
                      <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{
                          width: "100%",
                          padding: "15px 20px",
                          border: "1px solid #ccc",
                          borderRadius: "16px",
                          fontSize: "16px",
                          backgroundColor: inputGray,
                          color: "#333",
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: "30px" }}>
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                          width: "100%",
                          padding: "15px 20px",
                          border: "1px solid #ccc",
                          borderRadius: "16px",
                          fontSize: "16px",
                          backgroundColor: inputGray,
                          color: "#333",
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: "30px" }}>
                      <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                          backgroundColor: primaryOrange,
                          color: "white",
                          border: "none",
                          padding: "15px 30px",
                          fontSize: "18px",
                          fontWeight: "bold",
                          borderRadius: "16px",
                          cursor: isLoading ? "not-allowed" : "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <span style={{
                          width: "26px",
                          height: "26px",
                          borderRadius: "50%",
                          backgroundColor: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "10px"
                        }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={primaryOrange}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                        {isLoading ? "Logging in..." : "Log in"}
                      </button>
                    </div>
                  </form>
                  <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                    <span style={{ color: primaryOrange, cursor: "pointer" }}>
                      Forgot Username
                    </span>
                    <span style={{ margin: "0 5px", color: "#333", fontWeight: "normal" }}>or</span>
                    <span style={{ color: primaryOrange, cursor: "pointer" }}>
                      Forgot Password?
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <p
                    style={{
                      color: "#333",
                      marginBottom: "30px",
                      lineHeight: "1.5",
                      fontSize: "16px",
                    }}
                  >
                    You&apos;ll be able to access a range of services with a single
                    username and password. RealMe is designed to protect your
                    privacy and security.
                  </p>
                  <button
                    type="button"
                    onClick={handleCreateClick}
                    style={{
                      backgroundColor: primaryOrange,
                      color: "white",
                      border: "none",
                      padding: "15px 30px",
                      fontSize: "18px",
                      fontWeight: "bold",
                      borderRadius: "16px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <span style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      backgroundColor: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "10px"
                    }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={primaryOrange}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                    Create a RealMe login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Orange Footer */}
        <div
          style={{
            backgroundColor: primaryOrange,
            color: "white",
            padding: "40px 0 20px 0",
          }}
        >
          <footer
            style={{ maxWidth: "1024px", margin: "0 auto", padding: "0 20px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                marginBottom: "30px",
              }}
            >
              <nav
                style={{
                  display: "flex",
                  gap: "30px",
                  flexWrap: "wrap",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                <a href="#" style={{ color: "white", textDecoration: "none" }}>
                  Help &amp; contact us
                </a>
                <a href="#" style={{ color: "white", textDecoration: "none" }}>
                  Terms of use
                </a>
                <a href="#" style={{ color: "white", textDecoration: "none" }}>
                  Privacy
                </a>
                <a href="#" style={{ color: "white", textDecoration: "none" }}>
                  About this site
                </a>
              </nav>
              <div style={{ display: "flex", gap: "10px", fontSize: "14px" }}>
                <a
                  href="#"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  English
                </a>
                <a href="#" style={{ color: "white", textDecoration: "none" }}>
                  中文
                </a>
              </div>
            </div>
            <hr
              style={{
                borderTop: "2px solid white",
                borderBottom: "none",
                borderLeft: "none",
                borderRight: "none",
                margin: "0 0 20px 0",
              }}
            />
            <div
              style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}
            >
              <span>© New Zealand Government.</span>
            </div>
          </footer>
        </div>
      </div>

      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[#d54309] rounded-full animate-spin"></div>
        </div>
      )}

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
              maxWidth: "400px",
              width: "90%",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                fontSize: "24px",
                color: primaryOrange,
                marginBottom: "15px",
                fontWeight: "normal",
              }}
            >
              Service Unavailable
            </h3>
            <p style={{ color: "#333", marginBottom: "25px", lineHeight: "1.5" }}>
              Creating an account is disabled due to maintenance. Please try
              again later.
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                backgroundColor: "#333",
                color: "white",
                border: "none",
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
