"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var http = _interopRequireWildcard(require("http"));
var https = _interopRequireWildcard(require("https"));
var _url = require("url");
var _stream = require("stream");
var _lodash = _interopRequireDefault(require("lodash.throttle"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
/* eslint-disable max-classes-per-file, node/no-deprecated-api */
// The url.parse method is superseeded by the url.URL constructor,
// but it is still included in Node.js

var NodeHttpStack = exports.default = /*#__PURE__*/function () {
  function NodeHttpStack() {
    var requestOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, NodeHttpStack);
    this._requestOptions = requestOptions;
  }
  _createClass(NodeHttpStack, [{
    key: "createRequest",
    value: function createRequest(method, url) {
      return new Request(method, url, this._requestOptions);
    }
  }, {
    key: "getName",
    value: function getName() {
      return 'NodeHttpStack';
    }
  }]);
  return NodeHttpStack;
}();
var Request = /*#__PURE__*/function () {
  function Request(method, url, options) {
    _classCallCheck(this, Request);
    this._method = method;
    this._url = url;
    this._headers = {};
    this._request = null;
    this._progressHandler = function () {};
    this._requestOptions = options || {};
  }
  _createClass(Request, [{
    key: "getMethod",
    value: function getMethod() {
      return this._method;
    }
  }, {
    key: "getURL",
    value: function getURL() {
      return this._url;
    }
  }, {
    key: "setHeader",
    value: function setHeader(header, value) {
      this._headers[header] = value;
    }
  }, {
    key: "getHeader",
    value: function getHeader(header) {
      return this._headers[header];
    }
  }, {
    key: "setProgressHandler",
    value: function setProgressHandler(progressHandler) {
      this._progressHandler = progressHandler;
    }
  }, {
    key: "send",
    value: function send() {
      var _this = this;
      var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return new Promise(function (resolve, reject) {
        var options = _objectSpread(_objectSpread(_objectSpread({}, (0, _url.parse)(_this._url)), _this._requestOptions), {}, {
          method: _this._method,
          headers: _objectSpread(_objectSpread({}, _this._requestOptions.headers || {}), _this._headers)
        });
        if (body && body.size) {
          options.headers['Content-Length'] = body.size;
        }
        var httpModule = options.protocol === 'https:' ? https : http;
        _this._request = httpModule.request(options);
        var req = _this._request;
        req.on('response', function (res) {
          var resChunks = [];
          res.on('data', function (data) {
            resChunks.push(data);
          });
          res.on('end', function () {
            var responseText = Buffer.concat(resChunks).toString('utf8');
            resolve(new Response(res, responseText));
          });
        });
        req.on('error', function (err) {
          reject(err);
        });
        if (body instanceof _stream.Readable) {
          // Readable stream are piped through a PassThrough instance, which
          // counts the number of bytes passed through. This is used, for example,
          // when an fs.ReadStream is provided to tus-js-client.
          body.pipe(new ProgressEmitter(_this._progressHandler)).pipe(req);
        } else if (body instanceof Uint8Array) {
          // For Buffers and Uint8Arrays (in Node.js all buffers are instances of Uint8Array),
          // we write chunks of the buffer to the stream and use that to track the progress.
          // This is used when either a Buffer or a normal readable stream is provided
          // to tus-js-client.
          writeBufferToStreamWithProgress(req, body, _this._progressHandler);
        } else {
          req.end(body);
        }
      });
    }
  }, {
    key: "abort",
    value: function abort() {
      if (this._request !== null) this._request.abort();
      return Promise.resolve();
    }
  }, {
    key: "getUnderlyingObject",
    value: function getUnderlyingObject() {
      return this._request;
    }
  }]);
  return Request;
}();
var Response = /*#__PURE__*/function () {
  function Response(res, body) {
    _classCallCheck(this, Response);
    this._response = res;
    this._body = body;
  }
  _createClass(Response, [{
    key: "getStatus",
    value: function getStatus() {
      return this._response.statusCode;
    }
  }, {
    key: "getHeader",
    value: function getHeader(header) {
      return this._response.headers[header.toLowerCase()];
    }
  }, {
    key: "getBody",
    value: function getBody() {
      return this._body;
    }
  }, {
    key: "getUnderlyingObject",
    value: function getUnderlyingObject() {
      return this._response;
    }
  }]);
  return Response;
}(); // ProgressEmitter is a simple PassThrough-style transform stream which keeps
// track of the number of bytes which have been piped through it and will
// invoke the `onprogress` function whenever new number are available.
var ProgressEmitter = /*#__PURE__*/function (_Transform) {
  _inherits(ProgressEmitter, _Transform);
  var _super = _createSuper(ProgressEmitter);
  function ProgressEmitter(onprogress) {
    var _this2;
    _classCallCheck(this, ProgressEmitter);
    _this2 = _super.call(this);

    // The _onprogress property will be invoked, whenever a chunk is piped
    // through this transformer. Since chunks are usually quite small (64kb),
    // these calls can occur frequently, especially when you have a good
    // connection to the remote server. Therefore, we are throtteling them to
    // prevent accessive function calls.
    _this2._onprogress = (0, _lodash.default)(onprogress, 100, {
      leading: true,
      trailing: false
    });
    _this2._position = 0;
    return _this2;
  }
  _createClass(ProgressEmitter, [{
    key: "_transform",
    value: function _transform(chunk, encoding, callback) {
      this._position += chunk.length;
      this._onprogress(this._position);
      callback(null, chunk);
    }
  }]);
  return ProgressEmitter;
}(_stream.Transform); // writeBufferToStreamWithProgress writes chunks from `source` (either a
// Buffer or Uint8Array) to the readable stream `stream`.
// The size of the chunk depends on the stream's highWaterMark to fill the
// stream's internal buffer as best as possible.
// If the internal buffer is full, the callback `onprogress` will be invoked
// to notify about the write progress. Writing will be resumed once the internal
// buffer is empty, as indicated by the emitted `drain` event.
// See https://nodejs.org/docs/latest/api/stream.html#buffering for more details
// on the buffering behavior of streams.
var writeBufferToStreamWithProgress = function writeBufferToStreamWithProgress(stream, source, onprogress) {
  onprogress = (0, _lodash.default)(onprogress, 100, {
    leading: true,
    trailing: false
  });
  var offset = 0;
  function writeNextChunk() {
    // Take at most the amount of bytes from highWaterMark. This should fill the streams
    // internal buffer already.
    var chunkSize = Math.min(stream.writableHighWaterMark, source.length - offset);

    // Note: We use subarray instead of slice because it works without copying data for
    // Buffers and Uint8Arrays.
    var chunk = source.subarray(offset, offset + chunkSize);
    offset += chunk.length;

    // `write` returns true if the internal buffer is not full and we should write more.
    // If the stream is destroyed because the request is aborted, it will return false
    // and no 'drain' event is emitted, so won't continue writing data.
    var canContinue = stream.write(chunk);
    if (!canContinue) {
      // If the buffer is full, wait for the 'drain' event to write more data.
      stream.once('drain', writeNextChunk);
      onprogress(offset);
    } else if (offset < source.length) {
      // If there's still data to write and the buffer is not full, write next chunk.
      writeNextChunk();
    } else {
      // If all data has been written, close the stream if needed, and emit a 'finish' event.
      stream.end();
    }
  }

  // Start writing the first chunk.
  writeNextChunk();
};