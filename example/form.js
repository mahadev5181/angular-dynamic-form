(function() {
  angular.module('app', ['builder', 'builder.components', 'validator.rules']).controller('FormController', [
    '$scope', '$builder', '$validator','$http', function($scope, $builder, $validator,$http) {
		var checkbox, textbox;
		  textbox = $builder.addFormObject('default', {
			id			: 'textbox',
			component	: 'textInput',
			label		: 'Name',
			description	: 'Your name',
			placeholder: 'Your name',
			required: true,
			editable: false
		  });
		  checkbox = $builder.addFormObject('default', {
			id: 'checkbox',
			component: 'checkbox',
			label: 'Pets',
			description: 'Do you have any pets?',
			options: ['Dog', 'Cat']
		  });
		  $scope.form = $builder.forms['default'];
		$scope.input = [];
		$scope.defaultValue = {};
		$scope.defaultValue[textbox.id] = 'default value';
		$scope.defaultValue[checkbox.id] = [true, true];
    }
  ]);

}).call(this);
