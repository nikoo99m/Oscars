function getNominations() {
    console.log("Getting Nominations:");
    const baseURL = 'http://localhost:8080/getNominations';

    const inputElement = document.getElementById('year').value;

    const queryParams = {
        year: inputElement
    };

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
            // console.log(response.json())
            return response.json(); // Assuming response is JSON
        })
        .then(data => {
            // Handle response data
            clearNominationsTable();
            buildNominationsTable(data);
            console.log(data);
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
        });
}

function getNominees() {
    console.log("Getting Nominees.");

    const baseURL = 'http://localhost:8080/getNominees';

    const inputElement = document.getElementById('year').value;


    const queryParams = {
        year: inputElement
    };

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
            // console.log(response.json())
            return response.json(); // Assuming response is JSON
        })
        .then(data => {
            // Handle response data
            clearNomineesTable();
            buildNomineesTable(data);
            console.log(data);
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
        });
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