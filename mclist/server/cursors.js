Cursors = new Meteor.Collection('cursors');
Meteor.publish('cursors', function () {
	return Cursors.find();
});

removeCursor = function (userId) {
	Cursors.remove({userId: userId});
};
hideCursor = function (userId) {
	console.log('hiding cursor');
	Cursors.update({userId: userId}, {$set: {
		visible: false
	}});
};
showCursor = function (userId) {
	Cursors.update({userId: userId}, {$set: {
		visible: true
	}});
};