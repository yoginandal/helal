<?php
// backend/api/add_doctor.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Include database connection
include_once '../config/database.php';

// Function to send JSON response
function send_response($status, $message, $data = null) {
    http_response_code($status);
    echo json_encode(['message' => $message, 'data' => $data]);
    exit;
}

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_response(405, 'Invalid request method.');
}

// --- File Upload Handling ---
$imagePath = null;
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = '../uploads/images/';
    $tempFile = $_FILES['image']['tmp_name'];
    
    // Sanitize the filename to prevent security issues
    $originalName = $_FILES['image']['name'];
    $fileExtension = pathinfo($originalName, PATHINFO_EXTENSION);
    $safeFilename = preg_replace("/[^A-Za-z0-9\._-]/", '', basename($originalName, "." . $fileExtension));
    $targetFile = $uploadDir . $safeFilename . '_' . time() . '.' . $fileExtension;

    // Check if file already exists (though timestamp makes it unlikely)
    if (file_exists($targetFile)) {
        send_response(409, 'File already exists. Please rename your file and try again.');
    }

    // Move the uploaded file
    if (move_uploaded_file($tempFile, $targetFile)) {
        // Store a relative path for use in the application
        $imagePath = '/backend' . str_replace('..', '', $targetFile);
    } else {
        send_response(500, 'Sorry, there was an error uploading your file.');
    }
} else {
    send_response(400, 'Image is required.');
}


// --- Database Insertion ---
$conn->begin_transaction();

try {
    // 1. Get data from POST request
    $doctorName = $_POST['doctorName'] ?? '';
    $department = $_POST['department'] ?? '';
    // ... get all other fields in the same way
    $degree = $_POST['degree'] ?? '';
    $experience = $_POST['experience'] ?? '';
    $hospital = $_POST['hospital'] ?? '';
    $currentPosition = $_POST['currentPosition'] ?? '';
    $city = $_POST['city'] ?? '';
    $state = $_POST['state'] ?? '';
    $expertise = $_POST['expertise'] ?? '';
    $specialty = $_POST['specialty'] ?? $department; // Fallback specialty to department

    // 2. Insert into `doctors` table
    $stmt = $conn->prepare("INSERT INTO doctors (id, doctorName, specialty, city, currentPosition, degree, state, hospital, experience, department, expertise, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    
    $doctorId = uniqid('doc_', true); // Generate a unique ID
    $stmt->bind_param("ssssssssssss", $doctorId, $doctorName, $specialty, $city, $currentPosition, $degree, $state, $hospital, $experience, $department, $expertise, $imagePath);
    $stmt->execute();
    
    // 3. Handle `sections` data
    if (isset($_POST['sections'])) {
        $sections = json_decode($_POST['sections'], true);
        if (is_array($sections)) {
            $sectionStmt = $conn->prepare("INSERT INTO doctor_sections (doctor_id, sectionHeading, sectionContent) VALUES (?, ?, ?)");
            foreach ($sections as $section) {
                $sectionHeading = $section['sectionHeading'] ?? '';
                $sectionContent = $section['sectionContent'] ?? '';
                $sectionStmt->bind_param("sss", $doctorId, $sectionHeading, $sectionContent);
                $sectionStmt->execute();
            }
            $sectionStmt->close();
        }
    }

    $stmt->close();
    $conn->commit();
    send_response(201, "Doctor profile created successfully.");

} catch (Exception $e) {
    $conn->rollback();
    // In production, log the error message instead of echoing it
    send_response(500, "Database error: " . $e->getMessage());
}

$conn->close();
?> 