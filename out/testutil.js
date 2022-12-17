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
exports.run = exports.runq = exports.Stopwatch = exports.TestUtil = void 0;
var EventHandler = require("./ngin").EventHandler;
var _a = require("./nginx"), NginX = _a.NginX, main = _a.main;
var cobj_1 = require("./cobj");
var TestUtil = /** @class */ (function () {
    function TestUtil(ngin) {
        this.ngin = ngin;
    }
    TestUtil.prototype.drawSvgGrid = function (x, y, func) {
        var unit = 100;
        var ori = "<svg viewBox=\"0 0 ".concat(unit * x, " ").concat(unit * y, "\">\n");
        var padding = 5;
        for (var i = 0; i < x; i++) {
            for (var j = 0; j < y; j++) {
                if (func(i, j)) {
                    ori += "<rect x=\"".concat(padding + unit * i, "\" y=\"").concat(padding + unit * j, "\" width=\"").concat(unit - padding * 2, "\" height=\"").concat(unit - padding * 2, "\" stroke=\"#777\" fill=\"none\" stroke-width=\"4\" />\n");
                    ori += "<text fill=\"#777\" x=\"".concat(unit / 2 + unit * i, "\" y=\"").concat(unit * 0.6 + unit * j, "\" font-size=\"").concat(unit / 3, "\" font-family=\"Roboto\" text-anchor=\"middle\" >").concat(i, ":").concat(j, "</text>\n");
                }
                else {
                    ori += "<rect x=\"".concat(padding + unit * i, "\" y=\"").concat(padding + unit * j, "\" width=\"").concat(unit - padding * 2, "\" height=\"").concat(unit - padding * 2, "\" stroke=\"#777\" fill=\"#777\" stroke-width=\"4\" />\n");
                }
            }
        }
        ori += '</svg>';
        return ori;
    };
    TestUtil.prototype.drawSvgTextFullScreen = function (x, y, text, size, fill, fillopacity) {
        if (size === void 0) { size = 1; }
        if (fill === void 0) { fill = "#111"; }
        if (fillopacity === void 0) { fillopacity = 1; }
        var unit = 100;
        var ori = "<svg viewBox=\"0 0 ".concat(x * unit, " ").concat(y * unit, "\">\n");
        ori += "<text fill=\"".concat(fill, "\" fill-opacity=\"").concat(fillopacity, "\" x=\"").concat(x * unit / 2, "\" y=\"").concat(y * unit / 2 + unit * size * 0.35, "\" font-size=\"").concat(unit * size, "\" font-family=\"Roboto\" text-anchor=\"middle\" >").concat(text, "</text>\n");
        ori += '</svg>';
        return ori;
    };
    TestUtil.prototype.countDown = function (width, height, num, time) {
        return __awaiter(this, void 0, void 0, function () {
            var fillopacity, textsize, obj, value_1, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(width, height, num, time);
                        fillopacity = 0.5;
                        textsize = 5;
                        obj = new cobj_1.CObject(100 + num);
                        obj.visible = new cobj_1.CVisible([new cobj_1.CAction(this.drawSvgTextFullScreen(width, height, "".concat(num), textsize, "#111", fillopacity), new cobj_1.Size(width, height), [], cobj_1.CActionType.svg)]);
                        obj.visible.current = cobj_1.CActionType.svg;
                        obj.visible.size = new cobj_1.Size(width, height);
                        //obj.visible.pos = new Pos(6,0);
                        obj.visible.anchor = new cobj_1.Pos(0, 0);
                        return [4 /*yield*/, this.ngin.addCObjectInternal(obj.build())];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.ngin.command({
                                strings: ['moveTo', "ease"],
                                ints: [100 + num],
                                floats: [width, 0, time],
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(num > 0)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.ngin.command({
                                strings: ['moveTo', "ease"],
                                ints: [100 + num],
                                floats: [width, 0, time],
                            })];
                    case 4:
                        _a.sent();
                        num--;
                        //await this.ngin.command({
                        //    strings:['svg', this.drawSvgTextFullScreen(width, height, `${num}`, textsize, "#111", fillopacity)], 
                        //    ints:[100+num], 
                        //    floats:[-width, 0, width, height],
                        //});
                        obj = new cobj_1.CObject(100 + num);
                        obj.visible = new cobj_1.CVisible([new cobj_1.CAction(this.drawSvgTextFullScreen(width, height, "".concat(num), textsize, "#111", fillopacity), new cobj_1.Size(width, height), [], cobj_1.CActionType.svg)]);
                        obj.visible.current = cobj_1.CActionType.svg;
                        obj.visible.size = new cobj_1.Size(width, height);
                        obj.visible.anchor = new cobj_1.Pos(0, 0);
                        return [4 /*yield*/, this.ngin.addCObjectInternal(obj.build())];
                    case 5:
                        _a.sent();
                        this.ngin.prepareAck();
                        return [4 /*yield*/, this.ngin.command({
                                strings: ['moveTo', "ease"],
                                ints: [100 + num, 1],
                                floats: [0, 0, time],
                            })];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.ngin.waitAckValue(100 + num)];
                    case 7:
                        value_1 = _a.sent();
                        console.log('ack:', value_1);
                        return [4 /*yield*/, this.ngin.command({
                                strings: ['remove'],
                                ints: [100 + num + 1],
                            })];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 9:
                        this.ngin.prepareAck();
                        return [4 /*yield*/, this.ngin.command({
                                strings: ['moveTo', "ease"],
                                ints: [100 + num, 1],
                                floats: [width, 0, time],
                            })];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, this.ngin.waitAckValue(100 + num)];
                    case 11:
                        value = _a.sent();
                        console.log('ack:', value);
                        return [4 /*yield*/, this.ngin.command({
                                strings: ['remove'],
                                ints: [100 + num],
                            })];
                    case 12:
                        _a.sent();
                        console.log('end');
                        return [2 /*return*/];
                }
            });
        });
    };
    TestUtil.prototype.drawSvgText = function (x, y, text) {
        var unit = 100;
        var ori = "<svg viewBox=\"0 0 ".concat(x * unit, " ").concat(y * 100, "\">\n");
        ori += "<text fill=\"#111\" x=\"".concat(x * unit / 2, "\" y=\"").concat(y * unit / 2 + unit * 0.35, "\" font-size=\"").concat(unit, "\" font-family=\"Roboto\" text-anchor=\"middle\" >").concat(text, "</text>\n");
        ori += '</svg>';
        return ori;
    };
    return TestUtil;
}());
exports.TestUtil = TestUtil;
var Stopwatch = /** @class */ (function () {
    function Stopwatch(ngin, oid, rect) {
        this.thisNgin = ngin;
        this.rect = rect;
        this.w = rect[2];
        this.h = rect[3];
        this.oid = oid;
        this.num = 0;
        this.running = false;
        this.util = new TestUtil(ngin);
    }
    Stopwatch.prototype.timeOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var obj;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.running) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.thisNgin.command({
                                strings: ['remove'],
                                ints: [this.oid],
                            })];
                    case 1:
                        _a.sent();
                        this.num += 1;
                        obj = new cobj_1.CObject(this.oid);
                        obj.visible = new cobj_1.CVisible([new cobj_1.CAction(this.util.drawSvgText(this.w, this.h, "".concat(this.num)), new cobj_1.Size(this.w, this.h), [], cobj_1.CActionType.svg)]);
                        obj.visible.current = cobj_1.CActionType.svg;
                        obj.visible.size = new cobj_1.Size(this.w, this.h);
                        obj.visible.pos = new cobj_1.Pos(this.rect[0], this.rect[1]);
                        obj.visible.anchor = new cobj_1.Pos(0, 0);
                        return [4 /*yield*/, this.thisNgin.addCObjectInternal(obj.build())];
                    case 2:
                        _a.sent();
                        setTimeout(function () {
                            _this.timeOut.call(_this);
                        }, 1000);
                        return [2 /*return*/];
                }
            });
        });
    };
    Stopwatch.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var obj;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.running = true;
                        obj = new cobj_1.CObject(this.oid);
                        obj.visible = new cobj_1.CVisible([new cobj_1.CAction(this.util.drawSvgText(this.w, this.h, "".concat(this.num)), new cobj_1.Size(this.w, this.h), [], cobj_1.CActionType.svg)]);
                        obj.visible.current = cobj_1.CActionType.svg;
                        obj.visible.size = new cobj_1.Size(this.w, this.h);
                        obj.visible.pos = new cobj_1.Pos(this.rect[0], this.rect[1]);
                        obj.visible.anchor = new cobj_1.Pos(0, 0);
                        return [4 /*yield*/, this.thisNgin.addCObjectInternal(obj.build())];
                    case 1:
                        _a.sent();
                        setTimeout(function () {
                            _this.timeOut.call(_this);
                        }, 1000);
                        return [2 /*return*/];
                }
            });
        });
    };
    Stopwatch.prototype.stop = function () {
        this.running = false;
        return this.num;
    };
    return Stopwatch;
}());
exports.Stopwatch = Stopwatch;
/*
main('daniel', 4040, async (ngin) =>  {
    ngin.eventHandler = new GameInputHandler(ngin);

    const x = 0;
    const y = 0;
    const width = 12;
    const height = 12;
    const margin = 3;
    let gid = 100;

    if (true) {
        await ngin.initScreen({
            background: 'Blue',
            gravityX: 0.0,
            gravityY: 0.0,
            width: width+margin,
            height: height,
            debug: false,
        });
    } else {
        await ngin.command({strings:['removeAll']});
    }
    ngin.eventHandler.ready = true;

    await test(ngin, width, height, margin, (i,j)=>i<j);
    await test(ngin, width, height, margin, (i,j)=>j%2);
    await test(ngin, width, height, margin, (i,j)=>j%2 != i%2);
});
*/
function runq(func) {
    var _this = this;
    main('127.0.0.1', 4040, function (ngin) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ngin.eventHandler = new GameInputHandler(ngin);
                    return [4 /*yield*/, func(ngin)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
}
exports.runq = runq;
var Cmd = /** @class */ (function () {
    function Cmd(ngin) {
        this.ngin = ngin;
    }
    Cmd.prototype.add = function (i, j) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ngin.addFruit(0, 'Bananas', i, j)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Cmd.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ngin.command({ strings: ['submit'], ints: [4041] })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Cmd;
}());
function run(func) {
    var _this = this;
    main('127.0.0.1', 4041, function (ngin) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ngin.eventHandler = new GameInputHandler(ngin);
                    return [4 /*yield*/, func(new Cmd(ngin))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
}
exports.run = run;
var GameInputHandler = /** @class */ (function (_super) {
    __extends(GameInputHandler, _super);
    function GameInputHandler(ngin) {
        var _this = _super.call(this, ngin) || this;
        _this.nginx = ngin;
        _this.ready = false;
        _this.handleLog = function (cmd) { };
        return _this;
    }
    GameInputHandler.prototype.handleContact = function (contact) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(contact);
                if (!this.ready)
                    return [2 /*return*/];
                return [2 /*return*/];
            });
        });
    };
    GameInputHandler.prototype.handleEvent = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = event.name;
                        switch (_a) {
                            case 'fruit': return [3 /*break*/, 1];
                            case 'actor': return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 5];
                    case 1:
                        if (!(event.type == 'complete')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.ngin.setBodyOp(event.bid, 'remove', event.x, event.y)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        if (event.type == 'ready') {
                            //
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    GameInputHandler.prototype.handleKey = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(key);
                return [2 /*return*/];
            });
        });
    };
    GameInputHandler.prototype.handleDirectional = function (directional) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(directional);
                return [2 /*return*/];
            });
        });
    };
    GameInputHandler.prototype.handleButton = function (button) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(button);
                return [2 /*return*/];
            });
        });
    };
    GameInputHandler.prototype.handleCmd = function (cmd) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //console.log(cmd);
                this.handleLog(cmd);
                return [2 /*return*/];
            });
        });
    };
    return GameInputHandler;
}(EventHandler));
//# sourceMappingURL=testutil.js.map