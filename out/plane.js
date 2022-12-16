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
var fs = require('fs');
var EventHandler = require("./ngin").EventHandler;
var util_1 = require("./util");
//import {Pos, Size, BodyType, BodyShape, JoystickDirectionals} from "./pobj";
var cobj_1 = require("./cobj");
(0, util_1.main)('127.0.0.1', 4040, function (x) { return __awaiter(void 0, void 0, void 0, function () {
    var d, j, tiles, objlayer, data, tileSize, precision, size, stage, obj, value, value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                x.nginx.eventHandler = new InputHandler(x);
                d = fs.readFileSync('planes0.tmj', 'utf8');
                j = JSON.parse(d);
                tiles = j.layers[0];
                objlayer = j.layers[1];
                data = tiles['data'];
                tileSize = j['tilewidth'];
                precision = 3;
                console.log(j);
                size = new cobj_1.Size(tiles.width, tiles.height);
                stage = new cobj_1.Stage(size);
                //stage.debug = true;
                stage.joystickDirectionals = cobj_1.JoystickDirectionals.horizontal;
                return [4 /*yield*/, x.sendObjWait(stage)];
            case 1:
                _a.sent();
                return [4 /*yield*/, x.sendObj((0, cobj_1.CTileObject)('kenney_pixelshmup/tiles_packed.png', new cobj_1.Size(tileSize, tileSize), data, new cobj_1.Pos(0, 0), size))];
            case 2:
                _a.sent();
                obj = new cobj_1.CObject(100);
                obj.physical = new cobj_1.CPhysical(cobj_1.BodyShape.circle, new cobj_1.Pos(11, 11), cobj_1.BodyType.dynamic);
                obj.physical.angle = 1.5;
                obj.physical.size = new cobj_1.Size(2, 2);
                obj.visible = new cobj_1.CVisible([new cobj_1.CAction('kenney_pixelshmup/ships_packed.png', new cobj_1.Size(32, 32), [1], cobj_1.CActionType.idle)]);
                obj.visible.size = new cobj_1.Size(2, 2);
                return [4 /*yield*/, x.sendObjWait(obj)];
            case 3:
                value = _a.sent();
                console.log('1', value);
                x.nginx.eventHandler.ready = true;
                return [4 /*yield*/, x.follow(100)];
            case 4:
                _a.sent();
                return [4 /*yield*/, x.forward(100, new cobj_1.Pos(5, 0))];
            case 5:
                _a.sent();
                obj.id = 200;
                obj.physical.pos = new cobj_1.Pos(11, 0);
                obj.physical.angle = 3;
                //obj.visible.size = new Size(2,2);    
                obj.visible.actions[0].indices = [10];
                return [4 /*yield*/, x.sendObjWait(obj)];
            case 6:
                value = _a.sent();
                console.log('2', value);
                return [4 /*yield*/, x.forward(200, new cobj_1.Pos(5, 0))];
            case 7:
                _a.sent();
                return [4 /*yield*/, x.angularVelocity(200, 1)];
            case 8:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var InputHandler = /** @class */ (function (_super) {
    __extends(InputHandler, _super);
    function InputHandler(x) {
        var _this = _super.call(this, x.nginx) || this;
        _this.missile_id = 800;
        _this.x = x;
        _this.key_down_left = false;
        _this.key_down_right = false;
        _this.actor_contacts = new Set();
        _this.actor_jump_count = 0;
        _this.dynamic_id = 1000;
        _this.facingLeft = false;
        _this.ready = false;
        return _this;
    }
    InputHandler.prototype.handleContact = function (contact) {
        return __awaiter(this, void 0, void 0, function () {
            var obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.ready)
                            return [2 /*return*/];
                        console.log(contact);
                        if (!(contact.isEnded == false)) return [3 /*break*/, 4];
                        if (!(contact.id2 == 101)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.x.remove(contact.id2)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        obj = new cobj_1.CObject(1000);
                        obj.tid = contact.id2;
                        obj.visible = new cobj_1.CVisible([new cobj_1.CAction('kenney_pixelshmup/tiles_packed.png', new cobj_1.Size(16, 16), [5], cobj_1.CActionType.idle)]);
                        obj.visible.pos = new cobj_1.Pos(0, 0);
                        return [4 /*yield*/, this.x.sendObj(obj)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    InputHandler.prototype.handleEvent = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var c;
            return __generator(this, function (_a) {
                console.log(event);
                c = event;
                if (c.type == 'ready')
                    return [2 /*return*/];
                return [2 /*return*/];
            });
        });
    };
    InputHandler.prototype.goRight = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.x.angularVelocity(100, 1)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    InputHandler.prototype.goLeft = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.x.angularVelocity(100, -1)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    InputHandler.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.x.angularVelocity(100, 0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    InputHandler.prototype.missile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var x, y, w, h, a, lvx, lvy, av, obj, value;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.x.getBodyinfo(100)];
                    case 1:
                        _a = _b.sent(), x = _a[0], y = _a[1], w = _a[2], h = _a[3], a = _a[4], lvx = _a[5], lvy = _a[6], av = _a[7];
                        obj = new cobj_1.CObject(101);
                        obj.physical = new cobj_1.CPhysical(cobj_1.BodyShape.rectangle, new cobj_1.Pos(x - 0.5 + 2 * Math.sin(a), y - 0.5 - 2 * Math.cos(a)), cobj_1.BodyType.dynamic);
                        obj.physical.angle = a;
                        obj.visible = new cobj_1.CVisible([new cobj_1.CAction('kenney_pixelshmup/tiles_packed.png', new cobj_1.Size(16, 16), [1, 2, 3], cobj_1.CActionType.idle)]);
                        return [4 /*yield*/, this.x.sendObjWait(obj)];
                    case 2:
                        value = _b.sent();
                        console.log('1', value);
                        return [4 /*yield*/, this.x.forward(101, new cobj_1.Pos(10, 0))];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    InputHandler.prototype.handleKey = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var c, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        c = key;
                        if (!(c.isPressed == false)) return [3 /*break*/, 12];
                        _a = c.name;
                        switch (_a) {
                            case 'Arrow Left': return [3 /*break*/, 1];
                            case 'Arrow Right': return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 11];
                    case 1:
                        this.key_down_left = false;
                        if (!this.key_down_right) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.goRight()];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.stop()];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5: return [3 /*break*/, 11];
                    case 6:
                        this.key_down_right = false;
                        if (!this.key_down_left) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.goLeft()];
                    case 7:
                        _c.sent();
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, this.stop()];
                    case 9:
                        _c.sent();
                        _c.label = 10;
                    case 10: return [3 /*break*/, 11];
                    case 11: return [3 /*break*/, 19];
                    case 12:
                        _b = c.name;
                        switch (_b) {
                            case 'Arrow Left': return [3 /*break*/, 13];
                            case 'Arrow Right': return [3 /*break*/, 15];
                            case 'Arrow Up': return [3 /*break*/, 17];
                        }
                        return [3 /*break*/, 19];
                    case 13:
                        this.key_down_left = true;
                        return [4 /*yield*/, this.goLeft()];
                    case 14:
                        _c.sent();
                        return [3 /*break*/, 19];
                    case 15:
                        this.key_down_right = true;
                        return [4 /*yield*/, this.goRight()];
                    case 16:
                        _c.sent();
                        return [3 /*break*/, 19];
                    case 17: return [4 /*yield*/, this.missile()];
                    case 18:
                        _c.sent();
                        return [3 /*break*/, 19];
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    InputHandler.prototype.handleDirectional = function (directional) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log(directional);
                        _a = directional.direction;
                        switch (_a) {
                            case 'MOVE_LEFT': return [3 /*break*/, 1];
                            case 'MOVE_RIGHT': return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.goLeft()];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, this.goRight()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.stop()];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    InputHandler.prototype.handleButton = function (button) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(button);
                        return [4 /*yield*/, this.missile()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return InputHandler;
}(EventHandler));
//# sourceMappingURL=plane.js.map