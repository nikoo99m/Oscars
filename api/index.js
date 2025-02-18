const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Ensure Vercel detects API routes
const router = express.Router();

/**
 * Reads the Oscars data from the JSON file
 */
function getOscars() {
    try {
        const filePath = path.join(__dirname, 'oscars.json'); // Ensure file exists
        if (!fs.existsSync(filePath)) {
            console.error("Error: oscars.json not found");
            return [];
        }
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error loading Oscars data:", error);
        return []; // Return empty array if there's an error
    }
}

// #region Get Nominations
router.get('/getNominations', (req, res) => {
    try {
        console.log("Fetching nominations...");
        const oscars = getOscars();
        res.json(oscars);
    } catch (error) {
        console.error("Error fetching nominations:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// #region Get Nominees
router.get('/getNominees', (req, res) => {
    try {
        console.log("Fetching nominees...");
        const oscars = getOscars();
        res.json(oscars);
    } catch (error) {
        console.error("Error fetching nominees:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.use('/api', router); // Ensures API routes are prefixed with /api

module.exports = app; // Required for Vercel
