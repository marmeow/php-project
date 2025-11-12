<?php

function rebAjaxRequest()
{
    $data = json_decode(file_get_contents("php://input"), true);
    $nom = $data['nom'];
    $nom = filter_var($nom, FILTER_SANITIZE_STRING);
    $data['nom'] = $nom;
    $email = $data['email'];
    $email = filter_var($nom, FILTER_SANITIZE_EMAIL);
    $data['email'] = $email;
    $nomArxiu = "../tiquets/tiquet-" . $nom . ".txt";
    $aux = 0;
    while (file_exists($nomArxiu)) {
        $aux++;
        $nomArxiu = "../tiquets/tiquet-" . $nom . "(" . $aux . ").txt";
    }

    if (!file_exists($nomArxiu)) {
        touch($nomArxiu);
        $arxiu = fopen($nomArxiu, "a");
        fwrite($arxiu, json_encode($data));
        fclose($arxiu);
    }


}

