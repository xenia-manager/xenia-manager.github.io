"use client";

export default function GlobalError({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            background: "#0a0a0a",
            color: "#ededed",
            fontFamily: "system-ui, Arial, sans-serif",
          }}
        >
          <div
            style={{
              maxWidth: "448px",
              width: "100%",
              padding: "32px",
              textAlign: "center" as const,
              borderRadius: "16px",
              background: "rgba(31, 31, 31, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 700,
                marginBottom: "8px",
                background: "linear-gradient(135deg, #77b900, #107c10)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Something went wrong
            </h2>
            <p
              style={{
                color: "rgba(237, 237, 237, 0.6)",
                fontSize: "14px",
                marginBottom: "24px",
              }}
            >
              An unexpected error occurred. Please try again.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
              <button
                onClick={reset}
                style={{
                  background: "#107c10",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  padding: "14px 24px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                  width: "100%",
                  maxWidth: "200px",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#0e700e")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "#107c10")
                }
              >
                Try again
              </button>
              <a
                href="/"
                style={{
                  background: "rgba(119, 185, 0, 0.15)",
                  color: "#77b900",
                  border: "1px solid #77b900",
                  borderRadius: "12px",
                  padding: "14px 24px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "none",
                  transition: "background 0.3s ease",
                  width: "100%",
                  maxWidth: "200px",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "rgba(119, 185, 0, 0.25)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "rgba(119, 185, 0, 0.15)")
                }
              >
                Go to Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
