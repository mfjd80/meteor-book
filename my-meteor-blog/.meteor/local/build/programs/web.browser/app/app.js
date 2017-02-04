var require = meteorInstall({"client":{"templates":{"template.about.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/templates/template.about.js                                                                               //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("about");                                                                                      // 2
Template["about"] = new Template("Template.about", (function() {                                                    // 3
  var view = this;                                                                                                  // 4
  return Spacebars.include(view.lookupTemplate("markdown"), function() {                                            // 5
    return "\n## About me\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do\neiusmod\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad\nminim veniam,\nquis nostrud **exercitation ullamco** laboris nisi ut aliquip ex\nea commodo\nconsequat.\n\nLink to my facebook: [facebook.com][1]\n\n[1]: http://facebook.com\n";
  });                                                                                                               // 7
}));                                                                                                                // 8
                                                                                                                    // 9
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.home.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/templates/template.home.js                                                                                //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("home");                                                                                       // 2
Template["home"] = new Template("Template.home", (function() {                                                      // 3
  var view = this;                                                                                                  // 4
  return [ Spacebars.include(view.lookupTemplate("markdown"), function() {                                          // 5
    return "\n## Welcome to my Blog\nHere I'm talking about my latest discoveries from the world of JavaScript.\n";
  }), HTML.Raw("\n\n<!-- {{exampleHelper}} -->\n \n<!-- {{> contextExample dataContextHelper}} -->\n\n<!-- {{#with dataContextHelper}}\n{{> contextExample}}\n{{/with}} -->\n\n<!-- {{#blockHelperExample false}}\n<span>Some Content</span>\n{{else}}\n<span>Some Warning</span>\n{{/blockHelperExample}}\n -->\n\n"), Blaze.Each(function() {
    return Spacebars.call(view.lookup("postsList"));                                                                // 8
  }, function() {                                                                                                   // 9
    return [ "\n	", Spacebars.include(view.lookupTemplate("postInList")), "\n" ];                                   // 10
  }), HTML.Raw('\n<button class="lazyload">Load more</button>') ];                                                  // 11
}));                                                                                                                // 12
                                                                                                                    // 13
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.layout.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/templates/template.layout.js                                                                              //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("layout");                                                                                     // 2
Template["layout"] = new Template("Template.layout", (function() {                                                  // 3
  var view = this;                                                                                                  // 4
  return [ HTML.Raw('<header>\n		<div class="container">\n			<h1>My Meteor Single Page App</h1>\n			<ul>\n				<li>\n					<a href="/">Home</a>\n				</li>\n				<li>\n					<a href="/about">About</a>\n				</li>\n			</ul>	\n		</div>\n	</header>\n\n	'), HTML.DIV({
    "class": "container"                                                                                            // 6
  }, "\n		", HTML.MAIN("\n			", Spacebars.include(view.lookupTemplate("yield")), "\n		"), "\n	") ];                 // 7
}));                                                                                                                // 8
                                                                                                                    // 9
Template.__checkName("notFound");                                                                                   // 10
Template["notFound"] = new Template("Template.notFound", (function() {                                              // 11
  var view = this;                                                                                                  // 12
  return HTML.Raw('<div class="center">\n		<h1>Nothing here!</h1><br>\n		<h2>You hit a page which doesn\'t exist!</h2>\n	</div>');
}));                                                                                                                // 14
                                                                                                                    // 15
Template.__checkName("loading");                                                                                    // 16
Template["loading"] = new Template("Template.loading", (function() {                                                // 17
  var view = this;                                                                                                  // 18
  return HTML.Raw('<div class="center">\n		<h1>Loading</h1>\n	</div>');                                             // 19
}));                                                                                                                // 20
                                                                                                                    // 21
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.post.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/templates/template.post.js                                                                                //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("post");                                                                                       // 2
Template["post"] = new Template("Template.post", (function() {                                                      // 3
  var view = this;                                                                                                  // 4
  return [ HTML.H1(Blaze.View("lookup:title", function() {                                                          // 5
    return Spacebars.mustache(view.lookup("title"));                                                                // 6
  })), "\n	", HTML.H2(Blaze.View("lookup:description", function() {                                                 // 7
    return Spacebars.mustache(view.lookup("description"));                                                          // 8
  })), "\n\n	", HTML.SMALL("\n		Posted ", Blaze.View("lookup:formatTime", function() {                              // 9
    return Spacebars.mustache(view.lookup("formatTime"), view.lookup("timeCreated"), "fromNow");                    // 10
  }), " by ", Blaze.View("lookup:author", function() {                                                              // 11
    return Spacebars.mustache(view.lookup("author"));                                                               // 12
  }), "\n	"), "\n\n	", HTML.DIV({                                                                                   // 13
    "class": "postContent"                                                                                          // 14
  }, "\n		", Spacebars.include(view.lookupTemplate("markdown"), function() {                                        // 15
    return [ "\n		", Blaze.View("lookup:text", function() {                                                         // 16
      return Spacebars.mustache(view.lookup("text"));                                                               // 17
    }), "\n		" ];                                                                                                   // 18
  }), "\n	") ];                                                                                                     // 19
}));                                                                                                                // 20
                                                                                                                    // 21
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.postInList.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/templates/template.postInList.js                                                                          //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("postInList");                                                                                 // 2
Template["postInList"] = new Template("Template.postInList", (function() {                                          // 3
  var view = this;                                                                                                  // 4
  return HTML.DIV({                                                                                                 // 5
    "class": "postListItem"                                                                                         // 6
  }, "\n		", HTML.H2(HTML.A({                                                                                       // 7
    href: function() {                                                                                              // 8
      return [ "posts/", Spacebars.mustache(view.lookup("slug")) ];                                                 // 9
    }                                                                                                               // 10
  }, Blaze.View("lookup:title", function() {                                                                        // 11
    return Spacebars.mustache(view.lookup("title"));                                                                // 12
  }))), "\n		", HTML.P(Blaze.View("lookup:description", function() {                                                // 13
    return Spacebars.mustache(view.lookup("description"));                                                          // 14
  })), "\n		", HTML.DIV({                                                                                           // 15
    "class": "footer"                                                                                               // 16
  }, "\n			", HTML.TIME({                                                                                           // 17
    datetime: function() {                                                                                          // 18
      return Spacebars.mustache(view.lookup("formatTime"), view.lookup("timeCreated"), "iso");                      // 19
    }                                                                                                               // 20
  }, "Posted ", Blaze.View("lookup:formatTime", function() {                                                        // 21
    return Spacebars.mustache(view.lookup("formatTime"), view.lookup("timeCreated"), "fromNow");                    // 22
  }), " by ", Blaze.View("lookup:author", function() {                                                              // 23
    return Spacebars.mustache(view.lookup("author"));                                                               // 24
  })), "\n		"), "\n	");                                                                                             // 25
}));                                                                                                                // 26
                                                                                                                    // 27
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"examples.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/templates/examples.js                                                                                     //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// Template.contextExample.rendered = function(){                                                                   //
// 	console.log('Rendered Context Example', this.data);                                                             //
// };                                                                                                               //
                                                                                                                    //
// Template.contextExample.helpers({                                                                                //
// 	logContext: function(){                                                                                         //
// 		console.log('Context Log Helper', this);                                                                       //
                                                                                                                    //
// 		return Session.get('randomNumber');                                                                            //
// 	}                                                                                                               //
// });                                                                                                              //
                                                                                                                    //
// Template.contextExample.events({                                                                                 //
// 	'click button': function(e, template){                                                                          //
// 		Session.set('randomNumber', Math.random(0,99));                                                                //
// 	}                                                                                                               //
// });                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"home.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/templates/home.js                                                                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Template.home.created = function () {                                                                               // 1
	console.log('Created the home template');                                                                          // 2
};                                                                                                                  // 3
                                                                                                                    //
Template.home.rendered = function () {                                                                              // 5
	console.log('Rendered the home template');                                                                         // 6
                                                                                                                    //
	// this.find('p').innerHTML = "We just replaced that text!";                                                       //
};                                                                                                                  // 9
                                                                                                                    //
Template.home.destroyed = function () {                                                                             // 11
	console.log('Destroyed the home template');                                                                        // 12
};                                                                                                                  // 13
                                                                                                                    //
Template.home.helpers({                                                                                             // 15
	// exampleHelper: function(){                                                                                      //
	// 	return new Spacebars.SafeString('This text came from a helper with some <strong>HTML</strong>.');              //
	// },                                                                                                              //
                                                                                                                    //
	// dataContextHelper: function(){                                                                                  //
	// 	return {                                                                                                       //
	// 		someText: 'This text was set using a helper on the parent template.',                                         //
	// 		someNested: {                                                                                                 //
	// 			text: 'That comes from "someNested.text"'                                                                    //
	// 		}                                                                                                             //
	// 	};                                                                                                             //
	// },                                                                                                              //
                                                                                                                    //
	// postsList: function(){                                                                                          //
	// 	return [                                                                                                       //
	// 		{                                                                                                             //
	// 			title: 'My Second entry',                                                                                    //
	// 			description: 'Borem sodum color sit amet, consetetur sadipscing elitr.',                                     //
	// 			author: 'Fabian Vogelsteller',                                                                               //
	// 			timeCreated: moment().subtract(3, 'days').unix()                                                             //
	// 		},                                                                                                            //
	// 		{                                                                                                             //
	// 			title: 'My First entry',                                                                                     //
	// 			description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',                                     //
	// 			author: 'Fabian Vogelsteller',                                                                               //
	// 			timeCreated: moment().subtract(7, 'days').unix()                                                             //
	// 		}                                                                                                             //
	// 	];                                                                                                             //
	// }                                                                                                               //
                                                                                                                    //
	postsList: function () {                                                                                           // 46
		function postsList() {                                                                                            // 46
			return Posts.find({}, { sort: { timeCreated: -1 } });                                                            // 47
		}                                                                                                                 // 48
                                                                                                                    //
		return postsList;                                                                                                 // 46
	}()                                                                                                                // 46
});                                                                                                                 // 15
                                                                                                                    //
Template.home.events({                                                                                              // 51
	'click button.lazyload': function () {                                                                             // 52
		function clickButtonLazyload(e, template) {                                                                       // 52
			var currentLimit = Session.get('lazyloadLimit');                                                                 // 53
			Session.set('lazyloadLimit', currentLimit + 2);                                                                  // 54
		}                                                                                                                 // 55
                                                                                                                    //
		return clickButtonLazyload;                                                                                       // 52
	}()                                                                                                                // 52
});                                                                                                                 // 51
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"template.index.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/template.index.js                                                                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.body.addContent((function() {                                                                              // 2
  var view = this;                                                                                                  // 3
  return "";                                                                                                        // 4
}));                                                                                                                // 5
Meteor.startup(Template.body.renderToDocument);                                                                     // 6
                                                                                                                    // 7
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"subscriptions.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/subscriptions.js                                                                                          //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// Meteor.subscribe('all-posts');                                                                                   //
// Meteor.subscribe('limited-posts');                                                                               //
// Meteor.subscribe('specificfields-posts');                                                                        //
                                                                                                                    //
// Session.setDefault('lazyloadLimit', 2);                                                                          //
// Tracker.autorun(function(){                                                                                      //
// 	Meteor.subscribe('lazyload-posts', Session.get('lazyloadLimit'));                                               //
// });                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template-helpers.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client/template-helpers.js                                                                                       //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Template.registerHelper('formatTime', function (time, type) {                                                       // 1
	switch (type) {                                                                                                    // 2
		case 'fromNow':                                                                                                   // 3
			return moment.unix(time).fromNow();                                                                              // 4
		case 'iso':                                                                                                       // 5
			return moment.unix(time).toISOString();                                                                          // 6
		default:                                                                                                          // 7
			return moment.unix(time).format('LLLL');                                                                         // 8
	}                                                                                                                  // 2
});                                                                                                                 // 10
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"collections.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// collections.js                                                                                                   //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Posts = new Mongo.Collection('posts');                                                                              // 1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"routes.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// routes.js                                                                                                        //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
if (Meteor.isClient) {                                                                                              // 1
	Session.setDefault('lazyloadLimit', 2);                                                                            // 2
}                                                                                                                   // 3
                                                                                                                    //
// Router.configure({                                                                                               //
// 	layoutTemplate: 'layout'                                                                                        //
// });                                                                                                              //
                                                                                                                    //
Router.map(function () {                                                                                            // 9
                                                                                                                    //
	this.route('Home', {                                                                                               // 11
		path: '/',                                                                                                        // 12
		template: 'home',                                                                                                 // 13
		subscriptions: function () {                                                                                      // 14
			function subscriptions() {                                                                                       // 14
				return Meteor.subscribe("lazyload-posts", Session.get('lazyloadLimit'));                                        // 15
			}                                                                                                                // 16
                                                                                                                    //
			return subscriptions;                                                                                            // 14
		}()                                                                                                               // 14
	});                                                                                                                // 11
                                                                                                                    //
	this.route('About', {                                                                                              // 19
		path: '/about',                                                                                                   // 20
		template: 'about'                                                                                                 // 21
	});                                                                                                                // 19
                                                                                                                    //
	this.route('Post', {                                                                                               // 24
		path: '/posts/:slug',                                                                                             // 25
		template: 'post',                                                                                                 // 26
                                                                                                                    //
		waitOn: function () {                                                                                             // 28
			function waitOn() {                                                                                              // 28
				return Meteor.subscribe('single-post', this.params.slug);                                                       // 29
			}                                                                                                                // 30
                                                                                                                    //
			return waitOn;                                                                                                   // 28
		}(),                                                                                                              // 28
                                                                                                                    //
		data: function () {                                                                                               // 32
			function data() {                                                                                                // 32
				return Posts.findOne({ slug: this.params.slug });                                                               // 33
			}                                                                                                                // 34
                                                                                                                    //
			return data;                                                                                                     // 32
		}()                                                                                                               // 32
	});                                                                                                                // 24
});                                                                                                                 // 37
                                                                                                                    //
Router.configure({                                                                                                  // 39
	layoutTemplate: 'layout',                                                                                          // 40
	notFoundTemplate: 'notFound',                                                                                      // 41
	loadingTemplate: 'loading',                                                                                        // 42
                                                                                                                    //
	onAfterAction: function () {                                                                                       // 44
		function onAfterAction() {                                                                                        // 44
			var data = Posts.findOne({ slug: this.params.slug });                                                            // 45
                                                                                                                    //
			if (_.isObject(data) && !_.isArray(data)) document.title = 'My Meteor Blog - ' + data.title;else document.title = 'My Meteor Blog - ' + this.route.getName();
		}                                                                                                                 // 51
                                                                                                                    //
		return onAfterAction;                                                                                             // 44
	}()                                                                                                                // 44
});                                                                                                                 // 39
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},{"extensions":[".js",".json",".html",".less"]});
require("./client/templates/template.about.js");
require("./client/templates/template.home.js");
require("./client/templates/template.layout.js");
require("./client/templates/template.post.js");
require("./client/templates/template.postInList.js");
require("./client/template.index.js");
require("./client/templates/examples.js");
require("./client/templates/home.js");
require("./client/subscriptions.js");
require("./client/template-helpers.js");
require("./collections.js");
require("./routes.js");