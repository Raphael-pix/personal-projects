<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $db = "user_db";

    $conn = mysqli_connect( $servername,$username,$db);

    if(!$conn){
        die("connection failed: ".mysqli_connect_error());
    }else{
        echo "connection successful";
    }

?>