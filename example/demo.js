(function() {
	
	angular.module('app', ['builder', 'builder.components', 'validator.rules'])
	.controller('MainFormController', MainFormController)
	.controller('UserFormController', UserFormController)
	.controller('EditController', EditController);
	
	MainFormController.$inject = ['$scope', '$builder', '$validator','$http'];
    function MainFormController($scope, $builder, $validator,$http) {
        $scope.form 		= 	$builder.forms['default'];
		return $scope.submit = function() {
			var form_v 	= 	$("#form_val").html();
			var form_id = 	1;
			var post_v	=	{formVal:form_v,formId:form_id}
			console.log(form_v);
			$http({
				method:"POST",
				url:"formBuilder.php",
				data: post_v, 
				headers: { 'Content-Type': 'application/json' }
			}).success(function(res){
				
			})
			.error(function(data){
				console.log("Unable to add form");
			});
		};
    }
	
	UserFormController.$inject = ['$scope', '$builder', '$validator','$http'];
    function UserFormController($scope, $builder, $validator,$http) {
		
		//buildForm(form_id);
		var form_id	=	1;
		$http({
				method:"POST",
				url:"getForm.php",
				data: form_id, 
				headers: { 'Content-Type': 'application/json' }
			}).success(function(res){
				for(var i=0;i<res.length;i++){
					var type		=	res[i].type;
					var required_val=	false;
					if(res[i].is_required == 1){
						required_val	=	true;
					}
					var options_val	=	"";
					var options_str	=	res[i].options;
					if(options_str != ""){
						//options_val	=	options_str.replace('|', ',');
						options_val	=	options_str.split('|');
					}
					//console.log("=="+res[i].id);
					switch(type){
						case 'Input':
							textbox = $builder.addFormObject('default', {
								id			: 	'textbox',
								fieldid		: 	res[i].id,
								component	: 	'Input',
								label		: 	res[i].label,
								placeholder	: 	res[i].placeholder,
								required	: 	required_val,
								editable	: 	false
							});
						break;
						case 'textarea':
							textarea = $builder.addFormObject('default', {
								id			: 	'textarea',
								fieldid		: 	res[i].id,
								component	: 	'textarea',
								label		: 	res[i].label,
								placeholder	: 	res[i].placeholder,
								required	: 	required_val,
								editable	: 	false
							});
						break;
						case 'checkbox':
							checkbox = $builder.addFormObject('default', {
								id			: 	'checkbox',
								fieldid		: 	res[i].id,
								component	: 	'checkbox',
								label		: 	res[i].label,
								required	: 	required_val,
								options		: 	options_val,
								editable	: 	false
							});
						break;
						case 'radio':
							radio = $builder.addFormObject('default', {
								id			: 	'radio',
								fieldid		: 	res[i].id,
								component	: 	'radio',
								label		: 	res[i].label,
								required	: 	required_val,
								options		: 	options_val,
								editable	: 	false
							});
						break;
						case 'select':
							select = $builder.addFormObject('default', {
								id			: 	'select',
								fieldid		: 	res[i].id,
								component	: 	'select',
								label		: 	res[i].label,
								required	: 	required_val,
								options		: 	options_val,
								editable	: 	false
							});
						break;
						default:
						
						break;
					}
				}
			})
        $scope.form	= 	$builder.forms['default'];
		return $scope.formsubmit = function() {
			var form_v = $("#form_values").html();
			return $validator.validate($scope, 'default').success(function() {
				//return console.log('success');
				$http({
					method	:	"POST",
					url		:	"saveUserData.php",
					data	: 	form_v, 
					headers	: 	{ 'Content-Type': 'application/json' }
				}).success(function(res){
					
				})
				.error(function(data){
					console.log("Unable to add form");
				});
			}).error(function() {
				return console.log('error');
			});
		};
	}
	
	EditController.$inject = ['$scope', '$builder', '$validator','$http'];
    function EditController($scope, $builder, $validator,$http) {
		//console.log("EDIT CONTROLLER");
        var form_id	=	1;
		$http({
				method	:	"POST",
				url		:	"getForm.php",
				data	: 	form_id, 
				headers	: 	{ 'Content-Type': 'application/json' }
			}).success(function(res){
				for(var i=0;i<res.length;i++){
					var type		=	res[i].type;
					var required_val=	false;
					if(res[i].is_required == 1){
						required_val	=	true;
					}
					var options_val	=	"";
					var options_str	=	res[i].options;
					if(options_str != ""){
						options_val	=	options_str.split('|');
					}
					var validation_val=	'';
					if(res[i].validations != ""){
						validation_val	=	res[i].validations;
					}
					//console.log("=="+options_val);
					switch(type){
						case 'Input':
							textbox = $builder.addFormObject('default', {
								id			: 	'textbox',
								component	: 	'Input',
								fieldid		: 	res[i].id,
								label		: 	res[i].label,
								placeholder	: 	res[i].placeholder,
								required	: 	required_val,
								validation	:	validation_val,
								editable	: 	true
							});
						break;
						case 'textarea':
							textarea = $builder.addFormObject('default', {
								id			: 	'textarea',
								component	: 	'textarea',
								fieldid		: 	res[i].id,
								label		: 	res[i].label,
								placeholder	: 	res[i].placeholder,
								required	: 	required_val,
								editable	: 	true
							});
						break;
						case 'checkbox':
							checkbox = $builder.addFormObject('default', {
								id			: 	'checkbox',
								component	: 	'checkbox',
								fieldid		: 	res[i].id,
								label		: 	res[i].label,
								required	: 	required_val,
								options		: 	options_val,
								editable	: 	true
							});
						break;
						case 'radio':
							radio = $builder.addFormObject('default', {
								id			: 	'radio',
								component	: 	'radio',
								fieldid		: 	res[i].id,
								label		: 	res[i].label,
								required	: 	required_val,
								options		: 	options_val,
								editable	: 	true
							});
						break;
						case 'select':
							select = $builder.addFormObject('default', {
								id			: 	'select',
								component	: 	'select',
								fieldid		: 	res[i].id,
								label		: 	res[i].label,
								required	: 	required_val,
								options		: 	options_val,
								editable	: 	true
							});
						break;
						default:
						
						break;
					}
				}
			})
        $scope.form	= 	$builder.forms['default'];
		
		$scope.editFormSubmit = function() {
			var form_v 	= 	$("#editform_val").html();
			var form_id = 	1;
			var post_v	=	{formVal:form_v,formId:form_id}
			$http({
				method	:	"POST",
				url		:	"formBuilder.php",
				data	: 	post_v, 
				headers	: 	{ 'Content-Type': 'application/json' }
			}).success(function(res){
				
			})
			.error(function(data){
				console.log("Unable to add form");
			});
		};
    }
	
}).call(this);
