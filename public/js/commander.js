// Generated by CoffeeScript 1.4.0
(function() {
  var mc;

  mc = McList;

  mc.Commander = {
    shift_mode: false,
    control_mode: false,
    alt_mode: false,
    key_queue: [],
    init: function() {
      var self;
      this.init_special_modes('keydown', true);
      this.init_special_modes('keyup', false);
      self = this;
      return $(document).bind('keydown', function(e) {
        var keyval;
        e.preventDefault();
        keyval = mc.KeyCodeHelper.get_key_value(e);
        return self.keystroke(keyval);
      });
    },
    init_special_modes: function(event, value) {
      return $(document).bind(event, function(e) {
        switch (e.keyCode) {
          case 16:
            return mc.Commander.shift_mode = value;
          case 17:
            return mc.Commander.control_mode = value;
          case 18:
            return mc.Commander.alt_mode = value;
        }
      });
    },
    keystroke: function(key) {
      if (key && key !== 'shift' && key !== 'ctrl' && key !== 'alt') {
        this.key_queue.push(key);
      }
      this.analyze_queue();
      return console.log(this.key_queue);
    },
    analyze_queue: function() {
      var charmap, self, shift_mode, task;
      self = this;
      task = mc.app.list.cursor.char.char_list.task;
      shift_mode = this.shift_mode;
      charmap = matches.pattern({
        "[..., 'escape']": function() {
          if (!mc.app.list.command_mode) {
            mc.app.list.toggle_command_mode();
            return self.key_queue = [];
          }
        },
        "[..., c]": function(c) {
          var new_task;
          if (c === 'tab' && task.prev && task.parent) {
            task["delete"]().prev.last_child.add_task(task).set_cursor();
          }
          if (mc.app.list.command_mode) {
            switch (c) {
              case 'a':
                mc.app.list.toggle_command_mode();
                break;
              case 'i':
                mc.app.list.toggle_command_mode();
                mc.app.list.cursor.move_left();
                break;
              case 'l':
              case 'right':
                mc.app.list.cursor.move_right();
                break;
              case 'h':
              case 'left':
                mc.app.list.cursor.move_left();
                break;
              case 'j':
              case 'return':
              case 'down':
                mc.app.list.cursor.move_down();
                break;
              case 'k':
              case 'up':
                mc.app.list.cursor.move_up();
                break;
              case '$':
                mc.app.list.cursor.move_to_last();
                break;
              case '0':
                mc.app.list.cursor.move_to_first();
                break;
              case 'a':
                mc.app.list.toggle_command_mode();
                break;
              case 'i':
                mc.app.list.toggle_command_mode();
                mc.app.list.cursor.move_left();
                break;
              case 'x':
                task.char_list.deleteChar();
                mc.app.list.cursor.move_right();
                break;
              case 'o':
                if (!task.char_list.is_empty() && task.parent) {
                  new_task = task.add_task();
                  mc.app.list.enter_insert_mode();
                }
                break;
              case 'd':
                if (task.next) {
                  mc.app.list.cursor.move_down();
                } else {
                  mc.app.list.cursor.move_up();
                }
                task["delete"]();
            }
          } else {
            switch (c) {
              case 'backspace':
                if (mc.app.list.cursor.char.prev === null) {
                  task["delete"]().parent.add_task(task).set_cursor();
                } else {
                  task.char_list.deleteChar();
                }
                break;
              case 'return':
                if (!task.char_list.is_empty()) {
                  task.add_task();
                }
                break;
              default:
                if (!(c.length > 1)) {
                  task.char_list.addChar(c);
                }
            }
          }
          mc.app.list.root_task.render(true);
          mc.app.list.blink_in_second();
          return self.key_queue = [];
        }
      });
      return charmap(this.key_queue);
    }
  };

}).call(this);
