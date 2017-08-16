all:
	npm install
	./node_modules/bower/bin/bower install
	./node_modules/grunt-cli/bin/grunt prod

watch:
	grunt dev