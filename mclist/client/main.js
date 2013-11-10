/*
 * Subscribe to Metrics collection
 */
Metrics = new Meteor.Collection('metrics');
Meteor.subscribe('metrics');

/*
 * Initial name prompt
 */
Template.name_prompt.events({
    'submit form': function (e) {
        e.preventDefault();
        var name = $(e.target).find('input[type=text]').val();
        if (name) {
            Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.name': name }});
        }
    }
});

/*
 * Sidebar navigation
 */
Template.nav_list.pages = pages;
Template.nav_list_item.selected = function () {
    var current = Router.current();
    return current && current.route.name === this.name ? 'selected' : '';
};

Template.layout.loaded = function () {
    return !!Meteor.user();
};
Template.layout.hasName = function () {
    return Meteor.user() && Meteor.user().profile.name;
};


/*
 * Online now sidebar
 */
Template.online_now.onlineCount = function () {
    return Meteor.users.find({'profile.online': true, 'profile.name': {$ne: null}}).count();
};
Template.online_now.users = function () {
    return Meteor.users.find({'profile.online': true, 'profile.name': {$ne: null}}, {
        sort: ['profile.name'],
        fields: {'profile.color': 1, 'profile.name': 1}
    });
};