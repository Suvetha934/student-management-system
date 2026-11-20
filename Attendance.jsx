
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const day = new Date(date + "T12:00:00").toLocaleDateString(
    "en-IN",
    { weekday: "long" }
  );

  useEffect(() => {
    async function fetchStudents() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://127.0.0.1:5000/students"
        );

        if (!response.ok) {
          throw new Error("Unable to load students");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid student data");
        }

        setStudents(data);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  function markAttendance(id, value) {
    setAttendance(previous => ({
      ...previous,
      [id]: value
    }));
  }

  async function saveAttendance() {
    if (students.length === 0) {
      alert("No students found!");
      return;
    }

    if (students.some(student => !attendance[student._id])) {
      alert("Please select Present or Absent for all students!");
      return;
    }

    try {
      setLoading(true);
      setError("");

      for (const student of students) {
        const response = await fetch(
          "http://127.0.0.1:5000/attendance/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              studentId: student._id,
              studentName: student.name,
              date: date,
              status: attendance[student._id]
            })
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Attendance save failed"
          );
        }
      }

      alert("Attendance Saved Successfully!");

    } catch (error) {
      console.log(error);
      setError(error.message);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  const presentCount = Object.values(attendance).filter(
    value => value === "Present"
  ).length;

  const absentCount = Object.values(attendance).filter(
    value => value === "Absent"
  ).length;

  return (
    <div style={styles.page}>

      {/* Header */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Attendance Management</h1>
          <p style={styles.subtitle}>
            Manage and monitor student attendance records
          </p>
        </div>

        <Link to="/teacher-dashboard" style={styles.backLink}>
          ← Dashboard
        </Link>
      </header>

      {/* Date and Day */}
      <section style={styles.dateBox}>

        <div style={styles.dateItem}>
          <label style={styles.label}>SELECT DATE</label>
          <input
            type="date"
            value={date}
            onChange={e => {
              setDate(e.target.value);
              setAttendance({});
            }}
            style={styles.dateInput}
          />
        </div>

        <div style={styles.dateItem}>
          <label style={styles.label}>DAY</label>
          <h2 style={styles.day}>{day}</h2>
        </div>

        <div style={styles.dateItem}>
          <label style={styles.label}>TOTAL STUDENTS</label>
          <h2 style={styles.day}>{students.length}</h2>
        </div>

      </section>

      {/* Attendance Table */}
      <section style={styles.tableBox}>

        <h2 style={styles.tableTitle}>
          Student Attendance Register
        </h2>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        {loading && (
          <p style={styles.loading}>Please wait...</p>
        )}

        <div style={styles.tableContainer}>
          <table style={styles.table}>

            <thead>
              <tr>
                <th style={styles.heading}>S.No</th>
                <th style={styles.heading}>Student Name</th>
                <th style={styles.heading}>Department</th>
                <th style={styles.heading}>Course</th>
                <th style={styles.heading}>Attendance Status</th>
              </tr>
            </thead>

            <tbody>
              {!loading && students.map((student, index) => (
                <tr key={student._id}>
                  <td style={styles.cell}>{index + 1}</td>

                  <td style={styles.cell}>
                    <strong>{student.name}</strong>
                  </td>

                  <td style={styles.cell}>
                    {student.department || "-"}
                  </td>

                  <td style={styles.cell}>
                    {student.course || "-"}
                  </td>

                  <td style={styles.cell}>
                    <div style={styles.actionGroup}>
                      <button
                        type="button"
                        onClick={() =>
                          markAttendance(student._id, "Present")
                        }
                        style={{
                          ...styles.present,
                          background:
                            attendance[student._id] === "Present"
                              ? "#176b45"
                              : "#e7f4ed",
                          color:
                            attendance[student._id] === "Present"
                              ? "white"
                              : "#176b45"
                        }}
                      >
                        ✓ Present
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          markAttendance(student._id, "Absent")
                        }
                        style={{
                          ...styles.absent,
                          background:
                            attendance[student._id] === "Absent"
                              ? "#a83232"
                              : "#fbeaea",
                          color:
                            attendance[student._id] === "Absent"
                              ? "white"
                              : "#a83232"
                        }}
                      >
                        ✕ Absent
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!loading && students.length === 0 && !error && (
                <tr>
                  <td colSpan="5" style={styles.cell}>
                    No Students Available
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {/* Summary */}
        <div style={styles.summary}>

          <div style={styles.summaryCard}>
            <span style={styles.summaryLabel}>Present</span>
            <strong style={{ ...styles.summaryNumber, color: "#176b45" }}>
              {presentCount}
            </strong>
          </div>

          <div style={styles.summaryCard}>
            <span style={styles.summaryLabel}>Absent</span>
            <strong style={{ ...styles.summaryNumber, color: "#a83232" }}>
              {absentCount}
            </strong>
          </div>

          <div style={styles.summaryCard}>
            <span style={styles.summaryLabel}>Not Marked</span>
            <strong style={styles.summaryNumber}>
              {Math.max(0, students.length - presentCount - absentCount)}
            </strong>
          </div>

        </div>

        {/* Save Button */}
        <button
          type="button"
          onClick={saveAttendance}
          disabled={loading || students.length === 0}
          style={{
            ...styles.saveButton,
            opacity: loading || students.length === 0 ? 0.6 : 1
          }}
        >
          {loading ? "Saving..." : "Save Attendance"}
        </button>

      </section>

      <footer style={styles.footer}>
        © 2026 EduPortal | Student Management System
      </footer>

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px",
    background: "#142d4e",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box"
  },

  header: {
    maxWidth: "1250px",
    margin: "0 auto 28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px"
  },

  title: {
    color: "white",
    fontSize: "28px",
    margin: 0
  },

  subtitle: {
    color: "#cbd8e7",
    fontSize: "14px",
    marginTop: "8px"
  },

  backLink: {
    background: "white",
    color: "#142d4e",
    padding: "11px 18px",
    borderRadius: "7px",
    textDecoration: "none",
    fontWeight: "bold"
  },

  dateBox: {
    maxWidth: "950px",
    margin: "0 auto 25px",
    padding: "24px",
    background: "white",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "25px"
  },

  dateItem: {
    textAlign: "center",
    minWidth: "180px"
  },

  label: {
    display: "block",
    color: "#718096",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "1px",
    marginBottom: "12px"
  },

  dateInput: {
    padding: "11px",
    fontSize: "15px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    color: "#142d4e"
  },

  day: {
    color: "#142d4e",
    fontSize: "22px",
    margin: 0
  },

  tableBox: {
    maxWidth: "1250px",
    margin: "auto",
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.12)"
  },

  tableTitle: {
    color: "#142d4e",
    marginTop: 0,
    marginBottom: "22px",
    fontSize: "21px"
  },

  tableContainer: {
    overflowX: "auto"
  },

  table: {
    width: "100%",
    minWidth: "800px",
    borderCollapse: "collapse"
  },

  heading: {
    background: "#142d4e",
    color: "white",
    padding: "16px 12px",
    textAlign: "center",
    fontSize: "14px"
  },

  cell: {
    padding: "15px 12px",
    textAlign: "center",
    borderBottom: "1px solid #e5eaf0",
    color: "#40546b",
    fontSize: "14px"
  },

  actionGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    flexWrap: "wrap"
  },

  present: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  absent: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  summary: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
    margin: "28px 0"
  },

  summaryCard: {
    background: "#f4f7fb",
    border: "1px solid #e5eaf0",
    borderRadius: "9px",
    padding: "15px 25px",
    minWidth: "110px",
    textAlign: "center"
  },

  summaryLabel: {
    display: "block",
    color: "#718096",
    fontSize: "13px",
    marginBottom: "8px"
  },

  summaryNumber: {
    display: "block",
    color: "#142d4e",
    fontSize: "25px"
  },

  saveButton: {
    display: "block",
    margin: "auto",
    padding: "14px 35px",
    background: "#142d4e",
    color: "white",
    border: "none",
    borderRadius: "7px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  error: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "12px",
    borderRadius: "7px",
    marginBottom: "15px",
    textAlign: "center"
  },

  loading: {
    textAlign: "center",
    color: "#142d4e",
    fontWeight: "bold"
  },

  footer: {
    textAlign: "center",
    color: "#cbd8e7",
    marginTop: "25px",
    padding: "12px",
    fontSize: "13px"
  }
};

export default Attendance;
