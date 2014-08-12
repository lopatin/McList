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

/*
 * All items page
 */
Template.all.items = function () {
    return Items.find({}, {sort: [['order', 'asc']]});
};


/*
 * Autorun
 */
Deps.autorun(function () {
    var cursor = Cursors.findOne(Session.get('cursor_id'));
    if (cursor) {
        Session.set('cursor_item_id', cursor.item_id);
        Session.set('cursor_position', cursor.position);
    }
});






Meteor.startup(function () {
    /*
     * Authenticate an anonymous user
     */
    var username = localStorage.getItem('anonymous_username');
    var password = localStorage.getItem('anonymous_password');
    if (!Meteor.userId()) {
        if (username && password) {
            Meteor.loginWithPassword({username: username}, password, function (error) {
                if (!error) {
                    console.log('logged in!');
                } else {
                    console.log('Error logging in. Deleting anonymous_username and anonymous_password.');
                    localStorage.removeItem('anonymous_username');
                    localStorage.removeItem('anonymous_password');
                }
            });
        } else {
            username = Meteor.uuid();
            password = 'password';
            Accounts.createUser({
                username: username,
                password: password,
                profile: {}
            }, function (error) {
                if (!error) {
                    console.log('registered!');
                    localStorage.setItem('anonymous_username', username);
                    localStorage.setItem('anonymous_password', password);
                }
            });
        }
    }

    Meteor.subscribe('cursors', function () {
        cursor = Cursors.findOne({user_id: Meteor.userId()});
        if (cursor)
            Session.set('cursor_id', cursor._id);
        else
            Session.set('cursor_id', Cursors.insert({user_id: Meteor.userId(), item_id: null, position: 0, visible: true}));
    });

    Meteor.subscribe('items', function () {
        itemsSubscribed = true;
        enterCommandMode();
        if (Items.find().count() === 0) {
            newItem(); 
        }
    });

});




