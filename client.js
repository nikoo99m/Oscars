
// #region Get Nominations
function getNominations() {
    const failed = validateInput();
    if (failed)
        return;

    document.getElementById('output').style.display = 'block';
    // Show loading animation
    document.getElementById('nominationsLoading').style.display = 'block';
    // Hide table
    document.getElementById('nomineesTable').style.display = 'none';

    console.log("Getting Nominations:");
    const baseURL = 'http://localhost:8080/getNominations';

    var queryParams = getQueryParameters();

    const queryString = Object.keys(queryParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join('&');

    const url = `${baseURL}?${queryString}`;
    console.log(url);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Assuming response is JSON
        })
        .then(data => {
            // Handle response data
            clearNominationsTable();
            buildNominationsTable(data);
            document.getElementById('nominationsCount').innerHTML = data.length;

            document.getElementById('nominationsLoading').style.display = 'none';
            // Show table
            document.getElementById('nomineesTable').style.display = 'table';
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById('nominationsLoading').style.display = 'none';
            // Show error message
            document.getElementById('nomineesTable').innerHTML = '<tr><td colspan="5">Error fetching data. Please try again later.</td></tr>';
        });
}
function getQueryParametersMode1() {
    const yearInput = document.getElementById('year').value;
    const infoInput = document.getElementById('info').value;
    const nomineeInput = document.getElementById('nominee').value;
    const categoryInput = document.getElementById('category').value;
    const wonInput = document.getElementById('won').value;

    const queryParams = {
        year: yearInput,
        info: infoInput,
        nominee: nomineeInput,
        category: categoryInput,
        won: wonInput
    };

    return queryParams;
}
function getQueryParametersMode2() {
    const yearInput = document.getElementById('year').value;
    const categoryInput = document.getElementById('category').value;
    const nomInfo = document.getElementById('nomInfo').value;
    const wonInput = document.getElementById('won').value;

    const queryParams = {
        year: yearInput,
        nomInfo: nomInfo,
        category: categoryInput,
        won: wonInput
    };

    return queryParams;
}
function getQueryParameters() {
    const nomInfo = document.getElementById('nomInfo');
    if (nomInfo.value === undefined || nomInfo.value == '') {
        return getQueryParametersMode1(); // Input is empty
    } else {
        return getQueryParametersMode2(); // Input is not empty
    }
}
// #endregion


// #region Get Nominees
function getNominees() {
    const failed = validateInput();
    if (failed)
        return;

    document.getElementById('output').style.display = 'block';
    // Show loading animation
    document.getElementById('nomineesLoading').style.display = 'block';
    // Hide table
    document.getElementById('nomineeTable').style.display = 'none';
    console.log("Getting Nominees.");

    const baseURL = 'http://localhost:8080/getNominees';

    var queryParams = getNomineesParameters();
    const queryString = Object.keys(queryParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join('&');

    const url = `${baseURL}?${queryString}`;
    console.log(url);
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Assuming response is JSON
        })
        .then(data => {
            // Handle response data
            clearNomineesTable();
            buildNomineesTable(data);
            document.getElementById('nomineesCount').innerHTML = data.length;
            document.getElementById('nomineesLoading').style.display = 'none';
            document.getElementById('nomineeTable').style.display = 'table';
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById('nomineesLoading').style.display = 'none';
            // Show error message
            document.getElementById('nomineeTable').innerHTML = '<tr><td colspan="5">Error fetching data. Please try again later.</td></tr>';
        });
}
function getNomineesParameters() {
    const wonInfo = document.getElementById('won').value;
    const winCountInfo = document.getElementById('times');

    if (winCountInfo === undefined || winCountInfo.value.trim() == '') {
        return {
            won: wonInfo,
        };
    }
    else {
        return {
            won: wonInfo,
            winCount: winCountInfo.value
        };
    }


}
function buildNominationsTable(data) {
    const tableBody = document.getElementById('nomineesBody');

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
    // Array of input IDs to clear
    const inputIds = ['year', 'category', 'nominee', 'info', 'nomInfo', 'times'];

    // Loop through each input ID
    inputIds.forEach(id => {
        // Get the input element by its ID
        const inputElement = document.getElementById(id);

        // Clear the value of the input field
        if (inputElement) {
            inputElement.value = '';
        }
    });

    // Clear the select dropdown value
    const selectElement = document.getElementById('won');
    if (selectElement) {
        selectElement.value = ''; // Set the value to an empty string
    }
}
function clearOutput() {
    clearNominationsTable();
    clearNomineesTable();
}
function clearNominationsTable() {
    // Get the table body element
    const nomineesTableBody = document.getElementById('nomineesBody');

    // Remove all child nodes (rows) from the table body
    while (nomineesTableBody.firstChild) {
        nomineesTableBody.removeChild(nomineesTableBody.firstChild);
    }
}
function clearNomineesTable() {
    // Get the table body element
    const nomineesTableBody = document.getElementById('nomineeBody');

    // Remove all child nodes (rows) from the table body
    while (nomineesTableBody.firstChild) {
        nomineesTableBody.removeChild(nomineesTableBody.firstChild);
    }
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

// #region Get Nominees
// #endregion

