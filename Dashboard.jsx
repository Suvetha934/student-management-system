
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/students")
      .then((res) => {
        if (!res.ok) throw new Error("Unable to fetch students");
        return res.json();
      })
      .then((data) => {
        setTotalStudents(Array.isArray(data) ? data.length : 0);
      })
      .catch((err) => console.log(err));
  }, []);

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
      background: "#f5f8fc",
      fontFamily: "Arial, sans-serif",
      color: "#24364b"
    },

    sidebar: {
      width: "245px",
      background: "#193653",
      color: "white",
      padding: "25px 17px",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      boxSizing: "border-box"
    },

    logo: {
      fontSize: "23px",
      fontWeight: "bold",
      textAlign: "center",
      padding: "15px 5px 30px",
      borderBottom: "1px solid #496078",
      marginBottom: "25px"
    },

    menu: {
      display: "block",
      color: "#e8f0f8",
      textDecoration: "none",
      padding: "14px 13px",
      borderRadius: "8px",
      marginBottom: "9px",
      fontSize: "15px",
      transition: "0.2s"
    },

    logout: {
      marginTop: "auto",
      background: "#d9534f",
      color: "white",
      border: "none",
      padding: "13px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "15px"
    },

    main: {
      flex: 1,
      padding: "32px 4%",
      minWidth: 0
    },

    topbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
      flexWrap: "wrap",
      gap: "12px"
    },

    heading: {
      fontSize: "27px",
      margin: 0,
      color: "#193653"
    },

    profile: {
      background: "white",
      padding: "12px 19px",
      borderRadius: "30px",
      border: "1px solid #e3eaf2",
      color: "#193653",
      fontWeight: "bold"
    },

    welcome: {
      background: "#e5effa",
      padding: "35px",
      borderRadius: "14px",
      marginBottom: "30px",
      borderLeft: "5px solid #477eae"
    },

    welcomeTitle: {
      fontSize: "28px",
      margin: "0 0 12px",
      color: "#193653"
    },

    welcomeText: {
      fontSize: "15px",
      lineHeight: "1.8",
      color: "#536b83",
      margin: 0,
      maxWidth: "750px"
    },

    sectionTitle: {
      fontSize: "21px",
      marginBottom: "18px",
      color: "#193653"
    },

    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 280px))",
      gap: "20px",
      marginBottom: "30px"
    },

    statCard: {
      background: "white",
      borderRadius: "13px",
      padding: "25px",
      border: "1px solid #e7edf4",
      boxShadow: "0 3px 12px rgba(25,54,83,0.04)"
    },

    statIcon: {
      fontSize: "32px",
      marginBottom: "12px"
    },

    statNumber: {
      fontSize: "40px",
      fontWeight: "bold",
      color: "#477eae",
      margin: "12px 0"
    },

    guide: {
      background: "white",
      borderRadius: "13px",
      padding: "25px",
      border: "1px solid #e7edf4",
      boxShadow: "0 3px 12px rgba(25,54,83,0.04)"
    },

    guideItem: {
      padding: "16px 0",
      borderBottom: "1px solid #edf1f5",
      color: "#61758a",
      lineHeight: "1.7"
    },

    guideNumber: {
      color: "#477eae",
      fontWeight: "bold",
      marginRight: "10px"
    },

    footer: {
      textAlign: "center",
      color: "#8998a8",
      marginTop: "30px",
      padding: "15px",
      fontSize: "13px"
    }
  };

  return (
    <div style={styles.page}>

      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>
          🎓 EduPortal

          <div style={{
            fontSize: "11px",
            fontWeight: "normal",
            marginTop: "8px",
            color: "#c2d2e2",
            letterSpacing: "1px"
          }}>
            STUDENT MANAGEMENT
          </div>
        </div>

        <Link to="/dashboard" style={styles.menu}>
          🏠 Dashboard
        </Link>

        <Link to="/add-student" style={styles.menu}>
          👨‍🎓 Add Student
        </Link>

        <Link to="/students" style={styles.menu}>
          📋 View Students
        </Link>

        <Link to="/attendance" style={styles.menu}>
          🗓️ Attendance
        </Link>

        <Link to="/student-marks" style={styles.menu}>
          📝 Student Marks
        </Link>

        <Link to="/teacher-announcements" style={styles.menu}>
          📢 Announcements
        </Link>

        <button onClick={handleLogout} style={styles.logout}>
          ↪ Logout
        </button>
      </aside>

      {/* Main Dashboard */}
      <main style={styles.main}>

        <div style={styles.topbar}>
          <h1 style={styles.heading}>Dashboard</h1>

          <div style={styles.profile}>
            👤 Admin
          </div>
        </div>

        {/* Welcome */}
        <section style={styles.welcome}>
          <h2 style={styles.welcomeTitle}>
            Welcome! 👋
          </h2>

          <p style={styles.welcomeText}>
            Manage student information, monitor academic performance,
            maintain attendance records and share important updates
            from one place.
          </p>
        </section>

        {/* Overview */}
        <h2 style={styles.sectionTitle}>
          Dashboard Overview
        </h2>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>👨‍🎓</div>

            <h3 style={{
              margin: 0,
              color: "#536b83",
              fontSize: "16px"
            }}>
              Total Students
            </h3>

            <div style={styles.statNumber}>
              {totalStudents}
            </div>

            <p style={{
              color: "#8998a8",
              margin: 0,
              fontSize: "14px"
            }}>
              Registered students
            </p>
          </div>
        </div>

        {/* Dashboard Guide */}
        <section style={styles.guide}>
          <h2 style={{
            marginTop: 0,
            marginBottom: "12px",
            color: "#193653",
            fontSize: "21px"
          }}>
            Dashboard Guide
          </h2>

          <div style={styles.guideItem}>
            <span style={styles.guideNumber}>01.</span>
            <strong>Student Management</strong>
            <br />
            Add, view and update student information.
          </div>

          <div style={styles.guideItem}>
            <span style={styles.guideNumber}>02.</span>
            <strong>Attendance Management</strong>
            <br />
            Record and monitor student attendance.
          </div>

          <div style={styles.guideItem}>
            <span style={styles.guideNumber}>03.</span>
            <strong>Academic Management</strong>
            <br />
            Maintain examination marks and academic records.
          </div>

          <div style={{
            ...styles.guideItem,
            borderBottom: "none"
          }}>
            <span style={styles.guideNumber}>04.</span>
            <strong>Communication Management</strong>
            <br />
            Publish important announcements for students.
          </div>
        </section>

        <footer style={styles.footer}>
          © 2026 EduPortal | Student Management System
        </footer>

      </main>
    </div>
  );
}

export default Dashboard;
