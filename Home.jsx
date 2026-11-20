
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.page}>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>🎓 Smart Student</h2>

        <div style={styles.navButtons}>
          <Link style={styles.navLink} to="/register">
            Register
          </Link>

          <Link style={styles.loginButton} to="/login">
            Login
          </Link>
        </div>
      </nav>

      {/* Centre Welcome Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Welcome to Smart Student
          </h1>

          <h2 style={styles.heroSubtitle}>
            Management System
          </h2>

          <p style={styles.heroText}>
            Manage student details easily, quickly and efficiently.
            Your complete student management solution!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        © 2026 Smart Student Management System
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    background: "#f1f5f9"
  },

  navbar: {
    background: "#102f56",
    color: "white",
    padding: "18px 5%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px"
  },

  logo: {
    margin: 0,
    fontSize: "25px"
  },

  navButtons: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },

  navLink: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    padding: "10px 15px"
  },

  loginButton: {
    color: "#173b68",
    background: "white",
    textDecoration: "none",
    fontWeight: "bold",
    padding: "11px 30px",
    borderRadius: "7px"
  },

  hero: {
    minHeight: "620px",
    backgroundImage:
      "linear-gradient(rgba(8,35,75,0.45), rgba(8,35,75,0.45)), url('/Smart-Student-Management/home-bg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "30px 20px",
    boxSizing: "border-box"
  },

  heroContent: {
    maxWidth: "850px",
    color: "white"
  },

  heroTitle: {
    fontSize: "48px",
    margin: "0 0 15px",
    fontWeight: "bold"
  },

  heroSubtitle: {
    fontSize: "38px",
    margin: "0 0 20px",
    color: "#bfdbfe"
  },

  heroText: {
    fontSize: "19px",
    lineHeight: "1.8",
    margin: 0
  },

  footer: {
    background: "#102f56",
    color: "white",
    textAlign: "center",
    padding: "20px"
  }
};

export default Home;
