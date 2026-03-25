export default async function NewsPage() {
  // Strictly filter for Formula 1 and use specific F1-only domains to avoid non-relevant news
  const query = encodeURIComponent('"Formula 1" OR "F1" OR "Formula One"');
  const domains = "autosport.com,motorsport.com,skysports.com,bbc.co.uk,espn.com";
  
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=${query}&domains=${domains}&language=en&sortBy=publishedAt&apiKey=9100d728b3e64b11bbb74f60c264fd9d`,
    { next: { revalidate: 3600 } }
  );
  
  const data = await res.json();
  const articles = data.articles?.filter((a: any) => a.title && a.title !== "[Removed]") || [];

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto", fontFamily: "'Inter', Arial, sans-serif", color: "white" }}>
      <h1 style={{ fontSize: "48px", fontWeight: "900", marginBottom: "40px", textAlign: "center", textTransform: "uppercase", letterSpacing: "2px", borderBottom: "4px solid #FF1801", paddingBottom: "10px", display: "inline-block", marginLeft: "50%", transform: "translateX(-50%)" }}>
        Latest F1 News
      </h1>

      {articles.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px", opacity: 0.7 }}>No news available right now.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "30px" }}>
          {articles.slice(0, 12).map((article: any, index: number) => {
            const isFeatured = index === 0;
            return (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                className="news-card"
                style={{
                  gridColumn: isFeatured ? "1 / -1" : "auto",
                  display: "flex",
                  flexDirection: isFeatured ? "row" : "column",
                  background: "rgba(20, 20, 20, 0.8)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.05)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                  minHeight: isFeatured ? "400px" : "100%",
                }}
              >
                <div style={{
                  flex: isFeatured ? "1.5" : "none",
                  height: isFeatured ? "auto" : "220px",
                  position: "relative",
                  overflow: "hidden"
                }} className="img-container">
                  <img
                    src={article.urlToImage || "https://media.formula1.com/image/upload/f_auto/q_auto/v1677244985/content/dam/fom-website/2023/Testing/Day%202/GettyImages-1469038234.jpg"}
                    alt={article.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease"
                    }}
                    className="news-img"
                  />
                  <div style={{
                    position: "absolute",
                    top: "15px",
                    left: "15px",
                    background: "#FF1801",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.4)"
                  }}>
                    {article.source.name}
                  </div>
                </div>
                
                <div style={{
                  flex: "1",
                  padding: isFeatured ? "40px" : "25px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  background: "linear-gradient(to top, rgba(10,10,10,1), rgba(30,30,30,0.95))"
                }}>
                  <p style={{
                    fontSize: "14px",
                    color: "#00D2BE",
                    marginBottom: "10px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    <span>🗓</span> {new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                  <h3 style={{
                    fontSize: isFeatured ? "32px" : "20px",
                    margin: "0 0 15px 0",
                    fontWeight: "800",
                    lineHeight: "1.3",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.8)"
                  }}>
                    {article.title}
                  </h3>
                  {article.description && (
                    <p style={{
                      fontSize: isFeatured ? "18px" : "15px",
                      opacity: 0.8,
                      lineHeight: "1.6",
                      marginBottom: "20px",
                      display: "-webkit-box",
                      WebkitLineClamp: isFeatured ? 4 : 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}>
                      {article.description}
                    </p>
                  )}
                  <div style={{
                    marginTop: "auto",
                    display: "inline-block",
                    fontWeight: "bold",
                    color: "#FF1801",
                    textTransform: "uppercase",
                    fontSize: "14px",
                    letterSpacing: "1px",
                    transition: "color 0.3s ease"
                  }} className="read-more">
                    Read Article ➔
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}

      {/* Global styles for hover effects */}
      <style>{`
        .news-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.7) !important;
          border-color: rgba(255, 24, 1, 0.5) !important;
        }
        .news-card:hover .news-img {
          transform: scale(1.05);
        }
        .news-card:hover .read-more {
          color: white !important;
        }
        @media (max-width: 768px) {
          .news-card[style*="flex-direction: row"] {
            flex-direction: column !important;
            grid-column: auto !important;
          }
          .img-container[style*="height: auto"] {
            height: 250px !important;
          }
        }
      `}</style>
    </div>
  );
}