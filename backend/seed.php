<?php


// create SQLite database
$db = new PDO('sqlite:shipments.db');
// enable exceptions for database errors
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$numEntries = 10;

try {
    // create `shipments` table
    $db->exec("
        CREATE TABLE IF NOT EXISTS shipments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            timestamp DATETIME NOT NULL,
            status TEXT NOT NULL CHECK(status IN ('shipped', 'not shipped', 'cancelled'))
        )
    ");
    
    // deletes previous entries
    $db->exec("DELETE FROM shipments");
    

    $statuses = ['shipped', 'not shipped', 'cancelled'];
    $baseTimestamp = strtotime('2024-05-01 00:00:00'); 

    $shipments = [];

    for ($i = 1; $i <= $numEntries; $i++) {
        $randomStatus = $statuses[array_rand($statuses)];
        $randomTimestamp = date('Y-m-d H:i:s', $baseTimestamp + rand(0, 3600 * 24 * 30)); // some random date in a month
        $shipments[] = [
            'id' => $i,
            'name' => "Shipment $i",
            'status' => $randomStatus,
            'timestamp' => $randomTimestamp,
        ];
    }

    
    $stmt = $db->prepare('INSERT INTO shipments (id, name, status, timestamp) VALUES (:id, :name, :status, :timestamp)');

    foreach ($shipments as $shipment) {
        $stmt->execute($shipment);
    }

    

} catch (PDOException $e) {
    echo "we caught an error, for now we just echo: " . $e->getMessage() . "\n";
}

// close the PDO connection
$db = null;

?>
