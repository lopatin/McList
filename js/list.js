// Generated by CoffeeScript 1.4.0
(function() {
  var mc;

  mc = McList;

  mc.List = (function() {

    function List(command_mode) {
      this.command_mode = command_mode;
      this.element = $("#mainList");
      this.cursor = new mc.Cursor(this);
      this.root_task = new mc.Task(null, this);
      this.root_task.task_list.addTask();
      this.update_status_bar();
      this.root_task.render();
      this.blink_in_second();
    }

    List.prototype.enter_command_mode = function() {
      this.command_mode = true;
      return this.update_status_bar();
    };

    List.prototype.enter_insert_mode = function() {
      this.command_mode = false;
      return this.update_status_bar();
    };

    List.prototype.toggle_command_mode = function() {
      this.command_mode = !this.command_mode;
      return this.update_status_bar();
    };

    List.prototype.update_status_bar = function() {
      if (this.command_mode) {
        $("#status").addClass('command_mode');
        return this.element.addClass('command_mode');
      } else {
        $("#status").removeClass('command_mode');
        return this.element.removeClass('command_mode');
      }
    };

    List.prototype.first_char = function() {
      return this.root_task.char_list.start;
    };

    List.prototype.blink_in_second = function() {
      var self;
      if (this.cursor_timer) {
        clearInterval(this.cursor_timer);
      }
      this.element.addClass('show-cursor');
      self = this;
      return this.cursor_timer = setInterval(function() {
        return self.element.toggleClass('show-cursor');
      }, 500);
    };

    return List;

  })();

}).call(this);
