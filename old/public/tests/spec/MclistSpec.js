describe("McList", function(){
	var list, root, cursor, task;

	beforeEach(function() {
		list = mc.app.list;
		root = list.root_task;
		cursor = list.cursor;
		task = cursor.task();
	});

	describe("Initialization", function(){
		it("should initialize an empty task with cursor focus", function(){
			expect(root.first_child).toEqual(cursor.char.task());
		});
	});

	describe("Typing", function(){
		var simulator, task;

		beforeEach(function(){
			/*
			 * Create a dedicated simulator and test task for each test case
			 */
			simulator = new mc.TaskSimulator();
			task = simulator.task;
		});

		it("should begin with an empty char list with cursor focus", function(){
			expect(task).toEqual(cursor.char.task());
			expect(task.char_list.start).toEqual(task.char_list.sentinel);
		});

		it("should enter insert mode", function(){
			simulator.run(["i"]);
			expect(list.command_mode).toEqual(false);
		});

		it("should correctly type all numbers and letters", function(){
			var test_str = "abcdefghikjlmnopqrstuvwxyz1234556789";
			simulator.run(test_str.split(''));
			expect(task.to_string()).toEqual(test_str);
		});

		it("should enter command mode", function(){
			simulator.run(["escape"]);
			expect(list.command_mode).toEqual(true);
		});
	});

	describe("Task management", function(){
		var simulator, task;

		beforeEach(function(){
			simulator = new mc.TaskSimulator();
			task = simulator.task;
		});

		it("should create a new child task by pressing o + tab in command mode", function(){
			list.enter_command_mode();
			simulator.run('enter dummy text');
			list.enter_command_mode();
			console.log(simulator.task.to_string());
			simulator.run(['o', 'tab', 'i', 'h', 'i']);
			var k = cursor.task();
			console.log(simulator.task.to_string());
			// console.log("PARENT");
			// console.log(k.parent);
			expect(task === mc.app.list.cursor.char.char_list.task.parent).toEqual(true);
		});

		// it("should create a new sibling task after the current one by pressing o", function(){

		// });
	});
});
