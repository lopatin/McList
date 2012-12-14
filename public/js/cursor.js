// Generated by CoffeeScript 1.4.0
(function() {
  var mc;

  mc = McList;

  mc.Cursor = (function() {

    function Cursor(list) {
      this.list = list;
    }

    Cursor.prototype.set_char = function(new_char) {
      if (this.char) {
        this.char.element.removeClass('cursor');
      }
      this.char = new_char;
      this.char.element.addClass('cursor');
      return this.list.render();
    };

    Cursor.prototype.set_task = function(new_task) {
      return new_task.set_cursor();
    };

    Cursor.prototype.move_left = function() {
      if (this.char.prev) {
        return this.set_char(this.char.prev);
      }
    };

    Cursor.prototype.move_down = function() {
      var curr, next;
      next = this.char.task().next;
      if (this.char.task().has_children()) {
        return this.set_task(this.char.task().first_child);
      } else if (next) {
        return this.set_task(next);
      } else {
        curr = this.char.task().parent;
        while (curr) {
          if (curr.next) {
            this.set_task(curr.next);
            return;
          }
          curr = curr.parent;
        }
      }
    };

    Cursor.prototype.move_up = function() {
      var prev, temp;
      prev = this.char.task().prev;
      if (prev) {
        temp = prev.get_last_child(true) || prev;
        return this.set_task(temp);
      } else if (!this.char.task().parent.is_root()) {
        return this.set_task(this.char.task().parent);
      }
    };

    Cursor.prototype.move_right = function() {
      if (this.char.next) {
        return this.set_char(this.char.next);
      }
    };

    Cursor.prototype.move_to_last = function() {
      if (this.char.char_list.end) {
        return this.set_char(this.char.char_list.end);
      }
    };

    Cursor.prototype.move_to_first = function() {
      if (this.char.char_list.start) {
        return this.set_char(this.char.char_list.start);
      }
    };

    Cursor.prototype.task = function() {
      return this.char.task();
    };

    return Cursor;

  })();

}).call(this);
