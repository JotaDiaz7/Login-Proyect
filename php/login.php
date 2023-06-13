<?php

    session_start();

    $dates = '';

    if(!isset($_POST['email']) || empty($_POST['email'])){
        $dates = 'Error';
    }
    if(!isset($_POST['password']) || empty($_POST['password'])){
        $dates = 'Error';
    }
    if(filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) == FALSE) {
        $dates = 'Error';
    }

    include_once('config.php');

    $bd_connection = new mysqli($serverbd, $usserbd, $passbd, $bd);

    $bd_connection -> set_charset('utf8');

    if($bd_connection -> connect_error){
        $dates = 'Error connect';
    }else{
        $email = htmlspecialchars(trim($_POST['email']));
        $pass = md5(htmlspecialchars(trim($_POST['password'])));

        $consult = "SELECT * FROM users WHERE email='$email' AND pass='$pass' LIMIT 1";

        $result = $bd_connection -> query($consult);

        if($result -> num_rows == 0){
            $dates = 'Error result';
        }else{
            $dates = $result -> fetch_assoc();
            $dates['error'] = false;
            $_SESSION['logged'] = TRUE;
            $_SESSION['emai'] = $email;
            $_SESSION['error'] = false;
        }

        $result -> free_result();

        $bd_connection -> close();
    }

    echo json_encode($dates);

?>