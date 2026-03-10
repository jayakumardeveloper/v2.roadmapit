// (function (modules) {
//   var installedModules = {};
//   function __webpack_require__(moduleId) {
//     if (installedModules[moduleId]) {
//       return installedModules[moduleId].exports;
//     }
//     var module = installedModules[moduleId] = { i: moduleId, l: false, exports: {} };
//     modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
//     module.l = true;
//     return module.exports;
//   }
//   __webpack_require__.m = modules;
//   __webpack_require__.c = installedModules;
//   __webpack_require__.d = function (exports, name, getter) {
//     if (!__webpack_require__.o(exports, name)) {
//       Object.defineProperty(exports, name, { enumerable: true, get: getter });
//     }
//   };
//   __webpack_require__.r = function (exports) {
//     if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
//       Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//     }
//     Object.defineProperty(exports, "__esModule", { value: true });
//   };
//   __webpack_require__.t = function (value, mode) {
//     if (mode & 1) value = __webpack_require__(value);
//     if (mode & 8) return value;
//     if (mode & 4 && typeof value === "object" && value && value.__esModule) return value;
//     var ns = Object.create(null);
//     __webpack_require__.r(ns);
//     Object.defineProperty(ns, "default", { enumerable: true, value: value });
//     if (mode & 2 && typeof value !== "string")
//       for (var key in value)
//         __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
//     return ns;
//   };
//   __webpack_require__.n = function (module) {
//     var getter = module && module.__esModule
//       ? function getDefault() { return module["default"]; }
//       : function getModuleExports() { return module; };
//     __webpack_require__.d(getter, "a", getter);
//     return getter;
//   };
//   __webpack_require__.o = function (object, property) {
//     return Object.prototype.hasOwnProperty.call(object, property);
//   };
//   __webpack_require__.p = "";
//   return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
// })({
//   "./src/js/canvas.js": function (module, exports, __webpack_require__) {
//     var _require = __webpack_require__("./src/js/utils.js"),
//       randomIntFromRange = _require.randomIntFromRange;
//     var canvas = document.querySelector("canvas");
//     var c = canvas.getContext("2d");
//     canvas.width = innerWidth;
//     canvas.height = innerHeight;
//     var mouse = { x: innerWidth / 2, y: innerHeight / 2 };
//     var colors = ["#000000", "#174991", "#ff9103"];
//     // Track mouse movement
//     addEventListener("mousemove", function (event) {
//       mouse.x = event.clientX;
//       mouse.y = event.clientY;
//       // Rotate particles only when moving
//       particles.forEach(p => {
//         p.radians += p.velocity;
//       });
//     });
//     addEventListener("resize", function () {
//       canvas.width = innerWidth;
//       canvas.height = innerHeight;
//       init();
//     });
//     // Particle class
//     var Particle = /*#__PURE__*/function () {
//       function Particle(x, y, radius, radians, color) {
//         this.x = x;
//         this.y = y;
//         this.radius = radius;
//         this.color = color;
//         this.radians = radians * Math.PI * 2;
//         this.velocity = 0.05;
//         this.distanceFromCenter = randomIntFromRange(10, 10);
//         this.lastMouse = { x: x, y: y };
//       }
//       Particle.prototype.draw = function (lastPoint) {
//         c.beginPath();
//         c.strokeStyle = this.color;
//         c.fillStyle = this.color;
//         c.lineWidth = this.radius;
//         c.moveTo(lastPoint.x, lastPoint.y);
//         c.arc(this.x, this.y, this.radius / 2, 0, Math.PI * 2);
//         c.stroke();
//         c.closePath();
//       };
//       Particle.prototype.update = function () {
//         var lastPoint = { x: this.x, y: this.y };
//         // ❌ Removed auto rotation here
//         // Follow mouse
//         this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
//         this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
//         this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
//         this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
//         this.draw(lastPoint);
//       };
//       return Particle;
//     }();
//     var particles;
//     function init() {
//       particles = [];
//       particles.push(new Particle(canvas.width / 2, canvas.height / 2, 4, 0.3, colors[0]));
//       particles.push(new Particle(canvas.width / 2, canvas.height / 2, 4, 0.6, colors[1]));
//       particles.push(new Particle(canvas.width / 2, canvas.height / 2, 4, 0.9, colors[2]));
//     }
//     function animate() {
//       requestAnimationFrame(animate);
//       c.clearRect(0, 0, canvas.width, canvas.height);
//       particles.forEach(function (particle) {
//         particle.update();
//       });
//     }
//     init();
//     animate();
//   },
//   "./src/js/utils.js": function (module, exports) {
//     function randomIntFromRange(min, max) {
//       return Math.floor(Math.random() * (max - min + 1) + min);
//     }
//     module.exports = { randomIntFromRange: randomIntFromRange };
//   }
// });

