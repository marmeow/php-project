<?php
session_start();

//Carregar els usuaris des del json
$archivo = '../users/users.json';

$json = file_get_contents($archivo);
$usuarios = json_decode($json, true);

// Verificació de que la petició s'ha fet amb el mètode POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
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
        echo "Usuario o contraseña incorrectos. <a href='../public/pages/login.html'>Volver</a>";
    }
}
?>

<?php
/*Això s'hauria de posar a la part de dalt de tot del document "administracio" i així si fa login
un usuari que no es administrador no carregarà la pàgina
*/

/* session_start();
if (empty($_SESSION['usuari'])) {
    header('Location: ../index.html');
    exit;
} */
?>