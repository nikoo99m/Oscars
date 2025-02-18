const BASE_URL = window.location.origin.includes('localhost')
    ? 'http://localhost:8080/api'
    : 'https://oscars-beige.vercel.app/api';

// #region Get Nominations
/**
 * Fetches nominations data based on user input and updates the nominations table accordingly.
 */
function getNominations() {
    if (validateInput()) return;

    toggleLoading(true, 'nominations');

    const queryParams = getNominationsQueryParameters();
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${BASE_URL}/getNominations?${queryString}`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            clearTable('nomineesBody');
            buildTable('nomineesBody', data);
            document.getElementById('nominationsCount').textContent = data.length;
            toggleLoading(false, 'nominations');
        })
        .catch(error => {
            console.error('Fetch error:', error);
            displayFetchError('nomineesBody');
            toggleLoading(false, 'nominations');
        });
}

/**
 * Constructs query parameters for nominations based on user input.
 */
function getNominationsQueryParameters() {
    return document.getElementById('nomInfo').value.trim()
        ? getQueryParametersMode2()
        : getQueryParametersMode1();
}

function getQueryParametersMode1() {
    return {
        year: getValue('year'),
        info: getValue('info'),
        nominee: getValue('nominee'),
        category: getValue('category'),
        won: getValue('won')
    };
}

function getQueryParametersMode2() {
    return {
        year: getValue('year'),
        nomInfo: getValue('nomInfo'),
        category: getValue('category'),
        won: getValue('won')
    };
}
// #endregion

// #region Get Nominees
/**
 * Fetches nominee win counts and updates the nominees table.
 */
function getNominees() {
    if (validateInput()) return;

    toggleLoading(true, 'nominees');

    const queryParams = getNomineesParameters();
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${BASE_URL}/getNominees?${queryString}`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            clearTable('nomineeBody');
            buildTable('nomineeBody', data);
            document.getElementById('nomineesCount').textContent = data.length;
            toggleLoading(false, 'nominees');
        })
        .catch(error => {
            console.error('Fetch error:', error);
            displayFetchError('nomineeBody');
            toggleLoading(false, 'nominees');
        });
}

/**
 * Constructs query parameters for nominee counts based on user input.
 */
function getNomineesParameters() {
    return getValue('times')
        ? { won: getValue('won'), winCount: getValue('times') }
        : { won: getValue('won') };
}
// #endregion

// #region Table Handling
/**
 * Builds a table dynamically with provided data.
 */
function buildTable(tableBodyId, data) {
    const tableBody = document.getElementById(tableBodyId);
    if (!tableBody) return console.error(`Error: Element '${tableBodyId}' not found!`);

    data.forEach(entry => {
        const row = document.createElement('tr');
        Object.values(entry).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });
}

/**
 * Clears a table by removing all its child nodes.
 */
function clearTable(tableBodyId) {
    const tableBody = document.getElementById(tableBodyId);
    if (tableBody) tableBody.innerHTML = "";
}
// #endregion

// #region Utility Functions
/**
 * Retrieves value from input field safely.
 */
function getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value.trim() : "";
}

/**
 * Toggles loading state for nominations or nominees.
 */
function toggleLoading(isLoading, type) {
    document.getElementById(`${type}Loading`).style.display = isLoading ? 'block' : 'none';
}

/**
 * Displays a fetch error in a table.
 */
function displayFetchError(tableBodyId) {
    const tableBody = document.getElementById(tableBodyId);
    if (tableBody) {
        tableBody.innerHTML = '<tr><td colspan="5">Error fetching data. Please try again later.</td></tr>';
    }
}

/**
 * Clears all input fields and dropdown selections.
 */
function clearInputs() {
    ['year', 'category', 'nominee', 'info', 'nomInfo', 'times'].forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = '';
    });

    const select = document.getElementById('won');
    if (select) select.value = '';
}

function clearOutput() {
    clearTable('nomineesBody');
    clearTable('nomineeBody');
}
// #endregion

// #region Input Validations
/**
 * Ensures input fields are valid and do not have conflicting entries.
 */
function validateInput() {
    if (!nomInfoIsEmpty() && (!infoIsEmpty() || !nomineeIsEmpty())) {
        alert("Clear 'Info' and 'Nominee' fields if using 'Nominee or Info'!");
        return true;
    }
    return false;
}

function nomInfoIsEmpty() {
    return getValue('nomInfo') === "";
}

function infoIsEmpty() {
    return getValue('info') === "";
}

function nomineeIsEmpty() {
    return getValue('nominee') === "";
}
// #endregion
