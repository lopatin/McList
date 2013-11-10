/*
 * Top level items
 */
var itemsSubscribed = false;
Items = new Meteor.Collection('items');
Meteor.subscribe('items', function () {
    itemsSubscribed = true;
    if (Items.find().count() === 0) {
        newItem();
    }
});

/*
 * Start editing a newly created item
 */
newItem = function (parent, before, after) {
    var order = 1;
    var itemId = Items.insert({order: order, editor: Meteor.userId(), text: ''});
    setCaretPosition("item_"+itemId, 0);
};

/*
 * Item template
 */
Template.item.editing = function () {
    return this.editor === Meteor.userId();
};

Template.item.characters = function () {
    return _.map(this.text, function (char) {
        return {char: char};
    });
};

Template.item.rendered = function () {
    console.log('rendered');
};

/*
 * Item template events
 */
Template.item.events({
    'keypress': function (e) {
        if (e.keyCode === 13) {
            var text = $(e.target).val();
            Items.update({_id: this._id}, {$set: {text: text, editor: null }});
        }
    }
});

Deps.autorun(function () {
    var count = Items.find().count();
    if (itemsSubscribed && count === 0) {
        newItem();
    }
});

/*
 * Set caret position in input element
 */
function setCaretPosition(elemId, caretPos) {
    console.log(elemId);
    var elem = document.getElementById(elemId);

    if(elem != null) {
        if(elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
}