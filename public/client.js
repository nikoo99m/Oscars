// Base URL for deployed API on Vercel
const BASE_URL = "https://oscars-beige.vercel.app/api";

// #region Get Nominations
/**
 * Fetches nominations data based on user input and updates the nominations table accordingly.
 */
function getNominations() {
    // Validate input fields
    if (validateInput()) return;

    document.getElementById('output').style.display = 'block';
    document.getElementById('nominationsLoading').style.display = 'block';
    document.getElementById('nomineesTable').style.display = 'none';

    // Get query parameters
    var queryParams = getNominationsQueryParameters();
    const queryString = Object.keys(queryParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join('&');

    // Correct API URL
    const url = `${BASE_URL}/getNominations?${queryString}`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            clearNominationsTable();
            buildNominationsTable(data);
            document.getElementById('nominationsCount').innerHTML = data.length;

            document.getElementById('nominationsLoading').style.display = 'none';
            document.getElementById('nomineesTable').style.display = 'table';
        })
        .catch(error => {
            console.error('Fetch error:', error);
            document.getElementById('nominationsLoading').style.display = 'none';
            document.getElementById('nomineesTable').innerHTML =
                '<tr><td colspan="5">Error fetching data. Please try again later.</td></tr>';
        });
}

function getNominationsQueryParameters() {
    const nomInfo = document.getElementById('nomInfo');
    if (nomInfo.value === undefined || nomInfo.value == '') {
        return getQueryParametersMode1(); // 'Nominee or Info' is empty
    } else {
        return getQueryParametersMode2(); // 'Nominee or Info' is not empty
    }
}

function getQueryParametersMode1() {
    return {
        year: document.getElementById('year').value,
        info: document.getElementById('info').value,
        nominee: document.getElementById('nominee').value,
        category: document.getElementById('category').value,
        won: document.getElementById('won').value
    };
}

function getQueryParametersMode2() {
    return {
        year: document.getElementById('year').value,
        nomInfo: document.getElementById('nomInfo').value,
        category: document.getElementById('category').value,
        won: document.getElementById('won').value
    };
}
// #endregion

// #region Get Nominees
function getNominees() {
    if (validateInput()) return;

    document.getElementById('output').style.display = 'block';
    document.getElementById('nomineesLoading').style.display = 'block';
    document.getElementById('nomineeTable').style.display = 'none';

    var queryParams = getNomineesParameters();
    const queryString = Object.keys(queryParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join('&');

    // ✅ Correct API URL
    const url = `${BASE_URL}/getNominees?${queryString}`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            clearNomineesTable();
            buildNomineesTable(data);
            document.getElementById('nomineesCount').innerHTML = data.length;
            document.getElementById('nomineesLoading').style.display = 'none';
            document.getElementById('nomineeTable').style.display = 'table';
        })
        .catch(error => {
            console.error('Fetch error:', error);
            document.getElementById('nomineesLoading').style.display = 'none';
            document.getElementById('nomineeTable').innerHTML =
                '<tr><td colspan="5">Error fetching data. Please try again later.</td></tr>';
        });
}

function getNomineesParameters() {
    const wonInfo = document.getElementById('won').value;
    const winCountInfo = document.getElementById('times');

    return winCountInfo === undefined || winCountInfo.value.trim() == ''
        ? { won: wonInfo }
        : { won: wonInfo, winCount: winCountInfo.value };
}
// #endregion

// #region Build Tables
function buildNominationsTable(data) {
    const tableBody = document.getElementById('nomineesBody');
    if (!tableBody) return; // Prevent errors

    tableBody.innerHTML = ""; // Clears previous content
    data.forEach(entry => {
        const row = document.createElement('tr');
        for (const key in entry) {
            const cell = document.createElement('td');
            cell.textContent = entry[key];
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    });
}

function buildNomineesTable(data) {
    const tableBody = document.getElementById('nomineeBody');
    if (!tableBody) return; // Prevent errors

    tableBody.innerHTML = ""; // Clears previous content
    data.forEach(entry => {
        const row = document.createElement('tr');
        for (const key in entry) {
            const cell = document.createElement('td');
            cell.textContent = entry[key];
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    });
}
// #endregion

// #region Clear Controls
function clearInputs() {
    ['year', 'category', 'nominee', 'info', 'nomInfo', 'times'].forEach(id => {
        const inputElement = document.getElementById(id);
        if (inputElement) inputElement.value = '';
    });

    const selectElement = document.getElementById('won');
    if (selectElement) selectElement.value = '';
}

function clearOutput() {
    clearNominationsTable();
    clearNomineesTable();
}

function clearNominationsTable() {
    const tableBody = document.getElementById('nomineesBody');
    if (!tableBody) return;
    tableBody.innerHTML = "";
}

function clearNomineesTable() {
    const tableBody = document.getElementById('nomineeBody');
    if (!tableBody) return;
    tableBody.innerHTML = "";
}
// #endregion

// #region Input Validations
function validateInput() {
    if (!nomInfoIsEmpty() && (!infoIsEmpty() || !nomineeIsEmpty())) {
        alert('Clear \'Info\' and \'Nominee\' fields if using \'Nominee or Info\'!');
        return true;
    }
    return false;
}

function nomInfoIsEmpty() {
    const nomInfo = document.getElementById('nomInfo');
    return nomInfo.value == undefined || nomInfo.value.trim() == "";
}

function infoIsEmpty() {
    const info = document.getElementById('info');
    return info.value == undefined || info.value.trim() == "";
}

function nomineeIsEmpty() {
    const nominee = document.getElementById('nominee');
    return nominee.value == undefined || nominee.value.trim() == "";
}
// #endregion
