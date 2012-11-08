describe("McList", function(){
	var list, root, cursor;

	beforeEach(function() {
		mc = McList;
		list = mc.app.list;
		root = list.root_task;
		cursor = list.cursor;
		task = cursor.char.task();
	});

	describe("Initialization", function(){
		it("should initialize an empty task with cursor focus", function(){
			expect(root.first_child).toEqual(cursor.char.task());
		});
	});

	describe("Typing", function(){
		beforeEach(function(){
			if(list.command_mode)
				press_key('i');
		});

		it("should begin with an empty char list with cursor focus", function(){
			expect(task).toEqual(cursor.char.task());
			expect(task.char_list.start).toEqual(task.char_list.sentinel);
		});

		it("should enter insert mode", function(){
			expect(list.command_mode).toEqual(false);
		});

		it("should create a single character task after pressing a letter key", function(){
			press_key('p');
			expect(task.to_string()).toEqual('p');
		});
	});

	function press_key(key){
		var e = jQuery.Event("keydown");
		e.which = mc.KeyCodeHelper.keyCodeMap_r[key];
		$(document.body).trigger(e);
	}
});