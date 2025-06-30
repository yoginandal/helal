<?php

die("PHP script is executing.");

// backend/api/check_connection.php

// Enable full error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

$config_path = __DIR__ . '/../config/database.php';

if (!file_exists($config_path)) {
    die("Error: database.php not found at " . realpath(dirname($config_path)));
}

require_once $config_path;

header("Content-Type: application/json; charset=UTF-8");

if ($conn && $conn->ping()) {
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Database connection successful!"]);
} else {
    http_response_code(500);
    // Provide a more detailed error message for debugging
    $error_message = isset($conn->connect_error) ? $conn->connect_error : "Unknown connection error. Check credentials in database.php";
    echo json_encode(["status" => "error", "message" => "Database connection failed.", "details" => $error_message]);
}

if ($conn) {
    $conn->close();
}
?> 