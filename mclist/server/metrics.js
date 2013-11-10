Metrics = new Meteor.Collection("metrics");

/*
 * Monitor when sockets are connected/disconnected
 */
Meteor.publish('metrics', function () {
    var userId = this.userId;
    socketConnected(userId);
    this.onStop(function () {
        socketDisconnected(userId);
    });
});

/*
 * Update the count of current online users
 */
onlineUserIds = {};
updateOnlineUsers = function () {
    var sockets = Meteor.default_server.stream_server.open_sockets;
    onlineUserIds = {};
    var count = 0;
    for (var i = sockets.length - 1; i >= 0; i--) {
        var id = sockets[i]._meteorSession.userId;
        if (!onlineUserIds[id]) {
            onlineUserIds[id] = true;
            count++;
        }
    }
    Metrics.upsert({key: 'online_users'}, {$set: { value: count }});
};

