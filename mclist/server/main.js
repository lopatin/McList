Meteor.startup(function () {
});

socketConnected = function (userId) {
    var originalStatus = isUserOnline(userId);
    updateOnlineUsers();
    if (!originalStatus) {
        userConnected(userId);
    }
};  

socketDisconnected = function (userId) {
    updateOnlineUsers();
    if (!isUserOnline(userId)){
        userDisconnected(userId);
    }
};

userDisconnected = function (userId) {
    Meteor.users.update({_id: userId}, {$set: {'profile.online': false}});
    // hideCursor(userId);
};

userConnected = function (userId) {
    Meteor.users.update({_id: userId}, {$set: {'profile.online': true}});
    // showCursor(userId);
};

isUserOnline = function (userId) {
    var user = getUser();
    return user && user.profile.isOnline;
};

getUser = function (userId) {
    return Meteor.users.findOne(userId);
};