angular.module('directives', [])
	.directive('map', ['$window', '$timeout', 'd3Service', function($window, $timeout, d3Service) {
		return {
			restrict: 'E',
			scope: {
				points: '=points'
			},
			replace: true,
			link: function(scope, element, attrs) {
				
				$(document).ready(function() {
					scope.data = [], scope.tmp = [];

					var w = $window.innerWidth, h = $window.innerHeight, i = 0, points = [], interval, centered, scale, colorOpen = '#01ABEE', colorClick = '#00A650', colorProxy = '#DF4428';
					scale = ($window.innerWidth * 0.18).toFixed(2);
					
					function genLabels(data) {
						var rects =
							backgrounds.selectAll('rect')
								.data(data)
								.enter()
								.append('rect')
								.attr({
									x: function(d) { return projection([d.lon, d.lat])[0] - 75; },
									y: function(d) { return projection([d.lon, d.lat])[1] - 50 },
									rx: "4px",
									ry: "4px",
									width: "150px",
									height: "35px",
									id: function(d,i) { return "rect_" + i; },
									"stroke": "#000",
									"stroke-width": 0.25,
									"opacity": 0.0,
									"class": "item",
									"fill": function(d) { 
										if(d.state === 'open') return colorOpen;
										if(d.state === 'click') return colorClick;
										if(d.state === 'proxy') return colorProxy;
									}
								})
								.transition('ease')
								.duration(500)
								.attr({
									"opacity": 1.0
								})				

								.each(function(d,i) {
									var _selfRect = this;

									setTimeout(function() {
										d3Service.select(_selfRect)
											.transition()
											.duration(500)
											.attr({
												"opacity": 0.0
											})
											.remove()

											//remove from tmp
											angular.forEach(scope.tmp, function(item, index) {
												if(+item.id === d.id) {
													scope.tmp.splice(index, 1);
												}
											});
										
									}, 3000);
								});
					}

					function genText(data) {
						var texts = 
							backgrounds.selectAll('text')
							.data(data)
								.enter()
								.append('text')
								.text(function(d) { return d.email; })
								.each(function(d) {
									 d3Service.select(this).append("tspan")
				            .text(d.city)
				            .attr({
				            	x: function(d) { return projection([d.lon, d.lat])[0] - 70; },
											y: function(d) { return projection([d.lon, d.lat])[1] - 23; },
											id: function(d,i) { return 'subtext_' + i }
				            })
								})
								.attr({
									x: function(d) { return projection([d.lon, d.lat])[0] - 70; },
									y: function(d) { return projection([d.lon, d.lat])[1] - 36; },
									id: function(d,i) { return 'text_' + i; },
									"class": "item",
									"fill": "#fff",
									"font-size": "9px",
									"font-family": "sans-serif",
									"opacity": 0.0
								})
								.transition('ease')
								.duration(500)
								.attr({
									"opacity": 1.0
								})		
								.each(function(d,it) {
									var _selfText = this;
									setTimeout(function() {
										(function(i) {
											d3Service.select(_selfText)
												.transition()
												.duration(500)
												.attr({
													"opacity": 0.0
												})
												.remove();
										})(i);
									}, 3000);
								})
					}

					function genCircles(data) {
						var t = 
							f.selectAll('circle')
								.data(data)
								.enter()
								.append('circle')
								.attr({
									cx: function(d) { return projection([d.lon, d.lat])[0]; },
									cy: -300,
									r: 300,
									"fill": function(d) {
										if(d.state === 'open') return colorOpen;
										if(d.state === 'click') return colorClick;
										if(d.state === 'proxy') return colorProxy;
									}
								})
								.transition('linear')
								.duration(1000)
								.ease("bounce")
								.attr({
									cy: function(d) { return projection([d.lon, d.lat])[1]; },
									r: 2
								});
					}

					var projection = 
						d3Service.geo.mercator()
							.center([0, 41])
							.scale([scale])
							.translate([w/2, h/2]);
				
					var svg = 
						d3Service.select(element[0])
							.append('svg')
							.attr({ width: w, height: h });

					var path = 
						d3Service.geo.path()
							.projection(projection);

					var color = d3Service.scale.category20();

					var g = svg.append('g');
					var f = svg.append('g');
					var backgrounds = svg.append('g');

					d3Service.json('../bower_components/d3/world-110m2.json', function(error, topology) {
						g.selectAll('path')
							.data( topojson.feature(topology, topology.objects.countries).features )
							.enter()
							.append('path')
							.attr({
								'd': path,
							})
							.style({
								'fill': function(d,i) { return '#ddd'; }
							})

						scope.$watch('points', function(n,o) {
							if(n !== undefined) {
								if(n.length !== o.length) {
									
									for(var i = o.length;i < n.length;i++) {
										scope.data.push(n[i-1]);
										scope.tmp.push(n[i-1]);
									}
								}		

								genCircles(scope.data);
								genLabels(scope.tmp);
								genText(scope.tmp);		

							}
						}, true);
					});
				});
			}
		}
	}])
