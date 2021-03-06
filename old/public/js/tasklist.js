// Generated by CoffeeScript 1.4.0
(function() {
  var mc;

  mc = McList;

  mc.TaskList = (function() {

    function TaskList(parent, list) {
      this.parent = parent;
      this.list = list;
      this.start = this.end = this.current = null;
      this.length = 0;
    }

    TaskList.prototype.addTask = function(_task) {
      if (_task) {
        console.log(_task.char_list.to_string());
        console.log("belongs to " + _task.parent.char_list.to_string());
      }
      if (this.current === null) {
        if (!_task) {
          _task = new mc.Task(this.parent, this.list);
        }
        this.start = this.end = this.current = _task;
        this.length++;
      } else {
        if (_task) {
          _task.parent = this.parent;
        }
        this.current = this.current.add_task(_task, false);
      }
      if (this.end.next !== null) {
        this.end = this.current;
      }
      if (this.start.prev !== null) {
        this.start = this.current;
      }
      return _task;
    };

    TaskList.prototype.deleteTaskItem = function() {
      var delete_return;
      if (this.end !== this.start) {
        delete_return = this.current.deleteTask();
        this.current = delete_return.current;
        this.length--;
        if (this.end.prev === null) {
          this.end = this.current;
        }
        if (this.start.next === null) {
          this.start = this.current;
        }
        return delete_return.deleted;
      }
    };

    TaskList.prototype.to_array = function() {
      var arr, curr;
      arr = [];
      curr = this.start;
      while (curr) {
        arr.push(curr);
        curr = curr.next;
      }
      return arr;
    };

    TaskList.prototype.set_current = function(curr) {
      return this.current = curr;
    };

    return TaskList;

  })();

}).call(this);
