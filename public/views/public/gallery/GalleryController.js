'use strict'

angular.module('nurigrego').registerCtrl('GalleryCtrl', ['$scope', '$http', '$routeParams', '$location', function ($scope, $http, $routeParams, $location) {

	$scope.section = $routeParams.section;
	$scope.currentPage = parseInt($routeParams.page);
	$scope.pageSize = 20;
	$scope.Math = Math;

	if (!$scope.section) {
		$scope.section='reportaje'
	}

	if (!$scope.currentPage) {
		$scope.currentPage = 0;
	}

	$http.get('/api/gallery')
	.then(function success(response) {
		$scope.images_photocall = response.data['PHOTOCALL'];
		$scope.images_reportaje = response.data['REPORTAJE'];
		$scope.images_invitados = response.data['INVITADOS'];
	});

	$scope.nextPage = function () {
		$scope.currentPage = $scope.currentPage+1;
		$location.path('/gallery/'+$scope.section+'/'+$scope.currentPage);
	}

	$scope.previousPage = function () {
		$scope.currentPage = Math.max(0, $scope.currentPage-1);
		$location.path('/gallery/'+$scope.section+'/'+$scope.currentPage);
	}

}]);