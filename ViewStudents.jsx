
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
    department: "",
    phone: ""
  });

  async function fetchStudents() {
    try {
      const response = await fetch("http://127.0.0.1:5000/students");

      if (!response.ok) throw new Error("Unable to fetch students");

      const data = await response.json();
      setStudents(Array.isArray(data) ? data : data.students || []);
    } catch (error) {
      alert("Backend connection failed!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  function editStudent(item) {
    setEditingId(item._id);

    setStudent({
      name: item.name || "",
      email: item.email || "",
      age: item.age || "",
      course: item.course || "",
      department: item.department || "",
      phone: item.phone || ""
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  }

  async function updateStudent(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/students/update/${editingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...student,
            age: Number(student.age)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to update student");
        return;
      }

      alert("Student Updated Successfully!");
      cancelEdit();
      fetchStudents();

    } catch (error) {
      alert("Backend connection failed!");
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setStudent({
      name: "",
      email: "",
      age: "",
      course: "",
      department: "",
      phone: ""
    });
  }

  async function deleteStudent(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/students/delete/${id}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Student Deleted Successfully!");
        fetchStudents();
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (error) {
      alert("Unable to connect to backend!");
    }
  }

  return (
    <div style={styles.container}>

      {/* Header */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Student Management</h1>
          <p style={styles.subtitle}>
            View and manage registered student records
          </p>
        </div>

        <Link to="/teacher-dashboard" style={styles.backLink}>
          ← Dashboard
        </Link>
      </header>

      {/* Student Count */}
      <div style={styles.countCard}>
        <div style={styles.countIcon}>🎓</div>
        <div>
          <p style={styles.countLabel}>Total Registered Students</p>
          <h2 style={styles.countNumber}>{students.length}</h2>
        </div>
      </div>

      {/* Edit Form */}
      {editingId && (
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>Edit Student Details</h2>

          <form onSubmit={updateStudent}>
            <div style={styles.formGrid}>
              <input
                name="name"
                placeholder="Student Name"
                value={student.name}
                onChange={handleChange}
                required
                style={styles.input}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={student.email}
                onChange={handleChange}
                required
                style={styles.input}
              />

              <input
                type="number"
                name="age"
                placeholder="Age"
                value={student.age}
                onChange={handleChange}
                required
                style={styles.input}
              />

              <input
                name="course"
                placeholder="Course"
                value={student.course}
                onChange={handleChange}
                required
                style={styles.input}
              />

              <input
                name="department"
                placeholder="Department"
                value={student.department}
                onChange={handleChange}
                required
                style={styles.input}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={student.phone}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <button type="submit" style={styles.updateButton}>
              Save Changes
            </button>

            <button
              type="button"
              onClick={cancelEdit}
              style={styles.cancelButton}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Student Table */}
      <section style={styles.tableCard}>
        <h2 style={styles.tableTitle}>Student Records</h2>

        {loading ? (
          <p style={styles.message}>Loading Students...</p>
        ) : students.length === 0 ? (
          <p style={styles.message}>No Students Found</p>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Age</th>
                  <th style={styles.th}>Course</th>
                  <th style={styles.th}>Department</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {students.map((item) => (
                  <tr key={item._id}>
                    <td style={styles.td}>{item.name}</td>
                    <td style={styles.td}>{item.email}</td>
                    <td style={styles.td}>{item.age}</td>
                    <td style={styles.td}>{item.course}</td>
                    <td style={styles.td}>{item.department}</td>
                    <td style={styles.td}>{item.phone}</td>

                    <td style={styles.td}>
                      <button
                        onClick={() => editStudent(item)}
                        style={styles.editButton}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteStudent(item._id)}
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <footer style={styles.footer}>
        © 2026 EduPortal | Student Management System
      </footer>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px",
    background: "#142d4e",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
    marginBottom: "25px"
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

  countCard: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    background: "white",
    padding: "20px 25px",
    borderRadius: "11px",
    maxWidth: "300px",
    marginBottom: "25px"
  },

  countIcon: {
    fontSize: "35px"
  },

  countLabel: {
    color: "#718096",
    fontSize: "13px",
    margin: 0
  },

  countNumber: {
    color: "#142d4e",
    fontSize: "30px",
    margin: "5px 0 0"
  },

  formCard: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    marginBottom: "25px"
  },

  formTitle: {
    color: "#142d4e",
    marginTop: 0
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "14px"
  },

  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #d5deea",
    borderRadius: "6px",
    boxSizing: "border-box",
    fontSize: "14px"
  },

  updateButton: {
    background: "#142d4e",
    color: "white",
    padding: "11px 20px",
    border: "none",
    borderRadius: "6px",
    marginTop: "18px",
    marginRight: "10px",
    cursor: "pointer"
  },

  cancelButton: {
    background: "#e5eaf0",
    color: "#142d4e",
    padding: "11px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  tableCard: {
    background: "white",
    padding: "22px",
    borderRadius: "12px",
    boxShadow: "0 5px 18px rgba(0,0,0,0.08)"
  },

  tableTitle: {
    color: "#142d4e",
    fontSize: "21px",
    marginTop: "0",
    marginBottom: "20px"
  },

  tableContainer: {
    overflowX: "auto"
  },

  table: {
    width: "100%",
    minWidth: "850px",
    borderCollapse: "collapse",
    textAlign: "left"
  },

  th: {
    background: "#142d4e",
    color: "white",
    padding: "14px",
    fontSize: "14px",
    whiteSpace: "nowrap"
  },

  td: {
    padding: "13px",
    borderBottom: "1px solid #e7edf4",
    color: "#40546b",
    fontSize: "14px"
  },

  editButton: {
    background: "#e7eef7",
    color: "#142d4e",
    border: "1px solid #c7d5e5",
    padding: "8px 13px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "5px"
  },

  deleteButton: {
    background: "#142d4e",
    color: "white",
    border: "none",
    padding: "8px 13px",
    borderRadius: "5px",
    cursor: "pointer"
  },

  message: {
    textAlign: "center",
    padding: "30px",
    color: "#52647d"
  },

  footer: {
    textAlign: "center",
    color: "#cbd8e7",
    marginTop: "25px",
    padding: "12px",
    fontSize: "13px"
  }
};

export default ViewStudents;
