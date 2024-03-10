function getNominations() {
    console.log("Getting Nominations:");
    fetch('http://localhost:8080/getNominations')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // console.log(response.json())
            return response.json(); // Assuming response is JSON
        })
        .then(data => {
            // Handle response data
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
    fetch('http://localhost:8080/getNominees')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // console.log(response.json())
            return response.json(); // Assuming response is JSON
        })
        .then(data => {
            // Handle response data
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