import StudentMarks from "./pages/StudentMarks";
import Attendance from "./Attendance";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StudentDashboard from "./pages/StudentDashboard";
import AddStudent from "./pages/AddStudent";
import ViewStudents from "./pages/ViewStudents";
import MyProfile from "./pages/MyProfile";
import MyAttendance from "./pages/MyAttendance";
import MyMarks from "./pages/MyMarks";
import Announcements from "./pages/Announcements";
import TeacherAnnouncements from "./pages/TeacherAnnouncements";
// Check login and role
function ProtectedRoute({ children, allowedRole }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");

  if (isLoggedIn !== "true") {
    return <Navigate to="/login" />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter basename="/Smart-Student-Management">
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Teacher Dashboard */}
        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Student Dashboard */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRole="user">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Teacher Only Pages */}
        <Route
          path="/add-student"
          element={
            <ProtectedRoute allowedRole="admin">
              <AddStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute allowedRole="admin">
              <ViewStudents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute allowedRole="admin">
              <Attendance />
            </ProtectedRoute>
          }
        />

<Route
  path="/student-marks"
  element={
    <ProtectedRoute allowedRole="admin">
      <StudentMarks />
    </ProtectedRoute>
  }
/>
<Route
  path="/my-profile"
  element={
    <ProtectedRoute allowedRole="user">
      <MyProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/my-attendance"
  element={
    <ProtectedRoute allowedRole="user">
      <MyAttendance />
    </ProtectedRoute>
  }
/>
<Route
  path="/my-marks"
  element={
    <ProtectedRoute allowedRole="user">
      <MyMarks />
    </ProtectedRoute>
  }
/>
<Route
  path="/announcements"
  element={
    <ProtectedRoute allowedRole="user">
      <Announcements />
    </ProtectedRoute>
  }
/>
<Route
  path="/teacher-announcements"
  element={
    <ProtectedRoute allowedRole="admin">
      <TeacherAnnouncements />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
