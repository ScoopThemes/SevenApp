'use strict';
var path = require('path');

module.exports = function(grunt) {
	// Do grunt-related things in here
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'app/css/styles.css': 'app/sass/styles.scss'
				}
			}
		},
		shell: {
	        git_add: {
	            command: 'git add -A'
	        },
	        git_commit: {
	            command: 'git commit -m "<%= pkg.name %> - <%= pkg.lastComment %>"'
	        },
	        git_push: {
	            options: {
	                stdout: true
	            },
	            command: 'git push'
	        },
	        shutdown: {
	            command: 'shutdown /p'
	        }
		},
		'ftp-deploy': {
		  build: {
		    auth: {
		      host: 'dyaa.me',
		      port: 21,
		      authKey: 'key1'
		    },
		    src: '.',
		    dest: '#',
		    exclusions: ['.ftppass', '.git','node_modules','gruntfile.js','package.json','app/sass/**.scss']
		  }
		},
		backup: {
		    root_backup: {
		      	src: '.',
		      	dest: '../<%= pkg.name %>.tgz'
		    },
		},
	    watch: {
	    	options: { livereload: true },
	      	sass: {
	        	files: ['app/sass/styles.scss'],
	        	tasks: ['newer:sass:dist'],
	      	}
	    },
	    bumpup: {
	        file: 'package.json'
	    },
		connect: {
			server: {
				options: {
					port: 9005,
					base: 'app',
					hostname: '*',
					livereload:true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-backup');
	grunt.loadNpmTasks('grunt-ftp-deploy');
	grunt.loadNpmTasks('grunt-bumpup');

	grunt.task.registerTask('default', ['connect','watch']);
	grunt.task.registerTask('git', ['bumpup:patch','shell:git_add','shell:git_commit','shell:git_push']);
	grunt.task.registerTask('ftp', ['ftp-deploy']);
	grunt.task.registerTask('goodbye', ['shell:shutdown']);

};