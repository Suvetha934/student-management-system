
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication Routes
const authRoutes = require("./authRoutes");
app.use("/auth", authRoutes);

// Student Routes
const studentRoutes = require("./studentRoutes");
app.use("/students", studentRoutes);

// Attendance Routes
const attendanceRoutes = require("./attendanceRoutes");

console.log("Attendance router:", typeof attendanceRoutes);

app.use("/attendance", attendanceRoutes);

// Marks Routes
const marksRoutes = require("./marksRoutes");

console.log(
    "Marks routes:",
    marksRoutes.stack.map(route => route.route?.path)
);

app.use("/marks", marksRoutes);
// Announcement Routes
const announcementRoutes = require("./announcementRoutes");
app.use("/announcements", announcementRoutes);
app.get("/test-marks", (req, res) => {
    res.json({
        message: "Marks API Working"
    });
});

// Test Backend
app.get("/", (req, res) => {
    res.json({
        message: "Backend Working"
    });
});

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/StudentDB")
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log("MongoDB Error:", error);
    });

// Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
