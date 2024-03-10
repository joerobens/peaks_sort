let currentPage = 1;
const rowsPerPage = 100;
let currentData = []; // Holds the fetched data

document.addEventListener('DOMContentLoaded', function() {
    loadData();
});

function showLoading(show) {
    document.getElementById("loadingOverlay").style.display = show ? "block" : "none";
}

function loadData() {
    showLoading(true);
    fetch('punishmenthistory_with_place.json')
    .then(response => response.json())
    .then(data => {
        currentData = data; // Store fetched data
        showData(currentPage);
        setupPagination(data.length, rowsPerPage); // Setup pagination based on data length
        showLoading(false);
    })
    .catch(error => {
        console.error('Error loading the data:', error);
        showLoading(false);
    });
}

function showData(page) {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedItems = currentData.slice(startIndex, endIndex);

    const tableBody = document.getElementById('participantsTable');
    tableBody.innerHTML = ''; // Clear existing rows
    paginatedItems.forEach((participant, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = startIndex + index + 1; // Adjust index for current page
        row.insertCell(1).textContent = participant[0]; // ID
        row.insertCell(2).textContent = participant[2]; // Name
        row.insertCell(3).textContent = participant[5]; // Finish Time
        row.insertCell(4).textContent = participant[7]; // Place
    });
}

function sortTable(columnIndex) {
    showLoading(true);
    // Delay sorting to simulate loading (for demonstration purposes)
    setTimeout(() => {
        let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("participantsTable").parentNode; // Get the table element
        switching = true;
        dir = "asc";
        while (switching) {
            switching = false;
            rows = table.getElementsByTagName("TR");
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[columnIndex];
                y = rows[i + 1].getElementsByTagName("TD")[columnIndex];
                if (dir == "asc" && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase() ||
                    dir == "desc" && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount++;
            } else if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
        showLoading(false);
    }, 100); // Adjust as necessary
}

function setupPagination(totalRows, rowsPerPage) {
    const pageCount = Math.ceil(totalRows / rowsPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Clear existing pagination buttons

    for (let i = 1; i <= pageCount; i++) {
        const btn = paginationButton(i);
        paginationContainer.appendChild(btn);
    }
}

function paginationButton(page) {
    const button = document.createElement('button');
    button.innerText = page;
    button.className = 'btn btn-sm btn-outline-primary mx-1'; // Ensure consistent class assignment

    // Initially set the active class on the current page button
    if (currentPage === page) {
        button.classList.add('active');
    }

    button.addEventListener('click', function() {
        currentPage = page;
        showData(page);

        // Update active state for buttons
        document.querySelectorAll('#pagination button').forEach(btn => {
            btn.classList.remove('active'); // Remove 'active' from all buttons
        });
        button.classList.add('active'); // Add 'active' to the clicked button
    });

    return button;
}

function filterByName() {
    const input = document.getElementById("nameFilter");
    const filter = input.value.toUpperCase();
    const filteredData = currentData.filter(row => row[2].toUpperCase().includes(filter)); // Assuming name is at index 2

    // Reset to first page and show filtered data
    currentPage = 1;
    showFilteredData(filteredData);
    setupPagination(filteredData.length, rowsPerPage); // Update pagination based on filtered data
}

function showFilteredData(filteredData) {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedItems = filteredData.slice(startIndex, endIndex);

    const tableBody = document.getElementById('participantsTable');
    tableBody.innerHTML = ''; // Clear existing rows
    paginatedItems.forEach((participant, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = startIndex + index + 1; // Adjust index for current page
        row.insertCell(1).textContent = participant[0]; // ID
        row.insertCell(2).textContent = participant[2]; // Name
        row.insertCell(3).textContent = participant[5]; // Finish Time
        row.insertCell(4).textContent = participant[7]; // Place
    });
}
