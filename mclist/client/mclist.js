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
});

/*
 * Router
 */
pages = [
    { name: 'all', text: 'All', path: '/', icon: 'inbox' },
    { name: 'today', text: 'Today', path: '/today', icon: 'calendar' },
    { name: 'starred', text: 'Starred', path: '/starred', icon: 'star' },
    { name: 'done', text: 'Done', path: '/done', icon: 'checkmark' }
];
Router.configure({
    autoRender: false
});
Router.map(function () {
    var self = this;
    _.each(pages, function (page) {
        self.route(page.name, {path: page.path});
    });
});
