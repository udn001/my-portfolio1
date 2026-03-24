"use client";

import React, { useState, useEffect } from "react";

export type Driver = {
  position: string;
  points: string;
  Driver: { givenName: string; familyName: string; driverId: string };
  Constructors: { name: string }[];
};

const teamColors: Record<string, string> = {
  Mercedes: "#00D2BE",
  Ferrari: "#DC0000",
  RedBull: "#1E41FF",
  McLaren: "#FF8700",
  Alpine: "#2293D1",
  Haas: "#BD0000",
  AlfaRomeo: "#900000",
  AlphaTauri: "#4E5F8A",
  AstonMartin: "#1C7031",
  Williams: "#37BEDD",
};

const driverPhotos: Record<string, string> = {
  max_verstappen: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png",
  leclerc: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png",
  norris: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png",
  sainz: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png",
  hamilton: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png",
  russell: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png",
  alonso: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png",
  piastri: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png",
  perez: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png",
  antonelli: "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2024/Mercedes/Antonelli%20announcement/GettyImages-2166948560.jpg",
  bearman: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01.png",
  colapinto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FRACOL01_Franco_Colapinto/fracol01.png",
};

const characterData: Record<string, { vibe: string; rivalry: string; form: string; facts: string[]; iconic: string[] }> = {
  max_verstappen: {
    vibe: "🤖 The Relentless Terminator",
    rivalry: "Lando Norris & Lewis Hamilton",
    form: "🔥 Unstoppable / Calculating",
    facts: ["Plays FIFA between simulator stints", "Won his first race at age 18 in Spain"],
    iconic: ["Abu Dhabi 2021 Last Lap", "Brazil 2016 Rain Masterclass"]
  },
  leclerc: {
    vibe: "🍷 Il Predestinato",
    rivalry: "Max Verstappen & Carlos Sainz",
    form: "⚡ Qualifying Specialist",
    facts: ["Plays piano brilliantly and releases his own music", "Grew up in Monaco, driving the track streets"],
    iconic: ["Monza 2019 Victory in front of Tifosi", "Bahrain 2022 Epic Battle"]
  },
  norris: {
    vibe: "🎮 The Twitch Streamer",
    rivalry: "Max Verstappen & Oscar Piastri",
    form: "🚀 Rising Challenger",
    facts: ["Founder of gaming & lifestyle brand Quadrant", "Loves playing golf in his free time"],
    iconic: ["Miami 2024 First Win", "Austria 2020 'Scenario 7'"]
  },
  hamilton: {
    vibe: "🐐 The GOAT",
    rivalry: "Max Verstappen & Fernando Alonso",
    form: "🍷 Aging like Fine Wine",
    facts: ["Knighted by the Queen of England", "Has a famous bulldog named Roscoe"],
    iconic: ["Brazil 2008 Last Corner", "Silverstone 2024 Historic Comeback"]
  },
  sainz: {
    vibe: "🌶️ The Smooth Operator",
    rivalry: "Charles Leclerc",
    form: "🧠 Tactical Mastermind",
    facts: ["Big Real Madrid fan", "Father is a legendary rally champion"],
    iconic: ["Singapore 2023 Masterclass", "Silverstone 2022 First Win"]
  },
  piastri: {
    vibe: "🧊 Ice Cold Rookie",
    rivalry: "Lando Norris",
    form: "⭐ Future Champion",
    facts: ["Won F3 and F2 in consecutive rookie years", "Incredibly calm on the team radio"],
    iconic: ["Qatar 2023 Sprint Win", "Hungary 2024 First Race Win"]
  },
  alonso: {
    vibe: "🦊 The Cunning Fox",
    rivalry: "Lewis Hamilton & Father Time",
    form: "🛡️ Defending Master",
    facts: ["Loves magic tricks", "Raced in Le Mans and the Indy 500"],
    iconic: ["Imola 2005 Defending vs Schumacher", "Brazil 2023 Photo Finish"]
  },
  antonelli: {
    vibe: "🌟 The Golden Boy",
    rivalry: "Oliver Bearman & The Weight of Expectations",
    form: "⚡ Rapid Rookie",
    facts: ["Bypassed F3 to race directly in F2", "Took over Lewis Hamilton's iconic Mercedes seat"],
    iconic: ["F2 Silverstone Feature Race Win in the Rain", "Monza F1 Free Practice Debut"]
  },
  default: {
    vibe: "🏎️ The Speedster",
    rivalry: "The Clock & The Rest of the Grid",
    form: "📈 Improving",
    facts: ["Spends hours in the simulator", "Loves racing in wet conditions"],
    iconic: ["First points finish", "Out-qualifying World Champions"]
  }
};

export default function TopDrivers({ drivers }: { drivers: Driver[] }) {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedDriver(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "50px" }}>
        {drivers.map(driver => {
          const color = teamColors[driver.Constructors[0]?.name] || "#888";
          const photoUrl = driverPhotos[driver.Driver.driverId] || `https://ui-avatars.com/api/?name=${driver.Driver.givenName}+${driver.Driver.familyName}&background=${color.replace('#', '')}&color=fff&size=200&bold=true`;
          
          return (
            <div
              key={driver.position}
              className="driver-card"
              onClick={() => setSelectedDriver(driver)}
              style={{
                flex: "1 1 30%",
                background: `linear-gradient(135deg, ${color} 0%, rgba(20,20,20,0.9) 100%)`,
                color: "white",
                borderRadius: "16px",
                padding: "25px",
                textAlign: "center",
                boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
                transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "15px" }}>
                <img
                  src={photoUrl}
                  alt={`${driver.Driver.givenName} ${driver.Driver.familyName}`}
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "4px solid rgba(255,255,255,0.2)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.4)"
                  }}
                />
              </div>
              <h3 style={{ fontSize: "24px", margin: "0 0 10px 0", fontWeight: "700" }}>
                {driver.Driver.givenName} <span style={{ textTransform: "uppercase" }}>{driver.Driver.familyName}</span>
              </h3>
              <p style={{ fontSize: "16px", margin: "5px 0", opacity: 0.9 }}>Position: <strong>{driver.position}</strong></p>
              <p style={{ fontSize: "16px", margin: "5px 0", opacity: 0.9 }}>Points: <strong>{driver.points}</strong></p>
              <p style={{ fontSize: "14px", margin: "15px 0 0 0", padding: "5px 10px", background: "rgba(0,0,0,0.3)", borderRadius: "20px", display: "inline-block" }}>
                {driver.Constructors[0]?.name || "N/A"}
              </p>
            </div>
          );
        })}
      </div>

      {/* Character Sheet Modal */}
      {selectedDriver && (() => {
        const charData = characterData[selectedDriver.Driver.driverId] || characterData.default;
        const color = teamColors[selectedDriver.Constructors[0]?.name] || "#FF1801";
        const photoUrl = driverPhotos[selectedDriver.Driver.driverId] || `https://ui-avatars.com/api/?name=${selectedDriver.Driver.givenName}+${selectedDriver.Driver.familyName}&background=${color.replace('#', '')}&color=fff&size=200&bold=true`;

        return (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(8px)",
            padding: "20px",
            animation: "fadeIn 0.3s ease",
          }} onClick={() => setSelectedDriver(null)}>
            <div style={{
              background: "rgba(20,20,20,0.95)",
              border: `2px solid ${color}`,
              boxShadow: `0 0 40px ${color}40`,
              borderRadius: "24px",
              width: "100%",
              maxWidth: "600px",
              padding: "40px",
              position: "relative",
              color: "white",
              textAlign: "left",
              animation: "slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }} onClick={(e) => e.stopPropagation()}>
              
              <button onClick={() => setSelectedDriver(null)} style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "white",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "background 0.2s"
              }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                 onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                ✕
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "30px", marginBottom: "30px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "20px" }}>
                <img src={photoUrl} style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%", border: `3px solid ${color}` }} alt={selectedDriver.Driver.givenName} />
                <div>
                  <h2 style={{ fontSize: "36px", margin: "0", fontWeight: "900", letterSpacing: "-1px" }}>
                    {selectedDriver.Driver.givenName} <span style={{ color }}>{selectedDriver.Driver.familyName}</span>
                  </h2>
                  <div style={{ fontSize: "16px", opacity: 0.8, marginTop: "5px" }}>
                    {selectedDriver.Constructors[0]?.name} • Rank: #{selectedDriver.position} ({selectedDriver.points} pts)
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "16px" }}>
                  <h4 style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 5px 0" }}>Vibe</h4>
                  <p style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>{charData.vibe}</p>
                </div>
                <div style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "16px" }}>
                  <h4 style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 5px 0" }}>Current Form</h4>
                  <p style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>{charData.form}</p>
                </div>
                <div style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "16px", gridColumn: "1 / -1" }}>
                  <h4 style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 5px 0" }}>Main Rivalry</h4>
                  <p style={{ margin: 0, fontSize: "18px", fontWeight: "bold", color: "#FF1801" }}>⚔️ {charData.rivalry}</p>
                </div>

                <div style={{ gridColumn: "1 / -1", marginTop: "10px" }}>
                  <h4 style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "10px", marginBottom: "15px", color }}>Fun Facts</h4>
                  <ul style={{ margin: 0, paddingLeft: "20px", opacity: 0.9, lineHeight: "1.6" }}>
                    {charData.facts.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>

                <div style={{ gridColumn: "1 / -1", marginTop: "10px" }}>
                  <h4 style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "10px", marginBottom: "15px", color }}>Iconic Moments</h4>
                  <ul style={{ margin: 0, paddingLeft: "20px", opacity: 0.9, lineHeight: "1.6" }}>
                    {charData.iconic.map((m, i) => <li key={i}>🌟 {m}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(50px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}
