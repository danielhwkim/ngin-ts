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
exports.main = exports.Nx = void 0;
var fs = require('fs');
var _a = require("./ngin"), Ngin = _a.Ngin, EventHandler = _a.EventHandler, mainInternal = _a.mainInternal;
var EventEmitter = require('events');
var cobj_1 = require("./cobj");
var NginX = require("./nginx").NginX;
var _b = require("./gen"), l1 = _b.l1, l2 = _b.l2; //
var Nx = /** @class */ (function (_super) {
    __extends(Nx, _super);
    function Nx(root) {
        return _super.call(this, root) || this;
    }
    Nx.prototype.sendObj = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(obj instanceof cobj_1.CObject)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.sendCObjectInternal(obj.build())];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(obj instanceof cobj_1.CStage)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.sendCStageInternal(obj.build())];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Nx.prototype.sendObjWait = function (obj) {
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
    Nx.prototype.add = function (pos) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addFruit(200, pos, 'Bananas')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nx.prototype.addFruit = function (id, pos, fruit) {
        return __awaiter(this, void 0, void 0, function () {
            var obj, a1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        obj = new cobj_1.CObject(id);
                        obj.info = "fruit";
                        obj.physical = new cobj_1.CPhysical(cobj_1.CBodyShape.circle, pos, cobj_1.CBodyType.static);
                        a1 = new cobj_1.CAction('Items/Fruits/' + fruit + '.png', new cobj_1.CSize(32, 32), [ /*0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16*/], cobj_1.CActionType.idle);
                        a1.stepTime = 50 / 1000;
                        obj.visible = new cobj_1.CVisible([a1]);
                        obj.visible.scale = new cobj_1.CVec2(1.5, 1.5);
                        return [4 /*yield*/, this.sendObj(obj)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nx.prototype.addCStage = function (bid, x, y, width, height) {
        return __awaiter(this, void 0, void 0, function () {
            var data, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = [];
                        l1(width, height, data);
                        obj = new cobj_1.CObject(bid);
                        obj.visible = new cobj_1.CVisible([new cobj_1.CAction('tiled/tileset/0x72_DungeonTilesetII_v1.3.png', new cobj_1.CSize(16, 16), data, cobj_1.CActionType.idle)]);
                        obj.visible.current = cobj_1.CActionType.tiles;
                        obj.visible.pos = new cobj_1.CVec2(x, y);
                        obj.visible.size = new cobj_1.CSize(width, height);
                        obj.visible.anchor = new cobj_1.CVec2(0, 0);
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
    Nx.prototype.addVoid = function (bid, x, y, width, height) {
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
                        obj.physical = new cobj_1.CPhysical(cobj_1.CBodyShape.rectangle, new cobj_1.CVec2(x, y), cobj_1.CBodyType.static);
                        obj.physical.size = new cobj_1.CSize(width, height);
                        return [4 /*yield*/, this.sendObj(obj)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nx.prototype.addSpike = function (id, x, y) {
        return __awaiter(this, void 0, void 0, function () {
            var obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        obj = new cobj_1.CObject(id);
                        obj.info = "spike";
                        obj.physical = new cobj_1.CPhysical(cobj_1.CBodyShape.rectangle, new cobj_1.CVec2(x, y), cobj_1.CBodyType.static);
                        obj.physical.isSensor = true;
                        obj.visible = new cobj_1.CVisible([new cobj_1.CAction('tiled/tileset/0x72_DungeonTilesetII_v1.3.png', new cobj_1.CSize(16, 16), [929, 930, 931, 932, 931, 930], cobj_1.CActionType.idle)]);
                        return [4 /*yield*/, this.sendObj(obj)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nx.prototype.addCoin = function (id, x, y) {
        return __awaiter(this, void 0, void 0, function () {
            var obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        obj = new cobj_1.CObject(id);
                        obj.info = "coin";
                        obj.physical = new cobj_1.CPhysical(cobj_1.CBodyShape.rectangle, new cobj_1.CVec2(x, y), cobj_1.CBodyType.static);
                        obj.physical.isSensor = true;
                        obj.visible = new cobj_1.CVisible([new cobj_1.CAction('tiled/tileset/0x72_DungeonTilesetII_v1.3.png', new cobj_1.CSize(16, 16), [403, 404, 405, 406], cobj_1.CActionType.idle)]);
                        return [4 /*yield*/, this.sendObj(obj)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nx.prototype.hero = function (id, character, pos) {
        var hx = 0.25;
        var hy = 0.25;
        var obj = new cobj_1.CObject(id);
        obj.info = "hero";
        obj.physical = new cobj_1.CPhysical(cobj_1.CBodyShape.polygon, pos, cobj_1.CBodyType.dynamic);
        obj.physical.floats = [-hx, -hy, -hx, hy, hx, hy, hx, -hy];
        obj.physical.fixedRotation = true;
        //obj.physical.size = new CSize(0.5, 0.5);
        obj.visible = new cobj_1.CVisible([
            new cobj_1.CAction('Main Characters/' + character + '/Idle (32x32).png', new cobj_1.CSize(32, 32), [], cobj_1.CActionType.idle),
            new cobj_1.CAction('Main Characters/' + character + '/Run (32x32).png', new cobj_1.CSize(32, 32), [], cobj_1.CActionType.run),
            new cobj_1.CAction('Main Characters/' + character + '/Jump (32x32).png', new cobj_1.CSize(32, 32), [], cobj_1.CActionType.jump),
            new cobj_1.CAction('Main Characters/' + character + '/Hit (32x32).png', new cobj_1.CSize(32, 32), [], cobj_1.CActionType.hit, false),
            new cobj_1.CAction('Main Characters/' + character + '/Fall (32x32).png', new cobj_1.CSize(32, 32), [], cobj_1.CActionType.fall),
            new cobj_1.CAction('Main Characters/' + character + '/Wall Jump (32x32).png', new cobj_1.CSize(32, 32), [], cobj_1.CActionType.wallJump, false),
            new cobj_1.CAction('Main Characters/' + character + '/Double Jump (32x32).png', new cobj_1.CSize(32, 32), [], cobj_1.CActionType.doubleJump, false),
        ]);
        for (var i = 0; i < obj.visible.actions.length; i++) {
            obj.visible.actions[i].stepTime = 50 / 1000;
        }
        obj.visible.pos = new cobj_1.CVec2(0, -0.2);
        //obj.visible.scale = new CVec2(1.5, 1.5);
        return obj;
    };
    Nx.prototype.setActionType = function (id, actionType, isFlipHorizontal) {
        if (isFlipHorizontal === void 0) { isFlipHorizontal = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command({
                            strings: ['actionType' /*, buildCActionType(actionType)*/],
                            ints: [id, isFlipHorizontal == true ? 1 : 0, actionType],
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nx.prototype.getCObjectInfo = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = cobj_1.CObjectInfo.bind;
                        return [4 /*yield*/, this.getObjinfo(id)];
                    case 1: return [2 /*return*/, new (_a.apply(cobj_1.CObjectInfo, [void 0, _b.sent()]))()];
                }
            });
        });
    };
    Nx.prototype.linearTo = function (id, pos, speed) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.cmdEmitter = new EventEmitter();
                        return [4 /*yield*/, this.command({
                                strings: ['linearTo'],
                                ints: [id],
                                floats: [pos.x, pos.y, speed],
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
    Nx.prototype.forward = function (id, angle, speed) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command({
                            strings: ['forward'],
                            ints: [id],
                            floats: [angle, speed],
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nx.prototype.linearx = function (id, velocity) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command({
                            strings: ['linearx'],
                            ints: [id],
                            floats: [velocity],
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nx.prototype.lineary = function (id, velocity) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command({
                            strings: ['lineary'],
                            ints: [id],
                            floats: [velocity],
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nx.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command({
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
    Nx.prototype.constx = function (id, velocity) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command({
                            strings: ['constx'],
                            ints: [id],
                            floats: [velocity],
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nx.prototype.consty = function (id, velocity) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command({
                            strings: ['consty'],
                            ints: [id],
                            floats: [velocity],
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nx.prototype.timer = function (id, time) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command({
                            strings: ['timer'],
                            ints: [id],
                            floats: [time],
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Nx;
}(NginX));
exports.Nx = Nx;
function main(type, port, body) {
    mainInternal(type, port, function (host, root) {
        return __awaiter(this, void 0, void 0, function () {
            var ngin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ngin = new Nx(root);
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
//# sourceMappingURL=nx.js.map