<?php
// backend/api/add_department.php
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

if (!isset($data->departmentName) || empty(trim($data->departmentName))) {
    send_response(400, 'Department name cannot be empty.');
}

$departmentName = trim($conn->real_escape_string($data->departmentName));

// Check for duplicates
$checkStmt = $conn->prepare("SELECT id FROM departments WHERE departmentName = ?");
$checkStmt->bind_param("s", $departmentName);
$checkStmt->execute();
if ($checkStmt->get_result()->num_rows > 0) {
    send_response(409, "A department with the name '{$departmentName}' already exists.");
}
$checkStmt->close();

// Insert new department
try {
    $stmt = $conn->prepare("INSERT INTO departments (id, departmentName) VALUES (?, ?)");
    $deptId = uniqid('dept_', true);
    $stmt->bind_param("ss", $deptId, $departmentName);
    if ($stmt->execute()) {
        send_response(201, "Department '{$departmentName}' added successfully.");
    } else {
        throw new Exception("Failed to add department.");
    }
    $stmt->close();
} catch (Exception $e) {
    send_response(500, "Database error: Could not add department.");
}

$conn->close();
?>
