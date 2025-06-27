<?php
// backend/api/add_designation.php
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

if (!isset($data->designationName) || empty(trim($data->designationName))) {
    send_response(400, 'Designation name cannot be empty.');
}

$designationName = trim($conn->real_escape_string($data->designationName));

// Check for duplicates
$checkStmt = $conn->prepare("SELECT id FROM designations WHERE designationName = ?");
$checkStmt->bind_param("s", $designationName);
$checkStmt->execute();
if ($checkStmt->get_result()->num_rows > 0) {
    send_response(409, "A designation with the name '{$designationName}' already exists.");
}
$checkStmt->close();

// Insert new designation
try {
    $stmt = $conn->prepare("INSERT INTO designations (id, designationName) VALUES (?, ?)");
    $desigId = uniqid('desig_', true);
    $stmt->bind_param("ss", $desigId, $designationName);
    if ($stmt->execute()) {
        send_response(201, "Designation '{$designationName}' added successfully.");
    } else {
        throw new Exception("Failed to add designation.");
    }
    $stmt->close();
} catch (Exception $e) {
    send_response(500, "Database error: Could not add designation.");
}

$conn->close();
?> 