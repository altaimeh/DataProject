// Functionalities for table
var selectRow = null;
function onFormSubmit() {
    event.preventDefault();
    var formData = readFormData();
    if(selectedRow == null){
        insertNewRecord(formData);
    }
    else {
        updateRecord(formData);
    }
    resetForm();
}

// Retrieve the data
function readFormData() {
    var formData = {};
    formData["description"] = document.getElementById("description").value;
    formData["productName"] = document.getElementById("category").value;
    formData["qty"] = document.getElementById("date").value;
    formData["perPrice"] = document.getElementById("priority").value;
    return formData;
}

// Insert the data
function insertNewRecord(data) {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.Description;
    var cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.Category;
    var cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.Date;
    var cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.Priority;
    var cell5 = newRow.insertCell(4);
        cell5.innerHTML = "<button onClick= 'onEdit(this)'>Edit</button> <button>Delete</button>";
}

// Edit the data
function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById('description').value = selectedRow.cells[0].innerHTML;
    document.getElementById('category').value = selectedRow.cells[1].innerHTML;
    document.getElementById('date').value = selectedRow.cells[2].innerHTML;
    document.getElementById('priority').value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.Description;
    selectedRow.cells[1].innerHTML = formData.Category;
    selectedRow.cells[2].innerHTML = formData.Date;
    selectedRow.cells[3].innerHTML = formData.Priority;
}

// Delete the data
function onDelete(td) {
    if(confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
    }
    resetForm();
}

//Reset the data
function resetForm() {
    document.getElementById('description').value = ' ';
    document.getElementById('category').value = ' ';
    document.getElementById('date').value = ' ';
    document.getElementById('priority').value = ' ';
}