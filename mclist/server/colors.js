Colors = new Meteor.Collection('colors');
colors = ['64A1F7', 'FF001A', '58B442', 'FF913D', 'A13CB4', 
		  'F176A7', '00A3BB', 'A5CA54', 'FF007A', '37C78F'];

var createColors = function () {
	_.each(colors, function (color, priority) {
		Colors.upsert({hex: color, priority: priority}, {$set: {
			hex: color,
			priority: priority,
			count: 0
		}});
	});
};

getNextColor = function () {
	return Colors.findOne({}, {
		sort: [['count', 'asc'], ['priority', 'asc']]
	});
};

associateColor = function (userId) {
	var color = getNextColor();
	Colors.update({_id: color._id}, {$inc: {count: 1}});
	Meteor.users.update({_id: userId}, {$set: {'profile.color': color.hex}});
};

disassociateColor = function (userId) {
	var hex = Meteor.users.findOne(userId).profile.color;
	Colors.update({hex: hex}, {$inc: {count: -1}});
	Meteor.users.update({_id: userId}, {$set: {'profile.color': '000000'}});
};

createColors();