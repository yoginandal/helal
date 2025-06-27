<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once '../config/database.php';

$id = isset($_GET['id']) ? $_GET['id'] : die();

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch doctor details
$stmt = $conn->prepare("SELECT * FROM doctors WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$doctor = $result->fetch_assoc();
$stmt->close();

if ($doctor) {
    // Fetch doctor sections
    $stmt_sections = $conn->prepare("SELECT sectionTitle, sectionContent FROM doctor_sections WHERE doctor_id = ? ORDER BY id");
    $stmt_sections->bind_param("i", $id);
    $stmt_sections->execute();
    $result_sections = $stmt_sections->get_result();
    
    $sections = [];
    while ($row = $result_sections->fetch_assoc()) {
        $sections[] = $row;
    }
    
    $doctor['sections'] = $sections;
    $stmt_sections->close();
}

$conn->close();

echo json_encode($doctor);
?>
