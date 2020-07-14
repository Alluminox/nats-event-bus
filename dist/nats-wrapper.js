"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var nats = require('node-nats-streaming');

var NatsWrapper = /*#__PURE__*/function () {
  function NatsWrapper() {
    (0, _classCallCheck2["default"])(this, NatsWrapper);
  }

  (0, _createClass2["default"])(NatsWrapper, [{
    key: "connect",
    value: function connect(_ref) {
      var _this = this;

      var clusterId = _ref.clusterId,
          clientId = _ref.clientId,
          _ref$options = _ref.options,
          options = _ref$options === void 0 ? {
        url: url
      } : _ref$options;
      // if (this._client) return Promise.resolve();
      this._client = nats.connect(clusterId, clientId, options);

      this._client.on('disconnect', function () {
        return _this._client = null;
      });

      return new Promise(function (r, j) {
        _this._client.on('connect', r);

        _this._client.on('error', j);
      });
    }
  }, {
    key: "client",
    get: function get() {
      if (!this._client) throw new Error("Don\'t get connection before connect into nats");
      return this._client;
    }
  }]);
  return NatsWrapper;
}();

var _default = new NatsWrapper();

exports["default"] = _default;