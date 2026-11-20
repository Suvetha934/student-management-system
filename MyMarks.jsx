
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyMarks() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [student, setStudent] = useState(user);
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMyMarks() {
      try {
        const [studentResponse, marksResponse] = await Promise.all([
          fetch("http://127.0.0.1:5000/students"),
          fetch("http://127.0.0.1:5000/marks")
        ]);

        if (!studentResponse.ok || !marksResponse.ok) {
          throw new Error("Unable to load marks");
        }

        const studentsData = await studentResponse.json();
        const marksData = await marksResponse.json();

        const studentList = Array.isArray(studentsData)
          ? studentsData
          : [];

        const marksList = Array.isArray(marksData)
          ? marksData
          : [];

        const currentStudent = studentList.find(
          (item) =>
            item.email?.toLowerCase() === user.email?.toLowerCase()
        );

        if (!currentStudent) {
          setError("Student details not found.");
          return;
        }

        setStudent(currentStudent);

        const studentMarks = marksList.filter((item) => {
          const markStudentId =
            item.studentId?._id || item.studentId;

          return String(markStudentId) === String(currentStudent._id);
        });

        setMarks(studentMarks);

      } catch (err) {
        console.error(err);
        setError("Unable to load marks. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchMyMarks();
  }, []);

  const initial = (student.name || "S").charAt(0).toUpperCase();

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f2f5fa",
      fontFamily: "Arial, sans-serif",
      padding: "35px 20px",
      boxSizing: "border-box"
    },

    container: {
      maxWidth: "1050px",
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

    profileCard: {
      background: "white",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 8px 25px rgba(25,54,83,0.07)",
      border: "1px solid #e5ebf2",
      marginBottom: "25px"
    },

    profileHeader: {
      background: "#193653",
      color: "white",
      padding: "28px 32px",
      display: "flex",
      alignItems: "center",
      gap: "20px",
      flexWrap: "wrap"
    },

    avatar: {
      width: "75px",
      height: "75px",
      borderRadius: "50%",
      background: "white",
      color: "#193653",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "30px",
      fontWeight: "bold",
      border: "3px solid #c9d9e9",
      flexShrink: 0
    },

    studentName: {
      fontSize: "23px",
      margin: "0 0 8px"
    },

    email: {
      color: "#d6e2ee",
      fontSize: "14px",
      margin: 0,
      wordBreak: "break-word"
    },

    profileBody: {
      padding: "20px 30px",
      display: "flex",
      gap: "30px",
      flexWrap: "wrap"
    },

    info: {
      color: "#718096",
      fontSize: "13px",
      marginBottom: "6px"
    },

    infoValue: {
      color: "#193653",
      fontSize: "16px",
      fontWeight: "bold",
      margin: 0
    },

    tableCard: {
      background: "white",
      borderRadius: "16px",
      padding: "25px",
      border: "1px solid #e5ebf2",
      boxShadow: "0 8px 25px rgba(25,54,83,0.06)"
    },

    sectionTitle: {
      color: "#193653",
      fontSize: "20px",
      margin: "0 0 20px"
    },

    tableWrapper: {
      width: "100%",
      overflowX: "auto"
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "650px"
    },

    th: {
      background: "#193653",
      color: "white",
      padding: "15px 12px",
      textAlign: "left",
      fontSize: "14px",
      fontWeight: "bold"
    },

    td: {
      padding: "16px 12px",
      borderBottom: "1px solid #e9eef4",
      color: "#40566d",
      fontSize: "14px"
    },

    marksValue: {
      color: "#193653",
      fontWeight: "bold"
    },

    status: {
      display: "inline-block",
      background: "#e5effa",
      color: "#193653",
      padding: "6px 12px",
      borderRadius: "20px",
      fontWeight: "bold",
      fontSize: "13px"
    },

    message: {
      textAlign: "center",
      padding: "30px 15px",
      color: "#718096",
      fontSize: "15px"
    },

    error: {
      background: "#fff0f0",
      color: "#c0392b",
      padding: "15px",
      borderRadius: "8px",
      textAlign: "center"
    },

    buttonArea: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "15px",
      marginTop: "25px"
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
              Examination Results
            </h1>

            <p style={styles.subtitle}>
              View your examination marks and academic performance
            </p>
          </div>

          <div style={styles.badge}>
            ACADEMIC RECORD
          </div>
        </div>

        {/* Student Information */}
        <section style={styles.profileCard}>

          <div style={styles.profileHeader}>
            <div style={styles.avatar}>
              {initial}
            </div>

            <div>
              <h2 style={styles.studentName}>
                {student.name || "Student"}
              </h2>

              <p style={styles.email}>
                {student.email || "Email not available"}
              </p>
            </div>
          </div>

          <div style={styles.profileBody}>
            <div>
              <p style={styles.info}>Course</p>
              <p style={styles.infoValue}>
                {student.course || "Not available"}
              </p>
            </div>

            <div>
              <p style={styles.info}>Department</p>
              <p style={styles.infoValue}>
                {student.department || "Not available"}
              </p>
            </div>

            <div>
              <p style={styles.info}>Total Exam Records</p>
              <p style={styles.infoValue}>
                {marks.length}
              </p>
            </div>
          </div>

        </section>

        {/* Marks Table */}
        <section style={styles.tableCard}>

          <h2 style={styles.sectionTitle}>
            My Examination Marks
          </h2>

          {loading ? (
            <div style={styles.message}>
              Loading your examination marks...
            </div>
          ) : error ? (
            <div style={styles.error}>
              {error}
            </div>
          ) : marks.length === 0 ? (
            <div style={styles.message}>
              No examination marks available yet.
            </div>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>

                <thead>
                  <tr>
                    <th style={styles.th}>S.No</th>
                    <th style={styles.th}>Subject</th>
                    <th style={styles.th}>Exam</th>
                    <th style={styles.th}>Marks Obtained</th>
                    <th style={styles.th}>Total Marks</th>
                    <th style={styles.th}>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {marks.map((item, index) => (
                    <tr key={item._id || index}>
                      <td style={styles.td}>
                        {index + 1}
                      </td>

                      <td style={{
                        ...styles.td,
                        fontWeight: "bold",
                        color: "#193653"
                      }}>
                        {item.subject}
                      </td>

                      <td style={styles.td}>
                        <span style={styles.status}>
                          {item.exam}
                        </span>
                      </td>

                      <td style={{
                        ...styles.td,
                        ...styles.marksValue
                      }}>
                        {item.marksObtained}
                      </td>

                      <td style={styles.td}>
                        {item.totalMarks}
                      </td>

                      <td style={styles.td}>
                        {item.date}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

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

        </section>

        <footer style={styles.footer}>
          © 2026 EduPortal. All Rights Reserved.
        </footer>

      </div>
    </div>
  );
}

export default MyMarks;
