<?php
// backend/api/add_state.php
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

if (!isset($data->stateName) || empty(trim($data->stateName))) {
    send_response(400, 'State name cannot be empty.');
}

$stateName = trim($conn->real_escape_string($data->stateName));

// Check for duplicates
$checkStmt = $conn->prepare("SELECT id FROM states WHERE stateName = ?");
$checkStmt->bind_param("s", $stateName);
$checkStmt->execute();
if ($checkStmt->get_result()->num_rows > 0) {
    send_response(409, "A state with the name '{$stateName}' already exists.");
}
$checkStmt->close();

// Insert new state
try {
    $stmt = $conn->prepare("INSERT INTO states (id, stateName) VALUES (?, ?)");
    $stateId = uniqid('state_', true);
    $stmt->bind_param("ss", $stateId, $stateName);
    if ($stmt->execute()) {
        send_response(201, "State '{$stateName}' added successfully.");
    } else {
        throw new Exception("Failed to add state.");
    }
    $stmt->close();
} catch (Exception $e) {
    send_response(500, "Database error: Could not add state.");
}

$conn->close();
?> 