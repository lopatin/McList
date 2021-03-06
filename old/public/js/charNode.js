// Generated by CoffeeScript 1.4.0
(function() {
  var mc;

  mc = McList;

  mc.CharNode = (function() {

    function CharNode(char_list, character) {
      this.char_list = char_list;
      this.character = character != null ? character : null;
      this.next = this.prev = null;
      this.element = $("<div>").addClass('character ' + (!this.character ? "sentinel" : "")).html(!this.character || this.character === ' ' ? "&nbsp;" : this.character);
      this.element.append($("<div class='bottom-row'>"));
    }

    CharNode.prototype.addAfter = function(input) {
      var temp, _char;
      _char = new mc.CharNode(this.char_list, input);
      if (this.char_list.is_empty()) {
        this.char_list.start = this.char_list.end = _char;
        _char.next = _char.prev = null;
      } else if (this.next) {
        temp = this.next;
        _char.next = temp;
        this.next = _char;
        temp.prev = _char;
        _char.prev = this;
      } else {
        this.next = _char;
        this.char_list.end = _char;
        _char.prev = this;
      }
      return _char;
    };

    CharNode.prototype.deleteNode = function() {
      var temp;
      if (this.next === null && this.prev === null) {
        this.char_list.empty();
        return this.char_list.sentinel;
      } else if (this.next) {
        temp = this.next;
        temp.prev = this.prev;
        temp = this.prev;
        temp.next = this.next;
        this.next = this.prev = null;
      } else {
        temp = this.prev;
        this.prev = temp.next = null;
      }
      return temp;
    };

    CharNode.prototype.task = function() {
      return this.char_list.task;
    };

    CharNode.prototype.is_visible = function() {
      return (this.element != null) && this.element.is(":visible");
    };

    return CharNode;

  })();

}).call(this);
