<?php
  $host = "127.0.0.1";
  $user = "root";
  $password = "----";
  $db = "tasksDB";
  $connection = mysqli_connect($host, $user, $password, $db);

  switch ($_GET['request'])
  {
    case "add":
    //   $sql = "SELECT * FROM tasks WHERE taskID ='" . 
    //     $_GET['taskID'] . "'";
    
        $sql = "INSERT INTO tasksTable(taskDescription,category,taskDate,taskLevel) 
        VALUES ('" . $_GET["description"] . "', '" . 
                     $_GET["category"] . "', '" . 
                     $_GET["date"] . "', '" . 
                     $_GET["level"] .  
                "')";
        $response= mysqli_query($connection, $sql);
        if($response== false)
          echo "Add operation FAILED.";
        else
          echo "Add operation successful.Added: ", 
          $_GET['description'], ".";
      
      
    break;

    default:
      echo "Error: unknown database request.";

  }

?>
