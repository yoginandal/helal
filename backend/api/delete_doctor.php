<?php
// backend/api/delete_doctor.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include_once '../config/database.php';

// Function to send JSON response
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
    send_response(400, 'Doctor ID not provided.');
}

$id = $conn->real_escape_string($data->id);

$conn->begin_transaction();

try {
    // First, get the image path to delete the file later
    $imageResult = $conn->query("SELECT image FROM doctors WHERE id = '$id'");
    if ($imageResult->num_rows > 0) {
        $imageRow = $imageResult->fetch_assoc();
        $imagePath = $imageRow['image'];
        
        // Convert web path to server path
        $serverPath = realpath(__DIR__ . '/..') . str_replace('/backend', '', $imagePath);
        
        if (file_exists($serverPath)) {
            unlink($serverPath);
        }
    }

    // Delete from doctor_sections table
    $stmt1 = $conn->prepare("DELETE FROM doctor_sections WHERE doctor_id = ?");
    $stmt1->bind_param("s", $id);
    $stmt1->execute();
    $stmt1->close();

    // Delete from doctors table
    $stmt2 = $conn->prepare("DELETE FROM doctors WHERE id = ?");
    $stmt2->bind_param("s", $id);
    $stmt2->execute();
    
    if ($stmt2->affected_rows > 0) {
        $conn->commit();
        send_response(200, "Doctor deleted successfully.");
    } else {
        $conn->rollback();
        send_response(404, "Doctor not found or already deleted.");
    }
    $stmt2->close();

} catch (Exception $e) {
    $conn->rollback();
    send_response(500, "Database error: " . $e->getMessage());
}

$conn->close();
?> 