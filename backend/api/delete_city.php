<?php
// backend/api/delete_city.php

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

if (!isset($data->id)) {
    send_response(400, 'City ID not provided.');
}

$id = $conn->real_escape_string($data->id);

try {
    $stmt = $conn->prepare("DELETE FROM cities WHERE id = ?");
    $stmt->bind_param("s", $id);
    $stmt->execute();
    
    if ($stmt->affected_rows > 0) {
        send_response(200, "City deleted successfully.");
    } else {
        send_response(404, "City not found or already deleted.");
    }
    $stmt->close();

} catch (Exception $e) {
    send_response(500, "Database error: " . $e->getMessage());
}

$conn->close();
?> 