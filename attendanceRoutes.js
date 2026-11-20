
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

console.log("ATTENDANCE ROUTES FILE LOADED");

// Attendance Schema
const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Present", "Absent"],
        required: true
    }
});

const Attendance =
    mongoose.models.Attendance ||
    mongoose.model("Attendance", attendanceSchema);


// Add Attendance (Teacher)
async function addAttendance(req, res) {
    try {
        const { studentId, studentName, date, status } = req.body;

        if (!studentId || !studentName || !date || !status) {
            return res.status(400).json({
                message: "All attendance fields are required"
            });
        }

        if (!["Present", "Absent"].includes(status)) {
            return res.status(400).json({
                message: "Invalid attendance status"
            });
        }

        // Check existing attendance for same student and date
        const existing = await Attendance.findOne({
            studentId: String(studentId),
            date: date
        });

        if (existing) {
            existing.studentName = studentName;
            existing.status = status;

            await existing.save();

            return res.json({
                message: "Attendance Updated Successfully",
                attendance: existing
            });
        }

        const attendance = new Attendance({
            studentId: String(studentId),
            studentName,
            date,
            status
        });

        await attendance.save();

        res.status(201).json({
            message: "Attendance Added Successfully",
            attendance
        });

    } catch (error) {
        console.log("Attendance Add Error:", error);

        res.status(500).json({
            message: error.message
        });
    }
}

// Support both teacher API URL formats
router.post("/", addAttendance);
router.post("/add", addAttendance);


// View All Attendance
router.get("/", async (req, res) => {
    try {
        const attendance = await Attendance.find().sort({
            date: -1
        });

        res.json(attendance);

    } catch (error) {
        console.log("Attendance Fetch Error:", error);

        res.status(500).json({
            message: error.message
        });
    }
});


// View Attendance of One Student
router.get("/student/:studentId", async (req, res) => {
    try {
        const attendance = await Attendance.find({
            studentId: String(req.params.studentId)
        }).sort({
            date: -1
        });

        res.json(attendance);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
// Find attendance using student email
const Student = require("./models/Student");

router.get("/by-email/:email", async (req, res) => {
    try {
        const email = req.params.email.trim().toLowerCase();

        const students = await Student.find();

        const student = students.find(
            s => s.email.trim().toLowerCase() === email
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found. Check the registered email."
            });
        }

        const attendance = await Attendance.find({
            studentId: String(student._id)
        }).sort({ date: -1 });

        res.json(attendance);

    } catch (error) {
        console.log("Student Attendance Error:", error);

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;
