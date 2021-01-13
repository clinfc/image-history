(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ImageHistory"] = factory();
	else
		root["ImageHistory"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __read = this && this.__read || function (o, n) {\n  var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n  if (!m) return o;\n  var i = m.call(o),\n      r,\n      ar = [],\n      e;\n\n  try {\n    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n  } catch (error) {\n    e = {\n      error: error\n    };\n  } finally {\n    try {\n      if (r && !r.done && (m = i[\"return\"])) m.call(i);\n    } finally {\n      if (e) throw e.error;\n    }\n  }\n\n  return ar;\n};\n\nvar __spread = this && this.__spread || function () {\n  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));\n\n  return ar;\n};\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar ImageHistory = function () {\n  function ImageHistory(target) {\n    var _this = this;\n\n    this.target = target;\n    this.data = new Map();\n    this.observer = new MutationObserver(function (mutations) {\n      mutations.forEach(function (record) {\n        if (record.type == 'childList') {\n          var addedNodes = record.addedNodes,\n              removedNodes = record.removedNodes;\n          removedNodes.forEach(function (node) {\n            if (node.nodeName == 'IMG') {\n              _this.data.set(node.getAttribute('src'), false);\n            }\n          });\n          addedNodes.forEach(function (node) {\n            if (node.nodeName == 'IMG') {\n              _this.data.set(node.getAttribute('src'), true);\n            }\n          });\n        } else {\n          var target_1 = record.target,\n              oldValue = record.oldValue;\n\n          if (target_1.nodeName == 'IMG') {\n            oldValue && _this.data.set(oldValue, false);\n\n            _this.data.set(target_1.getAttribute('src'), true);\n          }\n        }\n      });\n    });\n    this.observer.observe(target, {\n      subtree: true,\n      childList: true,\n      attributes: true,\n      attributeOldValue: true,\n      attributeFilter: ['src']\n    });\n  }\n\n  ImageHistory.prototype.deleted = function () {\n    var temp = [];\n    this.data.forEach(function (status, src) {\n      if (!status) {\n        temp.push(src);\n      }\n    });\n    return temp;\n  };\n\n  ImageHistory.prototype.inserted = function () {\n    var temp = [];\n    this.data.forEach(function (status, src) {\n      if (status) {\n        temp.push(src);\n      }\n    });\n    return temp;\n  };\n\n  ImageHistory.prototype.all = function () {\n    return __spread(this.data).map(function (_a) {\n      var _b = __read(_a, 2),\n          src = _b[0],\n          status = _b[1];\n\n      return {\n        src: src,\n        type: status ? 'inserted' : 'deleted'\n      };\n    });\n  };\n\n  ImageHistory.prototype.clear = function () {\n    this.data.clear();\n  };\n\n  ImageHistory.prototype.destory = function () {\n    this.observer.disconnect();\n    this.clear();\n  };\n\n  return ImageHistory;\n}();\n\nexports.default = ImageHistory;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXgudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9JbWFnZUhpc3RvcnkvLi9zcmMvaW5kZXgudHM/ZmZiNCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQHByb3RlY3RlZCDlqpLkvZPmlofku7bvvIhpbWFnZe+8ieebkeaOp1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiDlm77niYfnmoTljoblj7LorrDlvZXvvIzpnIDopoHlnKggZWRpdG9yLmNyZWF0ZSDkuYvlkI7osIPnlKhcclxuICpcclxuICogZWfvvJplZGl0b3IuaW1ncyA9IG5ldyBJbWFnZUhpc3RvcnkoZWRpdG9yLiR0ZXh0RWxlbS5lbGVtc1swXSlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlSGlzdG9yeSB7XHJcbiAgICAvKipcclxuICAgICAqIOebkeWQrOWZqFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbWFnZSDmoIfnrb7nmoTlj5jljJborrDlvZXjgIJib29sZWFuIOWAvOihqOekuiBpbWFnZSDmoIfnrb7lvZPliY3nmoTnirbmgIHvvIzkuLogdHJ1ZSDooajnpLrlrZjlnKjkuo7mlofmoaPkuK3vvJvkuLogZmFsc2Ug6KGo56S66K+lIGltYWdlIOagh+etvuiiq+WIoOmZpOOAglxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRhdGE6IE1hcDxzdHJpbmcsIGJvb2xlYW4+ID0gbmV3IE1hcCgpXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOiiq+ebkeWQrOeahCBIVE1MRWxlbWVudCDoioLngrnvvIzov5nph4zmjIcgd2FuZ0VkaXRvciDnmoTnvJbovpHljLrmoLnoioLngrlcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIHRhcmdldDogRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zKSA9PiB7XHJcbiAgICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKChyZWNvcmQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PSAnY2hpbGRMaXN0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgYWRkZWROb2RlcywgcmVtb3ZlZE5vZGVzIH0gPSByZWNvcmRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZU5hbWUgPT0gJ0lNRycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoKG5vZGUgYXMgSFRNTEltYWdlRWxlbWVudCkuZ2V0QXR0cmlidXRlKCdzcmMnKSBhcyBzdHJpbmcsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBhZGRlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZU5hbWUgPT0gJ0lNRycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoKG5vZGUgYXMgSFRNTEltYWdlRWxlbWVudCkuZ2V0QXR0cmlidXRlKCdzcmMnKSBhcyBzdHJpbmcsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHRhcmdldCwgb2xkVmFsdWUgfSA9IHJlY29yZFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQubm9kZU5hbWUgPT0gJ0lNRycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWUgJiYgdGhpcy5kYXRhLnNldChvbGRWYWx1ZSBhcyBzdHJpbmcsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KCh0YXJnZXQgYXMgSFRNTEltYWdlRWxlbWVudCkuZ2V0QXR0cmlidXRlKCdzcmMnKSBhcyBzdHJpbmcsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8g57uR5a6a55uR5ZCsXHJcbiAgICAgICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKHRhcmdldCwge1xyXG4gICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxyXG4gICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFsnc3JjJ10sXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiiq+WIoOmZpOWbvueJh+mTvuaOpeeahOaVsOe7hOmbhuWQiFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVsZXRlZCgpIHtcclxuICAgICAgICBjb25zdCB0ZW1wOiBzdHJpbmdbXSA9IFtdXHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHN0YXR1cywgc3JjKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wLnB1c2goc3JjKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gdGVtcFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5paw5aKe5Zu+54mH6ZO+5o6l55qE5pWw57uE6ZuG5ZCIXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbnNlcnRlZCgpIHtcclxuICAgICAgICBjb25zdCB0ZW1wOiBzdHJpbmdbXSA9IFtdXHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHN0YXR1cywgc3JjKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIHRlbXAucHVzaChzcmMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiB0ZW1wXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57miYDmnInnmoTljoblj7LorrDlvZXkv6Hmga9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFsbCgpIHtcclxuICAgICAgICByZXR1cm4gWy4uLnRoaXMuZGF0YV0ubWFwKChbc3JjLCBzdGF0dXNdKSA9PiAoe1xyXG4gICAgICAgICAgICBzcmM6IHNyYyxcclxuICAgICAgICAgICAgdHlwZTogc3RhdHVzID8gJ2luc2VydGVkJyA6ICdkZWxldGVkJyxcclxuICAgICAgICB9KSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4hemZpOaJgOacieeahOWOhuWPsuiusOW9lVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xlYXIoKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhLmNsZWFyKClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmUgOavgeebkeWQrOWZqFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVzdG9yeSgpIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKVxyXG4gICAgICAgIHRoaXMuY2xlYXIoKVxyXG4gICAgfVxyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVNBO0FBY0E7QUFBQTtBQUNBO0FBREE7QUFMQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.ts\n");

/***/ })

/******/ })["default"];
});