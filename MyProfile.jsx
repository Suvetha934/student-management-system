
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyProfile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [student, setStudent] = useState(user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/students")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unable to load profile details");
        }
        return res.json();
      })
      .then((data) => {
        const studentData = Array.isArray(data)
          ? data.find(
              (item) =>
                item.email?.toLowerCase() ===
                user.email?.toLowerCase()
            )
          : null;

        if (studentData) {
          setStudent(studentData);
        } else {
          setError("Student details were not found.");
        }
      })
      .catch(() => {
        setError("Unable to connect to the server.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const initial = (student.name || "S").charAt(0).toUpperCase();

  const details = [
    {
      icon: "👤",
      label: "Full Name",
      value: student.name
    },
    {
      icon: "✉️",
      label: "Email Address",
      value: student.email
    },
    {
      icon: "🎂",
      label: "Age",
      value: student.age
    },
    {
      icon: "🎓",
      label: "Course",
      value: student.course
    },
    {
      icon: "🏛️",
      label: "Department",
      value: student.department
    },
    {
      icon: "📞",
      label: "Phone Number",
      value: student.phone
    }
  ];

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
      marginBottom: "25px"
    },

    pageTitle: {
      color: "#193653",
      fontSize: "27px",
      margin: 0
    },

    subtitle: {
      color: "#718096",
      fontSize: "14px",
      marginTop: "7px"
    },

    card: {
      background: "#ffffff",
      borderRadius: "18px",
      overflow: "hidden",
      boxShadow: "0 8px 30px rgba(25,54,83,0.08)",
      border: "1px solid #e5ebf2"
    },

    banner: {
      background: "#193653",
      padding: "35px",
      display: "flex",
      alignItems: "center",
      gap: "22px",
      flexWrap: "wrap",
      color: "white"
    },

    avatar: {
      width: "95px",
      height: "95px",
      borderRadius: "50%",
      background: "#ffffff",
      color: "#193653",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "38px",
      fontWeight: "bold",
      border: "4px solid #c9d9e9",
      flexShrink: 0
    },

    studentName: {
      fontSize: "27px",
      margin: "0 0 9px",
      fontWeight: "bold"
    },

    studentEmail: {
      fontSize: "14px",
      color: "#d6e2ee",
      margin: 0,
      wordBreak: "break-word"
    },

    badge: {
      display: "inline-block",
      marginTop: "13px",
      background: "#e5effa",
      color: "#193653",
      padding: "6px 14px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "bold"
    },

    content: {
      padding: "32px"
    },

    sectionTitle: {
      fontSize: "20px",
      color: "#193653",
      margin: "0 0 22px"
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
      gap: "17px"
    },

    detailCard: {
      background: "#f7f9fc",
      border: "1px solid #e5ebf2",
      borderRadius: "12px",
      padding: "19px"
    },

    detailTop: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "13px"
    },

    icon: {
      fontSize: "20px"
    },

    label: {
      color: "#718096",
      fontSize: "13px",
      fontWeight: "bold"
    },

    value: {
      color: "#193653",
      fontSize: "16px",
      fontWeight: "bold",
      margin: 0,
      wordBreak: "break-word"
    },

    buttonArea: {
      marginTop: "30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "15px"
    },

    button: {
      display: "inline-block",
      background: "#193653",
      color: "white",
      textDecoration: "none",
      padding: "13px 22px",
      borderRadius: "8px",
      fontWeight: "bold",
      fontSize: "14px"
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
            <h1 style={styles.pageTitle}>My Profile</h1>
            <p style={styles.subtitle}>
              View your personal and academic information
            </p>
          </div>

          <div style={{
            color: "#193653",
            background: "white",
            border: "1px solid #e5ebf2",
            padding: "11px 18px",
            borderRadius: "25px",
            fontSize: "13px",
            fontWeight: "bold"
          }}>
            STUDENT ACCOUNT
          </div>
        </div>

        {/* Profile Card */}
        <div style={styles.card}>

          {/* Profile Header */}
          <div style={styles.banner}>
            <div style={styles.avatar}>
              {initial}
            </div>

            <div>
              <h2 style={styles.studentName}>
                {student.name || "Student"}
              </h2>

              <p style={styles.studentEmail}>
                {student.email || "Email not available"}
              </p>

              <span style={styles.badge}>
                Student Profile
              </span>
            </div>
          </div>

          {/* Student Information */}
          <div style={styles.content}>
            <h2 style={styles.sectionTitle}>
              Personal Information
            </h2>

            {loading ? (
              <p style={{ color: "#718096" }}>
                Loading profile details...
              </p>
            ) : (
              <>
                {error && (
                  <p style={{
                    color: "#c0392b",
                    background: "#fff0f0",
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "18px"
                  }}>
                    {error}
                  </p>
                )}

                <div style={styles.grid}>
                  {details.map((item, index) => (
                    <div key={index} style={styles.detailCard}>
                      <div style={styles.detailTop}>
                        <span style={styles.icon}>
                          {item.icon}
                        </span>

                        <span style={styles.label}>
                          {item.label}
                        </span>
                      </div>

                      <p style={styles.value}>
                        {item.value || "Not available"}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Dashboard Button */}
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
          </div>
        </div>

        <footer style={styles.footer}>
          © 2026 EduPortal. All Rights Reserved.
        </footer>

      </div>
    </div>
  );
}

export default MyProfile;
