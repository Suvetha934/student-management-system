
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    course: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleRegister(event) {
    event.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration Failed");
        return;
      }

      alert("Registration Successful! Please Login.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        course: "",
        password: ""
      });

    } catch (error) {
      console.error(error);
      alert("Connection Error: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.heading}>
          Student Registration
        </h1>

        <p style={styles.subtitle}>
          Create Your Student Account
        </p>

        <form onSubmit={handleRegister}>

          <input
            style={styles.input}
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? "Registering..." : "Create Account"}
          </button>

        </form>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>

        <Link to="/" style={styles.homeLink}>
          ← Back to Home
        </Link>

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
   backgroundImage: "url('/Smart-Student-Management/login-bg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center top",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "15px 6%",
    boxSizing: "border-box"
  },

  card: {
    background: "rgba(255, 255, 255, 0.97)",
    width: "420px",
    maxWidth: "100%",
    padding: "20px 30px",
    borderRadius: "18px",
    textAlign: "center",
    boxShadow: "0 10px 35px rgba(0,0,0,0.3)",
    boxSizing: "border-box"
  },

  heading: {
    color: "#173b68",
    fontSize: "25px",
    margin: "5px 0"
  },

  subtitle: {
    color: "#64748b",
    margin: "8px 0 12px"
  },

  input: {
    width: "100%",
    padding: "10px 12px",
    margin: "6px 0",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    boxSizing: "border-box",
    fontSize: "15px",
    outline: "none"
  },

  button: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    background: "linear-gradient(90deg, #173b68, #2563eb)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer"
  },

  loginText: {
    marginTop: "10px",
    color: "#475569"
  },

  link: {
    color: "#2563eb",
    fontWeight: "bold",
    textDecoration: "none"
  },

  homeLink: {
    display: "inline-block",
    marginTop: "8px",
    color: "#2563eb",
    textDecoration: "none"
  }
};

export default Register;
