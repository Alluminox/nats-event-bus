"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Event = /*#__PURE__*/function () {
  function Event() {
    (0, _classCallCheck2["default"])(this, Event);
  }

  (0, _createClass2["default"])(Event, [{
    key: "setConnection",
    value: function setConnection(stan) {
      this.stan = stan;
      return this;
    }
  }]);
  return Event;
}();

exports["default"] = Event;