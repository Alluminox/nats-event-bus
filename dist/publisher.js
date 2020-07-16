"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _event = _interopRequireDefault(require("./event"));

var _eventFactory = _interopRequireDefault(require("./event-factory"));

var _message = _interopRequireDefault(require("./message"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var PublisherEvent = /*#__PURE__*/function (_Event) {
  (0, _inherits2["default"])(PublisherEvent, _Event);

  var _super = _createSuper(PublisherEvent);

  function PublisherEvent() {
    (0, _classCallCheck2["default"])(this, PublisherEvent);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(PublisherEvent, [{
    key: "emit",
    value: function emit(queue, event) {
      var _this = this;

      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _message["default"];
      var callback = arguments.length > 3 ? arguments[3] : undefined;
      var parsedData = this.parseData(event, data);
      this.stan.publish(queue, parsedData, function (err) {
        if (err) throw new Error("'Fail publish message for ".concat(queue, ":").concat(event, "'"));

        _this.defaultCallback(queue, event)(callback);
      });
    }
  }, {
    key: "parseData",
    value: function parseData(event, data) {
      return Buffer.from(JSON.stringify({
        event: event,
        data: data
      }));
    }
  }, {
    key: "defaultCallback",
    value: function defaultCallback(queue, event) {
      return function (callback) {
        console.info("".concat(new Date(), " :: Message has been send to \"").concat(queue, "\" from event \"").concat(event, "\""));
        return callback;
      };
    }
  }]);
  return PublisherEvent;
}(_event["default"]);

var _default = (0, _eventFactory["default"])(PublisherEvent);

exports["default"] = _default;