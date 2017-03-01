<?php
	$postdata 	= 	json_decode(file_get_contents("php://input"));
	$formdata	=	json_decode($postdata->formVal);
	$form_id	=	$postdata->formId;
	defined('DB_SERVER') ? null : define("DB_SERVER","localhost");
	defined('DB_USER')   ? null : define("DB_USER","root");
	defined('DB_PASS')   ? null : define("DB_PASS","");
	defined('DB_NAME')   ? null : define("DB_NAME","dynamic_form");
	
	$connection 	= 	@mysqli_connect(DB_SERVER,DB_USER, DB_PASS,DB_NAME);
	$new_fields		=	"";
	$update_fields	=	"";
	$alter_fields	=	"";
	for($i=0;$i<count($formdata);$i++){
		$form_id		=	1;
		$type			=	$formdata[$i]->component;
		$editable		=	$formdata[$i]->editable;
		$label			=	$formdata[$i]->label;
		$placeholder	=	$formdata[$i]->placeholder;
		$required		=	$formdata[$i]->required;
		$validation		=	($formdata[$i]->validation != '/.*/' ? $formdata[$i]->validation : '');
		$options		=	$formdata[$i]->options;
		$fieldid		=	$formdata[$i]->fieldid;
		$optionsString	=	"";
		for($j=0;$j<count($options);$j++){
			$optionsString	=	$options[$j].'|'.$optionsString;
		}
		$optionsString	=	substr($optionsString, 0, -1);
		
		switch($type){
			case 'Input':
				$dataType	=	'VARCHAR(250)';
			break;
			case 'textarea':
				$dataType	=	'TEXT';
			break;
			case 'checkbox':
				$dataType	=	'VARCHAR(1000)';
			break;
			case 'radio':
				$dataType	=	'VARCHAR(1000)';
			break;
			case 'select':
				$dataType	=	'VARCHAR(1000)';
			break;
			default:
			
			break;
		}
		
		if($fieldid != ""){
			$edit_query		=	"UPDATE `form` SET `type`='$type',`label`='$label',`placeholder`='$placeholder',`options`='$optionsString',`is_required`='$required',`validations`='$validation' 
								WHERE `id`=$fieldid";
			$result 		= 	mysqli_query($connection,$edit_query);
			$update_fields	=	"field_".$fieldid." ".$dataType.",".$update_fields;
		}else{
			$query			=	"INSERT INTO `form`(`type`, `is_editable`, `label`, `placeholder`, `options`, `is_required`, `validations`, `form_id`) 
								VALUES ('$type','$editable','$label','$placeholder','$optionsString','$required','$validation','$form_id')";
			$result 		= 	mysqli_query($connection,$query);
			$lastInsertId	=	mysqli_insert_id($connection);
			$alter_fields	=	" ADD field_".$lastInsertId." ".$dataType.",".$alter_fields;
			$new_fields		=	"field_".$lastInsertId." ".$dataType.",".$new_fields;
		}
	}
	$table_name	=	'tab_form_'.$form_id;
	if(mysqli_query($connection,"DESCRIBE `$table_name`")) {
		// ALTER TABLE
		$table_fields	=	substr($alter_fields, 0, -1);
		if($table_fields != ""){
			echo $alter_table_sql	=	"ALTER TABLE $table_name $table_fields";
			mysqli_query($connection,$alter_table_sql);
		}
	}else{
		// CREATE NEW TABLE
		$table_fields	=	$new_fields.$update_fields;
		$table_sql		= 	"CREATE TABLE $table_name (
								id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
								$new_fields
								created_date TIMESTAMP
							)";
		mysqli_query($connection,$table_sql);
	}
	
?>