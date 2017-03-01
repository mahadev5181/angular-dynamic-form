(function() {
  angular.module('builder.components', ['builder', 'validator.rules']).config([
    '$builderProvider', function($builderProvider) {
		$builderProvider.registerComponent('Input', {
			group		: 	'Default',
			label		: 	'Input',
			placeholder	: 	'placeholder',
			required	: 	false,
			validationOptions: [
			{
				label: 'none',
				rule: '/.*/'
			}, {
				label: 'number',
				rule: '[number]'
			}, {
				label: 'email',
				rule: '[email]'
			}, {
				label: 'url',
				rule: '[url]'
			}
			],
			templateUrl:'templates/inputTemplate.html',
			popoverTemplateUrl:'templates/inputPopUp.html',
		});
		$builderProvider.registerComponent('textarea', {
			group				: 	'Default',
			label				: 	'Text Area',
			placeholder			: 	'placeholder',
			required			: 	false,
			templateUrl			:	'templates/textareaTemplate.html',
			popoverTemplateUrl	:	'templates/textareaPopUp.html',
		});
		$builderProvider.registerComponent('checkbox', {
			group				: 	'Default',
			label				: 	'Checkbox',
			placeholder			: 	'placeholder',
			required			: 	false,
			options				: 	['value one'],
			arrayToText			: 	true,
			templateUrl			:	'templates/checkboxTemplate.html',
			popoverTemplateUrl	:	'templates/checkboxPopUp.html',
		});
		$builderProvider.registerComponent('radio', {
			group				: 	'Default',
			label				: 	'Radio',
			placeholder			: 	'placeholder',
			required			: 	false,
			options				: 	['value one'],
			templateUrl			:	'templates/radioTemplate.html',
			popoverTemplateUrl	:	'templates/radioPopUp.html',
		});
		return $builderProvider.registerComponent('select', {
			group				: 	'Default',
			label				: 	'Select',
			placeholder			: 	'placeholder',
			required			: 	false,
			options				: 	['value one'],
			templateUrl			:	'templates/selectTemplate.html',
			popoverTemplateUrl	:	'templates/selectPopUp.html',
		});
    }
  ]);

}).call(this);
