
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyAttendance() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const studentEmail = user.email;

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!studentEmail) {
      setError("Student email not found. Please login again.");
      setLoading(false);
      return;
    }

    fetch(
      `http://127.0.0.1:5000/attendance/by-email/${encodeURIComponent(studentEmail)}`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error("Unable to load attendance records");
        }
        return response.json();
      })
      .then(data => {
        setAttendance(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [studentEmail]);

  const presentCount = attendance.filter(
    item => item.status?.toLowerCase() === "present"
  ).length;

  const absentCount = attendance.filter(
    item => item.status?.toLowerCase() === "absent"
  ).length;

  const percentage = attendance.length
    ? ((presentCount / attendance.length) * 100).toFixed(1)
    : "0.0";

  return (
    <div style={styles.container}>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1>My Attendance</h1>
          <p>View and monitor your attendance details</p>
        </div>
        <div style={styles.profile}>🎓 Student Portal</div>
      </div>

      {/* Back Button */}
      <Link to="/student-dashboard" style={styles.back}>
        ← Back to Dashboard
      </Link>

      {loading ? (
        <div style={styles.message}>
          Loading attendance...
        </div>
      ) : error ? (
        <div style={styles.error}>
          {error}
        </div>
      ) : (
        <>
          {/* Attendance Summary */}
          <h2 style={styles.sectionTitle}>Attendance Overview</h2>

          <div style={styles.cards}>

            <div style={styles.card}>
              <div style={styles.icon}>📚</div>
              <h3>Total Classes</h3>
              <h2>{attendance.length}</h2>
            </div>

            <div style={styles.card}>
              <div style={styles.icon}>✅</div>
              <h3>Present</h3>
              <h2 style={{ color: "#15803d" }}>
                {presentCount}
              </h2>
            </div>

            <div style={styles.card}>
              <div style={styles.icon}>❌</div>
              <h3>Absent</h3>
              <h2 style={{ color: "#dc2626" }}>
                {absentCount}
              </h2>
            </div>

            <div style={styles.card}>
              <div style={styles.icon}>📊</div>
              <h3>Attendance Percentage</h3>
              <h2 style={{ color: "#2563eb" }}>
                {percentage}%
              </h2>
            </div>

          </div>

          {/* Attendance History */}
          <div style={styles.tableContainer}>
            <h2 style={styles.sectionTitle}>
              Attendance History
            </h2>

            {attendance.length === 0 ? (
              <p style={styles.message}>
                No attendance records found.
              </p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>S.No</th>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Student Name</th>
                    <th style={styles.th}>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {attendance.map((item, index) => (
                    <tr key={item._id}>
                      <td style={styles.td}>{index + 1}</td>

                      <td style={styles.td}>
                        {item.date}
                      </td>

                      <td style={styles.td}>
                        {item.studentName || user.name}
                      </td>

                      <td style={styles.td}>
                        <span style={{
                          ...styles.status,
                          background:
                            item.status?.toLowerCase() === "present"
                              ? "#dcfce7"
                              : "#fee2e2",
                          color:
                            item.status?.toLowerCase() === "present"
                              ? "#15803d"
                              : "#dc2626"
                        }}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      <footer style={styles.footer}>
        © 2026 EduPortal | Student Management System
      </footer>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "35px",
    background: "#f1f5f9",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box"
  },

  header: {
    background: "#071b3b",
    color: "white",
    padding: "25px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px"
  },

  profile: {
    background: "#18345c",
    padding: "12px 18px",
    borderRadius: "8px"
  },

  back: {
    display: "inline-block",
    color: "#071b3b",
    textDecoration: "none",
    fontWeight: "bold",
    margin: "25px 0"
  },

  sectionTitle: {
    color: "#071b3b",
    marginBottom: "20px"
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },

  card: {
    background: "white",
    padding: "22px",
    borderRadius: "12px",
    borderTop: "4px solid #071b3b",
    boxShadow: "0 3px 12px rgba(0,0,0,0.06)"
  },

  icon: {
    fontSize: "28px"
  },

  tableContainer: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    overflowX: "auto"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center"
  },

  th: {
    background: "#071b3b",
    color: "white",
    padding: "15px",
    whiteSpace: "nowrap"
  },

  td: {
    padding: "15px",
    borderBottom: "1px solid #e2e8f0"
  },

  status: {
    display: "inline-block",
    padding: "7px 14px",
    borderRadius: "20px",
    fontWeight: "bold"
  },

  message: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    color: "#475569"
  },

  error: {
    color: "#dc2626",
    background: "white",
    padding: "20px",
    borderRadius: "10px"
  },

  footer: {
    marginTop: "50px",
    textAlign: "center",
    color: "#64748b"
  }
};

export default MyAttendance;
