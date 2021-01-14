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
eval("\n\nvar __read = this && this.__read || function (o, n) {\n  var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n  if (!m) return o;\n  var i = m.call(o),\n      r,\n      ar = [],\n      e;\n\n  try {\n    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n  } catch (error) {\n    e = {\n      error: error\n    };\n  } finally {\n    try {\n      if (r && !r.done && (m = i[\"return\"])) m.call(i);\n    } finally {\n      if (e) throw e.error;\n    }\n  }\n\n  return ar;\n};\n\nvar __spread = this && this.__spread || function () {\n  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));\n\n  return ar;\n};\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar ImageHistory = function () {\n  function ImageHistory(target) {\n    var _this = this;\n\n    this.data = new Map();\n    this.target = target;\n    this.observer = new MutationObserver(function (mutations) {\n      mutations.forEach(function (record) {\n        if (record.type == 'childList') {\n          var addedNodes = record.addedNodes,\n              removedNodes = record.removedNodes;\n          removedNodes.forEach(function (node) {\n            if (node.nodeName == 'IMG') {\n              _this.data.set(node.getAttribute('src'), false);\n            }\n          });\n          addedNodes.forEach(function (node) {\n            if (node.nodeName == 'IMG') {\n              _this.data.set(node.getAttribute('src'), true);\n            }\n          });\n        } else {\n          var target_1 = record.target,\n              oldValue = record.oldValue;\n\n          if (target_1.nodeName == 'IMG') {\n            oldValue && _this.data.set(oldValue, false);\n\n            _this.data.set(target_1.getAttribute('src'), true);\n          }\n        }\n      });\n    });\n    this.observer.observe(target, {\n      subtree: true,\n      childList: true,\n      attributes: true,\n      attributeOldValue: true,\n      attributeFilter: ['src']\n    });\n  }\n\n  ImageHistory.prototype.deleted = function () {\n    var temp = [];\n    this.data.forEach(function (status, src) {\n      if (!status) {\n        temp.push(src);\n      }\n    });\n    return temp;\n  };\n\n  ImageHistory.prototype.inserted = function () {\n    var temp = [];\n    this.data.forEach(function (status, src) {\n      if (status) {\n        temp.push(src);\n      }\n    });\n    return temp;\n  };\n\n  ImageHistory.prototype.all = function () {\n    return __spread(this.data).map(function (_a) {\n      var _b = __read(_a, 2),\n          src = _b[0],\n          status = _b[1];\n\n      return {\n        src: src,\n        type: status ? 'inserted' : 'deleted'\n      };\n    });\n  };\n\n  ImageHistory.prototype.clear = function () {\n    this.data.clear();\n  };\n\n  ImageHistory.prototype.destory = function () {\n    this.observer.disconnect();\n    this.data.clear();\n    this.target = null;\n  };\n\n  return ImageHistory;\n}();\n\nexports.default = ImageHistory;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXgudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9JbWFnZUhpc3RvcnkvLi9zcmMvaW5kZXgudHM/ZmZiNCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBwcm90ZWN0ZWQg5aqS5L2T5paH5Lu277yIaW1hZ2XvvInnm5HmjqdcbiAqL1xuXG4vKipcbiAqIOWbvueJh+eahOWOhuWPsuiusOW9le+8jOmcgOimgeWcqCBlZGl0b3IuY3JlYXRlIOS5i+WQjuiwg+eUqFxuICpcbiAqIGVn77yaZWRpdG9yLmltZ3MgPSBuZXcgSW1hZ2VIaXN0b3J5KGVkaXRvci4kdGV4dEVsZW0uZWxlbXNbMF0pXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlSGlzdG9yeSB7XG4gICAgcHJvdGVjdGVkIHRhcmdldDogRWxlbWVudCB8IG51bGxcbiAgICAvKipcbiAgICAgKiDnm5HlkKzlmahcbiAgICAgKi9cbiAgICBwcml2YXRlIG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyXG5cbiAgICAvKipcbiAgICAgKiBpbWFnZSDmoIfnrb7nmoTlj5jljJborrDlvZXjgIJib29sZWFuIOWAvOihqOekuiBpbWFnZSDmoIfnrb7lvZPliY3nmoTnirbmgIHvvIzkuLogdHJ1ZSDooajnpLrlrZjlnKjkuo7mlofmoaPkuK3vvJvkuLogZmFsc2Ug6KGo56S66K+lIGltYWdlIOagh+etvuiiq+WIoOmZpOOAglxuICAgICAqL1xuICAgIHByaXZhdGUgZGF0YTogTWFwPHN0cmluZywgYm9vbGVhbj4gPSBuZXcgTWFwKClcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB0YXJnZXQg6KKr55uR5ZCs55qEIEhUTUxFbGVtZW50IOiKgueCue+8jOi/memHjOaMhyB3YW5nRWRpdG9yIOeahOe8lui+keWMuuagueiKgueCuVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHRhcmdldDogRWxlbWVudCkge1xuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldFxuICAgICAgICB0aGlzLm9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goKHJlY29yZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PSAnY2hpbGRMaXN0Jykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGFkZGVkTm9kZXMsIHJlbW92ZWROb2RlcyB9ID0gcmVjb3JkXG5cbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlLm5vZGVOYW1lID09ICdJTUcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldCgobm9kZSBhcyBIVE1MSW1hZ2VFbGVtZW50KS5nZXRBdHRyaWJ1dGUoJ3NyYycpIGFzIHN0cmluZywgZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIGFkZGVkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZU5hbWUgPT0gJ0lNRycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KChub2RlIGFzIEhUTUxJbWFnZUVsZW1lbnQpLmdldEF0dHJpYnV0ZSgnc3JjJykgYXMgc3RyaW5nLCB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgdGFyZ2V0LCBvbGRWYWx1ZSB9ID0gcmVjb3JkXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQubm9kZU5hbWUgPT0gJ0lNRycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlICYmIHRoaXMuZGF0YS5zZXQob2xkVmFsdWUgYXMgc3RyaW5nLCBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoKHRhcmdldCBhcyBIVE1MSW1hZ2VFbGVtZW50KS5nZXRBdHRyaWJ1dGUoJ3NyYycpIGFzIHN0cmluZywgdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIC8vIOe7keWumuebkeWQrFxuICAgICAgICB0aGlzLm9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCB7XG4gICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlLFxuICAgICAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbJ3NyYyddLFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiiq+WIoOmZpOWbvueJh+mTvuaOpeeahOaVsOe7hOmbhuWQiFxuICAgICAqL1xuICAgIHB1YmxpYyBkZWxldGVkKCkge1xuICAgICAgICBjb25zdCB0ZW1wOiBzdHJpbmdbXSA9IFtdXG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKChzdGF0dXMsIHNyYykgPT4ge1xuICAgICAgICAgICAgaWYgKCFzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICB0ZW1wLnB1c2goc3JjKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gdGVtcFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaWsOWinuWbvueJh+mTvuaOpeeahOaVsOe7hOmbhuWQiFxuICAgICAqL1xuICAgIHB1YmxpYyBpbnNlcnRlZCgpIHtcbiAgICAgICAgY29uc3QgdGVtcDogc3RyaW5nW10gPSBbXVxuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgoc3RhdHVzLCBzcmMpID0+IHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICB0ZW1wLnB1c2goc3JjKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gdGVtcFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOi/lOWbnuaJgOacieeahOWOhuWPsuiusOW9leS/oeaBr1xuICAgICAqL1xuICAgIHB1YmxpYyBhbGwoKSB7XG4gICAgICAgIHJldHVybiBbLi4udGhpcy5kYXRhXS5tYXAoKFtzcmMsIHN0YXR1c10pID0+ICh7XG4gICAgICAgICAgICBzcmM6IHNyYyxcbiAgICAgICAgICAgIHR5cGU6IHN0YXR1cyA/ICdpbnNlcnRlZCcgOiAnZGVsZXRlZCcsXG4gICAgICAgIH0pKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa4hemZpOaJgOacieeahOWOhuWPsuiusOW9lVxuICAgICAqL1xuICAgIHB1YmxpYyBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5kYXRhLmNsZWFyKClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDplIDmr4Hnm5HlkKzlmahcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVzdG9yeSgpIHtcbiAgICAgICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICAgICAgdGhpcy5kYXRhLmNsZWFyKClcbiAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsXG4gICAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU0E7QUFlQTtBQUFBO0FBQ0E7QUFOQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUZBO0FBR0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.ts\n");

/***/ })

/******/ })["default"];
});