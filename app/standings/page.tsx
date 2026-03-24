// app/standings/page.tsx
import React from "react";

async function getDriverStandings() {
  const res = await fetch(
    "https://api.jolpi.ca/ergast/f1/2026/driverStandings.json",
    { cache: "no-store" }
  );

  const data = await res.json();

  return (
    data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings || []
  );
}

async function getConstructorStandings() {
  const res = await fetch(
    "https://api.jolpi.ca/ergast/f1/2026/constructorStandings.json",
    { cache: "no-store" }
  );

  const data = await res.json();

  return (
    data?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings || []
  );
}

const teamColorsById: Record<string, string> = {
  mercedes: "#00D2BE",
  ferrari: "#DC0000",
  red_bull: "#1E41FF",
  mclaren: "#FF8700",
  alpine: "#FF87CC",
  haas: "#BD0000",
  aston_martin: "#006F62",
  williams: "#005AFF",
  rb: "#6692FF",
  audi: "#E00000",
  cadillac: "#FFD700"
};

const teamLogos: Record<string, string> = {
  mercedes: "https://media.formula1.com/content/dam/fom-website/teams/2024/mercedes-logo.png",
  ferrari: "https://media.formula1.com/content/dam/fom-website/teams/2024/ferrari-logo.png",
  red_bull: "https://media.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing-logo.png",
  mclaren: "https://media.formula1.com/content/dam/fom-website/teams/2024/mclaren-logo.png",
  alpine: "https://media.formula1.com/content/dam/fom-website/teams/2024/alpine-logo.png",
  haas: "https://media.formula1.com/content/dam/fom-website/teams/2024/haas-f1-team-logo.png",
  aston_martin: "https://media.formula1.com/content/dam/fom-website/teams/2024/aston-martin-logo.png",
  williams: "https://media.formula1.com/content/dam/fom-website/teams/2024/williams-logo.png",
  rb: "https://media.formula1.com/content/dam/fom-website/teams/2024/rb-logo.png",
  audi: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/1024px-Audi-Logo_2016.svg.png",
  cadillac: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Cadillac_Logo.svg/1024px-Cadillac_Logo.svg.png"
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
  gasly: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png",
  stroll: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png",
  ocon: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png",
  hulkenberg: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png",
  albon: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png",
  bottas: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/V/VALBOT01_Valtteri_Bottas/valbot01.png",
  bortoleto: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GABBOR01_Gabriel_Bortoleto/gabbor01.png",
  lawson: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LIALAW01_Liam_Lawson/lialaw01.png",
  hadjar: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/I/ISAHAD01_Isack_Hadjar/isahad01.png",
  arvid_lindblad: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ARVLIN01_Arvid_Lindblad/arvlin01.png",
};


export default async function Page() {
  const drivers = await getDriverStandings();
  const constructors = await getConstructorStandings();

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", color: "white", padding: "40px 20px", fontFamily: "'Inter', Arial, sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Title */}
        <h1 style={{ fontSize: "52px", fontWeight: "900", textAlign: "center", marginBottom: "60px", textTransform: "uppercase", letterSpacing: "2px", textShadow: "0 0 20px rgba(255,24,1,0.5)" }}>
          <span style={{ color: "#FF1801" }}>F1</span> Season Standings
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", gap: "60px" }}>
          
          {/* Driver Standings */}
          <section>
            <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#00D2BE", marginBottom: "30px", borderBottom: "2px solid rgba(0,210,190,0.3)", paddingBottom: "10px" }}>
              🏆 Driver Standings
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {drivers.map((driver: any) => {
                const teamId = driver.Constructors?.[0]?.constructorId || "unknown";
                const color = teamColorsById[teamId] || "#555";
                const logoInfo = teamLogos[teamId];
                const photo = driverPhotos[driver.Driver.driverId] || `https://ui-avatars.com/api/?name=${driver.Driver.givenName}+${driver.Driver.familyName}&background=${color.replace('#', '')}&color=fff&size=200&bold=true`;

                return (
                  <div key={driver.position} style={{
                    display: "flex", alignItems: "center", background: "rgba(20,20,20,0.8)", borderLeft: `6px solid ${color}`, borderRadius: "12px", padding: "15px 25px", boxShadow: "0 4px 15px rgba(0,0,0,0.3)", transition: "transform 0.2s, background 0.2s", cursor: "pointer", position: "relative", overflow: "hidden"
                  }} className="standing-row">
                    
                    <div style={{ fontSize: "28px", fontWeight: "900", width: "40px", color: "rgba(255,255,255,0.8)" }}>
                      {driver.position}
                    </div>

                    <img src={photo} alt={driver.Driver.givenName} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "50%", border: `2px solid ${color}`, marginLeft: "15px", marginRight: "20px" }} />

                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: "0 0 5px 0" }}>
                        {driver.Driver.givenName} <span style={{ textTransform: "uppercase" }}>{driver.Driver.familyName}</span>
                      </h3>
                      <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center" }}>
                        {logoInfo && (
                          <div style={{ background: "rgba(255,255,255,0.9)", padding: "2px 6px", borderRadius: "4px", marginRight: "8px", display: "flex", alignItems: "center" }}>
                            <img src={logoInfo} alt={teamId} style={{ height: "14px", objectFit: "contain" }} />
                          </div>
                        )}
                        {driver.Constructors?.[0]?.name}
                      </div>
                    </div>

                    <div style={{ fontSize: "24px", fontWeight: "900", color: "#fff", background: "rgba(255,255,255,0.1)", padding: "10px 20px", borderRadius: "8px" }}>
                      {driver.points} pts
                    </div>

                  </div>
                );
              })}
            </div>
          </section>

          {/* Constructor Standings */}
          <section>
            <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#1E41FF", marginBottom: "30px", borderBottom: "2px solid rgba(30,65,255,0.3)", paddingBottom: "10px" }}>
              🏎️ Constructor Standings
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {constructors.map((team: any) => {
                const teamId = team.Constructor.constructorId;
                const color = teamColorsById[teamId] || "#555";
                const logoInfo = teamLogos[teamId];

                return (
                  <div key={team.position} style={{
                    display: "flex", alignItems: "center", background: "rgba(20,20,20,0.8)", borderLeft: `6px solid ${color}`, borderRadius: "12px", padding: "20px 25px", boxShadow: "0 4px 15px rgba(0,0,0,0.3)", transition: "transform 0.2s, background 0.2s", cursor: "pointer", position: "relative", overflow: "hidden"
                  }} className="standing-row">
                    
                    <div style={{ fontSize: "28px", fontWeight: "900", width: "40px", color: "rgba(255,255,255,0.8)" }}>
                      {team.position}
                    </div>

                    <div style={{ flex: 1, display: "flex", alignItems: "center", marginLeft: "15px" }}>
                      {logoInfo && (
                        <div style={{ width: "80px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "20px", background: "rgba(255,255,255,0.9)", padding: "5px 10px", borderRadius: "8px" }}>
                          <img src={logoInfo} alt={teamId} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                        </div>
                      )}
                      
                      <div>
                        <h3 style={{ fontSize: "22px", fontWeight: "bold", margin: "0 0 5px 0" }}>
                          {team.Constructor.name}
                        </h3>
                        <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
                          {team.wins} Wins
                        </div>
                      </div>
                    </div>

                    <div style={{ fontSize: "24px", fontWeight: "900", color: "#fff", background: "rgba(255,255,255,0.1)", padding: "10px 20px", borderRadius: "8px" }}>
                      {team.points} pts
                    </div>

                  </div>
                );
              })}
            </div>
          </section>
        </div>

      </div>

      <style>{`
        .standing-row:hover {
          transform: translateX(10px) scale(1.02);
          background: rgba(40,40,40,0.95) !important;
          z-index: 10;
        }
        @media (max-width: 768px) {
          .standing-row {
            padding: 15px !important;
          }
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
 

