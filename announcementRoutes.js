
const express = require("express");
const router = express.Router();

const Announcement = require("./models/Announcement");

// Create announcement
router.post("/add", async (req, res) => {
    try {
        const { title, message } = req.body;

        if (!title || !message) {
            return res.status(400).json({
                message: "Please enter title and message"
            });
        }

        const announcement = new Announcement({
            title,
            message
        });

        await announcement.save();

        res.status(201).json({
            message: "Announcement Published Successfully",
            announcement
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// View all announcements
router.get("/", async (req, res) => {
    try {
        const announcements = await Announcement.find()
            .sort({ date: -1 });

        res.json(announcements);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;
