const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');
const path = require('path');
app.use(express.static('public'));


app.get('/getNominations', (req, res) => {
    var oscars = getOscars();
    var filter = filterNominations(oscars, req.query);
    console.log(filter.length);
    res.json(filter);
});

app.get('/getNominees', (req, res) => {
    var oscars = getOscars();
    var nominees = getNomineeWinCounts(oscars, req.query);
    res.json(nominees);
    return;
});

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'iwt-cw.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(data);
    });
});

app.get('/client.js', function (req, res) {
    res.sendFile(__dirname + '/client.js');
});

function filterNominations(data, query) {
    console.log(query);
    const category = query.category;
    const year = query.year;
    const info = query.info;
    const nominee = query.nominee;
    const nomInfo = query.nomInfo;
    const won = query.won;

    if (nomInfo === undefined || nomInfo.value === '') {
        return data.filter(x => x.Year.includes(year) &&
            x.Category.includes(category) &&
            x.Nominee.includes(nominee) &&
            x.Info.includes(info) &&
            ((won == 'both') || (won != 'both' && x.Won.includes(won))));
    }
    else {
        return data.filter(x => x.Year.includes(year) &&
            x.Category.includes(category) &&
            (x.Nominee.includes(nomInfo) ||
                x.Info.includes(nomInfo)) &&
            ((won == 'both') || (won != 'both' && x.Won.includes(won))));
    }
}

function getOscars() {
    const filePath = path.join(__dirname, 'oscars.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData;
}

function getNomineeWinCounts(data, query) {
    const nomineeWins = {};
    const won = query.won;
    const winCount = query.winCount;

    data.filter(entry => (entry.Category.includes("Actor") ||
        entry.Category.includes("Actress")) &&
        ((won == 'both') || (won != 'both' && entry.Won.includes(won))))
        .forEach(entry => {
            const nominee = entry.Nominee;
            const won = entry.Won;

            if (!nomineeWins[nominee]) {
                nomineeWins[nominee] = 0;
            }

            nomineeWins[nominee]++;
        });

    var filteredNomineeWins = null;
    if (winCount !== undefined) {
        filteredNomineeWins = Object.fromEntries(Object.entries(nomineeWins)
            .filter(([key, value]) => value == winCount));
    }
    else {
        filteredNomineeWins = nomineeWins;
    }

    const sortedNominees = Object.entries(filteredNomineeWins)
        .map(([nominee, wins]) => ({ nominee, wins }))
        .sort((a, b) => b.wins - a.wins);

    return sortedNominees;
}

app.listen(port);

console.log('Listening on port ' + port);
