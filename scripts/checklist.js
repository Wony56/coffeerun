(function(window) {
  "use strict";

  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  CheckList.prototype.addClickHandler = function(fn) {
    this.$element.on(
      "click",
      "input",
      function(event) {
        var email = event.target.value;
        this.removeRow(email);
        fn(email);
      }.bind(this)
    );
  };

  CheckList.prototype.addRow = function(coffeeOrder) {
    this.removeRow(coffeeOrder.emailAddress);

    var rowElement = new Row(coffeeOrder);

    this.$element.append(rowElement.$element);
  };

  CheckList.prototype.removeRow = function(email) {
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-coffee-order="checkbox"]')
      .remove();
  };

  function Row(coffeeOrder) {
    var $div = $("<div></div>", {
      "data-coffee-order": "checkbox",
      class: "checkbox"
    });

    var $label = $("<label></label>");

    var $checkbox = $("<input></input>", {
      type: "checkbox",
      value: coffeeOrder.emailAddress
    });

    var description = " [" + coffeeOrder.strength + "x] ";

    description += coffeeOrder.size + " ";
    if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor + " ";

      if (coffeeOrder.flavor === "caramel") {
        $div.css("color", "GoldenRod");
      } else if (coffeeOrder.flavor === "almond") {
        $div.css("color", "DarkRed");
      } else if (coffeeOrder.flavor === "mocha") {
        $div.css("color", "Chocolate");
      }
    }

    description += coffeeOrder.coffee + ", ";
    description += " (" + coffeeOrder.emailAddress + ")";

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;
  }

  App.CheckList = CheckList;
  window.App = App;
})(window);
