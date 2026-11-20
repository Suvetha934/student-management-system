
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  async function handleLogin(event) {
    event.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: formData.email.trim(),
            password: formData.password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Invalid email or password");
        return;
      }

      if (!data.user || !data.token) {
        throw new Error("Invalid login response from server");
      }

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.user.id || data.user._id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role
        })
      );

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", data.user.role);

      alert("Login Successful!");

      if (data.user.role === "admin") {
        navigate("/teacher-dashboard");
      } else if (data.user.role === "user") {
        navigate("/student-dashboard");
      } else {
        localStorage.clear();
        alert("Invalid user role");
      }

    } catch (error) {
      console.error("Login Error:", error);

      alert(
        "Connection Error: " +
        error.message +
        "\nPlease check whether your backend server is running on port 5000."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h1 style={styles.heading}>
          Student & Teacher Login
        </h1>

        <p style={styles.subtitle}>
          Welcome Back!
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? "Logging in..." : "Login Now"}
          </button>
        </form>

        <p style={styles.registerText}>
          Student? Don't have an account?{" "}
          <Link to="/register">Register</Link>
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
  alignItems: "flex-end",
  padding: "25px 6%",
  boxSizing: "border-box"
},


  card: {
    background: "rgba(255, 255, 255, 0.96)",
    width: "400px",
    maxWidth: "100%",
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 10px 35px rgba(0,0,0,0.3)"
  },

  heading: {
    color: "#173b68",
    fontSize: "26px"
  },

  subtitle: {
    color: "#64748b",
    marginBottom: "20px"
  },

  input: {
    width: "100%",
    padding: "14px",
    margin: "12px 0",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    boxSizing: "border-box",
    fontSize: "15px"
  },

  button: {
    width: "100%",
    padding: "14px",
    margin: "15px 0",
    background: "linear-gradient(90deg, #173b68, #2563eb)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer"
  },

  registerText: {
    marginTop: "20px",
    color: "#475569"
  },

  homeLink: {
    display: "inline-block",
    marginTop: "12px",
    color: "#2563eb",
    textDecoration: "none"
  }
};

export default Login;
