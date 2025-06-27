<?php
// backend/api/check_connection.php

header("Content-Type: application/json; charset=UTF-8");

// Suppress errors for this test script to return clean JSON
error_reporting(0);
ini_set('display_errors', 0);

include_once '../config/database.php';

if ($conn && $conn->ping()) {
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Database connection successful!"]);
} else {
    http_response_code(500);
    // Provide a more detailed error message for debugging
    $error_message = isset($conn->connect_error) ? $conn->connect_error : "Unknown connection error.";
    echo json_encode(["status" => "error", "message" => "Database connection failed.", "details" => $error_message]);
}

if ($conn) {
    $conn->close();
}
?> 