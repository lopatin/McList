key('h', function () {
	Cursor.moveLeft();
});
key('l', function () {
	Cursor.moveRight();
});
key('j', function () {
	Cursor.moveDown();
});
key('k', function () {
	Cursor.moveUp();
});
key('o', function () {
	newItem();
});
key('i', function () {
	enterInsertMode();
});
key('a', function () {
	Cursor.moveRight();
	enterInsertMode();
});
key('0', function () {
	Cursor.moveLeft(100000000000);
});
key('shift+4', function () {
	Cursor.moveRight(100000000000);
});
key('command+delete, command+backspace, command+del', function () {
	var item = Cursor.getItem();
	if (Item.nextItemInList(item))
		Cursor.moveDown();
	else
		Cursor.moveUp();
	Items.remove(item._id);
});
key('escape', function (e) {
	console.log('asdfa');
	e.preventDefault();
	if (!Session.get('command_mode')) {
		enterCommandMode();
		Cursor.moveLeft();
	}
	return false;
});


/*
 * Pages
 */
_.each(pages, function (page, i) {
	i++;
	key('⌘+'+i+', ctrl+'+i, function (e) {
		e.preventDefault();
		Router.go(page.path);
		return false;
	});
});