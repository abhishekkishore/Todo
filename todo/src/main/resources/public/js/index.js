var app = angular.module('indexModule', []);

//app.directive('selectProject', function() {
//    var directive = {};
//
//    directive.restrict = 'A';
//
//    directive.link = function($scope, element, attributes) {
//        console.log('testing directive: ' + attributes.selectProject);
//        if(attributes.selectProject === 'true') {
//        	$scope.handleProjectSelection(element, attributes.projectId);
//        }
//    };
//
//    return directive;
//});

app.directive('draggableItem', function(){
    var directive = {};

    directive.link = function(scope, element, attributes) {
        element.attr('draggable', true);
        element.bind('dragstart', function(event){
            var parent = $(this).closest("table");
            var projectId = parent.attr(SIDENAV_PROJECT_ID_ATTR);
            event.dataTransfer.setDragImage(parent[0], 0, 0);
            event.dataTransfer.setData("leavingprojectid", projectId);
//            alert(event.dataTransfer.getData("leavingprojectid"));
        });
    }
    return directive;
});

app.directive('dropTargetItem', function(){
    var directive = {};

    directive.link = function(scope, element, attributes) {
//        element.bind('dragstart', function(e) {
//            e.dataTransfer.effectAllowed = 'none';
//        });
        element.bind('dragenter', function(e){
            var target = e.currentTarget;
            var child = $(target).find(PROJECT_NAME_DIV_CLASS);

        });
        element.bind('dragover', function(e){
            e.preventDefault();
        });

         element.bind('drop', function(e){
            e.preventDefault();
            var oldProjectId = e.dataTransfer.getData("leavingProjectId");
            var newProjectId = e.currentTarget.getAttribute(SIDENAV_PROJECT_ID_ATTR);

            if(oldProjectId !== newProjectId) {
                scope.changeProjectOrder(oldProjectId, newProjectId);
            }
         });
    }
    return directive;
});

var CREATE_PROJECT_TEXT_FIELD = "#create-project-name";
var MAIN_PAGE_PROJECT_NAME = '#main-page-project-name';
var MAIN_PAGE_CREATE_TASK_NAME_TEXT_FIELD = "#create-task-name";
var MAIN_PAGE_CREATE_TASK_DESCRIPTION_TEXT_FIELD = "#create-task-description";
var MAIN_PAGE_CREATE_DUE_DATE_TEXT_FIELD = "#create-task-due-date";

var CREATE_TASK_TEXT_FIELD = "#create-task-name";

var PROJECT_ITEM_OPTIONS_CLASS = ".project-item-options";
var PROJECT_NAME_DIV_CLASS = ".project-name-div";

var PROJECT_URL = '/projects';
var TASK_URL = '/tasks';

var task_creation_box_expanded = false;

var SELECTED_PROJECT_ID;
var SIDENAV_PROJECT_ID_ATTR = 'data-project-id';
app.controller('indexController', function($scope, $http) {

	$scope.init = function() {
	    $(MAIN_PAGE_CREATE_DUE_DATE_TEXT_FIELD).datepicker();
        repopulateProjectList();
	};

	function repopulateProjectList() {
	    $http.get(PROJECT_URL).then(function success(response) {
            $scope.projects = response.data.members;
        }, function error(response) {
            alert(response.data);
        });
	}

	$scope.changeProjectOrder = function(oldProjectId, newProjectId) {
//	    $http.get(PROJECT_URL + '/' + oldProjectId).then(function success(response) {
//            var project = response.data;
//        }, function error(response) {
//            alert(response.data);
//        });
        appendProjectToSwap(oldProjectId).then(function(result){
            return appendProjectToSwap(newProjectId, result[0]);
        })
        .then(function(result){
//            console.log(result);
            result[0].order = result[1].order;
            return updateProject(result[0]);
        })
        .then(function(result){
            repopulateProjectList();
        });
	};

	function updateProject(project) {
	    return new Promise(function(resolve, reject){
	        $http.put(PROJECT_URL + '/' + project.id, project).then(function success(response){
	            resolve(response.data);
	        }, function error(response){
	            reject(response.data);
	        });
	    });
	}

	function appendProjectToSwap(projectId, oldProject) {
	    return new Promise(function(resolve, reject){
	        $http.get(PROJECT_URL + '/' + projectId).then(function success(response) {
                var projects = [];
                if(oldProject) {
                    projects.push(oldProject);
                }
                projects.push(response.data);
                resolve(projects);
            }, function error(response) {
//                alert(response.data);
                reject(response.data);
            });
	    });
//	    $http.get(PROJECT_URL + '/' + oldProjectId).then(function success(response) {
//            var project = response.data;
//        }, function error(response) {
//            alert(response.data);
//        });
	}
	
	$scope.createProject = function($event) {
		var projectName = $(CREATE_PROJECT_TEXT_FIELD).val();
		var requestBody = {
				name: projectName,
				description: '',
				order: $scope.projects.length+1
		};
		$http.post(PROJECT_URL, requestBody).then(function success(response){
			$(CREATE_PROJECT_TEXT_FIELD).val('');
			$http.get(PROJECT_URL).then(function success(response) {
				$scope.projects = response.data.members;
			}, function error(response) {
//				alert(response.data);
			});
		}, function error(response) {
			alert('Failed:'+response.data);
		});
	};
	
	$scope.deleteProject = function($event) {
		var element = angular.element($event.currentTarget);
		var parentRow = $(element).closest('tr'); 
		var id = $(parentRow).attr(SIDENAV_PROJECT_ID_ATTR);
		$http.delete(PROJECT_URL + '/' + id).then(function success(response) {
			$http.get(PROJECT_URL).then(function success(response) {
				$scope.projects = response.data.members;
			}, function error(response) {
				alert(response.data);
			});
		}, function error(response) {
			alert(response.data);
		});
	};
	
	$scope.populateProjectData = function(projectId) {
		$http.get(PROJECT_URL + '/' + projectId).then(function success(response) {
			$scope.currentProject = response.data;
			$scope.currentProjectTasks = response.data.tasks;
			$(MAIN_PAGE_PROJECT_NAME).html($scope.currentProject.name);
		}, function error(response) {
			alert(response.data);
		});
	};
	
	$scope.handleCreateTask = function($event) {
		if($event.which === 13) {
			var name = $(CREATE_TASK_TEXT_FIELD).val();
			
			if($(MAIN_PAGE_CREATE_TASK_DESCRIPTION_TEXT_FIELD).css('display') !== 'none') {
				var description = $(MAIN_PAGE_CREATE_TASK_DESCRIPTION_TEXT_FIELD).val();
			}
			
			if($(MAIN_PAGE_CREATE_DUE_DATE_TEXT_FIELD).css('display') !== 'none') {
				var dueDate = $(MAIN_PAGE_CREATE_DUE_DATE_TEXT_FIELD).val();
			}
			$scope.createTask(name, description, dueDate, SELECTED_PROJECT_ID);
		}
	};
	
	$scope.createTask = function(name, description, dueDate, projectId) {
		var requestBody = {
				name: name,
				description: description,
				dueDate: dueDate,
				projectId: projectId
				
		};
		$http.post(TASK_URL, requestBody).then(function success(response){
			$(CREATE_TASK_TEXT_FIELD).val('');
			$(MAIN_PAGE_CREATE_TASK_DESCRIPTION_TEXT_FIELD).val('');
			$(MAIN_PAGE_CREATE_DUE_DATE_TEXT_FIELD).val('');
			$scope.populateProjectData(SELECTED_PROJECT_ID);
		}, function error(response) {
			alert('Failed:'+response.data);
		});
	};
	
	$scope.handleProjectClick = function($event, projectId) {
		var element = angular.element($event.currentTarget);
		$scope.handleProjectSelection(element, projectId);
	};
	
	$scope.handleProjectSelection = function(element, projectId) {
		if($(element).attr(SIDENAV_PROJECT_ID_ATTR) !== SELECTED_PROJECT_ID) {
			$('[' + SIDENAV_PROJECT_ID_ATTR + "=" + SELECTED_PROJECT_ID + ']').css('background-color', 'initial');
			$(element).css('background-color', 'lightgreen');
			$scope.populateProjectData(projectId);
			SELECTED_PROJECT_ID = projectId;
		}
	};
	
	$scope.mouseEnterProject = function($event) {
		var element = angular.element($event.currentTarget);
		if($(element).attr(SIDENAV_PROJECT_ID_ATTR) === SELECTED_PROJECT_ID) {
			$(element).css('background-color', 'limegreen');
		}
		else {
			$(element).css('background-color', 'lightpink');
		}
		$(element).find(PROJECT_ITEM_OPTIONS_CLASS).css('display', 'table-cell');
	};
	
	$scope.mouseLeaveProject = function($event) {
		var element = angular.element($event.currentTarget);
		if($(element).attr(SIDENAV_PROJECT_ID_ATTR) === SELECTED_PROJECT_ID) {
			$(element).css('background-color', 'lightgreen');
		}
		else {
			$(element).css('background-color', 'initial');
		}
		$(element).find(PROJECT_ITEM_OPTIONS_CLASS).css('display', 'none');
	};
	
	$scope.toggleTaskCreationFields = function($event) {
		var element = angular.element($event.currentTarget);
		if(!task_creation_box_expanded) {
			$(element).html('less');
			$(MAIN_PAGE_CREATE_TASK_DESCRIPTION_TEXT_FIELD).css('display', 'initial');
			$(MAIN_PAGE_CREATE_DUE_DATE_TEXT_FIELD).css('display', 'initial');
			$(MAIN_PAGE_CREATE_TASK_NAME_TEXT_FIELD).css('border-width', '0px 0px 2px 0px');
		}
		else {
			$(element).html('more');
			$(MAIN_PAGE_CREATE_TASK_DESCRIPTION_TEXT_FIELD).css('display', 'none');
			$(MAIN_PAGE_CREATE_DUE_DATE_TEXT_FIELD).css('display', 'none');
			$(MAIN_PAGE_CREATE_TASK_NAME_TEXT_FIELD).css('border-width', '0px 0px 0px 0px');
		}
		task_creation_box_expanded = !task_creation_box_expanded;
	};
});