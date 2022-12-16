"use strict";
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
exports.main = exports.NginEx = void 0;
var fs = require('fs');
var runInThisContext = require('vm').runInThisContext;
var _a = require("./ngin"), EventHandler = _a.EventHandler, mainInternal = _a.mainInternal;
//var {NginX} = require("./nginx");
var EventEmitter = require('events');
//var {Pos, Size, BodyType, BodyShape, TilesInfo, Pobj, Stage, JoystickDirectionals} = require("./pobj");
//import {Pos, Size, BodyType, BodyShape, JoystickDirectionals} from "./pobj";
var cobj_1 = require("./cobj");
var nginx_1 = require("./nginx");
var _b = require("./gen"), l1 = _b.l1, l2 = _b.l2; //
var NginEx = /** @class */ (function () {
    function NginEx(nginx) {
        this.nginx = nginx;
        //this.init(root);
    }
    NginEx.prototype.sendObj = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(obj instanceof cobj_1.CObject)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.nginx.addCObjectInternal(obj.build())];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(obj instanceof cobj_1.Stage)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.nginx.initScreen(obj.build())];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NginEx.prototype.sendObjWait = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.nginx.ackEmitter = new EventEmitter();
                        return [4 /*yield*/, this.sendObj(obj)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, EventEmitter.once(this.nginx.ackEmitter, 'ack')];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NginEx.prototype.forward = function (id, pos) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nginx.command({
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
    NginEx.prototype.follow = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nginx.command({
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
    NginEx.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nginx.command({
                            strings: ['remove'],
                            ints: [id],
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginEx.prototype.getBodyinfo = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.nginx.cmdEmitter = new EventEmitter();
                        return [4 /*yield*/, this.nginx.command({
                                strings: ['bodyinfo'],
                                ints: [id],
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, EventEmitter.once(this.nginx.cmdEmitter, 'cmd')];
                    case 2:
                        value = _a.sent();
                        return [2 /*return*/, value[0].floats];
                }
            });
        });
    };
    NginEx.prototype.angularVelocity = function (id, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //await this.nginx.setBodyOp(id, 'angularVelocity', value, 0);
                    return [4 /*yield*/, this.nginx.command({
                            strings: ['angular'],
                            ints: [id],
                            floats: [value]
                        })];
                    case 1:
                        //await this.nginx.setBodyOp(id, 'angularVelocity', value, 0);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginEx.prototype.add = function (x, y) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addFruit(200, x, y, 'Bananas')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginEx.prototype.addFruit = function (id, x, y, fruit) {
        return __awaiter(this, void 0, void 0, function () {
            var obj, a1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        obj = new cobj_1.CObject(id);
                        obj.info = "fruit";
                        obj.physical = new cobj_1.CPhysical(cobj_1.BodyShape.circle, new cobj_1.Pos(x, y), cobj_1.BodyType.static);
                        a1 = new cobj_1.CAction('Items/Fruits/' + fruit + '.png', new cobj_1.Size(32, 32), [ /*0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16*/], cobj_1.CActionType.idle);
                        a1.stepTime = 50 / 1000;
                        obj.visible = new cobj_1.CVisible([a1]);
                        obj.visible.scale = new cobj_1.Pos(1.5, 1.5);
                        return [4 /*yield*/, this.sendObj(obj)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginEx.prototype.addStage = function (bid, x, y, width, height) {
        return __awaiter(this, void 0, void 0, function () {
            var data, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = [];
                        l1(width, height, data);
                        obj = new cobj_1.CObject(bid);
                        obj.visible = new cobj_1.CVisible([new cobj_1.CAction('tiled/tileset/0x72_DungeonTilesetII_v1.3.png', new cobj_1.Size(16, 16), data, cobj_1.CActionType.idle)]);
                        obj.visible.current = cobj_1.CActionType.tiles;
                        obj.visible.pos = new cobj_1.Pos(x, y);
                        obj.visible.size = new cobj_1.Size(width, height);
                        obj.visible.anchor = new cobj_1.Pos(0, 0);
                        //obj.visible.priority = 0;
                        return [4 /*yield*/, this.sendObj(obj)];
                    case 1:
                        //obj.visible.priority = 0;
                        _a.sent();
                        data = [];
                        l2(width, height, data);
                        obj.visible.priority = 1;
                        obj.visible.actions[0].indices = data;
                        return [4 /*yield*/, this.sendObj(obj)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.addVoid(bid++, x + 1, y + 1 + 0.2, width - 2, 0.6)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.addVoid(bid++, x + 1, y + height - 1 + 0.2, width - 2, 0.6)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.addVoid(bid++, x + 0.8, y + 1.2, 0.2, height - 2 + 0.6)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.addVoid(bid++, x + width - 1, y + 1.2, 0.2, height - 2 + 0.6)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, bid];
                }
            });
        });
    };
    NginEx.prototype.addVoid = function (bid, x, y, width, height) {
        return __awaiter(this, void 0, void 0, function () {
            var x1, y1, x2, y2, i, j, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        x1 = Math.floor(x);
                        y1 = Math.floor(y);
                        x2 = Math.ceil(x + width);
                        y2 = Math.ceil(y + height);
                        //console.log(x1,y1,x2,y2);
                        for (i = x1; i < x2; i++) {
                            for (j = y1; j < y2; j++) {
                                //this.walls.add(this.xyToNumber(i,j));
                                //console.log(i,j, this.xyToNumber(i,j));
                            }
                        }
                        obj = new cobj_1.CObject(bid);
                        obj.info = "wall";
                        obj.physical = new cobj_1.CPhysical(cobj_1.BodyShape.rectangle, new cobj_1.Pos(x, y), cobj_1.BodyType.static);
                        obj.physical.size = new cobj_1.Size(width, height);
                        return [4 /*yield*/, this.sendObj(obj)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginEx.prototype.addSpike = function (id, x, y) {
        return __awaiter(this, void 0, void 0, function () {
            var obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        obj = new cobj_1.CObject(id);
                        obj.info = "spike";
                        obj.physical = new cobj_1.CPhysical(cobj_1.BodyShape.rectangle, new cobj_1.Pos(x, y), cobj_1.BodyType.static);
                        //obj.physical.isSensor = true;
                        obj.visible = new cobj_1.CVisible([new cobj_1.CAction('tiled/tileset/0x72_DungeonTilesetII_v1.3.png', new cobj_1.Size(16, 16), [929, 930, 931, 932, 931, 930], cobj_1.CActionType.idle)]);
                        return [4 /*yield*/, this.sendObj(obj)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginEx.prototype.addCoin = function (id, x, y) {
        return __awaiter(this, void 0, void 0, function () {
            var obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        obj = new cobj_1.CObject(id);
                        obj.info = "coin";
                        obj.physical = new cobj_1.CPhysical(cobj_1.BodyShape.rectangle, new cobj_1.Pos(x, y), cobj_1.BodyType.static);
                        //obj.physical.isSensor = true;
                        obj.visible = new cobj_1.CVisible([new cobj_1.CAction('tiled/tileset/0x72_DungeonTilesetII_v1.3.png', new cobj_1.Size(16, 16), [403, 404, 405, 406], cobj_1.CActionType.idle)]);
                        return [4 /*yield*/, this.sendObj(obj)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginEx.prototype.addActor = function (id, character, x, y) {
        return __awaiter(this, void 0, void 0, function () {
            var hx, hy, obj, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hx = 0.25;
                        hy = 0.25;
                        obj = new cobj_1.CObject(id);
                        obj.info = "actor";
                        obj.physical = new cobj_1.CPhysical(cobj_1.BodyShape.polygon, new cobj_1.Pos(x, y), cobj_1.BodyType.dynamic);
                        obj.physical.floats = [-hx, -hy, -hx, hy, hx, hy, hx, -hy];
                        //obj.physical.size = new Size(0.5, 0.5);
                        obj.visible = new cobj_1.CVisible([
                            new cobj_1.CAction('Main Characters/' + character + '/Idle (32x32).png', new cobj_1.Size(32, 32), [], cobj_1.CActionType.idle),
                            new cobj_1.CAction('Main Characters/' + character + '/Run (32x32).png', new cobj_1.Size(32, 32), [], cobj_1.CActionType.run),
                            new cobj_1.CAction('Main Characters/' + character + '/Jump (32x32).png', new cobj_1.Size(32, 32), [], cobj_1.CActionType.jump),
                            new cobj_1.CAction('Main Characters/' + character + '/Hit (32x32).png', new cobj_1.Size(32, 32), [], cobj_1.CActionType.hit),
                            new cobj_1.CAction('Main Characters/' + character + '/Fall (32x32).png', new cobj_1.Size(32, 32), [], cobj_1.CActionType.fall),
                            new cobj_1.CAction('Main Characters/' + character + '/Wall Jump (32x32).png', new cobj_1.Size(32, 32), [], cobj_1.CActionType.wallJump),
                            new cobj_1.CAction('Main Characters/' + character + '/Double Jump (32x32).png', new cobj_1.Size(32, 32), [], cobj_1.CActionType.doubleJump),
                        ]);
                        for (i = 0; i < obj.visible.actions.length; i++) {
                            obj.visible.actions[i].stepTime = 50 / 1000;
                        }
                        obj.visible.pos = new cobj_1.Pos(0, -0.2);
                        //obj.visible.scale = new Pos(1.5, 1.5);
                        return [4 /*yield*/, this.sendObj(obj)];
                    case 1:
                        //obj.visible.scale = new Pos(1.5, 1.5);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginEx.prototype.setCActionType = function (bid, skin, skinType, facingLeft) {
        if (facingLeft === void 0) { facingLeft = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //const obj = this.getObj(bid);
                    //await this.nginx.setCActionTypeInternal(bid, skin, facingLeft, skinType);
                    return [4 /*yield*/, this.nginx.command({})];
                    case 1:
                        //const obj = this.getObj(bid);
                        //await this.nginx.setCActionTypeInternal(bid, skin, facingLeft, skinType);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return NginEx;
}());
exports.NginEx = NginEx;
function main(type, port, body) {
    mainInternal(type, port, function (host, root) {
        return __awaiter(this, void 0, void 0, function () {
            var x;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        x = new NginEx(new nginx_1.NginX(root));
                        return [4 /*yield*/, x.nginx.connect(host, port)];
                    case 1:
                        _a.sent();
                        //ngin.eventHandler = eventHandler; //new InputHandler(ngin);
                        return [4 /*yield*/, body(x)];
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