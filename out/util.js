"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.Gngin = void 0;
var fs = require('fs');
var runInThisContext = require('vm').runInThisContext;
var _a = require("./ngin"), EventHandler = _a.EventHandler, mainInternal = _a.mainInternal;
var NginX = require("./nginx").NginX;
var EventEmitter = require('events');
//var {Pos, Size, BodyType, BodyShape, TilesInfo, Pobj, Stage, JoystickDirectionals} = require("./pobj");
var pobj_1 = require("./pobj");
var Gngin = /** @class */ (function (_super) {
    __extends(Gngin, _super);
    function Gngin(root) {
        return _super.call(this, root) || this;
        //this.init(root);
    }
    Gngin.prototype.sendObj = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(obj instanceof pobj_1.Pbody)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.addBody(obj.build())];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(obj instanceof pobj_1.Stage)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.initScreen(obj.build())];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        if (!(obj instanceof pobj_1.Image)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.command(obj.build())];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Gngin.prototype.sendObjWait = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ackEmitter = new EventEmitter();
                        return [4 /*yield*/, this.sendObj(obj)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, EventEmitter.once(this.ackEmitter, 'ack')];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Gngin.prototype.forward = function (id, pos) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command({
                            strings: ['forward'],
                            ints: [id],
                            floats: [pos.x, pos.y],
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Gngin.prototype.follow = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command({
                            strings: ['follow'],
                            ints: [id],
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Gngin.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.opRemove(id, 0, 0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Gngin.prototype.getBodyinfo = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.cmdEmitter = new EventEmitter();
                        return [4 /*yield*/, this.command({
                                strings: ['bodyinfo'],
                                ints: [id],
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, EventEmitter.once(this.cmdEmitter, 'cmd')];
                    case 2:
                        value = _a.sent();
                        return [2 /*return*/, value[0].floats];
                }
            });
        });
    };
    Gngin.prototype.angularVelocity = function (id, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setBodyOp(id, 'angularVelocity', value, 0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Gngin;
}(NginX));
exports.Gngin = Gngin;
function main(type, port, body) {
    mainInternal(type, port, function (host, root) {
        return __awaiter(this, void 0, void 0, function () {
            var ngin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ngin = new Gngin(root);
                        return [4 /*yield*/, ngin.connect(host, port)];
                    case 1:
                        _a.sent();
                        //ngin.eventHandler = eventHandler; //new InputHandler(ngin);
                        return [4 /*yield*/, body(ngin)];
                    case 2:
                        //ngin.eventHandler = eventHandler; //new InputHandler(ngin);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=util.js.map