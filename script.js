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
          //Code to send add task request to database
          $.get(
            "databaseOperations.php", 
            query,
            function(response) //response from database
            {
              // alert(response[1]);
              console.log("task added");
              insertNewRecord(formData,(JSON.parse(response))[0]);
            }
          );

		    }
        else {
            updateRecord(formData);

            //Code to send update task request to database
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

// Function for priority level restriction to range from 1-4
function restrictNumber(input) {
  var regularExpression = /[^1-4]/gi;
  input.value = input.value.replace(regularExpression, "Priority level can only be 1-4!");
}

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
function insertNewRecord(data, id) {
  var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
  var newRow = table.insertRow(table.length);
  newRow.setAttribute("id", id)
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
  document.getElementById("description").innerHTML.value = selectedRow.cells[0].innerHTML;
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

    //Delete Request Query 
    var query = "request=delete&taskID=" + row.id;
    // + "&category=" + td.cell2.value + "&date=" + td.cell3.value + "&level=" + td.cell4.value;
    //Code to send delete task request to database
    $.get(
      "databaseOperations.php", 
      query,
      function(response) //response from database
      {
        alert(response);
        console.log("task deleted");
      }
    );
    
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

//function to load tasks from database
function loadTasks(){
  console.log("loading tasks");
  
  //sql query option
  var query = "request=retrieve";


  //array to store array sent from database(to use outside of get function)
  var tasks;


  $.get(
    "databaseOperations.php", 
    query,
    function(response) //response from database
    {
        tasks = JSON.parse(response);
        console.dir(tasks);

        for(let i = 0; i < tasks.length; i++)
        {
          insertNewRecord({
          "description": tasks[i][1],
          "category": tasks[i][2],
          "date": new Date(tasks[i][3]),
          "level": parseInt(tasks[i][4])
          },tasks[i][0]);
        }
    }
  );

console.log("tasks loaded");
}