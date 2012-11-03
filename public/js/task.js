// Generated by CoffeeScript 1.4.0
(function() {
  var mc;

  mc = McList;

  mc.Task = (function() {

    function Task(parent, list) {
      this.parent = parent;
      this.list = list;
      this.next = this.prev = null;
      this.char_list = new mc.CharNodeList(this);
      this.task_list = new mc.TaskList(this, this.list);
      this.element = $("<div>").addClass('task');
      this.content_div = $("<div>").addClass('content').appendTo(this.element);
      this.children_div = $("<div>").addClass('children').appendTo(this.element);
      this.list.cursor.set_char(this.char_list.end);
      if (!this.parent) {
        this.list.element.append(this.element);
      }
      this.render();
    }

    Task.prototype.render = function(recursive) {
      var char, task, _fn, _i, _j, _len, _len1, _ref, _ref1, _results;
      this.content_div.html('');
      _ref = this.char_list.to_array();
      _fn = function(char, list, content_div) {
        content_div.append(char.element);
        return char.element.click(function() {
          return list.cursor.set_char(char);
        });
      };
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        char = _ref[_i];
        _fn(char, this.list, this.content_div);
      }
      this.children_div.html('');
      if (recursive) {
        _ref1 = this.task_list.to_array();
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          task = _ref1[_j];
          this.children_div.append(task.element);
          _results.push(task.render(true));
        }
        return _results;
      }
    };

    Task.prototype.addTaskAfter = function(_task) {
      var temp;
      if (!_task) {
        _task = new mc.Task(this.parent, this.list);
      }
      _task.parent = this.parent;
      if (this.next !== null) {
        temp = this.next;
        _task.next = temp;
        this.next = _task;
        _task.prev = temp.prev;
        temp.prev = _task;
      } else {
        _task.prev = this;
        this.next = _task;
      }
      return _task;
    };

    Task.prototype.deleteTask = function() {
      var temp;
      if (this.next !== null) {
        temp = this.next;
        temp.prev = this.prev;
        if (this.prev !== null) {
          temp = this.prev;
          temp.next = this.next;
        }
        this.next = this.prev = null;
      } else {
        if (this.prev !== null) {
          temp = this.prev;
          this.prev = temp.next = null;
        }
      }
      temp.set_cursor();
      return {
        deleted: this,
        current: temp
      };
    };

    Task.prototype.set_cursor = function() {
      return this.list.cursor.set_char(this.char_list.end);
    };

    Task.prototype.to_string = function() {
      return this.char_list.to_string();
    };

    return Task;

  })();

}).call(this);
