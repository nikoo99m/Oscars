const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');
const path = require('path');
app.use(express.static('public'));

app.get('/getNominations', (req, res) => {
    var oscars = getOscars(res);
    var filter = filterNominations(oscars, req.query);
    // console.log(year);
    console.log(filter.length);
    res.json(filter);
});

app.get('/getNominations2', (request, response) => {
    const word = request.query.word;
    response.send('<p>' + word + '</p>');
});


app.get('/getNominees', (req, res) => {
    var oscars = getOscars();
    var nominees = getNomineeWinCounts(oscars);
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

function filterNominations(data, query) {
    console.log(query);
    const category = query.category;
    const year = query.year;
    const info = query.info;
    const nominee = query.nominee;
    const nomInfo = query.nomInfo;
    const won = query.won;


    // data.forEach(entry => console.log(entry));
    if (nomInfo === undefined || nomInfo.value === '') {
        console.log("zone 1");
        console.log(nomInfo);
        return data.filter(x => x.Year.includes(year) &&
            x.Category.includes(category) &&
            x.Nominee.includes(nominee) &&
            x.Info.includes(info) &&
            ((won == 'both') || (won != 'both' && x.Won.includes(won))));
    }
    else {
        console.log("zone 2");
        console.log(nomInfo);
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
    // Return the parsed JSON data
    return jsonData;
}
function getNomineeWinCounts(data) {
    const nomineeWins = {};

    data.filter(entry => entry.Category.includes("Actor") || entry.Category.includes("Actress"))
        .forEach(entry => {
            const nominee = entry.Nominee;
            const won = entry.Won;

            if (!nomineeWins[nominee]) {
                nomineeWins[nominee] = 0;
            }

            // if (won === "yes") {
            nomineeWins[nominee]++;
            // }
        });

    const sortedNominees = Object.entries(nomineeWins)
        .map(([nominee, wins]) => ({ nominee, wins }))
        .sort((a, b) => b.wins - a.wins);

    return sortedNominees;
}

app.listen(port);

console.log('Listening on port ' + port);
