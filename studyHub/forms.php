<?php
$_conn = new mysqli("localhost","root","","user_db");

$email = $_POST["email"];
$password = $_POST["password"];
$cpassword = $_POST["conpassword"];

if($conn -> connect_error){
    die("connection failed:" .$conn -> connect_error );
}else{
    $stmt = $conn->prepare("insert into user_form(email,password,conpassword)VALUES(?,?,?)");
    $stmt->bind_param("sss",$email,$password,$cpassword);
    $stmt->execute();
    echo"registration successful";
    $stmt->close();
    $conn->close();
}
