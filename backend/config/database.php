<?php
// backend/config/database.php

$servername = "localhost";
$username = "helaldoy_helalhealthcare";
$password = "Digital@2025";
$dbname = "helaldoy_helalhealthcare";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set charset to utf8mb4 for full Unicode support
$conn->set_charset("utf8mb4");

?> 