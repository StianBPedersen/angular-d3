'use strict';

/**
 * @ngdoc function
 * @name d3TestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the d3TestApp
 */
angular.module('d3TestApp')
  .controller('MainCtrl', ['$scope', '$window', '$interval', 'd3Service', function($scope, $window, $interval, d3Service) {
    $scope.points = [], $scope.open = 0, $scope.click = 0, $scope.proxy = 0;
    var i = 1, interval;

	  //mock locations
	  var locations = [
			{ id: 1, lat: "59.55", lon: "10.45", city: "Oslo", state: "open", "email": "1@make.as" },
			{ id: 2, lat: "59.20", lon: "18.30", city: "Stockholm", state: "click", "email": "2@make.as" },
			{ id: 3, lat: "62.28", lon: "06.08", city: "Ålesund", state: "proxy", "email": "3@make.as" },
			{ id: 4, lat: "60.39", lon: "5.32", city: "Bergen", state: "open", "email": "4@make.as" },
			{ id: 5, lat: "-6.13" , lon: "39.31", city: "Pikk", state: "open", "email": "5@make.as" },
			{ id: 6, lat: "35.68", lon: "139.76", city: "Pikk", state: "open", "email": "6@make.as" },
			{ id: 7, lat: "-36.85", lon: "174.78", city: "Pikk", state: "open", "email": "7@make.as" },
			{ id: 8, lat: "13.75", lon: "100.48", city: "Pikk", state: "open", "email": "8@make.as" },
			{ id: 9, lat: "29.01", lon: "77.38", city: "Pikk", state: "open", "email": "9@make.as" },
			{ id: 10, lat: "1.36", lon: "103.75", city: "Pikk", state: "open", "email": "10@make.as" },
			{ id: 11, lat: "-15.67", lon: "-47.43", city: "Pikk", state: "open", "email": "11@make.as" },
			{ id: 12, lat: "-22.90", lon: "-43.24", city: "Pikk", state: "open", "email": "12@make.as" },
			{ id: 13, lat: "43.64", lon: "-79.40", city: "Pikk", state: "open", "email": "13@make.as" },
			{ id: 14, lat: "-27.11",lon: " -109.36", city: "Pikk", state: "open", "email": "14@make.as" },
			{ id: 15, lat: "47.61", lon: "-122.33", city: "Pikk", state: "click", "email": "15@make.as" },
			{ id: 16, lat: "70.59", lon: "25.59", city: "Honningsvåg", state: "open", "email": "16@make.as" },
			{ id: 17, lat: "58.55", lon: "10.45", city: "Oslo", state: "open", "email": "17@make.as" },
			{ id: 18, lat: "57.20", lon: "18.30", city: "Stockholm", state: "click", "email": "18@make.as" },
			{ id: 19, lat: "-36.85", lon: "74.78", city: "nird", state: "proxy", "email": "19@make.as" },
			{ id: 20, lat: "15.75", lon: "120.48", city: "Pikk", state: "open", "email": "20@make.as" },
			{ id: 21, lat: "-4.13" , lon: "39.31", city: "Pikk", state: "open", "email": "21@make.as" },
			{ id: 22, lat: "33.68", lon: "139.76", city: "Pikk", state: "open", "email": "22@make.as" },
			{ id: 23, lat: "-32.85", lon: "174.78", city: "Pikk", state: "open", "email": "23@make.as" },
			{ id: 24, lat: "12.75", lon: "100.48", city: "Pikk", state: "open", "email": "24@make.as" },
			{ id: 25, lat: "21.01", lon: "77.38", city: "Pikk", state: "open", "email": "25@make.as" },
			{ id: 26, lat: "16.36", lon: "103.75", city: "Pikk", state: "open", "email": "26@make.as" },
			{ id: 27, lat: "-17.67", lon: "-47.43", city: "Pikk", state: "open", "email": "11@make.as" },
			{ id: 28, lat: "-28.90", lon: "-43.24", city: "Pikk", state: "open", "email": "12@make.as" },
			{ id: 29, lat: "49.64", lon: "-79.40", city: "Pikk", state: "open", "email": "13@make.as" },
			{ id: 30, lat: "-27.11",lon: " -109.36", city: "Pikk", state: "open", "email": "14@make.as" },
			{ id: 31, lat: "46.61", lon: "-102.33", city: "Pikk", state: "open", "email": "15@make.as" },
			{ id: 32, lat: "75.59", lon: "25.59", city: "Honningsvåg", state: "open", "email": "16@make.as" },
			{ id: 33, lat: "54.55", lon: "10.45", city: "Oslo", state: "open", "email": "1@make.as" },
			{ id: 34, lat: "53.20", lon: "18.30", city: "Stockholm", state: "click", "email": "2@make.as" },
			{ id: 35, lat: "-32.85", lon: "74.78", city: "nird", state: "proxy", "email": "3@make.as" },
			{ id: 36, lat: "11.75", lon: "120.48", city: "Pikk", state: "open", "email": "4@make.as" },
			{ id: 37, lat: "-16.13" , lon: "39.31", city: "Pikk", state: "open", "email": "5@make.as" },
			{ id: 38, lat: "32.68", lon: "139.76", city: "Pikk", state: "open", "email": "6@make.as" },
			{ id: 39, lat: "-33.85", lon: "174.78", city: "Pikk", state: "open", "email": "7@make.as" },
			{ id: 40, lat: "14.75", lon: "100.48", city: "Pikk", state: "open", "email": "8@make.as" },
			{ id: 41, lat: "25.01", lon: "77.38", city: "Pikk", state: "open", "email": "9@make.as" },
			{ id: 42, lat: "1.36", lon: "103.75", city: "Pikk", state: "open", "email": "10@make.as" },
			{ id: 43, lat: "-15.69", lon: "-47.43", city: "Pikk", state: "open", "email": "11@make.as" },
			{ id: 44, lat: "-22.92", lon: "-43.24", city: "Pikk", state: "open", "email": "12@make.as" },
			{ id: 45, lat: "43.67", lon: "-79.40", city: "Pikk", state: "open", "email": "13@make.as" },
			{ id: 46, lat: "-27.15",lon: " -109.36", city: "Pikk", state: "open", "email": "14@make.as" },
			{ id: 47, lat: "42.61", lon: "-102.33", city: "Pikk", state: "open", "email": "15@make.as" },
			{ id: 48, lat: "73.59", lon: "25.59", city: "Honningsvåg", state: "open", "email": "16@make.as" },
			{ id: 49, lat: "52.55", lon: "10.45", city: "Oslo", state: "open", "email": "1@make.as" },
			{ id: 50, lat: "56.20", lon: "18.30", city: "Stockholm", state: "click", "email": "2@make.as" },
			{ id: 51, lat: "-17.85", lon: "54.78", city: "nird", state: "proxy", "email": "3@make.as" },
			{ id: 52, lat: "17.75", lon: "120.48", city: "Pikk", state: "open", "email": "4@make.as" },
			{ id: 53, lat: "-7.13" , lon: "39.31", city: "Pikk", state: "open", "email": "5@make.as" },
			{ id: 54, lat: "37.68", lon: "139.76", city: "Pikk", state: "open", "email": "6@make.as" },
			{ id: 55, lat: "-38.85", lon: "174.78", city: "Pikk", state: "open", "email": "7@make.as" },
			{ id: 56, lat: "19.75", lon: "100.48", city: "Pikk", state: "open", "email": "8@make.as" },
			{ id: 57, lat: "39.01", lon: "77.38", city: "Pikk", state: "open", "email": "9@make.as" },
			{ id: 58, lat: "31.36", lon: "103.75", city: "Pikk", state: "open", "email": "10@make.as" },
			{ id: 59, lat: "-13.67", lon: "-47.43", city: "Pikk", state: "open", "email": "11@make.as" },
			{ id: 61, lat: "-23.90", lon: "-43.24", city: "Pikk", state: "open", "email": "12@make.as" },
			{ id: 61, lat: "45.64", lon: "-79.40", city: "Pikk", state: "open", "email": "13@make.as" },
			{ id: 62, lat: "-22.11",lon: " -109.36", city: "Pikk", state: "open", "email": "14@make.as" },
			{ id: 63, lat: "44.61", lon: "-102.33", city: "Pikk", state: "open", "email": "15@make.as" },
			{ id: 64, lat: "76.59", lon: "25.59", city: "Honningsvåg", state: "open", "email": "16@make.as" },
			{ id: 65, lat: "53.55", lon: "10.45", city: "Oslo", state: "open", "email": "1@make.as" }
		];

		interval = $interval(function() {
			if(+i > +locations.length - 1) $interval.cancel(interval);
			
			$scope.points.push(locations[i-1]);

			if(+i >= 2) {
				if($scope.points[i-2].state === 'open') $scope.open++;
				if($scope.points[i-2].state === 'click') $scope.click++;
				if($scope.points[i-2].state === 'proxy') $scope.proxy++;
			}
			i++;
		}, 300);



  }]);
