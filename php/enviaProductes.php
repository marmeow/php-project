<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$prodsDir = __DIR__ . '/../data/products/';
$prodsFile = $prodsDir . 'products.json';
$productes = json_decode(file_get_contents($prodsFile), true);

if ($productes){
    echo json_encode([
    'success' => true,
    'productes' => $productes
]);
} else {
    echo json_encode([
        'success' => false,
        'reason' => "Productes no trobats"
    ]);
}
