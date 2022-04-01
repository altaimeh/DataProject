


window.onload = () => {
  setTimeout(() => {
    document.querySelector("body").classList.add("display");
  }, 10);
};

document.querySelector(".hamburger-menu").addEventListener("click", () => {
  document.querySelector(".container").classList.toggle("change");
});

document.querySelector(".scroll-btn").addEventListener("click", () => {
  document.querySelector("html").style.scrollBehavior = "smooth";
  setTimeout(() => {
    document.querySelector("html").style.scrollBehavior = "unset";
  }, 1000);
});

// Functionalites for dynamic table
var selectedRow = null

function myFunction(e) {
	event.preventDefault();
        var formData = readFormData();
    
        //Add Request Query 
        var query = "request=add&description=" + formData["description"] + "&category=" + formData["category"] +
           "&date=" + formData["date"] + "&level=" + formData["level"];
        
      
        if (selectedRow == null){

            insertNewRecord(formData);
            //Code to send add task request to database
            $.get(
              "databaseOperations.php", 
              query,
              function(response) //response from database
              {
                alert(response);
              }
            );
		    }
        else {
            updateRecord(formData);
            $.get(
              "databaseOperations.php", 
              query,
              function(response) //response from database
              {
                alert(response);
              }
            );
	    	}
            resetForm();    
}

// Function to make priority level between 1-4 
const errorMessage = document.getElementById('error');
form.addEventListener('submit', (e) => {
let message = []
if (level.value >= 5 || level.value <= 0) {
message.push('Priority level has to be between 1-4')
}
}) 

// Function to store the data
function readFormData() {
  var formData = {};
  formData["description"] = document.getElementById("description").value;
  formData["category"] = document.getElementById("category").value;
  formData["date"] = document.getElementById("date").value;
  formData["level"] = document.getElementById("level").value;
  return formData;
}

// Function to insert the data
function insertNewRecord(data) {
  var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.description;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.category;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.date;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.level;
  cell4 = newRow.insertCell(4);
      cell4.innerHTML = `<button onClick="onDelete(this)">Delete</button>`;
}

//Edit the data
function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("description").value = selectedRow.cells[0].innerHTML;
  document.getElementById("category").value = selectedRow.cells[1].innerHTML;
  document.getElementById("date").value = selectedRow.cells[2].innerHTML;
  document.getElementById("level").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.description;
  selectedRow.cells[1].innerHTML = formData.category;
  selectedRow.cells[2].innerHTML = formData.date;
  selectedRow.cells[3].innerHTML = formData.level;
}

//Delete the data
function onDelete(td) {
  if (confirm('You have chosen to delete this form. Are you sure you want to continue?')) {
      row = td.parentElement.parentElement;
      document.getElementById('storeList').deleteRow(row.rowIndex);
      resetForm();
  }
}

//Reset the data
function resetForm() {
  document.getElementById("description").value = '';
  document.getElementById("category").value = '';
  document.getElementById("date").value = '';
  document.getElementById("level").value = '';
  selectedRow = null;
}