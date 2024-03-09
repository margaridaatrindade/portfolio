<?php 

session_start();

include "abreconexao.php";

$utilizador_comprador = $_SESSION['utilizador'];
$utilizador_vendedor = $_POST['vendedor'];
$artigo = $_POST['artigo_id'];
$data_compra = date('Y-m-d H:i:s'); //obtém a data atual

$sql = "INSERT INTO escolha (utilizador_comprador, utilizador_vendedor, artigo, data_compra) VALUES ('$utilizador_comprador', '$utilizador_vendedor', '$artigo', '$data_compra')";
if(mysqli_query($conn, $sql)){
    echo "Compra realizada com sucesso!";
}else{
    echo "Erro ao realizar a compra: " . mysqli_error($conn);
}

header('Location: check-out.php');

mysqli_close($conn);


?>