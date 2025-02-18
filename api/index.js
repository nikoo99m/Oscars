// Oscars API Server for Vercel

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

// Ensure Vercel detects API routes
const router = express.Router();

/**
 * Reads the Oscars data from the JSON file
 */
function getOscars() {
    try {
        const filePath = path.join(__dirname, 'oscars.json'); // Ensure file exists
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
        const filter = filterNominations(oscars, req.query);
        res.json(filter);
    } catch (error) {
        console.error("Error fetching nominations:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/**
 * Filters nominations based on query parameters
 */
function filterNominations(data, query) {
    const { category, year, info, nominee, nomInfo, won } = query;

    return data.filter(entry =>
        (!year || entry.Year.includes(year)) &&
        (!category || entry.Category.includes(category)) &&
        (!nominee || entry.Nominee.includes(nominee)) &&
        (!info || entry.Info.includes(info)) &&
        (!nomInfo || entry.Nominee.includes(nomInfo) || entry.Info.includes(nomInfo)) &&
        (won === "both" || (won !== "both" && entry.Won.includes(won)))
    );
}
// #endregion

// #region Get Nominees
router.get('/getNominees', (req, res) => {
    try {
        console.log("Fetching nominees...");
        const oscars = getOscars();
        const nominees = getNomineeWinCounts(oscars, req.query);
        res.json(nominees);
    } catch (error) {
        console.error("Error fetching nominees:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/**
 * Calculates nominee win counts based on query parameters
 */
function getNomineeWinCounts(data, query) {
    const nomineeWins = {};
    const { won, winCount } = query;

    data.filter(entry => (entry.Category.includes("Actor") ||
        entry.Category.includes("Actress")) &&
        (won === "both" || (won !== "both" && entry.Won.includes(won))))
        .forEach(entry => {
            const nominee = entry.Nominee;
            if (!nomineeWins[nominee]) nomineeWins[nominee] = 0;
            nomineeWins[nominee]++;
        });

    let filteredNomineeWins = nomineeWins;
    if (winCount !== undefined) {
        filteredNomineeWins = Object.fromEntries(
            Object.entries(nomineeWins).filter(([_, value]) => value == winCount)
        );
    }

    return Object.entries(filteredNomineeWins)
        .map(([nominee, wins]) => ({ nominee, wins }))
        .sort((a, b) => b.wins - a.wins);
}
// #endregion

app.use('/api', router); // Ensures API routes are prefixed with /api

module.exports = app; // Required for Vercel
