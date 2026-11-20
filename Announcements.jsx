
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/announcements")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load announcements");
        }
        return response.json();
      })
      .then((data) => {
        setAnnouncements(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Announcement Error:", error);
        setError("Unable to load announcements.");
        setLoading(false);
      });
  }, []);

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f2f5fa",
      fontFamily: "Arial, sans-serif",
      padding: "35px 20px",
      boxSizing: "border-box"
    },

    container: {
      maxWidth: "950px",
      margin: "auto"
    },

    topbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "15px",
      marginBottom: "28px"
    },

    heading: {
      color: "#193653",
      fontSize: "27px",
      margin: 0
    },

    subtitle: {
      color: "#718096",
      fontSize: "14px",
      marginTop: "7px"
    },

    badge: {
      background: "white",
      color: "#193653",
      border: "1px solid #e5ebf2",
      padding: "11px 18px",
      borderRadius: "25px",
      fontSize: "13px",
      fontWeight: "bold"
    },

    countCard: {
      background: "#193653",
      color: "white",
      borderRadius: "14px",
      padding: "22px 25px",
      marginBottom: "25px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },

    countTitle: {
      fontSize: "15px",
      color: "#d6e2ee",
      margin: "0 0 8px"
    },

    countNumber: {
      fontSize: "30px",
      fontWeight: "bold",
      margin: 0
    },

    countIcon: {
      fontSize: "38px"
    },

    announcementCard: {
      background: "white",
      borderRadius: "14px",
      padding: "25px",
      marginBottom: "18px",
      border: "1px solid #e5ebf2",
      boxShadow: "0 5px 18px rgba(25,54,83,0.05)",
      borderLeft: "5px solid #477eae"
    },

    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "10px",
      marginBottom: "15px"
    },

    cardTitle: {
      color: "#193653",
      fontSize: "20px",
      margin: 0
    },

    newBadge: {
      background: "#e5effa",
      color: "#193653",
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "11px",
      fontWeight: "bold"
    },

    message: {
      color: "#536b83",
      fontSize: "15px",
      lineHeight: "1.8",
      margin: "0 0 18px",
      whiteSpace: "pre-wrap",
      overflowWrap: "anywhere"
    },

    date: {
      color: "#8998a8",
      fontSize: "13px",
      borderTop: "1px solid #edf1f5",
      paddingTop: "13px"
    },

    statusMessage: {
      background: "white",
      padding: "35px 20px",
      borderRadius: "14px",
      textAlign: "center",
      color: "#718096",
      border: "1px solid #e5ebf2"
    },

    error: {
      background: "#fff0f0",
      color: "#c0392b",
      padding: "18px",
      borderRadius: "10px",
      textAlign: "center"
    },

    buttonArea: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "15px",
      marginTop: "30px"
    },

    button: {
      display: "inline-block",
      background: "#193653",
      color: "white",
      textDecoration: "none",
      padding: "13px 22px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "bold"
    },

    footer: {
      textAlign: "center",
      color: "#8998a8",
      marginTop: "25px",
      fontSize: "13px"
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Page Heading */}
        <div style={styles.topbar}>
          <div>
            <h1 style={styles.heading}>
              Announcements
            </h1>

            <p style={styles.subtitle}>
              Stay updated with the latest college information
            </p>
          </div>

          <div style={styles.badge}>
            STUDENT UPDATES
          </div>
        </div>

        {/* Announcement Count */}
        <div style={styles.countCard}>
          <div>
            <p style={styles.countTitle}>
              Total Announcements
            </p>

            <h2 style={styles.countNumber}>
              {announcements.length}
            </h2>
          </div>

          <div style={styles.countIcon}>
            📢
          </div>
        </div>

        {/* Announcement List */}
        {loading && (
          <div style={styles.statusMessage}>
            Loading announcements...
          </div>
        )}

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        {!loading && !error && announcements.length === 0 && (
          <div style={styles.statusMessage}>
            <div style={{ fontSize: "38px", marginBottom: "12px" }}>
              📭
            </div>

            <h3 style={{ color: "#193653", margin: "0 0 8px" }}>
              No Announcements Yet
            </h3>

            <p style={{ margin: 0 }}>
              New college updates will appear here.
            </p>
          </div>
        )}

        {!loading && !error && announcements.map((item) => (
          <div key={item._id} style={styles.announcementCard}>

            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>
                {item.title}
              </h2>

              <span style={styles.newBadge}>
                ANNOUNCEMENT
              </span>
            </div>

            <p style={styles.message}>
              {item.message}
            </p>

            {item.date && (
              <div style={styles.date}>
                🕒 Published on:{" "}
                {new Date(item.date).toLocaleString()}
              </div>
            )}

          </div>
        ))}

        {/* Back Button */}
        <div style={styles.buttonArea}>
          <span style={{
            color: "#8998a8",
            fontSize: "13px"
          }}>
            EduPortal | Student Management System
          </span>

          <Link
            to="/student-dashboard"
            style={styles.button}
          >
            ← Back to Dashboard
          </Link>
        </div>

        <footer style={styles.footer}>
          © 2026 EduPortal. All Rights Reserved.
        </footer>

      </div>
    </div>
  );
}

export default Announcements;
