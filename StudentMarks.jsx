
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function StudentMarks() {
  const [students, setStudents] = useState([]);
  const [marksList, setMarksList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    subject: "",
    exam: "",
    marksObtained: "",
    totalMarks: "",
    date: new Date().toISOString().split("T")[0]
  });

  useEffect(() => {
    fetchStudents();
    fetchMarks();
  }, []);

  async function fetchStudents() {
    try {
      const response = await fetch("http://127.0.0.1:5000/students");
      const data = await response.json();
      setStudents(Array.isArray(data) ? data : data.students || []);
    } catch (error) {
      console.log("Student Error:", error);
    }
  }

  async function fetchMarks() {
    try {
      const response = await fetch("http://127.0.0.1:5000/marks");
      const data = await response.json();
      setMarksList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Marks Error:", error);
    }
  }

  function handleStudentChange(event) {
    const studentId = event.target.value;

    const selectedStudent = students.find(
      student => student._id === studentId
    );

    setFormData({
      ...formData,
      studentId,
      studentName: selectedStudent ? selectedStudent.name : ""
    });
  }

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (Number(formData.marksObtained) > Number(formData.totalMarks)) {
      alert("Obtained marks cannot exceed total marks");
      return;
    }

    const url = editingId
      ? `http://127.0.0.1:5000/marks/update/${editingId}`
      : "http://127.0.0.1:5000/marks/add";

    try {
      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to save marks");
        return;
      }

      alert(data.message || "Marks saved successfully!");
      resetForm();
      fetchMarks();

    } catch (error) {
      alert("Connection Error: " + error.message);
    }
  }

  function editMarks(item) {
    setEditingId(item._id);

    setFormData({
      studentId: item.studentId?._id || item.studentId,
      studentName: item.studentName,
      subject: item.subject,
      exam: item.exam,
      marksObtained: item.marksObtained,
      totalMarks: item.totalMarks,
      date: item.date
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteMarks(id) {
    if (!window.confirm("Are you sure you want to delete these marks?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/marks/delete/${id}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Delete failed");
        return;
      }

      alert(data.message || "Marks deleted successfully!");
      fetchMarks();

    } catch (error) {
      alert("Connection Error: " + error.message);
    }
  }

  function resetForm() {
    setEditingId(null);

    setFormData({
      studentId: "",
      studentName: "",
      subject: "",
      exam: "",
      marksObtained: "",
      totalMarks: "",
      date: new Date().toISOString().split("T")[0]
    });
  }

  return (
    <div style={styles.page}>

      {/* Header */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Student Marks Management</h1>
          <p style={styles.subtitle}>
            Manage student examination marks
          </p>
        </div>

        <Link to="/teacher-dashboard" style={styles.backLink}>
          ← Back to Dashboard
        </Link>
      </header>

      {/* Marks Form */}
      <section style={styles.formCard}>
        <h2 style={styles.formTitle}>
          {editingId ? "Update Student Marks" : "Add Student Marks"}
        </h2>

        <form onSubmit={handleSubmit}>

          <label style={styles.label}>Select Student</label>
          <select
            value={formData.studentId}
            onChange={handleStudentChange}
            required
            style={styles.input}
          >
            <option value="">Select Student</option>

            {students.map(student => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>

          <label style={styles.label}>Subject Name</label>
          <input
            name="subject"
            placeholder="Enter subject name"
            value={formData.subject}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Exam Name</label>
          <input
            name="exam"
            placeholder="Enter exam name"
            value={formData.exam}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <div style={styles.marksRow}>
            <div style={styles.marksField}>
              <label style={styles.label}>Marks Obtained</label>
              <input
                type="number"
                name="marksObtained"
                placeholder="Obtained marks"
                value={formData.marksObtained}
                onChange={handleChange}
                min="0"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.marksField}>
              <label style={styles.label}>Total Marks</label>
              <input
                type="number"
                name="totalMarks"
                placeholder="Total marks"
                value={formData.totalMarks}
                onChange={handleChange}
                min="1"
                required
                style={styles.input}
              />
            </div>
          </div>

          <label style={styles.label}>Exam Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.saveButton}>
            {editingId ? "Update Marks" : "Save Marks"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              style={styles.cancelButton}
            >
              Cancel
            </button>
          )}

        </form>
      </section>

      {/* Marks Table */}
      <section style={styles.tableCard}>
        <h2 style={styles.tableTitle}>All Student Marks</h2>

        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.heading}>S.No</th>
                <th style={styles.heading}>Student</th>
                <th style={styles.heading}>Subject</th>
                <th style={styles.heading}>Exam</th>
                <th style={styles.heading}>Marks</th>
                <th style={styles.heading}>Date</th>
                <th style={styles.heading}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {marksList.map((item, index) => (
                <tr key={item._id}>
                  <td style={styles.cell}>{index + 1}</td>
                  <td style={styles.cell}>{item.studentName}</td>
                  <td style={styles.cell}>{item.subject}</td>
                  <td style={styles.cell}>{item.exam}</td>
                  <td style={styles.cell}>
                    <strong>
                      {item.marksObtained}/{item.totalMarks}
                    </strong>
                  </td>
                  <td style={styles.cell}>{item.date}</td>
                  <td style={styles.cell}>
                    <button
                      type="button"
                      onClick={() => editMarks(item)}
                      style={styles.editButton}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteMarks(item._id)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {marksList.length === 0 && (
                <tr>
                  <td colSpan="7" style={styles.emptyCell}>
                    No marks available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <footer style={styles.footer}>
        © 2026 Smart Student Management System
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
    maxWidth: "1200px",
    margin: "0 auto 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px"
  },

  title: {
    color: "#ffffff",
    fontSize: "28px",
    margin: 0
  },

  subtitle: {
    color: "#ffffff",
    fontSize: "14px",
    marginTop: "8px"
  },

  backLink: {
    background: "#ffffff",
    color: "#142d4e",
    padding: "11px 18px",
    borderRadius: "7px",
    textDecoration: "none",
    fontWeight: "bold"
  },

  formCard: {
    background: "#ffffff",
    maxWidth: "520px",
    margin: "auto",
    padding: "28px",
    borderRadius: "12px",
    boxShadow: "0 5px 18px rgba(0,0,0,0.15)",
    boxSizing: "border-box"
  },

  formTitle: {
    color: "#142d4e",
    textAlign: "center",
    marginTop: 0,
    marginBottom: "25px"
  },

  label: {
    display: "block",
    textAlign: "left",
    color: "#142d4e",
    fontWeight: "bold",
    fontSize: "13px",
    marginTop: "12px",
    marginBottom: "7px"
  },

  input: {
    width: "100%",
    padding: "12px",
    boxSizing: "border-box",
    border: "1px solid #142d4e",
    borderRadius: "6px",
    fontSize: "14px",
    background: "#ffffff",
    color: "#142d4e"
  },

  marksRow: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap"
  },

  marksField: {
    flex: "1 1 180px"
  },

  saveButton: {
    width: "100%",
    padding: "14px",
    marginTop: "22px",
    background: "#142d4e",
    color: "#ffffff",
    border: "none",
    borderRadius: "7px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  cancelButton: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    background: "#142d4e",
    color: "#ffffff",
    border: "1px solid #142d4e",
    borderRadius: "7px",
    cursor: "pointer"
  },

  tableCard: {
    background: "#ffffff",
    maxWidth: "1200px",
    margin: "30px auto",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 5px 18px rgba(0,0,0,0.15)"
  },

  tableTitle: {
    color: "#142d4e",
    marginTop: 0,
    marginBottom: "20px"
  },

  table: {
    width: "100%",
    minWidth: "850px",
    borderCollapse: "collapse"
  },

  heading: {
    background: "#142d4e",
    color: "#ffffff",
    padding: "15px 10px",
    fontSize: "14px",
    textAlign: "center"
  },

  cell: {
    padding: "14px 10px",
    textAlign: "center",
    borderBottom: "1px solid #dce3ec",
    color: "#142d4e",
    background: "#ffffff",
    fontSize: "14px"
  },

  emptyCell: {
    padding: "25px",
    textAlign: "center",
    color: "#142d4e",
    background: "#ffffff"
  },

  editButton: {
    background: "#142d4e",
    color: "#ffffff",
    border: "none",
    padding: "8px 13px",
    margin: "3px",
    borderRadius: "5px",
    cursor: "pointer"
  },

  deleteButton: {
    background: "#ffffff",
    color: "#142d4e",
    border: "1px solid #142d4e",
    padding: "8px 13px",
    margin: "3px",
    borderRadius: "5px",
    cursor: "pointer"
  },

  footer: {
    textAlign: "center",
    color: "#ffffff",
    marginTop: "25px",
    padding: "12px",
    fontSize: "13px"
  }
};

export default StudentMarks;
