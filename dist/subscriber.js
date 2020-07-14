"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subscriber = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _event = _interopRequireDefault(require("./event"));

var _eventFactory = _interopRequireDefault(require("./event-factory"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SubscriberEvent = /*#__PURE__*/function (_Event) {
  (0, _inherits2["default"])(SubscriberEvent, _Event);

  var _super = _createSuper(SubscriberEvent);

  function SubscriberEvent() {
    (0, _classCallCheck2["default"])(this, SubscriberEvent);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(SubscriberEvent, [{
    key: "sub",
    value: function () {
      var _sub = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queue, event, callback, _ref) {
        var _this = this;

        var queueGroupName, subscription;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                queueGroupName = _ref.queueGroupName;
                subscription = this.stan.subscribe(queue, queueGroupName, this.getSubscription({
                  ackWait: 5 * 1000,
                  queueGroupName: queueGroupName
                }));
                subscription.on('message', function (msg) {
                  var parsedMessage = _this.parseMessage(msg);

                  if (parsedMessage.event === event) {
                    console.info("".concat(new Date(), " :: Message has been consumed from \"").concat(queue, "\" to event \"").concat(event, "\""));
                    callback(parsedMessage, msg);
                  }
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function sub(_x, _x2, _x3, _x4) {
        return _sub.apply(this, arguments);
      }

      return sub;
    }()
  }, {
    key: "getSubscription",
    value: function getSubscription(_ref2) {
      var ackWait = _ref2.ackWait,
          queueGroupName = _ref2.queueGroupName;
      return this.stan.subscriptionOptions().setDeliverAllAvailable() // Redelivery de mensagens
      .setManualAckMode(true) // Devemos dar um msg.ack em cada mensagem recebida
      .setAckWait(ackWait) // Tempo de espera para marcar uma mensagem como ack(removida da fila)
      .setDurableName(queueGroupName);
    }
  }, {
    key: "parseMessage",
    value: function parseMessage(msg) {
      var data = msg.getData();
      return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf-8'));
    }
  }]);
  return SubscriberEvent;
}(_event["default"]);

var Subscriber = (0, _eventFactory["default"])(SubscriberEvent);
exports.Subscriber = Subscriber;