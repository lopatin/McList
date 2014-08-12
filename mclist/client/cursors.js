Cursors = new Meteor.Collection('cursors');

Cursor = { 
	moveLeft: function (amount) {
		this.setPosition(Math.max(0, Cursor.getCursor().position-(amount || 1)));
	},
	moveRight: function (amount) {
		this.setPosition(Math.min(this.getMaxPosition(), Cursor.getCursor().position+(amount || 1)));
	},
	moveUp: function (amount) {
		var newItem = Item.previousItemInList(this.getItem());
		if (newItem) {
			this.setItem(newItem);
		}
	},
	moveDown: function (amount) {
		var newItem = Item.nextItemInList(this.getItem());
		if (newItem) {
			this.setItem(newItem);
		}
	},
	setPosition: function (position) {
		if (_.isNumber(position)) {
			Cursors.update({_id: cursor._id}, {$set: {
				position: position,
				cap_position: position
			}});
		}
	}, 
	getPosition: function () {
		return this.getCursor().position;
	},
	getCapPosition: function () {
		return this.getCursor().cap_position;
	},
	setItem: function (item) {
		Cursors.update({_id: Session.get('cursor_id')}, {$set: {
			item_id: item._id,
			position: Math.min(this.getMaxPosition(item), this.getCapPosition())
		}});
	},
	getMaxPosition: function (item) {
		return (item || this.getItem()).text.length;
	},
	getCursor: function () {
		return Cursors.findOne(Session.get('cursor_id'));
	},
	getItem: function () {
		var item_id = this.getCursor().item_id;
		return item_id ? Items.findOne(item_id) : null;
	}
};



/*
 * Get/set caret position in input element
 */
Cursor.setCaretPosition = function (itemId, caretPos) {
	var elem = window.textinput = $("#item_"+itemId+" input")[0];
	if (elem) {
	    elem.focus();
	    elem.setSelectionRange(caretPos, caretPos);
	}
}
Cursor.getCaretPosition = function () {
	var item = this.getItem();
	if (!item) {
		return null;
	}
	var elem = $("#item_"+item._id+" input")[0];
	return elem ? elem.selectionStart : null;
};
Cursor.updateCursorPosition = function () {
	var pos = this.getCaretPosition();
	if (pos) {
        Cursor.setPosition(pos);
	}
};