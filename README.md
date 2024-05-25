# Oscars Website Application

## Overview

This repository contains a project for building an Oscars Query Application. The application allows users to query and display information about Academy Award nominations from 1960 to 2010 using JavaScript, the DOM, jQuery, and Node.js.

## Project Structure

- **HTML Page (`iwt-cw.html`)**
  - A user interface that includes a form with various input fields and buttons.
  - Allows users to query data about Oscar nominations.
  - Displays results dynamically in a table on the same page.

- **JavaScript File (`client.js`)**
  - Handles user interactions and manipulates the DOM to display query results.
  - Fetches data from the server using JavaScript or jQuery.
  - Implements error handling and validation for user inputs.

- **Node.js Server (`server.js`)**
  - Serves the JSON data and handles query requests from the client.
  - Filters and returns the required data based on user inputs.
  - Includes error handling for invalid query parameters.

## Detailed Requirements

### HTML Page (`iwt-cw.html`)

- **Form Elements**
  - Six input boxes:
    - Year (id: `year`)
    - Category (id: `category`)
    - Nominee (id: `nominee`)
    - Info (id: `info`)
    - Nominee or Info (id: `nomInfo`)
    - Number of Times (id: `times`)
  - A select drop-down for specifying win status (id: `won`), with options:
    - Won: `yes`
    - Did not win: `no`
    - Both: ``
  - Four buttons:
    - Get Nominations (id: `get-nominations`)
    - Get Nominees (id: `get-nominees`)
    - Clear Input Fields (id: `clear-input`)
    - Clear Output (id: `clear-output`)
- **Output Area**
  - `<div id="output"></div>` for displaying the query results in a table format.

### JavaScript File (`client.js`)

- Fetch data from the Node.js server using `fetch` or `jQuery.getJSON`.
- Process user inputs to form query parameters.
- Validate user inputs to ensure proper query formation.
- Handle the responses from the server and display the results dynamically in the HTML table.
- Implement error handling and display alerts for invalid inputs.

### Node.js Server (`server.js`)

- Listen on port 8080 and handle incoming requests.
- Parse query string parameters to filter the JSON data.
- Return the filtered data as a JSON array in response.
- Include CORS headers to allow requests from any origin.
- Validate query parameters and return appropriate error messages in JSON format for invalid queries.

## User Interactions

- **Query Nominations**
  - Retrieve and display nominations based on user-specified criteria (year, category, nominee, info, win status).
  - Display results in a dynamically generated HTML table with columns: Year, Category, Nominee, Info, Won.
- **Query Nominees**
  - Retrieve and display a list of nominees along with the number of times they have been nominated or won.
  - Display results in a dynamically generated HTML table with columns: Nominee, Number of times.
- **Clear Inputs**
  - Clear all input fields and selections.
- **Clear Output**
  - Clear the output area where the results are displayed.

## Development Stages

1. **HTML Form**
   - Create the basic structure of the form and output area.
   - Implement static versions of the input fields and buttons.
2. **Client-Side JavaScript**
   - Add functionality to fetch data from the server and display results.
   - Implement input validation and error handling.
3. **Node.js Server**
   - Set up the server to handle requests and return filtered JSON data.
   - Implement error handling for invalid query parameters.
4. **Integration and Testing**
   - Test the complete application by simulating various user queries.
   - Ensure the application works seamlessly across different browsers.
