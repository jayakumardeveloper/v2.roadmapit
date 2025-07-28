/******/ (function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Flag the module as loaded
    /******/ module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/ __webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/ __webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/ __webpack_require__.d = function (exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter,
      });
      /******/
    }
    /******/
  };
  /******/
  /******/ // define __esModule on exports
  /******/ __webpack_require__.r = function (exports) {
    /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: "Module",
      });
      /******/
    }
    /******/ Object.defineProperty(exports, "__esModule", { value: true });
    /******/
  };
  /******/
  /******/ // create a fake namespace object
  /******/ // mode & 1: value is a module id, require it
  /******/ // mode & 2: merge all properties of value into the ns
  /******/ // mode & 4: return value when already ns object
  /******/ // mode & 8|1: behave like require
  /******/ __webpack_require__.t = function (value, mode) {
    /******/ if (mode & 1) value = __webpack_require__(value);
    /******/ if (mode & 8) return value;
    /******/ if (
      mode & 4 &&
      typeof value === "object" &&
      value &&
      value.__esModule
    )
      return value;
    /******/ var ns = Object.create(null);
    /******/ __webpack_require__.r(ns);
    /******/ Object.defineProperty(ns, "default", {
      enumerable: true,
      value: value,
    });
    /******/ if (mode & 2 && typeof value != "string")
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key];
          }.bind(null, key)
        );
    /******/ return ns;
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/ __webpack_require__.n = function (module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/ __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/ __webpack_require__.p = "";
  /******/
  /******/
  /******/ // Load entry module and return exports
  /******/ return __webpack_require__(
    (__webpack_require__.s = "./src/js/canvas.js")
  );
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ "./src/js/canvas.js":
      /*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        function _typeof(o) {
          "@babel/helpers - typeof";
          return (
            (_typeof =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (o) {
                    return typeof o;
                  }
                : function (o) {
                    return o &&
                      "function" == typeof Symbol &&
                      o.constructor === Symbol &&
                      o !== Symbol.prototype
                      ? "symbol"
                      : typeof o;
                  }),
            _typeof(o)
          );
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
            Object.defineProperty(
              target,
              _toPropertyKey(descriptor.key),
              descriptor
            );
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          Object.defineProperty(Constructor, "prototype", { writable: false });
          return Constructor;
        }
        function _toPropertyKey(t) {
          var i = _toPrimitive(t, "string");
          return "symbol" == _typeof(i) ? i : i + "";
        }
        function _toPrimitive(t, r) {
          if ("object" != _typeof(t) || !t) return t;
          var e = t[Symbol.toPrimitive];
          if (void 0 !== e) {
            var i = e.call(t, r || "default");
            if ("object" != _typeof(i)) return i;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === r ? String : Number)(t);
        }
        var _require = __webpack_require__(/*! ./utils */ "./src/js/utils.js"),
          randomIntFromRange = _require.randomIntFromRange,
          randomColor = _require.randomColor;
        var canvas = document.querySelector("canvas");
        var c = canvas.getContext("2d");
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        var mouse = {
          x: innerWidth / 2,
          y: innerHeight / 2,
        };
        var colors = ["#000000", "#0a8000", "#EC4814"];

        // Event Listeners
        addEventListener("mousemove", function (event) {
          mouse.x = event.clientX;
          mouse.y = event.clientY;
        });
        addEventListener("resize", function () {
          canvas.width = innerWidth;
          canvas.height = innerHeight;
          init();
        });

        // Objects
        var Particle = /*#__PURE__*/ (function () {
          function Particle(x, y, radius, radians, color) {
            _classCallCheck(this, Particle);
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.radians = radians * Math.PI * 2;
            this.velocity = 0.05;
            this.distanceFromCenter = randomIntFromRange(10, 10);
            this.lastMouse = {
              x: x,
              y: y,
            };
          }
          return _createClass(Particle, [
            {
              key: "draw",
              value: function draw(lastPoint) {
                c.beginPath();
                c.strokeStyle = this.color;
                c.fillStyle = this.color;
                c.lineWidth = this.radius;
                c.moveTo(lastPoint.x, lastPoint.y);
                // c.lineTo(this.x + 2, this.y + 3);
                c.arc(this.x, this.y, this.radius / 2, 0, Math.PI * 2);
                c.stroke();
                c.closePath();
              },
            },
            {
              key: "update",
              value: function update() {
                var lastPoint = {
                  x: this.x,
                  y: this.y,
                };
                // mouse move
                this.radians += this.velocity;
                // drag effect
                this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
                this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
                this.x =
                  this.lastMouse.x +
                  Math.cos(this.radians) * this.distanceFromCenter;
                this.y =
                  this.lastMouse.y +
                  Math.sin(this.radians) * this.distanceFromCenter;
                this.draw(lastPoint);
              },
            },
          ]);
        })(); // Implementation
        var particles;
        function init() {
          particles = [];
          particles.push(
            new Particle(canvas.width / 2, canvas.height / 2, 4, 0.3, colors[0])
          );
          particles.push(
            new Particle(canvas.width / 2, canvas.height / 2, 4, 0.6, colors[1])
          );
          particles.push(
            new Particle(canvas.width / 2, canvas.height / 2, 4, 0.9, colors[2])
          );
        }

        // Animation Loop
        function animate() {
          requestAnimationFrame(animate);
          c.fillStyle = "rgba(255,255,255,0.01)";
          c.fillRect(0, 0, canvas.width, canvas.height);
          c.clearRect(0, 0, canvas.width, canvas.height);
          particles.forEach(function (particle) {
            particle.update();
          });
        }
        init();
        animate();

        /***/
      },

    /***/ "./src/js/utils.js":
      /*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
      /*! no static exports found */
      /***/ function (module, exports) {
        function randomIntFromRange(min, max) {
          return Math.floor(Math.random() * (max - min + 1) + min);
        }
        function randomColor(colors) {
          return colors[Math.floor(Math.random() * colors.length)];
        }
        function distance(x1, y1, x2, y2) {
          var xDist = x2 - x1;
          var yDist = y2 - y1;
          return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
        }
        module.exports = {
          randomIntFromRange: randomIntFromRange,
          randomColor: randomColor,
          distance: distance,
        };

        /***/
      },

    /******/
  }
);
//# sourceMappingURL=canvas.bundle.js.map
