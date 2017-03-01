<?php
	$form_id = (file_get_contents("php://input"));
	
	defined('DB_SERVER') ? null : define("DB_SERVER","localhost");
	defined('DB_USER')   ? null : define("DB_USER","root");
	defined('DB_PASS')   ? null : define("DB_PASS","");
	defined('DB_NAME')   ? null : define("DB_NAME","dynamic_form");
	
	$connection = 	@mysqli_connect(DB_SERVER,DB_USER, DB_PASS,DB_NAME);
	$sql		=	"SELECT * FROM `form` WHERE form_id=1";
	$query 		= 	mysqli_query($connection,$sql);
	$rows 		= 	array();
    while($row 	= 	mysqli_fetch_assoc($query)){
		$rows[] = $row;
    }
	//echo "<pre>";print_r($rows);
	echo json_encode($rows);
?>