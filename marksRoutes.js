console.log("MARKS ROUTES FILE LOADED");
const express = require("express");
const router = express.Router();

const Marks = require("./models/Marks");

// Add student marks
router.post("/add", async (req, res) => {
    try {
        const {
            studentId,
            studentName,
            subject,
            exam,
            marksObtained,
            totalMarks,
            date
        } = req.body;

        if (
            !studentId ||
            !studentName ||
            !subject ||
            !exam ||
            marksObtained === undefined ||
            !totalMarks ||
            !date
        ) {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }

        if (
            Number(marksObtained) < 0 ||
            Number(totalMarks) <= 0 ||
            Number(marksObtained) > Number(totalMarks)
        ) {
            return res.status(400).json({
                message: "Please enter valid marks"
            });
        }

        const newMarks = new Marks(req.body);
        await newMarks.save();

        res.status(201).json({
            message: "Marks Added Successfully",
            marks: newMarks
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// View all marks
router.get("/", async (req, res) => {
    try {
        const marks = await Marks.find();
        res.json(marks);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Update marks
router.put("/update/:id", async (req, res) => {
    try {
        const updatedMarks = await Marks.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedMarks) {
            return res.status(404).json({
                message: "Marks not found"
            });
        }

        res.json({
            message: "Marks Updated Successfully",
            marks: updatedMarks
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Delete marks
router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedMarks = await Marks.findByIdAndDelete(
            req.params.id
        );

        if (!deletedMarks) {
            return res.status(404).json({
                message: "Marks not found"
            });
        }

        res.json({
            message: "Marks Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;
