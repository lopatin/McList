/*
 * Top level items
 */
itemsSubscribed = false;
Items = new Meteor.Collection('items');
Item = {};


/*
 * Edit modes
 */
enterCommandMode = function () {
    var item = Cursor.getItem();
    if (item) {
        Cursor.setPosition(Cursor.getCaretPosition());
        Items.update({_id: item._id}, {$set: {
            editor: null
        }});
    }
    Session.set('command_mode', true);
};

enterInsertMode = function () {
    var item = Cursor.getItem();
    if (item) {
        Items.update({_id: item._id}, {$set: {
            editor: Meteor.userId()
        }});
    }
    Session.set('command_mode', false);
};



/*
 * Start editing a newly created item
 */
order = 1;
newItem = function (parent, before, after) {
    var itemId = Items.insert({order: order, editor: null, text: ''});
    console.log(Session.get('cursor_id'));
    Cursors.update({_id: Session.get('cursor_id')}, {$set: {
        item_id: itemId,
        position: 0
    }});
    enterInsertMode();
    order++;
};


/*
 * Item template
 */
Template.item.editing = function () {
    return this.editor === Meteor.userId();
};

Template.item.characters = function () {
    var self = this;
    return _.map(this.text.split('').concat([' ']), function (char, i) {
        var caret = Template.item.highlighted.apply(self) && i === Session.get('cursor_position') ? 'caret' : '';
        var color = "rgba(0,0,0,0)";
        var editing = false;
        var cursor = Cursors.findOne({
            user_id: {$ne: Meteor.userId()}, 
            item_id: self._id,
            position: i,
            visible: true
        });
        if (!caret && cursor) {
            color = Meteor.users.findOne(cursor.user_id).profile.color;
            editing = Items.findOne(cursor.item_id).editor == cursor.user_id;
        }
        return {
            char: char,
            caret: caret,
            itemId: self._id,
            caret: caret,
            box_shadow: (editing ? "inset 1px 0 0 #" : "inset 0 -3px 0 #") + color
        };
    });
};

Template.item.rendered = function () {
    if (Session.get('command_mode') === false) {
        Cursor.setCaretPosition(Cursor.getItem()._id, Cursor.getCursor().position);
    }
};

Template.item.highlighted = function () {
    return this._id === Session.get('cursor_item_id') ? 'highlighted' : '';
};

/*
 * Item template events
 */
Template.item.events({
    'keyup': function (e) {
        Cursor.updateCursorPosition();
        var text = $(e.target).val();
        Items.update({_id: this._id}, {$set: {text: text}});

        // Enter
        if (e.keyCode === 13) {
            enterCommandMode();
            return false;
        }

        // Escape
        if (e.keyCode === 27) {
            enterCommandMode();
            Cursor.moveLeft();
            return false;
        }
    },
    'click .character': function (e) {
        var position = $(e.target).prevAll().length;

        Cursors.update({_id: Session.get('cursor_id')}, {$set: {
            item_id: this.itemId,
            position: position
        }});
    }
});

Deps.autorun(function () {
    var count = Items.find().count();
    if (itemsSubscribed && count === 0) {
        newItem();
    }
});


Item.nextItemInList = function (item) {
    return Items.findOne({order: {$gt: item.order}}, {sort: [['order', 'asc']]});
};

Item.previousItemInList = function (item) {
    return Items.findOne({order: {$lt: item.order}}, {sort: [['order', 'desc']]});
};


