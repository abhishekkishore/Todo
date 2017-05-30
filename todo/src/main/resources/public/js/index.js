var app = angular.module('indexModule', []);

var CREATE_PROJECT_TEXT_FIELD = "#create-project-name";
var MAIN_PAGE_PROJECT_NAME = '#main-page-project-name';

var PROJECT_ITEM_OPTIONS_CLASS = ".project-item-options";

var PROJECT_URL = '/projects';
app.controller('indexController', function($scope, $http) {
	$http.get(PROJECT_URL).then(function success(response) {
		$scope.projects = response.data.members;
	}, function error(response) {
		alert(response.data);
	});
	
	$scope.createProject = function($event) {
		var projectName = $(CREATE_PROJECT_TEXT_FIELD).val();
		var requestBody = {
				name: projectName,
				description: ''
		};
		$http.post(PROJECT_URL, requestBody).then(function success(response){
			$(CREATE_PROJECT_TEXT_FIELD).val('');
			$http.get(PROJECT_URL).then(function success(response) {
				$scope.projects = response.data.members;
			}, function error(response) {
				alert(response.data);
			});
		}, function error(response) {
			alert('Failed:'+response.data);
		});
	};
	
	$scope.deleteProject = function($event) {
		var element = angular.element($event.currentTarget);
		var parentRow = $(element).closest('tr'); 
		var id = $(parentRow).attr('data-project-id');
		$http.delete(PROJECT_URL + '/' + id).then(function success(response) {
			$http.get(PROJECT_URL).then(function success(response) {
				$scope.projects = response.data.members;
			}, function error(response) {
				alert(response.data);
			});
		}, function error(response) {
			alert(response.data);
		});
	}
	
	$scope.populateProjectData = function(project) {
		$(MAIN_PAGE_PROJECT_NAME).html(project.name);
	};
	
	$scope.mouseEnterProject = function($event) {
		var element = angular.element($event.currentTarget);
		$(element).css('background-color', 'lightpink');
		$(element).find(PROJECT_ITEM_OPTIONS_CLASS).css('display', 'table-cell');
	};
	
	$scope.mouseLeaveProject = function($event) {
		var element = angular.element($event.currentTarget);
		$(element).css('background-color', 'initial');
		$(element).find(PROJECT_ITEM_OPTIONS_CLASS).css('display', 'none');
	};
});