<?php
// Ruta del fichero JSON
$archivo = '../users/users.json';

// Verificació de que la petició s'ha fet amb el mètode POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recollir i sanejar les dades
    $nombre = trim($_POST['userName'] ?? '');
    $password = trim($_POST['password'] ?? '');

    $nombre = filter_var($nombre, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $password = filter_var($password, FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    // Comprovar que tots els camps són obligatòris
    if (empty($nombre) || empty($password)) {
        die("<p>Error: El nom i la contrasenya són obligatoris.</p>");
    }

    // Comprovem que el fitxer existeix
    if (!file_exists($archivo)) {
        die("<p>Error: El fitxer no existeix.</p>");
    }

    // Llegir i decodificar el JSON
    $json = file_get_contents($archivo);
    $usuarios = json_decode($json, true);

    if (!is_array($usuarios)) {
        die("<p>Error: El fitxer JSON no és vàlid.</p>");
    }

    // Buscar l'usuari
    $usuariTrobat = null;
    foreach ($usuarios as $usuario) {
        if ($usuario['nombre'] === $nombre) {
            $usuariTrobat = $usuario;
            break;
        }
    }

    if (!$usuariTrobat) {
        die("<p>Error: Usuari no trobat.</p>");
    }

    // Verificar la contrasenya amb password_verify
    if (password_verify($password, $usuariTrobat['password'])) {
        echo "<p>Benvingut/da, $nombre! Sessió iniciada correctament.</p>";
        // Iniciar sessió PHP si vols
        // session_start();
        // $_SESSION['usuario'] = $nombre;
    } else {
        die("<p>Error: Contrasenya incorrecta.</p>");
    }
}
?>