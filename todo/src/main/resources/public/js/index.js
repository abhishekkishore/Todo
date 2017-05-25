var app = angular.module('indexModule', []);

var CREATE_PROJECT_TEXT_FIELD = "#create-project-name";
app.controller('indexController', function($scope, $http) {
	$http.get('/projects').then(function success(response) {
		$scope.projects = response.data.members;
		console.log($scope.projects);
	}, function error(response) {
		alert(response.data);
	});
	
	$scope.createProject = function($event) {
		alert($(CREATE_PROJECT_TEXT_FIELD).val());
		var projectName = $(CREATE_PROJECT_TEXT_FIELD).val();
		var requestBody = '{'
		$http.post('/projects').then(function success(response){
			$scope.$apply();
		}, function error(response) {
			alert('Failed:'+response.data);
		});
	}
	
	$scope.populateProjectData = function() {
		alert('Click!')
	};
	
	$scope.mouseEnterProject = function($event) {
		var element = angular.element($event.currentTarget);
		$(element).css('background-color', 'lightpink');
	};
	
	$scope.mouseLeaveProject = function($event) {
		var element = angular.element($event.currentTarget);
		$(element).css('background-color', 'initial');
	};
});