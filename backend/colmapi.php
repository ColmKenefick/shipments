<?php

header('Content-Type: application/json');

// prevents cors errors 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$method = $_SERVER['REQUEST_METHOD'];

// deal w/ the api get call for data 
if ($method === 'GET') {

    $dir = 'sqlite:/var/www/html/shipments.db';
    $dbh  = new PDO($dir);

    // return the top 10 for now - looks better
    $query =  "SELECT id, name, status, timestamp 
          FROM shipments
          ORDER BY timestamp DESC 
          LIMIT 10";

    foreach ($dbh->query($query) as $row)
    {
        // cast data to objects - easier for front end to consume
        $shipments[] = (object) $row;
    }
    
    http_response_code(200);
    echo json_encode(['status' => 'success', 'data' => $shipments]);

    $dbh = null; //close PDO connection
    
    
} else {
    // method other than GET are not allowed fro now
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed. We only serve GET requests over here.']);
}
?>
