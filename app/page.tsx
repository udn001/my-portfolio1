import React from "react";
import EmailSignup from "./components/EmailSignup";

// -----------------------
// Types
// -----------------------
// -----------------------
import TopDrivers, { Driver } from "./components/TopDrivers";

type Race = {
  raceName: string;
  date: string;
  Circuit: { circuitName: string; Location: { locality: string; country: string } };
};

// -----------------------
// Server fetch functions
// -----------------------
async function getTopDrivers(): Promise<Driver[]> {
  const res = await fetch(
    "https://api.jolpi.ca/ergast/f1/2026/driverStandings.json",
    { cache: "no-store" }
  );
  const data = await res.json();
  const standings = data.MRData.StandingsTable.StandingsLists?.[0]?.DriverStandings;
  return standings?.slice(0, 3) || [];
}

async function getNextRace(): Promise<Race | null> {
  const res = await fetch(
    "https://api.jolpi.ca/ergast/f1/2026/races.json",
    { cache: "no-store" }
  );
  const data = await res.json();
  const upcoming = data.MRData.RaceTable.Races?.find(
    (race: Race) => new Date(race.date) >= new Date()
  );
  return upcoming || null;
}

// -----------------------
// Home Component
// -----------------------
export default async function Home() {
  const drivers = await getTopDrivers();
  const nextRace = await getNextRace();

  return (
    <main style={{ position: "relative", minHeight: "100vh", width: "100%", overflow: "hidden", fontFamily: "'Inter', Arial, sans-serif" }}>
      {/* Background Image (Local File) */}
      <img
        src="/f1-bg.jpg"
        alt="F1 Background"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          minWidth: "100%",
          minHeight: "100%",
          width: "auto",
          height: "auto",
          zIndex: -1,
          transform: "translate(-50%, -50%)",
          objectFit: "cover",
          filter: "brightness(0.35) contrast(1.1) saturate(1.2)",
          backgroundColor: "#111"
        }}
      />

      {/* Content Overlay */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1000px", margin: "0 auto", padding: "60px 20px", color: "white" }}>
        <h1 style={{ fontSize: "52px", marginBottom: "10px", textShadow: "3px 3px 6px rgba(0,0,0,0.8)", fontWeight: "900", letterSpacing: "-1px" }}>
          🏁 Welcome to Speed Track
        </h1>
        <p style={{ fontSize: "20px", marginBottom: "50px", textShadow: "2px 2px 4px rgba(0,0,0,0.8)", fontWeight: "300", color: "#e0e0e0" }}>
          Your ultimate F1 dashboard – top drivers, upcoming races & latest news.
        </p>

        {/* Top 3 Drivers */}
        <h2 style={{ fontSize: "32px", marginBottom: "20px", textShadow: "2px 2px 4px rgba(0,0,0,0.8)", fontWeight: "800" }}>🏆 Top 3 Drivers</h2>
        <TopDrivers drivers={drivers} />

        {/* Next Race */}
        {nextRace && (
          <div
            style={{
              marginTop: "10px",
              padding: "30px",
              borderRadius: "16px",
              background: "rgba(20, 20, 20, 0.7)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(15px)",
            }}
          >
            <h2 style={{ fontSize: "32px", marginBottom: "15px", fontWeight: "800", color: "#FF1801" }}>🏎 Next Race</h2>
            <h3 style={{ fontSize: "28px", margin: "0 0 10px 0" }}>{nextRace.raceName}</h3>
            <p style={{ fontSize: "18px", opacity: 0.9, margin: "5px 0" }}>
              📍 {nextRace.Circuit.circuitName} — {nextRace.Circuit.Location.locality}, {nextRace.Circuit.Location.country}
            </p>
            <p style={{ fontSize: "18px", opacity: 0.9, margin: "5px 0" }}>
              🗓 Date: <strong>{new Date(nextRace.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</strong>
            </p>
          </div>
        )}

        {/* Email Signup */}
        <EmailSignup />

        {/* Quick Links */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "50px" }}>
          <a
            href="/standings"
            className="quick-link"
            style={{
              flex: "1 1 200px",
              padding: "16px 25px",
              background: "#FF1801",
              color: "white",
              borderRadius: "12px",
              textDecoration: "none",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "18px",
              boxShadow: "0 6px 15px rgba(255, 24, 1, 0.4)",
              transition: "all 0.3s ease",
            }}
          >
            View Full Standings
          </a>
          <a
            href="/news"
            className="quick-link"
            style={{
              flex: "1 1 200px",
              padding: "16px 25px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              color: "white",
              borderRadius: "12px",
              textDecoration: "none",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "18px",
              transition: "all 0.3s ease",
            }}
          >
            Latest News
          </a>
          <a
            href="/guide"
            className="quick-link guide-link"
            style={{
              flex: "1 1 200px",
              padding: "16px 25px",
              background: "linear-gradient(135deg, #111, #222)",
              border: "1px solid rgba(255,24,1,0.5)",
              color: "white",
              borderRadius: "12px",
              textDecoration: "none",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "18px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
              transition: "all 0.3s ease",
            }}
          >
            📖 Beginner's Guide
          </a>
        </div>

        {/* CSS Hover */}
        <style>{`
          .driver-card:hover {
            transform: translateY(-8px) scale(1.02) !important;
            box-shadow: 0 15px 30px rgba(0,0,0,0.6) !important;
          }
          .quick-link:hover {
            transform: translateY(-3px);
            filter: brightness(1.1);
          }
        `}</style>
      </div>
    </main>
  );
}