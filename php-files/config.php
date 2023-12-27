<?php

    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "user_db";
    $port = 3310; // Specify the custom MySQL port
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $database, $port);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    echo "Connected successfully";
    
    // Rest of your PHP script goes here
    
    // Close connection
    $conn->close();   
?>