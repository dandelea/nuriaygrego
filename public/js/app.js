'use strict';

// Declare app level module which depends on filters, and services

var app = angular.module('nurigrego', 
			[
				'ngRoute',
				'ngResource',
				'ngAnimate',
				'nurigrego.controllers',
				'nurigrego.filters',
				'nurigrego.services',
				'nurigrego.directives',
				'ui.bootstrap',
				'ngToast',
				'angularMoment',
				'noCAPTCHA'
			]
	);

app.config(['$routeProvider', '$locationProvider', '$controllerProvider', '$httpProvider', 'ngToastProvider', 'noCAPTCHAProvider',
	function ($routeProvider, $locationProvider, $controllerProvider, $httpProvider, ngToast, noCaptchaProvider) {
		app.registerCtrl = $controllerProvider.register;

		ngToast.configure({
			horizontalPosition: 'center',
			animation: 'fade'
		})

		$httpProvider.interceptors.push(function($q, $location) {
			return {
				response: function(response) {
					return response;
				},
				responseError: function(response) {
					switch (response.status) {
						case 404:
							$location.url('/404');
							break;
						default:
							$location.url('/404');
							break;
					}
					
					return $q.reject(response);
				}
			};
		});

		$routeProvider.
		when('/', {
			templateUrl: 'views/public/home/home.html',
			activetab: 'home',
			title: 'Inicio'
		}).
		when('/home', {
			templateUrl: 'views/public/home/home.html',
			activetab: 'home',
			title: 'Inicio'
		}).
		when('/contact', {
			templateUrl: 'views/public/contact/contact.html',
			activetab: 'contact',
			controller: 'ContactCtrl',
			title: 'Contacto'
		}).
		when('/gallery/:section/:page', {
			templateUrl: 'views/public/gallery/gallery.html',
			activetab: 'gallery',
			controller: 'GalleryCtrl',
			title: 'Galería'
		}).
		when('/gallery', {
			templateUrl: 'views/public/gallery/gallery.html',
			activetab: 'gallery',
			controller: 'GalleryCtrl',
			title: 'Galería'
		}).
		when('/video', {
			templateUrl : 'views/public/video/video.html',
			title: 'Video',
			activetab: 'video'
		}).
		when('/404', {
			templateUrl: 'views/public/errors/404.html',
			title: '404'
		}).
		otherwise({
			redirectTo: '/404',
			doNotTrack: true
		});

		$locationProvider.html5Mode(true);

		noCaptchaProvider.setSiteKey('6LdiFggUAAAAADteJoKFnOKOzU4BqLtH4g5_u1bB');
    	noCaptchaProvider.setTheme('dark');

}
]);