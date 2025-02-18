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
        const filePath = path.join(__dirname, 'oscars.json');
        console.log("Looking for file at:", filePath);
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

/**
 * Filters nominations based on query parameters
 */
function filterNominations(data, query) {
    return data.filter(entry => {
        return (!query.year || entry.Year.includes(query.year)) &&
            (!query.category || entry.Category.includes(query.category)) &&
            (!query.nominee || entry.Nominee.includes(query.nominee)) &&
            (!query.info || entry.Info.includes(query.info)) &&
            (!query.won || entry.Won.includes(query.won));
    });
}

/**
 * Counts wins per nominee based on query parameters
 */
function getNomineeWinCounts(data, query) {
    const nomineeWins = {};

    data.forEach(entry => {
        if ((query.won === 'both' || entry.Won === query.won) &&
            (query.category ? entry.Category.includes(query.category) : true)) {

            const nominee = entry.Nominee;
            nomineeWins[nominee] = (nomineeWins[nominee] || 0) + 1;
        }
    });

    return Object.entries(nomineeWins)
        .map(([nominee, wins]) => ({ nominee, wins }))
        .sort((a, b) => b.wins - a.wins);
}

// API Route: Get Nominations with Filters
app.get('/getNominations', (req, res) => {
    try {
        console.log("Fetching nominations with filters:", req.query);
        const oscars = getOscars();
        const filteredData = filterNominations(oscars, req.query);
        res.json(filteredData);
    } catch (error) {
        console.error("Error fetching nominations:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// API Route: Get Nominees with Win Counts
app.get('/getNominees', (req, res) => {
    try {
        console.log("Fetching nominees with filters:", req.query);
        const oscars = getOscars();
        const nomineeCounts = getNomineeWinCounts(oscars, req.query);
        res.json(nomineeCounts);
    } catch (error) {
        console.error("Error fetching nominees:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server only in development
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

// Export the app for Vercel
module.exports = app;
