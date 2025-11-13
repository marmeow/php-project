<?php
header('Content-Type: application/json');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    echo json_encode(["error" => "No s'han rebut dades o JSON invàlid"]);
    exit;
}

$nom = $data['nom'] ?? 'sense_nom';
$nom = filter_var($nom, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$data['nom'] = $nom;

if (isset($data['adreca'])) {
    $email = filter_var($data['adreca'], FILTER_SANITIZE_EMAIL);
    $data['email'] = $email;
}

$nomArxiu = "../tiquets/tiquet-" . $nom . ".txt";
$aux = 0;

while (file_exists($nomArxiu)) {
    $aux++;
    $nomArxiu = "../tiquets/tiquet-" . $nom . "(" . $aux . ").txt";
}

echo "Comprovant si el fitxer existeix: " . $nomArxiu . "\n";

if (!file_exists($nomArxiu)) {
    // Intentar crear el archivo
    $arxiu = fopen($nomArxiu, "w");

    if ($arxiu === false) {
        echo json_encode([
            "error" => "No s'ha pogut obrir l'arxiu",
            "file" => $nomArxiu,
            "dir_exists" => file_exists("../tiquets"),
            "dir_writable" => is_writable("../tiquets")
        ]);
        exit;
    }

    $jsonData = json_encode($data, JSON_PRETTY_PRINT);
    $bytes = fwrite($arxiu, $jsonData);

    if ($bytes === false) {
        echo json_encode(["error" => "Error en fwrite"]);
        fclose($arxiu);
        exit;
    }

    fclose($arxiu);
    echo json_encode(["success" => true, "file" => $nomArxiu, "bytes" => $bytes]);
} else {
    echo json_encode(["error" => "El fitxer ja existeix"]);
}


