<?php
// backend/api/check_connection.php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once '../config/database.php';

header("Content-Type: application/json; charset=UTF-8");

if ($conn && $conn->ping()) {
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Database connection is successful."]);
} else {
    http_response_code(500);
    $error_message = isset($conn->connect_error) ? $conn->connect_error : "Unknown connection error.";
    echo json_encode(["status" => "error", "message" => "Database connection failed.", "details" => $error_message]);
}

if ($conn) {
    $conn->close();
}
?> 