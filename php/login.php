<?php
session_start();

// Recuperar la informació que s'està passant pel document login.js
header('Content-Type: application/json');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

//Carregar els usuaris des del json
$archivo = '../users/users.json';

$json = file_get_contents($archivo);
$usuarios = json_decode($json, true);

// Verificació de que la petició s'ha fet amb el mètode POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $resposta=["correcte"=>false];
    // Recollir i sanejar les dades
    $nombre = trim($_POST['userName'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if(isset($usuarios[$nombre]) && $password == $usuarios[$nombre]["contrasenya"]){
        session_regenerate_id(true); //Quan fas el login et genera una altra sessió internament
        $_SESSION['usuari'] = $usuarios[$nombre];
        $_SESSION['admin'] = $usuarios[$nombre]["admin"];
        header("Location: ../public/index.html");
        exit();
    } else{
        echo json_encode($resposta);
    }
}

//Hauré d'enviar 2 cookies, una per el nom i l'altre per l'admin
?>