Template.home.created = function(){
	console.log('Created the home template');

	this.autorun(function(){
		alert(Session.get('mySessionExample'));
	});
};

Template.home.rendered = function(){
	console.log('Rendered the home template');

	// this.find('p').innerHTML = "We just replaced that text!";
};

Template.home.destroyed = function(){
	console.log('Destroyed the home template');
};

Template.home.helpers({
	// exampleHelper: function(){
	// 	return new Spacebars.SafeString('This text came from a helper with some <strong>HTML</strong>.');
	// },

	// dataContextHelper: function(){
	// 	return {
	// 		someText: 'This text was set using a helper on the parent template.',
	// 		someNested: {
	// 			text: 'That comes from "someNested.text"'
	// 		}
	// 	};
	// },

	// postsList: function(){
	// 	return [
	// 		{
	// 			title: 'My Second entry',
	// 			description: 'Borem sodum color sit amet, consetetur sadipscing elitr.',
	// 			author: 'Fabian Vogelsteller',
	// 			timeCreated: moment().subtract(3, 'days').unix()
	// 		},
	// 		{
	// 			title: 'My First entry',
	// 			description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
	// 			author: 'Fabian Vogelsteller',
	// 			timeCreated: moment().subtract(7, 'days').unix()
	// 		}
	// 	];
	// }

	postsList: function(){
		return Posts.find({}, {sort: {timeCreated: -1}});
	},

	sessionExample: function(){
		return Session.get('mySessionExample');
	}
});

Template.home.events({
	'click button.lazyload': function(e, template){
		var currentLimit = Session.get('lazyloadLimit');
		Session.set('lazyloadLimit', currentLimit + 2);
	}
});