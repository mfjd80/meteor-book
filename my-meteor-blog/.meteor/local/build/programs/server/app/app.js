var require = meteorInstall({"server":{"publications.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// server/publications.js                                                                                  //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
// #Controlling the data flow -> Lazy load posts or how to change subscriptions                            //
Meteor.publish('lazyload-posts', function (limit) {                                                        // 2
	return Posts.find({}, {                                                                                   // 3
		limit: limit,                                                                                            // 4
		fields: {                                                                                                // 5
			text: 0                                                                                                 // 6
		},                                                                                                       // 5
		sort: { timeCreated: -1 }                                                                                // 8
	});                                                                                                       // 3
});                                                                                                        // 10
                                                                                                           //
// #Routes -> Setting up the post route                                                                    //
Meteor.publish("single-post", function (slug) {                                                            // 13
	return Posts.find({ slug: slug });                                                                        // 14
});                                                                                                        // 15
                                                                                                           //
// # Users and Permissions -> Adding permissions                                                           //
Meteor.publish("userRoles", function () {                                                                  // 18
	if (this.userId) {                                                                                        // 19
		return Meteor.users.find({ _id: this.userId }, { fields: { roles: 1 } });                                // 20
	} else {                                                                                                  // 21
		this.ready();                                                                                            // 22
	}                                                                                                         // 23
});                                                                                                        // 23
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// server/main.js                                                                                          //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
Meteor.startup(function () {                                                                               // 1
                                                                                                           //
	console.log('Server started');                                                                            // 3
                                                                                                           //
	// #Users and Permissions -> -> Creating the admin user                                                   //
	if (Meteor.users.find().count() === 0) {                                                                  // 7
                                                                                                           //
		console.log('Created Admin user');                                                                       // 9
                                                                                                           //
		var userId = Accounts.createUser({                                                                       // 11
			username: 'johndoe',                                                                                    // 12
			email: 'johndoe@example.com',                                                                           // 13
			password: '1234',                                                                                       // 14
			profile: {                                                                                              // 15
				name: 'John Doe'                                                                                       // 16
			}                                                                                                       // 15
		});                                                                                                      // 11
		Meteor.users.update(userId, { $set: {                                                                    // 19
				roles: { admin: true }                                                                                 // 20
			} });                                                                                                   // 19
	}                                                                                                         // 22
                                                                                                           //
	// #Storing Data -> Adding example posts                                                                  //
	if (Posts.find().count() === 0) {                                                                         // 26
                                                                                                           //
		console.log('Adding dummy posts');                                                                       // 28
                                                                                                           //
		var dummyPosts = [{                                                                                      // 30
			title: 'My First entry',                                                                                // 32
			slug: 'my-first-entry',                                                                                 // 33
			description: 'Lorem ipsum dolor sit amet.',                                                             // 34
			text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
			timeCreated: moment().subtract(7, 'days').unix(),                                                       // 36
			author: 'John Doe'                                                                                      // 37
		}, {                                                                                                     // 31
			title: 'My Second entry',                                                                               // 40
			slug: 'my-second-entry',                                                                                // 41
			description: 'Borem ipsum dolor sit amet, consetetur sadipscing.',                                      // 42
			text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
			timeCreated: moment().subtract(5, 'days').unix(),                                                       // 44
			author: 'John Doe'                                                                                      // 45
		}, {                                                                                                     // 39
			title: 'My Third entry',                                                                                // 48
			slug: 'my-third-entry',                                                                                 // 49
			description: 'Dorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.',
			text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
			timeCreated: moment().subtract(3, 'days').unix(),                                                       // 52
			author: 'John Doe'                                                                                      // 53
		}, {                                                                                                     // 47
			title: 'My Fourth entry',                                                                               // 56
			slug: 'my-fourth-entry',                                                                                // 57
			description: 'Sorem ipsum dolor sit amet, consetetur sadipscing.',                                      // 58
			text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
			timeCreated: moment().subtract(2, 'days').unix(),                                                       // 60
			author: 'John Doe'                                                                                      // 61
		}, {                                                                                                     // 55
			title: 'My Fifth entry',                                                                                // 64
			slug: 'my-fifth-entry',                                                                                 // 65
			description: 'Korem ipsum dolor sit amet, consetetur sadipscing elitr.',                                // 66
			text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
			timeCreated: moment().subtract(1, 'days').unix(),                                                       // 68
			author: 'John Doe'                                                                                      // 69
		}];                                                                                                      // 63
                                                                                                           //
		// we add the dummyPosts to our database                                                                 //
		_.each(dummyPosts, function (post) {                                                                     // 74
			Posts.insert(post);                                                                                     // 75
		});                                                                                                      // 76
	}                                                                                                         // 77
});                                                                                                        // 78
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"collections.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// collections.js                                                                                          //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
// #Storing Data -> Setup a collection                                                                     //
Posts = new Mongo.Collection('posts');                                                                     // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"routes.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// routes.js                                                                                               //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
if (Meteor.isClient) {                                                                                     // 1
    Session.setDefault('lazyloadLimit', 2);                                                                // 2
}                                                                                                          // 3
                                                                                                           //
Router.configure({                                                                                         // 6
    layoutTemplate: 'layout',                                                                              // 7
    notFoundTemplate: 'notFound',                                                                          // 8
    loadingTemplate: 'loading',                                                                            // 9
                                                                                                           //
    // #Routes -> Changing the website title                                                               //
    onAfterAction: function onAfterAction() {                                                              // 12
        var data = Posts.findOne({ slug: this.params.slug });                                              // 13
                                                                                                           //
        if (_.isObject(data) && !_.isArray(data)) document.title = 'My Meteor Blog - ' + data.title;else document.title = 'My Meteor Blog - ' + this.route.getName();
    }                                                                                                      // 19
});                                                                                                        // 6
                                                                                                           //
PostController = RouteController.extend({                                                                  // 23
    waitOn: function waitOn() {                                                                            // 24
        return Meteor.subscribe('single-post', this.params.slug);                                          // 25
    },                                                                                                     // 26
                                                                                                           //
    data: function data() {                                                                                // 28
        return Posts.findOne({ slug: this.params.slug });                                                  // 29
    }                                                                                                      // 30
});                                                                                                        // 23
                                                                                                           //
Router.map(function () {                                                                                   // 33
                                                                                                           //
    // #Routes -> Setup the router                                                                         //
    this.route('Home', {                                                                                   // 36
        path: '/',                                                                                         // 37
        template: 'home',                                                                                  // 38
                                                                                                           //
        // #Routes -> Moving the posts subscription to the "Home" route                                    //
        subscriptions: function subscriptions() {                                                          // 41
            return Meteor.subscribe("lazyload-posts", Session.get('lazyloadLimit'));                       // 42
        }                                                                                                  // 43
    });                                                                                                    // 36
                                                                                                           //
    // #Routes -> Adding another routne                                                                    //
    this.route('About', {                                                                                  // 48
        path: '/about',                                                                                    // 49
        template: 'about'                                                                                  // 50
    });                                                                                                    // 48
                                                                                                           //
    // #Routes -> Setting up the post route                                                                //
    this.route('Post', {                                                                                   // 55
        path: '/posts/:slug',                                                                              // 56
        template: 'post',                                                                                  // 57
        controller: 'PostController'                                                                       // 58
    });                                                                                                    // 55
                                                                                                           //
    // #Users and permissions -> Creating routes routs for the admin                                       //
    this.route('Edit Post', {                                                                              // 64
        path: '/edit-post/:slug',                                                                          // 65
        template: 'editPost',                                                                              // 66
        controller: 'PostController'                                                                       // 67
    });                                                                                                    // 64
                                                                                                           //
    // #Users and permissions -> Creating routes routs for the admin                                       //
    this.route('Create Post', {                                                                            // 71
        path: '/create-post',                                                                              // 72
        template: 'editPost'                                                                               // 73
    });                                                                                                    // 71
});                                                                                                        // 76
                                                                                                           //
// #Users and permissions -> Creating routes for the admin                                                 //
var requiresLogin = function requiresLogin() {                                                             // 80
    if (!Meteor.user() || !Meteor.user().roles || !Meteor.user().roles.admin) {                            // 81
        this.render('notFound');                                                                           // 82
    } else {                                                                                               // 84
        this.next();                                                                                       // 85
    }                                                                                                      // 86
};                                                                                                         // 87
                                                                                                           //
Router.onBeforeAction(requiresLogin, { only: ['Create Post', 'Edit Post'] });                              // 90
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// main.js                                                                                                 //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
// #Users and permissions -> Adding the accounts packages                                                  //
Accounts.config({                                                                                          // 2
  forbidClientAccountCreation: true                                                                        // 3
});                                                                                                        // 2
                                                                                                           //
// # Users and Permissions -> Adding permissions                                                           //
if (Meteor.isClient) {                                                                                     // 7
  Meteor.subscribe("userRoles");                                                                           // 8
}                                                                                                          // 9
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},{"extensions":[".js",".json"]});
require("./server/publications.js");
require("./collections.js");
require("./routes.js");
require("./server/main.js");
require("./main.js");
//# sourceMappingURL=app.js.map
