<?php
	$formdata = json_decode(file_get_contents("php://input"));
	
	defined('DB_SERVER') ? null : define("DB_SERVER","localhost");
	defined('DB_USER')   ? null : define("DB_USER","root");
	defined('DB_PASS')   ? null : define("DB_PASS","");
	defined('DB_NAME')   ? null : define("DB_NAME","dynamic_form");
	
	$connection 	= 	@mysqli_connect(DB_SERVER,DB_USER, DB_PASS,DB_NAME);
	
	$fields	=	"";
	$values	=	"";
	for($i=0;$i<count($formdata);$i++){
		$fieldid	=	$formdata[$i]->fieldid;
		$value		=	$formdata[$i]->value;
		$fields		=	"field_".$fieldid.",".$fields;
		$values		=	"'".$value."',".$values;
	}
	$form_id	=	1;
	$table_name	=	'tab_form_'.$form_id;
	$fields		=	substr($fields, 0, -1);
	$values		=	substr($values, 0, -1);
	$query		=	"INSERT INTO $table_name($fields) 
					VALUES ($values)";
	$result 	= 	mysqli_query($connection,$query);
?>