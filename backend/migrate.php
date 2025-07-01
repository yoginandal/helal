<?php
set_time_limit(300); // Set execution time to 5 minutes
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: text/plain; charset=UTF-8");

require_once 'config/database.php';

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Database connection successful.\n\n";

$conn->query("SET foreign_key_checks = 0");

// Schemas for the new tables
$schemas = [
    "cities_new" => "CREATE TABLE `cities_new` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(255) NOT NULL,
        `old_id` VARCHAR(255) UNIQUE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",

    "states_new" => "CREATE TABLE `states_new` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(255) NOT NULL,
        `old_id` VARCHAR(255) UNIQUE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
    
    "hospitals_new" => "CREATE TABLE `hospitals_new` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(255) NOT NULL,
        `old_id` VARCHAR(255) UNIQUE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",

    "departments_new" => "CREATE TABLE `departments_new` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(255) NOT NULL,
        `old_id` VARCHAR(255) UNIQUE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",

    "designations_new" => "CREATE TABLE `designations_new` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(255) NOT NULL,
        `old_id` VARCHAR(255) UNIQUE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",

    "doctors_new" => "CREATE TABLE `doctors_new` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(255) NOT NULL,
        `specialty` VARCHAR(255),
        `currentPosition` VARCHAR(255),
        `degree` VARCHAR(255),
        `experience` VARCHAR(255),
        `expertise` TEXT,
        `image` TEXT,
        `phone` VARCHAR(255),
        `email` VARCHAR(255),
        `website` VARCHAR(255),
        `city_id` INT,
        `state_id` INT,
        `hospital_id` INT,
        `department_id` INT,
        `old_id` VARCHAR(255) UNIQUE,
        FOREIGN KEY (`city_id`) REFERENCES `cities_new`(`id`) ON DELETE SET NULL,
        FOREIGN KEY (`state_id`) REFERENCES `states_new`(`id`) ON DELETE SET NULL,
        FOREIGN KEY (`hospital_id`) REFERENCES `hospitals_new`(`id`) ON DELETE SET NULL,
        FOREIGN KEY (`department_id`) REFERENCES `departments_new`(`id`) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",

    "doctor_sections_new" => "CREATE TABLE `doctor_sections_new` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `doctor_id` INT NOT NULL,
        `heading` VARCHAR(255),
        `content` TEXT,
        FOREIGN KEY (`doctor_id`) REFERENCES `doctors_new`(`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
];

// Create new tables
echo "STEP 1: Creating new tables...\n";
foreach ($schemas as $table => $schema) {
    echo "  - Dropping table if exists: $table\n";
    $conn->query("DROP TABLE IF EXISTS `$table`");
    echo "  - Creating table: $table\n";
    if ($conn->query($schema) === TRUE) {
        echo "    -> Success.\n";
    } else {
        die("    -> ERROR creating table $table: " . $conn->error . "\n");
    }
}
echo "----------------------------------------\n";


// Helper function to migrate simple lookup tables
function migrate_lookup_table($conn, $old_table, $old_name_col, $new_table) {
    echo "STEP 2: Migrating data for `$new_table`...\n";
    $name_to_new_id_map = [];

    $sql = "SELECT `id`, `$old_name_col` FROM `$old_table`";
    $result = $conn->query($sql);
    if (!$result) {
        die("  -> ERROR reading from $old_table: " . $conn->error . "\n");
    }

    $stmt = $conn->prepare("INSERT INTO `$new_table` (name, old_id) VALUES (?, ?)");
    
    while ($row = $result->fetch_assoc()) {
        $old_id = $row['id'];
        $name = trim($row[$old_name_col]);

        if (empty($name)) continue;

        if (!isset($name_to_new_id_map[$name])) {
            $stmt->bind_param("ss", $name, $old_id);
            if ($stmt->execute()) {
                $new_id = $conn->insert_id;
                $name_to_new_id_map[$name] = $new_id;
                echo "  - Migrated: '$name' (Old ID: $old_id -> New ID: $new_id)\n";
            } else {
                echo "  - WARNING: Could not insert '$name': " . $stmt->error . "\n";
            }
        }
    }
    $stmt->close();
    echo "  -> Migration for `$new_table` complete.\n";
    echo "----------------------------------------\n";
    return $name_to_new_id_map;
}

// Migrate lookup tables and create maps
$city_map = migrate_lookup_table($conn, 'cities', 'cityName', 'cities_new');
$state_map = migrate_lookup_table($conn, 'states', 'stateName', 'states_new');
$hospital_map = migrate_lookup_table($conn, 'hospitals', 'hospitalName', 'hospitals_new');
$department_map = migrate_lookup_table($conn, 'departments', 'departmentName', 'departments_new');

// Migrate Doctors
echo "STEP 3: Migrating `doctors` table...\n";
$doctor_old_to_new_id_map = [];
$sql = "SELECT * FROM `doctors`";
$result = $conn->query($sql);
if (!$result) {
    die("  -> ERROR reading from doctors: " . $conn->error . "\n");
}

$stmt = $conn->prepare("INSERT INTO `doctors_new` (name, specialty, currentPosition, degree, experience, expertise, image, phone, email, website, city_id, state_id, hospital_id, department_id, old_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

while ($row = $result->fetch_assoc()) {
    $city_id = isset($row['city']) ? ($city_map[trim($row['city'])] ?? null) : null;
    $state_id = isset($row['state']) ? ($state_map[trim($row['state'])] ?? null) : null;
    $hospital_id = isset($row['hospital']) ? ($hospital_map[trim($row['hospital'])] ?? null) : null;
    $department_id = isset($row['department']) ? ($department_map[trim($row['department'])] ?? null) : null;

    $stmt->bind_param("ssssssssssiiiis", 
        $row['doctorName'], $row['specialty'], $row['currentPosition'], $row['degree'], 
        $row['experience'], $row['expertise'], $row['image'], $row['phone'], 
        $row['email'], $row['website'], $city_id, $state_id, 
        $hospital_id, $department_id, $row['id']
    );

    if ($stmt->execute()) {
        $new_id = $conn->insert_id;
        $doctor_old_to_new_id_map[$row['id']] = $new_id;
        echo "  - Migrated Doctor: '{$row['doctorName']}' (Old ID: {$row['id']} -> New ID: $new_id)\n";
    } else {
        echo "  - WARNING: Could not insert Doctor '{$row['doctorName']}': " . $stmt->error . "\n";
    }
}
$stmt->close();
echo "  -> Migration for `doctors` complete.\n";
echo "----------------------------------------\n";


// Migrate Doctor Sections
echo "STEP 4: Migrating `doctor_sections` table...\n";
$sql = "SELECT * FROM `doctor_sections`";
$result = $conn->query($sql);
if (!$result) {
    die("  -> ERROR reading from doctor_sections: " . $conn->error . "\n");
}

$stmt = $conn->prepare("INSERT INTO `doctor_sections_new` (doctor_id, heading, content) VALUES (?, ?, ?)");

while ($row = $result->fetch_assoc()) {
    $new_doctor_id = $doctor_old_to_new_id_map[$row['doctor_id']] ?? null;

    if ($new_doctor_id) {
        $stmt->bind_param("iss", $new_doctor_id, $row['sectionHeading'], $row['sectionContent']);
        if ($stmt->execute()) {
            echo "  - Migrated section for New Doctor ID: $new_doctor_id\n";
        } else {
            echo "  - WARNING: Could not insert section for New Doctor ID $new_doctor_id: " . $stmt->error . "\n";
        }
    } else {
        echo "  - WARNING: Could not find new doctor ID for old doctor_id: {$row['doctor_id']}\n";
    }
}
$stmt->close();
echo "  -> Migration for `doctor_sections` complete.\n";
echo "----------------------------------------\n";


$conn->query("SET foreign_key_checks = 1");
$conn->close();

echo "\n\n**************** MIGRATION COMPLETE ****************\n\n";
echo "The script has finished. A new set of tables with the `_new` suffix has been created.\n";
echo "Your original tables are untouched.\n\n";
echo "IMPORTANT NEXT STEPS:\n";
echo "1. Use phpMyAdmin or another tool to look at the new tables (`cities_new`, `doctors_new`, etc.) and verify the data looks correct.\n";
echo "2. If everything is correct, run the following SQL queries in your database manager to swap the old tables with the new ones:\n\n";
echo "   -- BACKUP OLD TABLES AND ACTIVATE NEW ONES --\n";

$tables_to_rename = ['cities', 'states', 'hospitals', 'departments', 'designations', 'doctors', 'doctor_sections'];
foreach($tables_to_rename as $table) {
    echo "   RENAME TABLE `$table` TO `{$table}_old`, `{$table}_new` TO `$table`;\n";
}

echo "\n3. After renaming the tables, the application will use the new, efficient structure.\n";
echo "4. Once you are sure everything works, you can delete the `_old` tables.\n\n";

?> 