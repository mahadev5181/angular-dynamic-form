<?php
	$formdata = json_decode(file_get_contents("php://input"));
	
	defined('DB_SERVER') ? null : define("DB_SERVER","localhost");
	defined('DB_USER')   ? null : define("DB_USER","root");
	defined('DB_PASS')   ? null : define("DB_PASS","");
	defined('DB_NAME')   ? null : define("DB_NAME","dynamic_form");
	
	$connection = 	@mysqli_connect(DB_SERVER,DB_USER, DB_PASS,DB_NAME);
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
			$optionsString	=	$options[$j].','.$optionsString;
		}
		if($fieldid != ""){
			$edit_query	=	"UPDATE `form` SET `type`='$type',`label`='$label',`placeholder`='$placeholder',`options`='$optionsString',`is_required`='$required',`validations`='$validation' 
							WHERE `form_id`=$form_id";
			$result 	= 		mysqli_query($connection,$edit_query);
		}else{
			$query	=	"INSERT INTO `form`(`type`, `is_editable`, `label`, `placeholder`, `options`, `is_required`, `validations`, `form_id`) 
						VALUES ('$type','$editable','$label','$placeholder','$optionsString','$required','$validation','$form_id')";
			$result = 	mysqli_query($connection,$query);
		}
	}
?>