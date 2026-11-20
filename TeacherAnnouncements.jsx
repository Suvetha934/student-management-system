
import { useState } from "react";
import { Link } from "react-router-dom";

function TeacherAnnouncements() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setResult("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/announcements/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ title, message })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to publish announcement");
      }

      setSuccess(true);
      setResult("Announcement published successfully!");
      setTitle("");
      setMessage("");

    } catch (error) {
      setSuccess(false);
      setResult(error.message);
    } finally {
      setLoading(false);
    }
  }

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#142d4e",
      fontFamily: "Arial, sans-serif",
      padding: "40px 20px",
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },

    container: {
      width: "100%",
      maxWidth: "650px"
    },

    heading: {
      color: "white",
      fontSize: "29px",
      textAlign: "center",
      marginBottom: "10px"
    },

    subtitle: {
      color: "#c8d6e5",
      textAlign: "center",
      fontSize: "14px",
      marginBottom: "30px",
      lineHeight: "1.6"
    },

    card: {
      background: "white",
      padding: "35px",
      borderRadius: "16px",
      boxShadow: "0 12px 35px rgba(0,0,0,0.2)",
      boxSizing: "border-box"
    },

    formHeading: {
      color: "#193653",
      fontSize: "21px",
      margin: "0 0 25px",
      paddingBottom: "15px",
      borderBottom: "1px solid #e5ebf2"
    },

    label: {
      display: "block",
      color: "#193653",
      fontWeight: "bold",
      fontSize: "14px",
      marginBottom: "9px"
    },

    input: {
      width: "100%",
      padding: "14px",
      border: "1px solid #ccd7e3",
      borderRadius: "8px",
      fontSize: "15px",
      outline: "none",
      boxSizing: "border-box",
      marginBottom: "22px",
      fontFamily: "Arial, sans-serif",
      color: "#193653"
    },

    textarea: {
      width: "100%",
      minHeight: "160px",
      padding: "14px",
      border: "1px solid #ccd7e3",
      borderRadius: "8px",
      fontSize: "15px",
      outline: "none",
      boxSizing: "border-box",
      resize: "vertical",
      marginBottom: "22px",
      fontFamily: "Arial, sans-serif",
      color: "#193653",
      lineHeight: "1.6"
    },

    button: {
      width: "100%",
      padding: "15px",
      background: "#193653",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "15px",
      fontWeight: "bold",
      cursor: loading ? "not-allowed" : "pointer",
      opacity: loading ? 0.7 : 1
    },

    result: {
      marginTop: "18px",
      padding: "13px",
      borderRadius: "8px",
      textAlign: "center",
      fontSize: "14px",
      fontWeight: "bold",
      background: success ? "#e8f5ed" : "#fff0f0",
      color: success ? "#237544" : "#c0392b"
    },

    backArea: {
      textAlign: "center",
      marginTop: "25px"
    },

    backButton: {
      display: "inline-block",
      color: "white",
      textDecoration: "none",
      border: "1px solid #8fa9c2",
      padding: "12px 22px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "bold"
    },

    footer: {
      textAlign: "center",
      color: "#c8d6e5",
      fontSize: "12px",
      marginTop: "30px"
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Page Heading */}
        <h1 style={styles.heading}>
          📢 Create Announcement
        </h1>

        <p style={styles.subtitle}>
          Share important information and updates with students
        </p>

        {/* Announcement Form */}
        <div style={styles.card}>

          <h2 style={styles.formHeading}>
            Announcement Details
          </h2>

          <form onSubmit={handleSubmit}>

            <label style={styles.label}>
              Announcement Title
            </label>

            <input
              type="text"
              placeholder="Enter announcement title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={styles.input}
            />

            <label style={styles.label}>
              Announcement Message
            </label>

            <textarea
              placeholder="Write your announcement message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              style={styles.textarea}
            />

            <button
              type="submit"
              disabled={loading}
              style={styles.button}
            >
              {loading ? "Publishing..." : "📢 Publish Announcement"}
            </button>

          </form>

          {result && (
            <div style={styles.result}>
              {result}
            </div>
          )}

        </div>

        {/* Back to Dashboard */}
        <div style={styles.backArea}>
          <Link
            to="/teacher-dashboard"
            style={styles.backButton}
          >
            ← Back to Dashboard
          </Link>
        </div>

        <footer style={styles.footer}>
          © 2026 EduPortal | Student Management System
        </footer>

      </div>
    </div>
  );
}

export default TeacherAnnouncements;
