var require = meteorInstall({"server":{"publications.js":function(){

//////////////////////////////////////////////////////////////////////////////
//                                                                          //
// server/publications.js                                                   //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////
                                                                            //
Meteor.publish('all-posts', function () {                                   // 1
	return Posts.find();                                                       // 2
});                                                                         // 3
                                                                            //
Meteor.publish('limited-posts', function () {                               // 5
	return Posts.find({}, {                                                    // 6
		limit: 2,                                                                 // 7
		sort: { timeCreated: -1 }                                                 // 8
	});                                                                        // 6
});                                                                         // 10
                                                                            //
Meteor.publish('specificfields-posts', function () {                        // 12
	return Posts.find({}, {                                                    // 13
		fields: {                                                                 // 14
			title: 1                                                                 // 15
		}                                                                         // 14
	});                                                                        // 13
});                                                                         // 18
                                                                            //
Meteor.publish('lazyload-posts', function (limit) {                         // 20
	return Posts.find({}, {                                                    // 21
		limit: limit,                                                             // 22
		fields: {                                                                 // 23
			title: 1,                                                                // 24
			slug: 1,                                                                 // 25
			timeCreated: 1,                                                          // 26
			description: 1,                                                          // 27
			author: 1                                                                // 28
		},                                                                        // 23
		sort: { timeCreated: -1 }                                                 // 30
	});                                                                        // 21
});                                                                         // 32
                                                                            //
Meteor.publish("single-post", function (slug) {                             // 34
	return Posts.find({ slug: slug });                                         // 35
});                                                                         // 36
//////////////////////////////////////////////////////////////////////////////

},"main.js":function(){

//////////////////////////////////////////////////////////////////////////////
//                                                                          //
// server/main.js                                                           //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////
                                                                            //
Meteor.startup(function () {                                                // 1
	console.log('Server started');                                             // 2
                                                                            //
	// #Storing Data -> Adding post examples                                   //
	if (Posts.find().count() === 0) {                                          // 5
		console.log('Adding dummy posts');                                        // 6
                                                                            //
		var dummyPosts = [{                                                       // 8
			title: 'My First entry',                                                 // 10
			slug: 'my-first-entry',                                                  // 11
			description: 'Lorem ipsum dolor sit amet.',                              // 12
			text: 'Lorem ipsum dolor sit amet...',                                   // 13
			timeCreated: moment().subtract(7, 'days').unix(),                        // 14
			author: 'John Doe'                                                       // 15
		}, {                                                                      // 9
			title: 'My Second entry',                                                // 18
			slug: 'my-second-entry',                                                 // 19
			description: 'Borem ipsum dolor sit.',                                   // 20
			text: 'Lorem ipsum dolor sit amet...',                                   // 21
			timeCreated: moment().subtract(5, 'days').unix(),                        // 22
			author: 'John Doe'                                                       // 23
		}, {                                                                      // 17
			title: 'My Third entry',                                                 // 26
			slug: 'my-third-entry',                                                  // 27
			description: 'Dorem ipsum dolor sit amet.',                              // 28
			text: 'Lorem ipsum dolor sit amet...',                                   // 29
			timeCreated: moment().subtract(3, 'days').unix(),                        // 30
			author: 'John Doe'                                                       // 31
		}, {                                                                      // 25
			title: 'My Fourth entry',                                                // 34
			slug: 'my-fourth-entry',                                                 // 35
			description: 'Sorem ipsum dolor sit amet.',                              // 36
			text: 'Lorem ipsum dolor sit amet...',                                   // 37
			timeCreated: moment().subtract(2, 'days').unix(),                        // 38
			author: 'John Doe'                                                       // 39
		}, {                                                                      // 33
			title: 'My Fifth entry',                                                 // 42
			slug: 'my-fifth-entry',                                                  // 43
			description: 'Korem ipsum dolor sit amet.',                              // 44
			text: 'Lorem ipsum dolor sit amet...',                                   // 45
			timeCreated: moment().subtract(1, 'days').unix(),                        // 46
			author: 'John Doe'                                                       // 47
		}];                                                                       // 41
		// we add the dummyPosts to our database                                  //
		_.each(dummyPosts, function (post) {                                      // 51
			Posts.insert(post);                                                      // 52
		});                                                                       // 53
	}                                                                          // 54
});                                                                         // 55
//////////////////////////////////////////////////////////////////////////////

}},"collections.js":function(){

//////////////////////////////////////////////////////////////////////////////
//                                                                          //
// collections.js                                                           //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////
                                                                            //
Posts = new Mongo.Collection('posts');                                      // 1
//////////////////////////////////////////////////////////////////////////////

},"routes.js":function(){

//////////////////////////////////////////////////////////////////////////////
//                                                                          //
// routes.js                                                                //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////
                                                                            //
if (Meteor.isClient) {                                                      // 1
	Session.setDefault('lazyloadLimit', 2);                                    // 2
}                                                                           // 3
                                                                            //
// Router.configure({                                                       //
// 	layoutTemplate: 'layout'                                                //
// });                                                                      //
                                                                            //
Router.map(function () {                                                    // 9
                                                                            //
	this.route('Home', {                                                       // 11
		path: '/',                                                                // 12
		template: 'home',                                                         // 13
		subscriptions: function subscriptions() {                                 // 14
			return Meteor.subscribe("lazyload-posts", Session.get('lazyloadLimit'));
		}                                                                         // 16
	});                                                                        // 11
                                                                            //
	this.route('About', {                                                      // 19
		path: '/about',                                                           // 20
		template: 'about'                                                         // 21
	});                                                                        // 19
                                                                            //
	this.route('Post', {                                                       // 24
		path: '/posts/:slug',                                                     // 25
		template: 'post',                                                         // 26
                                                                            //
		waitOn: function waitOn() {                                               // 28
			return Meteor.subscribe('single-post', this.params.slug);                // 29
		},                                                                        // 30
                                                                            //
		data: function data() {                                                   // 32
			return Posts.findOne({ slug: this.params.slug });                        // 33
		}                                                                         // 34
	});                                                                        // 24
});                                                                         // 37
                                                                            //
Router.configure({                                                          // 39
	layoutTemplate: 'layout',                                                  // 40
	notFoundTemplate: 'notFound',                                              // 41
	loadingTemplate: 'loading',                                                // 42
                                                                            //
	onAfterAction: function onAfterAction() {                                  // 44
		var data = Posts.findOne({ slug: this.params.slug });                     // 45
                                                                            //
		if (_.isObject(data) && !_.isArray(data)) document.title = 'My Meteor Blog - ' + data.title;else document.title = 'My Meteor Blog - ' + this.route.getName();
	}                                                                          // 51
});                                                                         // 39
//////////////////////////////////////////////////////////////////////////////

}},{"extensions":[".js",".json"]});
require("./server/publications.js");
require("./collections.js");
require("./routes.js");
require("./server/main.js");
//# sourceMappingURL=app.js.map
