"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canStoreURLs = exports.FileUrlStorage = void 0;
var _fs = require("fs");
var lockfile = _interopRequireWildcard(require("proper-lockfile"));
var _combineErrors = _interopRequireDefault(require("combine-errors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
/* eslint no-unused-vars: 0 */

var canStoreURLs = exports.canStoreURLs = true;
var FileUrlStorage = exports.FileUrlStorage = /*#__PURE__*/function () {
  function FileUrlStorage(filePath) {
    _classCallCheck(this, FileUrlStorage);
    this.path = filePath;
  }
  _createClass(FileUrlStorage, [{
    key: "findAllUploads",
    value: function findAllUploads() {
      var _this = this;
      return new Promise(function (resolve, reject) {
        _this._getItems('tus::', function (err, results) {
          if (err) reject(err);else resolve(results);
        });
      });
    }
  }, {
    key: "findUploadsByFingerprint",
    value: function findUploadsByFingerprint(fingerprint) {
      var _this2 = this;
      return new Promise(function (resolve, reject) {
        _this2._getItems("tus::".concat(fingerprint), function (err, results) {
          if (err) reject(err);else resolve(results);
        });
      });
    }
  }, {
    key: "removeUpload",
    value: function removeUpload(urlStorageKey) {
      var _this3 = this;
      return new Promise(function (resolve, reject) {
        _this3._removeItem(urlStorageKey, function (err) {
          if (err) reject(err);else resolve();
        });
      });
    }
  }, {
    key: "addUpload",
    value: function addUpload(fingerprint, upload) {
      var _this4 = this;
      var id = Math.round(Math.random() * 1e12);
      var key = "tus::".concat(fingerprint, "::").concat(id);
      return new Promise(function (resolve, reject) {
        _this4._setItem(key, upload, function (err) {
          if (err) reject(err);else resolve(key);
        });
      });
    }
  }, {
    key: "_setItem",
    value: function _setItem(key, value, cb) {
      var _this5 = this;
      lockfile.lock(this.path, this._lockfileOptions()).then(function (release) {
        cb = _this5._releaseAndCb(release, cb);
        _this5._getData(function (err, data) {
          if (err) {
            cb(err);
            return;
          }
          data[key] = value;
          _this5._writeData(data, function (err2) {
            return cb(err2);
          });
        });
      })["catch"](cb);
    }
  }, {
    key: "_getItems",
    value: function _getItems(prefix, cb) {
      this._getData(function (err, data) {
        if (err) {
          cb(err);
          return;
        }
        var results = Object.keys(data).filter(function (key) {
          return key.startsWith(prefix);
        }).map(function (key) {
          var obj = data[key];
          obj.urlStorageKey = key;
          return obj;
        });
        cb(null, results);
      });
    }
  }, {
    key: "_removeItem",
    value: function _removeItem(key, cb) {
      var _this6 = this;
      lockfile.lock(this.path, this._lockfileOptions()).then(function (release) {
        cb = _this6._releaseAndCb(release, cb);
        _this6._getData(function (err, data) {
          if (err) {
            cb(err);
            return;
          }
          delete data[key];
          _this6._writeData(data, function (err2) {
            return cb(err2);
          });
        });
      })["catch"](cb);
    }
  }, {
    key: "_lockfileOptions",
    value: function _lockfileOptions() {
      return {
        realpath: false,
        retries: {
          retries: 5,
          minTimeout: 20
        }
      };
    }
  }, {
    key: "_releaseAndCb",
    value: function _releaseAndCb(release, cb) {
      return function (err) {
        if (err) {
          release().then(function () {
            return cb(err);
          })["catch"](function (releaseErr) {
            return cb((0, _combineErrors.default)([err, releaseErr]));
          });
          return;
        }
        release().then(cb)["catch"](cb);
      };
    }
  }, {
    key: "_writeData",
    value: function _writeData(data, cb) {
      var opts = {
        encoding: 'utf8',
        mode: 432,
        flag: 'w'
      };
      (0, _fs.writeFile)(this.path, JSON.stringify(data), opts, function (err) {
        return cb(err);
      });
    }
  }, {
    key: "_getData",
    value: function _getData(cb) {
      (0, _fs.readFile)(this.path, 'utf8', function (err, data) {
        if (err) {
          // return empty data if file does not exist
          if (err.code === 'ENOENT') cb(null, {});else cb(err);
          return;
        }
        try {
          data = !data.trim().length ? {} : JSON.parse(data);
        } catch (error) {
          cb(error);
          return;
        }
        cb(null, data);
      });
    }
  }]);
  return FileUrlStorage;
}();