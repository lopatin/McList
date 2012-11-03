// Generated by CoffeeScript 1.4.0
(function() {
  var mc;

  mc = McList;

  mc.CharNodeList = (function() {

    function CharNodeList(task) {
      this.task = task;
      this.sentinel = new mc.CharNode(this);
      this.start = this.end = this.sentinel;
      this.length = 1;
    }

    CharNodeList.prototype.getSize = function() {
      return this.length;
    };

    CharNodeList.prototype.addChar = function(input) {
      this.task.list.cursor.set_char(this.task.list.cursor.char.addAfter(input));
      return this.length++;
    };

    CharNodeList.prototype.deleteChar = function(node) {
      this.task.list.cursor.set_char(this.task.list.cursor.char.deleteNode());
      return this.length--;
    };

    CharNodeList.prototype.to_array = function() {
      var arr, curr;
      arr = [];
      curr = this.start;
      while (curr) {
        arr.push(curr);
        curr = curr.next;
      }
      return arr;
    };

    CharNodeList.prototype.to_string = function() {
      var char, str, _i, _len, _ref;
      str = "";
      _ref = this.to_array();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        char = _ref[_i];
        str += char.character;
      }
      return str;
    };

    CharNodeList.prototype.is_empty = function() {
      return this.start.character === null;
    };

    CharNodeList.prototype.empty = function() {
      this.start = this.end = this.sentinel;
      return this.task.list.cursor.set_char(this.sentinel);
    };

    return CharNodeList;

  })();

}).call(this);
