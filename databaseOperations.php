<?php
  $host = "127.0.0.1";
  $user = "root";
  $password = "Tmysqlpass123$";
  $db = "tasksDB";
  $connection = mysqli_connect($host, $user, $password, $db);

  switch ($_GET['request'])
  {
    case "add":
    //   $sql = "SELECT * FROM tasks WHERE taskID ='" . 
    //     $_GET['taskID'] . "'";
    
        $sql = "INSERT INTO tasksTable(taskDescription,category,taskDate,taskLevel) 
        VALUES ('" . $_GET["description"] . "', 
                '" . $_GET["category"] . "', 
                STR_TO_DATE('" . $_GET["date"] . "', '%m, %d, %Y'), 
                '" . $_GET["level"] . "')";
        $response= mysqli_query($connection, $sql);
        if($response== false)
          echo "Add operation FAILED.";
        else
        {
          $sql = "SELECT * FROM tasksTable
          ORDER BY taskID DESC
          LIMIT 0,1";
          $response= mysqli_query($connection, $sql);
          if($response == false)
          {
            echo "Add Sucessfull, new addition retrieval FAILED.";
          }
          else
          {
            $tasks = array();
            $tasks[] = mysqli_fetch_row($response);
            echo json_encode($tasks);
          }
        }
          

    break;

    //get all tasks
    case "retrieve":
      $sql = "SELECT * FROM tasksTable";
      $response = mysqli_query($connection, $sql);
      if($response == false)
        echo "retrieve operation FAILED.";
      else
      {
        $tasks = array();
        while($task = mysqli_fetch_row($response))
          $tasks[] = $task;
        echo json_encode($tasks);
          
      }
    break;

    //get tasks due today
    case "retrieve-today":
      $sql = "SELECT * FROM tasksdb.taskstable WHERE taskDate = '" . $_GET["day"] . "'
      ORDER BY taskLevel";
      $response = mysqli_query($connection, $sql);
      if($response == false)
        echo "retrieve-today operation FAILED.";
      else
      {
        $tasks = array();
        while($task = mysqli_fetch_row($response))
          $tasks[] = $task;
        echo json_encode($tasks);
          
      }
    break;

    //get tasks due tommorow
    case "retrieve-tommorow":
      $sql = "SELECT * FROM tasksdb.taskstable WHERE taskDate = '" . $_GET["day"] . "'
      ORDER BY taskLevel";
      $response = mysqli_query($connection, $sql);
      if($response == false)
        echo "retrieve operation FAILED.";
      else
      {
        $tasks = array();
        while($task = mysqli_fetch_row($response))
          $tasks[] = $task;
        echo json_encode($tasks);
          
      }
    break;

    //get tasks due next week
    case "retrieve-nextWeek":
      $sql = "SELECT * FROM tasksdb.taskstable WHERE DAYOFYEAR(taskDate) <= (dayofyear(CURDATE()) + 7) 
      AND DAYOFYEAR(taskDate) >= (dayofyear(CURDATE()))";
      $response = mysqli_query($connection, $sql);
      if($response == false)
        echo "retrieve operation FAILED.";
      else
      {
        $tasks = array();
        while($task = mysqli_fetch_row($response))
          $tasks[] = $task;
        echo json_encode($tasks);
          
      }
    break;


    //get tasks due during a chosen week
    case "retrieve-chooseWeek":
      $sql = "SELECT * FROM tasksdb.taskstable WHERE DAYOFYEAR(taskDate) <= (dayofyear('" . $_GET["start"] . "') + 7) 
      AND DAYOFYEAR(taskDate) >= (dayofyear('" . $_GET["start"] . "'))";
      $response = mysqli_query($connection, $sql);
      if($response == false)
        echo "Choose Week retrieve operation FAILED.";
      else
      {
        $tasks = array();
        while($task = mysqli_fetch_row($response))
          $tasks[] = $task;
        echo json_encode($tasks);
          
      }
    break;



    case "delete":
      $sql = "DELETE FROM tasksTable WHERE taskID = '" . $_GET["taskID"] . "'";
      $response = mysqli_query($connection, $sql);
      if($response == false)
        echo "delete operation FAILED.";
      else
      {
        echo "delete operation SUCCESSFUL.";
      }
    break;

    case "delete-category":
      $sql = "DELETE FROM tasksTable WHERE category = '" . $_GET["category"] . "'";
      $response = mysqli_query($connection, $sql);
      if($response == false)
        echo "Category delete operation FAILED.";
      else
      {
        echo "Category delete operation SUCCESSFUL.";
      }
    break;

    default:
      echo "Error: unknown database request.";

  }

?>
