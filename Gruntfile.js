module.exports = function( grunt ) {
	'use strict';

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig( {

		pkg: grunt.file.readJSON( 'package.json' ),

		concat: {

			options: {
				stripBanners: true,
				banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
				' * <%= pkg.homepage %>\n' +
				' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
				' * Licensed GPLv2+' +
				' */\n'
			},

			grid: {

				src: [
				'assets/js/src/*.js'
				],

				dest: 'assets/js/grid.js'
			},

			css: {
				src: 'assets/css/sass/*.scss',
				dest: 'assets/css/base/grid.scss'
			}

		},


		uglify: {

			all: {
				files: {
					'assets/js/grid.min.js': ['assets/js/grid.js']
				},
				options: {
					banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
					' * <%= pkg.homepage %>\n' +
					' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
					' * Licensed GPLv2+' +
					' */\n',
					mangle: {
						except: ['jQuery']
					}
				}
			}
		},

		notify : {

			less : {
				options: {
					title : "LESS Complied",
					message : "style.css has been created",
					image : "/grunt-logo.png"
				}
			},

			concat : {
				options: {
					title : "Combined CSS files",
					message : "production.css has been created",
					image : "/grunt-logo.png"
				}
			}
		},

		browserSync: {
			dev: {

				bsFiles: {
					src : [
						'assets/css/grid.css',
						'assets/css/sass/*.scss',
						'./**/*.php'
					]
				},

				options: {
					proxy: "http://localhost/sites/grid/",
					watchTask: true
				}
			}
		},

		sass: {

			dist: {
				files: [{
					expand: true,
					cwd: 'assets/css/base/',
					src: ['grid.scss'],
					dest: 'assets/css/',
					ext: '.css'
				}]
			}
		},

		cssmin: {

			options: {
				banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
				' * <%= pkg.homepage %>\n' +
				' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
				' * Licensed GPLv2+' +
				' */\n'
			},

			minify: {
				expand: true,

				cwd: 'assets/css/',
				src: ['grid.css'],

				dest: 'assets/css/',
				ext: '.min.css'
			}
		},

		watch:  {

			sass: {
				files: ['assets/css/sass/*.scss'],
				tasks: ['concat','sass','cssmin','notify:less', 'notify:concat'],
				options: {
					debounceDelay: 500
				}
			},

			scripts: {
				files: ['assets/js/src/**/*.js', 'assets/js/vendor/**/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					debounceDelay: 500
				}
			}
		}
	});

	grunt.registerTask( 'default', ['browserSync', 'sass', 'concat', 'uglify', 'cssmin', 'notify:less', 'notify:concat', 'watch'] );

	grunt.util.linefeed = '\n';

};