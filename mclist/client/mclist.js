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
