// Function to load and display data
function loadData() {
    // Assuming the JSON data is available as a global variable or through an API call
    // For local file access, consider using a server or adjust according to your setup
    fetch('punishmenthistory_with_place.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('participantsTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear existing rows
            data.forEach((row, index) => {
                let tr = `<tr>
                    <td>${row[0]}</td>
                    <td>${row[2]}</td>
                    <td>${row[5]}</td>
                    <td>${row[7]}</td> 
                </tr>`;
                tableBody.innerHTML += tr;
            });
        });
}

// Function to sort table columns
function sortTable(column) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("participantsTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    // Make a loop that will continue until no switching has been done:
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        // Loop through all table rows (except the first, which contains table headers):
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            // Get the two elements you want to compare, one from current row and one from the next:
            x = rows[i].getElementsByTagName("TD")[column];
            y = rows[i + 1].getElementsByTagName("TD")[column];
            // Check if the two rows should switch place, based on the direction, asc or desc:
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            // If a switch has been marked, make the switch and mark that a switch has been done:
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount ++;
        } else {
            // If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again.
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

// Load data on page load
window.onload = loadData;
