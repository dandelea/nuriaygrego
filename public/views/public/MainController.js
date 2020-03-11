'use strict'

angular.module('nurigrego').registerCtrl('MainCtrl', ['$scope', '$http', '$window', '$rootScope', '$route', function ($scope, $http, $window, $rootScope, $route) {

	var getRandomInt = function  (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	$http.get('/api/dedicatories')
	.then(function success(response) {
		$scope.dedicatories = response.data;
		$scope.displayed_dedicatory = response.data[1];

		setInterval(function(){
			var bodyTag = $('#dedicatory');
			var nameTag = $('#author');
			
			nameTag.hide();
			bodyTag.hide();

			nameTag.fadeOut();
			bodyTag.fadeOut();

			var i = getRandomInt(0, $scope.dedicatories.length - 1)

			$scope.displayed_dedicatory = 
				$scope.dedicatories[i];
			$scope.$apply();
			
			nameTag.fadeIn();
			bodyTag.fadeIn();
			
		},10*1000);

	});

	$scope.$route = $route;
	
	$rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
		if ($route.current.title) {
			$rootScope.title = $route.current.title;
		} else {
			$rootScope.title = '';
		}	
	});

	$scope.$on('$locationChangeStart', 
	function (event, next, current) {
		
		if (next.indexOf('/uploads/') > 0) {
			event.preventDefault();
		}
	});

}]);