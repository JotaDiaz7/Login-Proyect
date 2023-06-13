<?php

    session_start();

    if(!isset($_POST['name_register']) || empty($_POST['name_register'])){
        echo json_encode('Error1');
        exit;
    }
    if(!isset($_POST['email_register']) || empty($_POST['email_register'])){
        echo json_encode('Error2');
        exit;
    }else{
        $email = filter_var($_POST['email_register'], FILTER_VALIDATE_EMAIL) == FALSE;
    }
    if(!isset($_POST['password_register']) || empty($_POST['password_register'])){
        echo json_encode('Error3');
        exit;
    }
    if($_POST['password_register'] != $_POST['password_register_2']){
        echo json_encode('Error_pass');
        exit;
    }
    if(!isset($_POST['checkbox_register']) || empty($_POST['checkbox_register'])){
        echo json_encode('Error');
        exit;
    }
    
    include_once('config.php');

    $bd_connection = new mysqli($serverbd, $usserbd, $passbd, $bd);

    $bd_connection -> set_charset('utf8');

    if($bd_connection -> connect_error){
        $dates = 'Error connect';
    }else{
        $name = htmlspecialchars(trim($_POST['name_register']));
        $email = htmlspecialchars(trim($_POST['email_register']));
        $pass = md5(htmlspecialchars(trim($_POST['password_register'])));

        try {
            $consult = "INSERT INTO users (`email`,`pass`, `name`) VALUES ('$email', '$pass', '$name')";
            $result = $bd_connection -> query($consult);
        } catch (mysqli_sql_exception $e) {
            echo json_encode('Error_repeat');
            exit;
        }

        if($result){
            echo json_encode("OK");
            exit;
        }else{
            echo json_encode('E1');
            exit;
        }

        $bd_connection -> close();
    }

    echo json_encode($dates);

?>