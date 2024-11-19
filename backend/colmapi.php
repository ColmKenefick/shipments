<?php
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

// deal w/ the api get call for data 
if ($method === 'GET') {

    $dir = 'sqlite:/var/www/html/shipments.db';
    $dbh  = new PDO($dir);
    // maybe sort
    $query =  "SELECT id, name, status FROM shipments";

    foreach ($dbh->query($query) as $row)
    {
        // cast data to objects - easier for front end to consume
        $shipments[] = (object) $row;
    }
    
    http_response_code(200);
    echo json_encode(['status' => 'success', 'data' => $shipments]);

    $dbh = null; //close PDO connection
    
    
} else {
    // Method not allowed
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed. We only serve GET requests over here.']);
}
?>
