<?php
    session_start();

    $resposta=["correcte"=>false];

    if (!empty($_SESSION['usuari'])) {
        $resposta["correcte"]=$_SESSION['admin'];
    }

    echo json_encode($resposta);

?>