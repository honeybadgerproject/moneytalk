angular.module('app')
	.factory('ProjectService', ['$resource', function($resource) {
	        var Project = $resource('project/:projectId/:action', {projectId: '@id'}, {
						getUserProjects: { method: 'GET',  isArray:true },
						update: { method: 'PUT'},
						delete: { method: 'DELETE', isArray: true },
						like: {
										method: 'POST',
										params: {
			                action:'like',
			                projectId: '@id'
			            	}
						},
						dislike: {
										method: 'DELETE',
										params: {
											action: 'dislike',
											projectId: '@id'
										}
						}
					});

	        return Project;
	    }]);
