var filtersPresets = 
{
	regex_cache : [],

	include_patterns : 
		[
			"*://*.google.tld/search*",
			"*://stackoverflow.tld/*",

			"*://groups.google.com/*",
			"*://answers.oreilly.com/*",

			"*://*readthedocs.org/*",
			"*://apidock.com/*",
	
			"*://developer.mozilla.org/*",
			
			// msdn
			"*://msdn.microsoft.com/*",
			"*://code.msdn.microsoft.com/*",
			"*://social.msdn.microsoft.com/*",


			// javadocs, general
			"*://*/docs/javadocs/*",

			// repository sites?
			//"*://code.google.com/*",
			//"://github.com/*",
			//*://bl.ocks.org/*",
		
			// clojure
			"*://clojure.org/*",
			"*://clojure.github.com/clojure/*",	

			// nodejs
			"*://nodejs.org/api/*",
			
			// coffeescript
			"*://coffeescript.org/*",

			// ruby
			"*://ruby-doc.org/*",
			"*://www.ruby-doc.org/*",
			"*://api.rubyonrails.org/*",

			// host many projects' documentation, generted by yard.	
			"*://rubydoc.info/*",
			

		
			// route frameworks	
			"*://stripe.com/docs/*",
			"*://github.com/NancyFx/Nancy/wiki/*",
				
	
			// css-ish
			"*://compass-style.org/reference/*",
		
			"*://lesscss.tld/#*",
			"*://less-ja.studiomohawk.com/*",
			"*://ciembor.github.com/lesscss.org/*",
			"*://bertzzie.com/post/7/dokumentasi-less-bahasa-indonesia*",
			
	
			// php
			"*://www.php.net/manual/*",
		
					
			"*://laravel.com/docs/*",


			// sql

			"*://dev.mysql.com/doc/*",

			"*://www.postgresql.org/docs/*",
			"*://www.postgresql.jp/document/*",
			"*://docs.postgresqlfr.org/*",
			"*://wiki.postgresql.org/*",

			// python
			"*://docs.python.org/",
			"*://wiki.python.org/",
			"*://*python.org/dev/peps/*",
			"*://*python.org/doc/*",

			"*://docs.djangoproject.com/*",

			"*://docs.scipy.org/doc/*",
			"*://www.scipy.org/Cookbook*",
			"*://matplotlib.org/*",

			// R
			"*://cran.r-project.org/doc/*",
			"*://rwiki.sciviews.org/*",

			// IDL
			"*://www.exelisvis.com/docs/*",

			// C++ (very incomplete)
			"*://www.boost.org/doc/*",

			// eLisp
			"*://www.gnu.org/software/emacs/manual/html_node/elisp/*",
			"http://www.gnu.org/software/emacs/manual/html_mono/elisp.html*",

			///// javascript ///////
			// jquery
			"*://api.jquery.com/*",
			// prototype
			"*://api.prototypejs.org/*",
			"*://prototypejs.org/learn/*",
			// d3
			"*://github.com/mbostock/d3/wiki/*",
			// yui
			"*://yuilibrary.com/yui/docs/*",
			// dojo
			"*://dojotoolkit.org/documentation/*",
			"*://dojotoolkit.org/reference-guide/*",
			"*://dojotoolkit.org/api/*",
			// processing
			"*://processingjs.org/reference/*",
			"*://processingjs.org/learning/*",
			"*://processingjs.org/articles/*",
			// extjs
			"*://docs.sencha.com/*",
			// mootools
			"*://mootools.net/docs/*",
			// raphael
			"*://raphaeljs.com/reference.html*",
			// rightjs
			"*://rightjs.org/docs*",
			"*://rightjs.org/tutorials*",
			// threejs
			"*://mrdoob.github.com/three.js/docs/*",
			// zepto
			"*://zeptojs.com/#*",
			// shipyard
			"*://seanmonstar.github.com/Shipyard/api/*",
			"*://seanmonstar.github.com/Shipyard/topics/*",
			// knockoutjs
			"*://knockoutjs.com/documentation/*",
			// x toolkit edge
			"*://api.goxtk.com/*",
			// angularjs
			"*://docs.angularjs.org/*",
			// enyo
			"*://enyojs.com/api/*",
			"*://enyojs.com/docs/*",
			"*://github.com/enyojs/enyo/wiki/*",
			// underscore
			"*://underscorejs.org/#",
			// bonsai
			"*://docs.bonsaijs.org/*",
			// kineticjs
			"*://kineticjs.com/docs/*",
			// thorax
			"*://thoraxjs.org/api.html*",
			// createjs ??
			// qooxdoo
			"*://manual.qooxdoo.org/*",
			"*://demo.qooxdoo.org/*",
			// fabricjs
			"*://github.com/kangax/fabric.js/wiki*",
			"*://fabricjs.com/*", // Lots of neat demos, but not in demo subdirectory
			// momentjs
			"*://momentjs.com/docs/*",
			//backbone
			"*://backbonejs.org/*",
			//handlebars
			"*://handlebarsjs.com/*",

			// OTHER STUFF

			// eclipse
			"*://wiki.eclipse.org/PDE/*",
			"*://help.eclipse.org/*",

			// java
			"*://docs.oracle.com/javase/*/docs/*",
		
			// scala
			"*://www.scala-lang.org/api/*",
	
			// android	
			"*://developer.android.com/*",

			// iOS
			"*://developer.apple.com/library/ios/*",
	
			// chrome
			"*://developer.chrome.com/extensions/*",
		]

}
