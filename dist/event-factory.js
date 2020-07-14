"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _natsWrapper = _interopRequireDefault(require("./nats-wrapper"));

var _default = function _default(EventImpl) {
  return {
    create: function create() {
      try {
        var connection = _natsWrapper["default"].client;
        var event = new EventImpl();
        event.setConnection(connection);
        return event;
      } catch (err) {
        throw new Error(err.message);
      }
    }
  };
};

exports["default"] = _default;