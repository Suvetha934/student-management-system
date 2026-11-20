
import { useState } from "react";
import { Link } from "react-router-dom";

function AddStudent() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
    department: "",
    phone: ""
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/students/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...student,
            age: Number(student.age)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert("Error: " + (data.message || "Student not added"));
        return;
      }

      alert("Student Added Successfully!");

      setStudent({
        name: "",
        email: "",
        age: "",
        course: "",
        department: "",
        phone: ""
      });

    } catch (error) {
      console.error("Add Student Error:", error);
      alert("Connection Error: " + error.message);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <div style={styles.header}>
          <div style={styles.icon}>🎓</div>
          <h1 style={styles.title}>Add Student</h1>
          <p style={styles.subtitle}>
            Student Information Registration
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <label style={styles.label}>Student Name</label>
          <input
            name="name"
            placeholder="Enter student name"
            value={student.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="Enter email address"
            value={student.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Age</label>
          <input
            name="age"
            type="number"
            placeholder="Enter age"
            value={student.age}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Course</label>
          <input
            name="course"
            placeholder="Enter course"
            value={student.course}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Department</label>
          <input
            name="department"
            placeholder="Enter department"
            value={student.department}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Phone Number</label>
          <input
            name="phone"
            type="tel"
            placeholder="Enter phone number"
            value={student.phone}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Adding Student..." : "Add Student"}
          </button>

        </form>

        <Link to="/teacher-dashboard" style={styles.backLink}>
          ← Back to Dashboard
        </Link>

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#142d4e",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px 15px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif"
  },

  card: {
    background: "#ffffff",
    width: "460px",
    maxWidth: "100%",
    padding: "32px 38px",
    borderRadius: "14px",
    boxSizing: "border-box",
    boxShadow: "0 12px 35px rgba(0,0,0,0.2)"
  },

  header: {
    textAlign: "center",
    marginBottom: "25px"
  },

  icon: {
    fontSize: "38px",
    marginBottom: "8px"
  },

  title: {
    color: "#142d4e",
    fontSize: "27px",
    margin: "0 0 8px"
  },

  subtitle: {
    color: "#718096",
    fontSize: "14px",
    margin: 0
  },

  label: {
    display: "block",
    textAlign: "left",
    color: "#243b55",
    fontSize: "14px",
    fontWeight: "bold",
    marginTop: "13px",
    marginBottom: "6px"
  },

  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #d5deea",
    borderRadius: "7px",
    boxSizing: "border-box",
    fontSize: "14px",
    outline: "none",
    background: "#ffffff"
  },

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "25px",
    marginBottom: "18px",
    background: "#142d4e",
    color: "white",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold"
  },

  backLink: {
    display: "block",
    textAlign: "center",
    color: "#142d4e",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "14px"
  }
};

export default AddStudent;
