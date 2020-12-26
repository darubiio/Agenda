<?php
	require('conector.php');
	$con = new conectorBD();

	$response['conexion'] = $con->initConexion($con->database);
	if ($response['conexion'] == 'OK'){
		$conexion = $con->getConexion();
		$insert = $conexion->prepare('INSERT INTO usuarios (email, nombre, password , fecha_nacimiento) VALUES (?,?,?,?)');
		$insert->bind_param("ssss", $email, $nombre, $password, $fecha_nacimiento);

		$d_password = "123123";
		$email = "labrador@mail.com";
		$nombre = "perro lucas";
		$password = password_hash($d_password, PASSWORD_DEFAULT);
		$fecha_nacimiento = "2017-11-03";

		$insert->execute();

		$email = 'sandra@mail.com';
		$nombre = 'sandra elena';
		$password = password_hash($d_password, PASSWORD_DEFAULT);
		$fecha_nacimiento = '1994-07-23';

		$insert->execute();

		$email = 'darubio@mail.com';
		$nombre = 'alejandro rubio';
		$password = password_hash($d_password, PASSWORD_DEFAULT);
		$fecha_nacimiento = '1997-03-16';

		$insert->execute();
		
		$response['resultado'] = "1";
		$response['msg']= 'Informacio de inicio:';
		$getUsers = $con->consultar(['usuarios'],['*'],$condicion = "");
		while ($fila= $getUsers->fetch_assoc()) {
			$response['msg'].=$fila['email'];
		}
		$response['msg'].= 'contraenia: '.$d_password;
		}else{
			$response['resultado'] == "0";
			$response['msg'] = 'No se pudo conectar a la base de datos';
		}

		echo json_encode($response);

 ?>
