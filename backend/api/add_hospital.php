<?php
// backend/api/add_hospital.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
include_once '../config/database.php';

function send_response($status, $message) {
    http_response_code($status);
    echo json_encode(['message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_response(405, 'Invalid request method.');
}

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->hospitalName) || empty(trim($data->hospitalName))) {
    send_response(400, 'Hospital name cannot be empty.');
}

$hospitalName = trim($conn->real_escape_string($data->hospitalName));

// Check for duplicates
$checkStmt = $conn->prepare("SELECT id FROM hospitals WHERE hospitalName = ?");
$checkStmt->bind_param("s", $hospitalName);
$checkStmt->execute();
if ($checkStmt->get_result()->num_rows > 0) {
    send_response(409, "A hospital with the name '{$hospitalName}' already exists.");
}
$checkStmt->close();

// Insert new hospital
try {
    $stmt = $conn->prepare("INSERT INTO hospitals (id, hospitalName) VALUES (?, ?)");
    $hospitalId = uniqid('hosp_', true);
    $stmt->bind_param("ss", $hospitalId, $hospitalName);
    if ($stmt->execute()) {
        send_response(201, "Hospital '{$hospitalName}' added successfully.");
    } else {
        throw new Exception("Failed to add hospital.");
    }
    $stmt->close();
} catch (Exception $e) {
    send_response(500, "Database error: Could not add hospital.");
}

$conn->close();
?> 