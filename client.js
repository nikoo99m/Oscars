function getNominations() {
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
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
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

function getNominees() {
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
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
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