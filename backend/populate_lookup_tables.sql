-- Populate Cities Table
INSERT IGNORE INTO cities (id, cityName) 
SELECT DISTINCT 
  CONCAT('city_', ROW_NUMBER() OVER (ORDER BY city)) as id,
  city as cityName
FROM doctors 
WHERE city IS NOT NULL AND city != '' AND TRIM(city) != '';

-- Populate Departments Table  
INSERT IGNORE INTO departments (id, departmentName)
SELECT DISTINCT 
  CONCAT('dept_', ROW_NUMBER() OVER (ORDER BY department)) as id,
  department as departmentName
FROM doctors 
WHERE department IS NOT NULL AND department != '' AND TRIM(department) != '';

-- Populate Hospitals Table
INSERT IGNORE INTO hospitals (id, hospitalName)
SELECT DISTINCT 
  CONCAT('hosp_', ROW_NUMBER() OVER (ORDER BY hospital)) as id,
  hospital as hospitalName
FROM doctors 
WHERE hospital IS NOT NULL AND hospital != '' AND TRIM(hospital) != '';

-- Also populate from specialty field for departments
INSERT IGNORE INTO departments (id, departmentName)
SELECT DISTINCT 
  CONCAT('spec_', ROW_NUMBER() OVER (ORDER BY specialty)) as id,
  specialty as departmentName
FROM doctors 
WHERE specialty IS NOT NULL AND specialty != '' AND TRIM(specialty) != ''
AND specialty NOT IN (SELECT departmentName FROM departments);

-- Check the results
SELECT 'Cities' as TableName, COUNT(*) as RecordCount FROM cities
UNION ALL
SELECT 'Departments' as TableName, COUNT(*) as RecordCount FROM departments  
UNION ALL
SELECT 'Hospitals' as TableName, COUNT(*) as RecordCount FROM hospitals; 