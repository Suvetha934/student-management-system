
import { Link, useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  }

  const styles = {
    page: {
      display: "flex",
      minHeight: "100vh",
      background: "#f3f6fc",
      fontFamily: "Arial, sans-serif",
      color: "#172b4d"
    },

    sidebar: {
      width: "245px",
      background: "#211b45",
      color: "white",
      padding: "25px 18px",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0
    },

    logo: {
      fontSize: "23px",
      fontWeight: "bold",
      textAlign: "center",
      padding: "15px 5px 35px",
      borderBottom: "1px solid #49416d",
      marginBottom: "25px"
    },

    menu: {
      display: "block",
      color: "#e5e1f5",
      textDecoration: "none",
      padding: "15px",
      borderRadius: "9px",
      marginBottom: "10px",
      fontSize: "15px"
    },

    logout: {
      marginTop: "auto",
      background: "#d94b62",
      color: "white",
      border: "none",
      padding: "14px",
      borderRadius: "9px",
      cursor: "pointer",
      fontSize: "15px"
    },

    main: {
      flex: 1,
      padding: "35px",
      minWidth: 0
    },

    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "15px",
      marginBottom: "28px"
    },

    heading: {
      fontSize: "27px",
      margin: 0,
      color: "#211b45"
    },

    profile: {
      background: "white",
      padding: "12px 18px",
      borderRadius: "30px",
      boxShadow: "0 3px 12px rgba(0,0,0,0.05)",
      fontWeight: "bold"
    },

    welcome: {
      background: "linear-gradient(120deg, #45318c, #7863d8)",
      color: "white",
      padding: "40px",
      borderRadius: "18px",
      marginBottom: "30px",
      boxShadow: "0 8px 25px rgba(69,49,140,0.15)"
    },

    welcomeTitle: {
      fontSize: "30px",
      margin: "0 0 12px"
    },

    welcomeText: {
      fontSize: "16px",
      lineHeight: "1.8",
      color: "#eeeaff",
      maxWidth: "700px",
      margin: 0
    },

    infoBox: {
      background: "white",
      padding: "28px",
      borderRadius: "15px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
    },

    infoRow: {
      padding: "16px 0",
      borderBottom: "1px solid #eeeef5",
      display: "flex",
      justifyContent: "space-between",
      gap: "15px",
      flexWrap: "wrap",
      color: "#626b82"
    },

    footer: {
      textAlign: "center",
      color: "#8b90a2",
      marginTop: "30px",
      padding: "15px"
    }
  };

  return (
    <div style={styles.page}>

      <aside style={styles.sidebar}>
        <div style={styles.logo}>
          🎓 EduPortal
          <div style={{
            fontSize: "12px",
            fontWeight: "normal",
            marginTop: "7px",
            color: "#c8c0ed"
          }}>
            STUDENT PORTAL
          </div>
        </div>

        <Link to="/student-dashboard" style={styles.menu}>
          🏠 Dashboard
        </Link>

        <Link to="/my-profile" style={styles.menu}>
          👤 My Profile
        </Link>

        <Link to="/my-attendance" style={styles.menu}>
          📅 My Attendance
        </Link>

        <Link to="/my-marks" style={styles.menu}>
          📊 My Marks
        </Link>

        <Link to="/announcements" style={styles.menu}>
          📢 Announcements
        </Link>

        <button onClick={handleLogout} style={styles.logout}>
          ↪ Logout
        </button>
      </aside>

      <main style={styles.main}>

        <div style={styles.header}>
          <h1 style={styles.heading}>
            Student Dashboard
          </h1>

          <div style={styles.profile}>
            👤 {user.name || "Student"}
          </div>
        </div>

        <section style={styles.welcome}>
          <h2 style={styles.welcomeTitle}>
            Hello, {user.name || "Student"}! 👋
          </h2>

          <p style={styles.welcomeText}>
            Welcome to your Student Management Portal.
            Check your personal details, attendance,
            examination marks and important announcements
            in one place.
          </p>
        </section>

        <section style={styles.infoBox}>
          <h2 style={{
            marginTop: 0,
            color: "#211b45"
          }}>
            Student Information
          </h2>

          <div style={styles.infoRow}>
            <strong>Student Name</strong>
            <span>{user.name || "Not Available"}</span>
          </div>

          <div style={styles.infoRow}>
            <strong>Email Address</strong>
            <span>{user.email || "Not Available"}</span>
          </div>

          <div style={{
            ...styles.infoRow,
            borderBottom: "none"
          }}>
            <strong>Account Type</strong>
            <span>Student</span>
          </div>
        </section>

        <footer style={styles.footer}>
          © 2026 EduPortal | Student Management System
        </footer>

      </main>
    </div>
  );
}

export default StudentDashboard;
