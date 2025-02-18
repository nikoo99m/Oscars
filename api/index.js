const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

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

// API Route: Get Nominations
app.get('/api/getNominations', (req, res) => {
    try {
        console.log("Fetching nominations...");
        const oscars = getOscars();
        res.json(oscars);
    } catch (error) {
        console.error("Error fetching nominations:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// API Route: Get Nominees
app.get('/api/getNominees', (req, res) => {
    try {
        console.log("Fetching nominees...");
        const oscars = getOscars();
        res.json(oscars);
    } catch (error) {
        console.error("Error fetching nominees:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the Express server locally
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

// Export the app for Vercel
module.exports = app;
