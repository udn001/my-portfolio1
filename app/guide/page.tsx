import React from "react";

export default function F1GuidePage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#e0e0e0", minHeight: "100vh", paddingBottom: "80px" }}>
      {/* Header Section */}
      <section style={{ textAlign: "center", padding: "60px 20px", background: "linear-gradient(135deg, #111, #1a0202)", borderRadius: "16px", marginBottom: "40px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", borderBottom: "4px solid #FF1801" }}>
        <h1 style={{ fontSize: "56px", fontWeight: "900", margin: "0 0 16px 0", color: "#fff", textShadow: "2px 2px 4px rgba(0,0,0,0.8)", letterSpacing: "-1px" }}>
          <span style={{ color: "#FF1801" }}>F1</span> Beginner's Guide
        </h1>
        <p style={{ fontSize: "22px", maxWidth: "800px", margin: "0 auto", opacity: 0.9, lineHeight: 1.6 }}>
          New to Formula 1? We've got you covered. Get up to speed with the basics of the most technologically advanced racing series in the world.
        </p>
      </section>

      {/* Grid Content */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px", maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* The Basics */}
        <div className="guide-card">
          <div className="card-icon">🏁</div>
          <h2>What is Formula 1?</h2>
          <p>
            Formula 1 represents the pinnacle of motorsport. It features the fastest regulated road-course racing cars in the world. A season consists of a series of races, known as Grand Prix, held on purpose-built circuits and public roads globally.
          </p>
          <p>
            There are <strong>10 teams</strong> and <strong>20 drivers</strong>. Each team fields two cars. Drivers compete for the Drivers' Championship, and teams compete for the Constructors' Championship based on total points.
          </p>
        </div>

        {/* The Weekend Format */}
        <div className="guide-card">
          <div className="card-icon">⏱️</div>
          <h2>The Race Weekend</h2>
          <p>A standard Grand Prix weekend spans three days:</p>
          <ul>
            <li><strong>Friday:</strong> Two Free Practice sessions (FP1 & FP2) for teams to tune their car setups.</li>
            <li><strong>Saturday:</strong> FP3 followed by <strong>Qualifying</strong>. Qualifying dictates the starting grid for Sunday's race using a three-stage knockout format (Q1, Q2, Q3).</li>
            <li><strong>Sunday:</strong> The main <strong>Grand Prix Race</strong>. Drivers race for about 300km (or 2 hours) to fight for points ranging from 25 for 1st down to 1 point for 10th.</li>
          </ul>
        </div>

        {/* Tires */}
        <div className="guide-card">
          <div className="card-icon">🛞</div>
          <h2>Understanding Tires</h2>
          <p>Tire strategy is a crucial part of F1. Pirelli provides 3 dry compounds per race:</p>
          <ul>
            <li><strong style={{color: "#FF1801"}}>Softs (Red):</strong> Fastest but degrade quickly. Great for Qualifying.</li>
            <li><strong style={{color: "#ffd700"}}>Mediums (Yellow):</strong> Balanced grip and durability.</li>
            <li><strong style={{color: "#fff"}}>Hards (White):</strong> Slowest but last the longest. Great for long race stints.</li>
          </ul>
          <p>There are also <strong>Intermediates (Green)</strong> and <strong>Wets (Blue)</strong> for rainy conditions.</p>
        </div>

        {/* DRS & Tech */}
        <div className="guide-card">
          <div className="card-icon">🚀</div>
          <h2>DRS & The Tech</h2>
          <p>
            <strong>DRS (Drag Reduction System):</strong> An adjustable flap on the rear wing. If a driver is within 1 second of the car ahead in specific "DRS zones", they can open the wing to reduce drag and increase top speed for overtaking.
          </p>
          <p>
            <strong>Power Units:</strong> F1 cars use complex 1.6-liter V6 turbocharged hybrid engines producing over 1,000 horsepower, combining internal combustion with electrical kinetic and thermal energy recovery systems.
          </p>
        </div>

        {/* Flags */}
        <div className="guide-card">
          <div className="card-icon">🚩</div>
          <h2>Racing Flags</h2>
          <p>Marshals use flags to communicate with drivers during a session:</p>
          <ul>
            <li>🟢 <strong>Green:</strong> Track is clear, racing resumes.</li>
            <li>🟡 <strong>Yellow:</strong> Danger ahead. Slow down, no overtaking.</li>
            <li>🔴 <strong>Red:</strong> Session suspended due to extreme weather or a severe crash.</li>
            <li>🔵 <strong>Blue:</strong> A faster car is lapping you; you must let them pass.</li>
            <li>🏁 <strong>Chequered:</strong> The session or race has ended!</li>
          </ul>
        </div>

      </div>

      {/* Global CSS for Guide via standard style tag */}
      <style>{`
        .guide-card {
          background: rgba(30, 30, 30, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 30px;
          backdrop-filter: blur(10px);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .guide-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
          border-color: rgba(255, 24, 1, 0.5);
        }

        .guide-card h2 {
          color: #fff;
          font-size: 26px;
          font-weight: 800;
          margin: 15px 0;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 15px;
        }

        .guide-card p, .guide-card ul {
          font-size: 16px;
          line-height: 1.7;
          color: #b0b0b0;
          margin-bottom: 15px;
        }

        .guide-card ul {
          padding-left: 20px;
        }
        
        .guide-card li {
          margin-bottom: 8px;
        }

        .card-icon {
          font-size: 40px;
          background: rgba(255, 24, 1, 0.1);
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid rgba(255, 24, 1, 0.2);
        }
      `}</style>
    </div>
  );
}
