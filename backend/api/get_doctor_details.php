<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once '../config/database.php';

// Check if ID is provided
if (!isset($_GET['id']) || empty($_GET['id'])) {
    echo json_encode(['error' => 'Doctor ID is required']);
    exit;
}

$id = $_GET['id'];

// $conn is already created in database.php, no need to create it again
if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

// Debug: Log that we're connected (remove in production)
error_log("Connected to database successfully for doctor ID: " . $id);

// Fetch doctor details
$query = "SELECT id, doctorName as name, specialty, city, currentPosition, degree, state, hospital, experience, department, expertise, image FROM doctors WHERE id = ?";

$stmt = $conn->prepare($query);
if (!$stmt) {
    echo json_encode(['error' => 'Failed to prepare query: ' . $conn->error]);
    $conn->close();
    exit;
}

$stmt->bind_param("s", $id);
$stmt->execute();
$result = $stmt->get_result();
$doctor = $result->fetch_assoc();
$stmt->close();

// Query executed successfully

if (!$doctor) {
    // Log for debugging
    error_log("Doctor not found with ID: " . $id);
    echo json_encode(['error' => 'Doctor not found', 'searched_id' => $id]);
    $conn->close();
    exit;
}

    // Fetch doctor sections
    $stmt_sections = $conn->prepare("SELECT sectionHeading, sectionContent FROM doctor_sections WHERE doctor_id = ? ORDER BY id");
$stmt_sections->bind_param("s", $id);
    $stmt_sections->execute();
    $result_sections = $stmt_sections->get_result();
    
    $sections = [];
    while ($row = $result_sections->fetch_assoc()) {
        $sections[] = $row;
    }
    
    $doctor['sections'] = $sections;
    $stmt_sections->close();
$conn->close();

echo json_encode($doctor);
?>
