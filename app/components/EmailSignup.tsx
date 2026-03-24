"use client";

import React, { useState } from "react";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <div style={{
      marginTop: "50px",
      padding: "40px",
      borderRadius: "16px",
      background: "linear-gradient(135deg, rgba(20,20,20,0.8) 0%, rgba(40,40,40,0.8) 100%)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      border: "1px solid rgba(255,255,255,0.1)",
      backdropFilter: "blur(15px)",
      textAlign: "center"
    }}>
      <h2 style={{ fontSize: "28px", marginBottom: "10px", fontWeight: "800", color: "#fff", textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
        📩 Never Miss an Update
      </h2>
      <p style={{ fontSize: "16px", opacity: 0.9, marginBottom: "20px", color: "#e0e0e0", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
        "New to F1? We'll explain everything that happened without making you feel dumb.One email per race weekend."
      </p>

      {status === "success" ? (
        <div style={{ padding: "15px", background: "rgba(0, 210, 190, 0.2)", color: "#00D2BE", borderRadius: "8px", fontWeight: "bold", border: "1px solid rgba(0, 210, 190, 0.4)" }}>
          Thanks for subscribing! Check your inbox soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", maxWidth: "500px", margin: "0 auto" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            style={{
              flex: "1 1 250px",
              padding: "16px 20px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(0,0,0,0.6)",
              color: "white",
              fontSize: "16px",
              outline: "none",
              transition: "border-color 0.3s"
            }}
            onFocus={(e) => e.target.style.borderColor = "#FF1801"}
            onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.2)"}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              padding: "16px 30px",
              borderRadius: "8px",
              border: "none",
              background: "#FF1801",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: status === "loading" ? "not-allowed" : "pointer",
              transition: "background 0.3s, transform 0.2s, box-shadow 0.3s",
              opacity: status === "loading" ? 0.7 : 1,
              boxShadow: "0 4px 10px rgba(255, 24, 1, 0.3)"
            }}
            onMouseOver={(e) => {
              if (status !== "loading") {
                e.currentTarget.style.background = "#D91400";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 15px rgba(255, 24, 1, 0.4)";
              }
            }}
            onMouseOut={(e) => {
              if (status !== "loading") {
                e.currentTarget.style.background = "#FF1801";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(255, 24, 1, 0.3)";
              }
            }}
          >
            {status === "loading" ? "Subscribing..." : "Get Race Updates"}
          </button>
        </form>
      )}
    </div>
  );
}
