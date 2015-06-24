nx-bootstrap
============

nexum bootstrap  d
fdsfsdf

## Folder Structure


- /app/
	- /fonts
	- /images
		- /testdata
	- /jade
		- /_layouts
		- /_mixins
		- /_modules
	- /scripts
		- /modules
		- /json
		- /vendor
		- controller.js
	- /styles
		- /components
		- /core
		- /modules
		- /vendor
		- main.less
- /dist
- /.tmp 
- .editorconfig
- .gitignore
- Gruntfile.js
- package.json
- README.md
- 

### Voraussetzungen
* [node.js]  (http://nodejs.org/) (add to PATH)
* [git] (https://code.google.com/p/msysgit/downloads/list?q=full+installer+official+git)

### Installation
* `git clone git@github.com:nexumAG/nx-bootstrap.git`
* `npm install`

## Grunt
### Livereload / Coding
* `grunt serve`
Startet den Livereload Server und öffnet den Browser. Änderungen Templates, Scripts oder Styles werden live übernommen.

### Build
* `grunt build`
Erstellt eine eigenständige Version im Ordner `dist/`. Minified und concatenated.


## Markup / Jade
Dateien mit _unterstrich.jade sind includes und werden nicht gebaut.
Globale Variablen:
date: aktueller Zeitstempel
page: aktuelle Datei / Pfad
language: de/en/fr (wird über den grunt parameter --lang=en gesteuert)
lang: Die Sprachdatei in der alle Funktionstexte gespeichert sind, die in /content/xx.json 

Für den schnellen Einstieg in Jade ist diese Seite empfehlenswert: [Jade Syntax Docs] (http://naltatis.github.io/jade-syntax-docs/)

## Styles / Less
Basis: Twitter Bootstrap
