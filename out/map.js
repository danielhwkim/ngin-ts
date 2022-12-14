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
var _a = require("./ngin"), EventHandler = _a.EventHandler, Ngin = _a.Ngin;
var fs = require('fs');
var nx_1 = require("./nx");
var cobj_1 = require("./cobj");
(0, nx_1.main)('127.0.0.1', 4040, function (nx) { return __awaiter(void 0, void 0, void 0, function () {
    var size, stage, gid, i, info;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                nx.eventHandler = new GameInputHandler(nx);
                size = new cobj_1.CSize(12, 12);
                stage = new cobj_1.CStage(size);
                stage.debug = true;
                stage.joystickDirectionals = cobj_1.CJoystickDirectionals.horizontal;
                return [4 /*yield*/, nx.sendObjWait(stage)];
            case 1:
                _a.sent();
                return [4 /*yield*/, nx.addCStage(0, 0, 0, size.w, size.h)];
            case 2:
                _a.sent();
                gid = 300;
                i = 2;
                _a.label = 3;
            case 3:
                if (!(i < 10)) return [3 /*break*/, 6];
                return [4 /*yield*/, nx.addFruit(gid++, new cobj_1.CVec2(i, 3), 'Bananas')];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 3];
            case 6: return [4 /*yield*/, nx.addSpike(gid++, 3, 4)];
            case 7:
                _a.sent();
                return [4 /*yield*/, nx.addCoin(gid++, 4, 4)];
            case 8:
                _a.sent();
                return [4 /*yield*/, nx.sendObjWait(nx.actor(1, 'Mask Dude', new cobj_1.CVec2(5, 4)))];
            case 9:
                _a.sent();
                return [4 /*yield*/, nx.getCObjectInfo(1)];
            case 10:
                info = _a.sent();
                console.log(info);
                return [4 /*yield*/, nx.setActionType(1, cobj_1.CActionType.run, true)];
            case 11:
                _a.sent();
                return [4 /*yield*/, nx.linearTo(1, new cobj_1.CVec2(info.pos.x - 1, info.pos.y), 2)];
            case 12:
                _a.sent();
                return [4 /*yield*/, nx.setActionType(1, cobj_1.CActionType.idle, true)];
            case 13:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var GameInputHandler = /** @class */ (function (_super) {
    __extends(GameInputHandler, _super);
    function GameInputHandler(ngin) {
        var _this = _super.call(this, ngin) || this;
        _this.ngin = ngin;
        return _this;
    }
    GameInputHandler.prototype.handleContact = function (contact) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(contact);
                return [2 /*return*/];
            });
        });
    };
    GameInputHandler.prototype.handleEvent = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(event);
                return [2 /*return*/];
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
    return GameInputHandler;
}(EventHandler));
//# sourceMappingURL=map.js.map