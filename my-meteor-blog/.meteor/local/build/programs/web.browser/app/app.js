var require = meteorInstall({"client":{"templates":{"template.about.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/templates/template.about.js                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("about");                                                                                       // 2
Template["about"] = new Template("Template.about", (function() {                                                     // 3
  var view = this;                                                                                                   // 4
  return Spacebars.include(view.lookupTemplate("markdown"), function() {                                             // 5
    return "\n## About me\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\nquis nostrud **exercitation ullamco** laboris nisi ut aliquip ex ea commodo\nconsequat.\n\nLink to my facebook: [facebook.com][1]\n\n[1]: http://facebook.com\n";
  });                                                                                                                // 7
}));                                                                                                                 // 8
                                                                                                                     // 9
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.editPost.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/templates/template.editPost.js                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("editPost");                                                                                    // 2
Template["editPost"] = new Template("Template.editPost", (function() {                                               // 3
  var view = this;                                                                                                   // 4
  return HTML.DIV({                                                                                                  // 5
    "class": "editPost"                                                                                              // 6
  }, "\n		", HTML.FORM("\n			", HTML.LABEL("\n				Title\n				", HTML.INPUT({                                         // 7
    type: "text",                                                                                                    // 8
    name: "title",                                                                                                   // 9
    placeholder: "Awesome title",                                                                                    // 10
    value: function() {                                                                                              // 11
      return Spacebars.mustache(view.lookup("title"));                                                               // 12
    }                                                                                                                // 13
  }), "\n			"), "\n			\n			", HTML.LABEL("\n				Description\n				", HTML.TEXTAREA({                                  // 14
    name: "description",                                                                                             // 15
    placeholder: "Short description displayed in posts list",                                                        // 16
    rows: "3",                                                                                                       // 17
    value: function() {                                                                                              // 18
      return Spacebars.mustache(view.lookup("description"));                                                         // 19
    }                                                                                                                // 20
  }), "\n			"), "\n\n			", HTML.LABEL("\n				Content\n				", HTML.TEXTAREA({                                         // 21
    name: "text",                                                                                                    // 22
    rows: "10",                                                                                                      // 23
    placeholder: "Brilliant content",                                                                                // 24
    value: function() {                                                                                              // 25
      return Spacebars.mustache(view.lookup("text"));                                                                // 26
    }                                                                                                                // 27
  }), "\n			"), "\n\n			", HTML.Raw('<button type="submit" class="save">Save Post</button>'), "\n		"), "\n	");       // 28
}));                                                                                                                 // 29
                                                                                                                     // 30
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.home.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/templates/template.home.js                                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("home");                                                                                        // 2
Template["home"] = new Template("Template.home", (function() {                                                       // 3
  var view = this;                                                                                                   // 4
  return [ Spacebars.include(view.lookupTemplate("markdown"), function() {                                           // 5
    return "\n## Welcome to my Blog\nHere I'm talking about my latest discoveries from the world of JavaScript.\n	";
  }), HTML.Raw("\n\n\n	<!-- #Users and Permissions -> Adding admin functionality to the templates -->\n	"), Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("currentUser"), "roles", "admin"));                              // 8
  }, function() {                                                                                                    // 9
    return [ "\n		", HTML.A({                                                                                        // 10
      href: "/create-post",                                                                                          // 11
      "class": "createNewPost"                                                                                       // 12
    }, "Create new post"), "\n	" ];                                                                                  // 13
  }), HTML.Raw("\n\n	<!-- Listing posts -->\n	"), Blaze.Each(function() {                                            // 14
    return Spacebars.call(view.lookup("postsList"));                                                                 // 15
  }, function() {                                                                                                    // 16
    return [ "\n		", Spacebars.include(view.lookupTemplate("postInList")), "\n	" ];                                  // 17
  }), HTML.Raw('\n\n	<!-- #Controlling the data flow -> Lazy load posts or how to change subscriptions -->\n	<button class="lazyload">Load more</button>') ];
}));                                                                                                                 // 19
                                                                                                                     // 20
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.layout.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/templates/template.layout.js                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("layout");                                                                                      // 2
Template["layout"] = new Template("Template.layout", (function() {                                                   // 3
  var view = this;                                                                                                   // 4
  return [ HTML.HEADER("\n		", HTML.DIV({                                                                            // 5
    "class": "container"                                                                                             // 6
  }, "\n			", HTML.Raw("<h1>My Meteor Single Page App</h1>"), "\n			", HTML.Raw('<ul>\n				<li>\n					<a href="/">Home</a>\n				</li>\n				<li>\n					<a href="/about">About</a>\n				</li>\n			</ul>'), "\n\n			", HTML.Raw("<!-- #Users and permissions -> Adding admin functionality to the template -->"), "\n			", Spacebars.include(view.lookupTemplate("loginButtons")), "\n		"), "\n	"), "\n\n	", HTML.DIV({
    "class": "container"                                                                                             // 8
  }, "\n		", HTML.MAIN("\n			", Spacebars.include(view.lookupTemplate("yield")), "\n		"), "\n	") ];                  // 9
}));                                                                                                                 // 10
                                                                                                                     // 11
Template.__checkName("notFound");                                                                                    // 12
Template["notFound"] = new Template("Template.notFound", (function() {                                               // 13
  var view = this;                                                                                                   // 14
  return HTML.Raw('<div class="center">\n		<h1>Nothing here</h1><br>\n		<h2>You hit a page which doesn\'t exist!</h2>\n	</div>');
}));                                                                                                                 // 16
                                                                                                                     // 17
Template.__checkName("loading");                                                                                     // 18
Template["loading"] = new Template("Template.loading", (function() {                                                 // 19
  var view = this;                                                                                                   // 20
  return HTML.Raw('<div class="center">\n		<h1>Loading</h1>\n	</div>');                                              // 21
}));                                                                                                                 // 22
                                                                                                                     // 23
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.post.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/templates/template.post.js                                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("post");                                                                                        // 2
Template["post"] = new Template("Template.post", (function() {                                                       // 3
  var view = this;                                                                                                   // 4
  return [ HTML.H1(Blaze.View("lookup:title", function() {                                                           // 5
    return Spacebars.mustache(view.lookup("title"));                                                                 // 6
  })), "\n	", HTML.H2(Blaze.View("lookup:description", function() {                                                  // 7
    return Spacebars.mustache(view.lookup("description"));                                                           // 8
  })), "\n\n	", HTML.SMALL("\n		Posted ", Blaze.View("lookup:formatTime", function() {                               // 9
    return Spacebars.mustache(view.lookup("formatTime"), view.lookup("timeCreated"), "fromNow");                     // 10
  }), " by ", Blaze.View("lookup:author", function() {                                                               // 11
    return Spacebars.mustache(view.lookup("author"));                                                                // 12
  }), "\n	\n		", HTML.Raw("<!-- #Users and Permissions -> Adding admin functionality to the templates -->"), "\n		", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("currentUser"), "roles", "admin"));                              // 14
  }, function() {                                                                                                    // 15
    return [ "\n			| ", HTML.A({                                                                                     // 16
      href: function() {                                                                                             // 17
        return [ "/edit-post/", Spacebars.mustache(view.lookup("slug")) ];                                           // 18
      }                                                                                                              // 19
    }, "Edit post"), "\n		" ];                                                                                       // 20
  }), "\n	"), "\n	\n	", HTML.DIV({                                                                                   // 21
    "class": "postContent"                                                                                           // 22
  }, "\n		", Spacebars.include(view.lookupTemplate("markdown"), function() {                                         // 23
    return [ "\n", Blaze.View("lookup:text", function() {                                                            // 24
      return Spacebars.mustache(view.lookup("text"));                                                                // 25
    }), "\n		" ];                                                                                                    // 26
  }), "	\n	") ];                                                                                                     // 27
}));                                                                                                                 // 28
                                                                                                                     // 29
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.postInList.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/templates/template.postInList.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("postInList");                                                                                  // 2
Template["postInList"] = new Template("Template.postInList", (function() {                                           // 3
  var view = this;                                                                                                   // 4
  return HTML.DIV({                                                                                                  // 5
    "class": "postListItem"                                                                                          // 6
  }, "\n		", HTML.H2(HTML.A({                                                                                        // 7
    href: function() {                                                                                               // 8
      return [ "posts/", Spacebars.mustache(view.lookup("slug")) ];                                                  // 9
    }                                                                                                                // 10
  }, Blaze.View("lookup:title", function() {                                                                         // 11
    return Spacebars.mustache(view.lookup("title"));                                                                 // 12
  }))), "\n		", HTML.P(Blaze.View("lookup:description", function() {                                                 // 13
    return Spacebars.mustache(view.lookup("description"));                                                           // 14
  })), "\n		", HTML.DIV({                                                                                            // 15
    "class": "footer"                                                                                                // 16
  }, "\n			", HTML.TIME({                                                                                            // 17
    datetime: function() {                                                                                           // 18
      return Spacebars.mustache(view.lookup("formatTime"), view.lookup("timeCreated"), "iso");                       // 19
    }                                                                                                                // 20
  }, "Posted ", Blaze.View("lookup:formatTime", function() {                                                         // 21
    return Spacebars.mustache(view.lookup("formatTime"), view.lookup("timeCreated"), "fromNow");                     // 22
  }), " by ", Blaze.View("lookup:author", function() {                                                               // 23
    return Spacebars.mustache(view.lookup("author"));                                                                // 24
  })), "\n		"), "\n	");                                                                                              // 25
}));                                                                                                                 // 26
                                                                                                                     // 27
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"home.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/templates/home.js                                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// Template helpers                                                                                                  //
Template.home.helpers({                                                                                              // 2
                                                                                                                     //
  // #Storing Data -> Querying a collection                                                                          //
  postsList: function () {                                                                                           // 5
    function postsList() {                                                                                           // 5
      return Posts.find({}, { sort: { timeCreated: -1 } });                                                          // 6
    }                                                                                                                // 7
                                                                                                                     //
    return postsList;                                                                                                // 5
  }()                                                                                                                // 5
});                                                                                                                  // 2
                                                                                                                     //
// #Controlling the data flow -> Lazy load posts or how to change subscriptions                                      //
Template.home.events({                                                                                               // 12
  'click button.lazyload': function () {                                                                             // 13
    function clickButtonLazyload(e, template) {                                                                      // 13
      var currentLimit = Session.get('lazyloadLimit');                                                               // 14
                                                                                                                     //
      Session.set('lazyloadLimit', currentLimit + 2);                                                                // 16
    }                                                                                                                // 17
                                                                                                                     //
    return clickButtonLazyload;                                                                                      // 13
  }()                                                                                                                // 13
});                                                                                                                  // 12
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"template.index.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/template.index.js                                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.body.addContent((function() {                                                                               // 2
  var view = this;                                                                                                   // 3
  return "";                                                                                                         // 4
}));                                                                                                                 // 5
Meteor.startup(Template.body.renderToDocument);                                                                      // 6
                                                                                                                     // 7
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template-helpers.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/template-helpers.js                                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Template.registerHelper('formatTime', function (time, type) {                                                        // 1
	switch (type) {                                                                                                     // 2
		case 'fromNow':                                                                                                    // 3
			return moment.unix(time).fromNow();                                                                               // 4
		case 'iso':                                                                                                        // 5
			return moment.unix(time).toISOString();                                                                           // 6
		default:                                                                                                           // 7
			return moment.unix(time).format('LLLL');                                                                          // 8
	}                                                                                                                   // 2
});                                                                                                                  // 10
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"collections.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// collections.js                                                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// #Storing Data -> Setup a collection                                                                               //
Posts = new Mongo.Collection('posts');                                                                               // 2
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"routes.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// routes.js                                                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
if (Meteor.isClient) {                                                                                               // 1
    Session.setDefault('lazyloadLimit', 2);                                                                          // 2
}                                                                                                                    // 3
                                                                                                                     //
Router.configure({                                                                                                   // 6
    layoutTemplate: 'layout',                                                                                        // 7
    notFoundTemplate: 'notFound',                                                                                    // 8
    loadingTemplate: 'loading',                                                                                      // 9
                                                                                                                     //
    // #Routes -> Changing the website title                                                                         //
    onAfterAction: function () {                                                                                     // 12
        function onAfterAction() {                                                                                   // 12
            var data = Posts.findOne({ slug: this.params.slug });                                                    // 13
                                                                                                                     //
            if (_.isObject(data) && !_.isArray(data)) document.title = 'My Meteor Blog - ' + data.title;else document.title = 'My Meteor Blog - ' + this.route.getName();
        }                                                                                                            // 19
                                                                                                                     //
        return onAfterAction;                                                                                        // 12
    }()                                                                                                              // 12
});                                                                                                                  // 6
                                                                                                                     //
PostController = RouteController.extend({                                                                            // 23
    waitOn: function () {                                                                                            // 24
        function waitOn() {                                                                                          // 24
            return Meteor.subscribe('single-post', this.params.slug);                                                // 25
        }                                                                                                            // 26
                                                                                                                     //
        return waitOn;                                                                                               // 24
    }(),                                                                                                             // 24
                                                                                                                     //
    data: function () {                                                                                              // 28
        function data() {                                                                                            // 28
            return Posts.findOne({ slug: this.params.slug });                                                        // 29
        }                                                                                                            // 30
                                                                                                                     //
        return data;                                                                                                 // 28
    }()                                                                                                              // 28
});                                                                                                                  // 23
                                                                                                                     //
Router.map(function () {                                                                                             // 33
                                                                                                                     //
    // #Routes -> Setup the router                                                                                   //
    this.route('Home', {                                                                                             // 36
        path: '/',                                                                                                   // 37
        template: 'home',                                                                                            // 38
                                                                                                                     //
        // #Routes -> Moving the posts subscription to the "Home" route                                              //
        subscriptions: function () {                                                                                 // 41
            function subscriptions() {                                                                               // 41
                return Meteor.subscribe("lazyload-posts", Session.get('lazyloadLimit'));                             // 42
            }                                                                                                        // 43
                                                                                                                     //
            return subscriptions;                                                                                    // 41
        }()                                                                                                          // 41
    });                                                                                                              // 36
                                                                                                                     //
    // #Routes -> Adding another routne                                                                              //
    this.route('About', {                                                                                            // 48
        path: '/about',                                                                                              // 49
        template: 'about'                                                                                            // 50
    });                                                                                                              // 48
                                                                                                                     //
    // #Routes -> Setting up the post route                                                                          //
    this.route('Post', {                                                                                             // 55
        path: '/posts/:slug',                                                                                        // 56
        template: 'post',                                                                                            // 57
        controller: 'PostController'                                                                                 // 58
    });                                                                                                              // 55
                                                                                                                     //
    // #Users and permissions -> Creating routes routs for the admin                                                 //
    this.route('Edit Post', {                                                                                        // 64
        path: '/edit-post/:slug',                                                                                    // 65
        template: 'editPost',                                                                                        // 66
        controller: 'PostController'                                                                                 // 67
    });                                                                                                              // 64
                                                                                                                     //
    // #Users and permissions -> Creating routes routs for the admin                                                 //
    this.route('Create Post', {                                                                                      // 71
        path: '/create-post',                                                                                        // 72
        template: 'editPost'                                                                                         // 73
    });                                                                                                              // 71
});                                                                                                                  // 76
                                                                                                                     //
// #Users and permissions -> Creating routes for the admin                                                           //
var requiresLogin = function requiresLogin() {                                                                       // 80
    if (!Meteor.user() || !Meteor.user().roles || !Meteor.user().roles.admin) {                                      // 81
        this.render('notFound');                                                                                     // 82
    } else {                                                                                                         // 84
        this.next();                                                                                                 // 85
    }                                                                                                                // 86
};                                                                                                                   // 87
                                                                                                                     //
Router.onBeforeAction(requiresLogin, { only: ['Create Post', 'Edit Post'] });                                        // 90
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// main.js                                                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// #Users and permissions -> Adding the accounts packages                                                            //
Accounts.config({                                                                                                    // 2
  forbidClientAccountCreation: true                                                                                  // 3
});                                                                                                                  // 2
                                                                                                                     //
// # Users and Permissions -> Adding permissions                                                                     //
if (Meteor.isClient) {                                                                                               // 7
  Meteor.subscribe("userRoles");                                                                                     // 8
}                                                                                                                    // 9
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},{"extensions":[".js",".json",".html",".less"]});
require("./client/templates/template.about.js");
require("./client/templates/template.editPost.js");
require("./client/templates/template.home.js");
require("./client/templates/template.layout.js");
require("./client/templates/template.post.js");
require("./client/templates/template.postInList.js");
require("./client/template.index.js");
require("./client/templates/home.js");
require("./client/template-helpers.js");
require("./collections.js");
require("./routes.js");
require("./main.js");