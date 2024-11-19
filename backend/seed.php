<?php

// Create (or open) the SQLite database
$db = new PDO('sqlite:shipments.db');

// Enable exceptions for database errors
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    // Create the `shipments` table if it doesn't already exist
    $db->exec("
        CREATE TABLE IF NOT EXISTS shipments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            status TEXT NOT NULL CHECK(status IN ('shipped', 'not shipped', 'cancelled'))
        )
    ");
    echo "Table created or already exists.\n";

    // Clear existing data (optional)
    $db->exec("DELETE FROM shipments");
    echo "Table cleared.\n";

    // Seed data
    $seedData = [
        ['name' => 'Shipment A', 'status' => 'shipped'],
        ['name' => 'Shipment B', 'status' => 'not shipped'],
        ['name' => 'Shipment C', 'status' => 'cancelled'],
        ['name' => 'Shipment D', 'status' => 'shipped'],
        ['name' => 'Shipment E', 'status' => 'not shipped'],
        ['name' => 'Shipment F', 'status' => 'not shipped'],
        ['name' => 'Shipment G', 'status' => 'not shipped'],
        ['name' => 'Shipment H', 'status' => 'not shipped'],

    ];

    // Insert data into the table
    $stmt = $db->prepare("INSERT INTO shipments (name, status) VALUES (:name, :status)");
    foreach ($seedData as $data) {
        $stmt->execute([
            ':name' => $data['name'],
            ':status' => $data['status']
        ]);
    }

    echo "Seed data inserted successfully.\n";

} catch (PDOException $e) {
    // Handle errors
    echo "Error: " . $e->getMessage() . "\n";
}

// Close the connection
$db = null;

?>
