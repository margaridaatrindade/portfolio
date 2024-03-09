<meta charset="utf-8">

<?php

	include "abreconexao.php";
	$email = htmlspecialchars($_POST['email']);

	$stmt = $conn->prepare("UPDATE utilizador SET nome=?, data_nascimento=?, genero=?, morada=?, localidade=?, codigo_postal=?, telefone=?, email=? WHERE email='$email'");

	$nome = htmlspecialchars($_POST['nome']);
	$data_nascimento = htmlspecialchars($_POST['data_nascimento']);
	$genero = htmlspecialchars($_POST['genero']);
	$morada = htmlspecialchars($_POST['morada']);
	$localidade = htmlspecialchars($_POST['localidade']);
	$codigo_postal = htmlspecialchars($_POST['codigo_postal']);
	$telefone = htmlspecialchars($_POST['telefone']);
	$email = htmlspecialchars($_POST['email']);

    $stmt->bind_param("sssssiis",$nome,$data_nascimento,$genero,$morada,$localidade,$codigo_postal,$telefone,$email);

	$stmt->execute();
	$stmt->close();
	$conn->close();
?>