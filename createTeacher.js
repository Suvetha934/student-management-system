require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function createTeacher() {
    try {
        await mongoose.connect(
            "mongodb://127.0.0.1:27017/StudentDB"
        );

        const existingTeacher = await User.findOne({
            email: "teacher@gmail.com"
        });

        if (existingTeacher) {
            console.log("Teacher account already exists!");
            return;
        }

        const hashedPassword = await bcrypt.hash(
            "Teacher@123",
            10
        );

        const teacher = new User({
            name: "Teacher",
            email: "teacher@gmail.com",
            phone: "9876543210",
            department: "Computer Application",
            course: "BCA",
            password: hashedPassword,
            role: "admin"
        });

        await teacher.save();

        console.log("Teacher account created successfully!");
    } catch (error) {
        console.log("Error:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

createTeacher();