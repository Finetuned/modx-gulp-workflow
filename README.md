# modx-gulp-workflow
## A MODX Workflow (updated from the 2014 version by Menno Pietersen)

This contains a small set of changes to Menno Pietersen's initial setup as listed on https://video.modmore.com/modx-weekend-2014/sunday-frontend/rapid-modx-workflow/

You should at least go through the slides first.

My suggestions are:

Don't use elementhelper as there are still no proper instructions and it can and does really mess up everything.


In 2014, I
1. Added autoprefixer to the npm install
2. Changed sass build to use compass and scss/compass.rb

In 2017, to share this with delegates t MODxpo, I 
1. Added a basic gulpfile
Updated a bunch of deprecated 2. node modules
3. Added package.json to replace Menno's oneliner install.

_There's a fair bit missing from the gulpfile e.g. no production argument to remove the source maps. However, things have moved on a lot since 2014 and so it's barebones whilst I build a webpack workflow._

----------------------------------------------------

## Installing - OSX

### Prerequisites

Local development environment
=============================
You can use MAMP or similar.

I like to do this using Homebrew.
Follow this guide (Oct 2017) to set it up if you prefer:
https://getgrav.org/blog/macos-sierra-apache-multiple-php-versions

NB: use .test insted of .dev

Installing
==========
Install MODX (if not using on an existing site)
Clone this repo into (source from this folder) into assets/components/

## Install Extras
==============

### StaticSaver
-------------
StaticSaver creates static elements in the correct directories

#### Configure MODX
---------

1.0 Add Media sources for each internal type with a source of filesystem

e.g. Name : Chunks
	 Source Type: Filesystem

1.1  Edit the basepath for each new media source (with trailing delimiter ) e.g.
Right-click and choose 'update media source'

assets/components/source/elements/chunks/

repeat for snippets and templates

1.2 In System Settings : staticsaver (choose staticsaver from the core menu)

Enable 'Include Category Folder'

Set the media source values for configured types.
Set the static files extension e.g. html for chunks + templates, php for snippets.

Clear the cache
Now when you create static files, they'll be named and saved in the respective directories.

In order to save files into category folders, add content into the chunk.

NB: Gotcha:
If you specify an incorrect path and then save, the files are truncated and then you end up with nothing.

NB: no folders are created although you can paste the folder/ into the path. This doesn't work for nested categories though and any nested paths are truncated to the immediate category. This results in duplicate files :S

I logged this as an issue at https://github.com/argnist/StaticSaver/issues/9


Install Node JS
---------
Install node version manager first:

http://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/

Follow the instructions to install a version of node and set it as your default.

Install Node Modules
---------

Open the source directory in Terminal (Ctrl-click & choose Services > New Terminal at Folder)

$ npm i <module-name> --save-dev

Gulp Setup
---------
"gulp is a toolkit for automating painful or time-consuming tasks in your development workflow, so you can stop messing around and build something" - gulpjs.com

Install gulp globally
---------------------
$ npm i -g gulp

Configuration
-------------
Gulp uses a config file: Gulpfile.js

You just need to edit the one provided to configure it to set the paths to the compiled css and js files that the site will use.

It's currently set up to create files in:
assets/css/style.css
assets/js/main.js

If you want to change these find gulp.dest() in the file and change the paths to suit.


Running it
==========
In the terminal

$ gulp watch

this will start gulp and browserr-sync. Browser-sync will open a browser window at http://localhost:3000

When you add or edit files in scss, js, or the elements subfolders, browser-sync will refresh the page for you.

you should also see some other urls in the terminal e.g.

 Local: http://localhost:3000
 External: http://192.168.0.5:3000

You can set other browsers on your pc to the localhost url,
You can set multiple phones, tablets,browsers on other computers on the network to the external url.

All will reload when files change.


Stopping It
===========
type ctrl-c in the terminal to end the watch.

