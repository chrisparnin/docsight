function buildRegexCache()
{
   if( filtersPresets.regex_cache.length == 0 )
   {
      for( var i = 0; i < filtersPresets.include_patterns.length; i++ )
      {
         var site = filtersPresets.include_patterns[i];
         for( var u = 0; u < site.urls.length; u++ )
         {
            var pattern = site.urls[u];
            filtersPresets.regex_cache[ pattern ] = convert2RegExp( pattern );
         }
      }
   }
}

var filtersPresets = 
{
	regex_cache : [],

	include_patterns : [
				
			{ ico: "google", urls: [ "*://*.google.tld/search*"] },
			{ ico: "stackoverflow", urls: [ "*://stackoverflow.tld/*"] },
			{ ico: "googlegroups", urls: [ "*://groups.google.com/*"] },
		
			{ ico: "oreilly", urls: [ "*://answers.oreilly.com/*"] },
			{ ico: "readthedocs", urls: [ "*://*readthedocs.org/*"] },
			{ ico: "apidock", urls: [ "*://apidock.com/*"] },
	
			{ ico: "mozilla", urls: [ "*://developer.mozilla.org/*"] },
			
			// msdn
			{ ico: "msdn", urls: [ "*://msdn.microsoft.com/*", "*://code.msdn.microsoft.com/*", "*://social.msdn.microsoft.com/*"] },

			// javadocs, general
			{ ico: "", urls: [ "*://*/docs/javadocs/*"] },

			// repository sites?
			{ ico: "", urls: [ "*://code.google.com/*"] },
			{ ico: "github", urls: [ "*://github.tld/*"] },
			{ ico: "blocks", urls: [ "*://bl.ocks.org/*"] },
		
			// clojure
			{ ico: "clojure", urls: [ "*://clojure.org/*", "*://clojure.github.com/clojure/*"] },

			// nodejs
			{ ico: "nodejs", urls: [ "*://nodejs.org/api/*"] },
			
			// coffeescript
			{ ico: "coffeescript", urls: [ "*://coffeescript.org/*"] },

			// ruby
			{ ico: "ruby", urls: [ "*://ruby-doc.org/*", "*://www.ruby-doc.org/*"] },
			{ ico: "rubyonrails", urls: [ "*://api.rubyonrails.org/*"] },

			// host many projects' documentation, generted by yard.	
			{ ico: "rubyinfo", urls: [ "*://rubydoc.info/*"] },
			

		
			// route frameworks	
			{ ico: "stripe", urls: [ "*://stripe.com/docs/*"] },
			{ ico: "nancy", urls: [ "*://github.com/NancyFx/Nancy/wiki/*"] },
	
			// css-ish
			{ ico: "compass", urls: [ "*://compass-style.org/reference/*"] },
			{ ico: "less", urls: [ "*://lesscss.tld/#*", "*://less-ja.studiomohawk.com/*", 
				"*://ciembor.github.com/lesscss.org/*", "*://bertzzie.com/post/7/dokumentasi-less-bahasa-indonesia*"] },
	
			// php
			{ ico: "php", urls: [ "*://www.php.net/manual/*"] },
			{ ico: "laravel", urls: [ "*://laravel.com/docs/*"] },

			// sql
			{ ico: "mysql", urls: [ "*://dev.mysql.com/doc/*"] },
			{ ico: "postgresql", urls: [ "*://www.postgresql.org/docs/*", "*://www.postgresql.jp/document/*", "*://docs.postgresqlfr.org/*", 
										"*://wiki.postgresql.org/*"] },

			// python
			{ ico: "python", urls: [ "*://docs.python.org/", "*://wiki.python.org/", "*://*python.org/dev/peps/*", "*://*python.org/doc/*" ] },
			{ ico: "django", urls: [ "*://docs.djangoproject.com/*"] },
			
			{ ico: "scipy", urls: [ "*://docs.scipy.org/doc/*", "*://www.scipy.org/Cookbook*" ] },
			{ ico: "", urls: [ "*://matplotlib.org/*" ] },

			// R
			{ ico: "R", urls: [ "*://cran.r-project.org/doc/*", "*://rwiki.sciviews.org/*"] },

			// IDL
			{ ico: "idl", urls: [ "*://www.exelisvis.com/docs/*"] },

			// C++ (very incomplete)
			{ ico: "boost", urls: [ "*://www.boost.org/doc/*"] },

			// eLisp
			{ ico: "gnu", urls: [ "*://www.gnu.org/software/emacs/manual/html_node/elisp/*", 
								"http://www.gnu.org/software/emacs/manual/html_mono/elisp.html*"] },

			///// javascript ///////
			// jquery
			{ ico: "jquery", urls: [ "*://api.jquery.com/*"] },

			// prototype
			{ ico: "", urls: [ "*://api.prototypejs.org/*", "*://prototypejs.org/learn/*"] },
			
			// d3
			{ ico: "", urls: [ "*://github.com/mbostock/d3/wiki/*"] },

			// yui
			{ ico: "yui", urls: [ "*://yuilibrary.com/yui/docs/*"] },

			// dojo
			{ ico: "dtk", urls: [ "*://dojotoolkit.org/documentation/*", "*://dojotoolkit.org/reference-guide/*", "*://dojotoolkit.org/api/*"] },
			// processing
			{ ico: "processingjs", urls: [ "*://processingjs.org/reference/*", "*://processingjs.org/learning/*", "*://processingjs.org/articles/*"]},
			// extjs
			{ ico: "sencha", urls: [ "*://docs.sencha.com/*"] },
			// mootools
			{ ico: "mootools", urls: [ "*://mootools.net/docs/*"] },
			// raphael
			{ ico: "raphaeljs", urls: [ "*://raphaeljs.com/reference.html*"] },
			// rightjs
			{ ico: "", urls: [ "*://rightjs.org/docs*", "*://rightjs.org/tutorials*"] },
			// threejs
			{ ico: "", urls: [ "*://mrdoob.github.com/three.js/docs/*"] },
			// zepto
			{ ico: "zepto", urls: [ "*://zeptojs.com/#*"]},
			// shipyard
			{ ico: "", urls: [ "*://seanmonstar.github.com/Shipyard/api/*", "*://seanmonstar.github.com/Shipyard/topics/*"] },
			// knockoutjs
			{ ico: "knockoutjs", urls: [ "*://knockoutjs.com/documentation/*" ] },
			// x toolkit edge
			{ ico: "", urls: [ "*://api.goxtk.com/*" ] },
			// angularjs
			{ ico: "angularjs", urls: [ "*://docs.angularjs.org/*" ]},
			// enyo
			{ ico: "enyo", urls: [ "*://enyojs.com/api/*", "*://enyojs.com/docs/*", "*://github.com/enyojs/enyo/wiki/*"] },
			// underscore
			{ ico: "underscore", urls: [ "*://underscorejs.org/#"] },
			// bonsai
			{ ico: "bonsai", urls: [ "*://docs.bonsaijs.org/*"] },
			// kineticjs
			{ ico: "kineticjs", urls: [ "*://kineticjs.com/docs/*"] },
			// thorax
			{ ico: "", urls: [ "*://thoraxjs.org/api.html*"] },
			// createjs ??
			// qooxdoo
			{ ico: "qx", urls: [ "*://manual.qooxdoo.org/*", "*://demo.qooxdoo.org/*"] },
			// fabricjs // Lots of neat demos, but not in demo subdirectory
			{ ico: "", urls: [ "*://github.com/kangax/fabric.js/wiki*", "*://fabricjs.com/*"]},
			// momentjs
			{ ico: "momentjs", urls: [ "*://momentjs.com/docs/*"] },
			//backbone
			{ ico: "backbone", urls: [ "*://backbonejs.org/*" ] },
			//handlebars
			{ ico: "", urls: [ "*://handlebarsjs.com/*"] },

			// OTHER STUFF

			// eclipse
			{ ico: "eclipse", urls: [ "*://wiki.eclipse.org/PDE/*", "*://help.eclipse.org/*" ] },

			// java
			{ ico: "oracle", urls: [ "*://docs.oracle.com/javase/*/docs/*" ] },
		
			// scala
			{ ico: "scala", urls: [ "*://www.scala-lang.org/api/*" ]},
	
			// android	
			{ ico: "android", urls: [ "*://developer.android.com/*" ]},

			// iOS
			{ ico: "iOS", urls: [ "*://developer.apple.com/library/ios/*"]},
	
			// chrome
			{ ico: "chrome", urls: [ "*://developer.chrome.com/extensions/*"]},
		]

}
