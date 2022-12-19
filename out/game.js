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
var nx_1 = require("./nx");
var cobj_1 = require("./cobj");
function conv(v, tileSize) {
    return Math.round(v * 2.0 / tileSize) / 2.0;
}
function convInfo(info, tileSize) {
    info.x = conv(info.x, tileSize);
    info.y = conv(info.y, tileSize);
    info.width = conv(info.width, tileSize);
    info.height = conv(info.height, tileSize);
    return info;
}
function addFruit(id, pos, name) {
    var cobj = new cobj_1.CObject(id);
    cobj.info = "fruit";
    cobj.physical = new cobj_1.CPhysical(cobj_1.CBodyShape.circle, pos, cobj_1.CBodyType.static);
    cobj.physical.isSensor = true;
    cobj.visible = new cobj_1.CVisible([
        new cobj_1.CAction('Items/Fruits/' + name + '.png', new cobj_1.CSize(32, 32), [], cobj_1.CActionType.idle),
        new cobj_1.CAction('Items/Fruits/Collected.png', new cobj_1.CSize(32, 32), [], cobj_1.CActionType.hit, false),
    ]);
    cobj.visible.scale = new cobj_1.CVector2(1.5, 1.5);
    for (var i = 0; i < cobj.visible.actions.length; i++) {
        cobj.visible.actions[i].stepTime = 50 / 1000;
    }
    return cobj;
}
(0, nx_1.main)('127.0.0.1', 4040, function (nx) { return __awaiter(void 0, void 0, void 0, function () {
    var j, tiles, objlayer, data, tileSize, size, stage, objs, _a, _b, _i, key, obj, _c, hero, cobj, cobj, cobj, i, cobj, i;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                nx.eventHandler = new InputHandler(nx);
                nx.eventHandler.objs = {};
                j = JSON.parse(fs.readFileSync('./data/level02.json', 'utf8'));
                tiles = j.layers[0];
                objlayer = j.layers[1];
                data = tiles['data'];
                tileSize = j['tilewidth'];
                size = new cobj_1.CSize(tiles.width, tiles.height);
                stage = new cobj_1.CStage(size);
                //stage.debug = true;
                stage.background = 'Blue';
                stage.gravity = new cobj_1.CVector2(0, 60);
                stage.joystickDirectionals = cobj_1.CJoystickDirectionals.horizontal;
                return [4 /*yield*/, nx.sendObjWait(stage)];
            case 1:
                _d.sent();
                return [4 /*yield*/, nx.sendObj((0, cobj_1.CTileObject)('Terrain/Terrain (16x16).png', new cobj_1.CSize(tileSize, tileSize), data, new cobj_1.CVector2(0, 0), size))];
            case 2:
                _d.sent();
                nx.eventHandler.ready = true;
                objs = objlayer.objects;
                _a = [];
                for (_b in objs)
                    _a.push(_b);
                _i = 0;
                _d.label = 3;
            case 3:
                if (!(_i < _a.length)) return [3 /*break*/, 18];
                key = _a[_i];
                obj = objs[key];
                console.log(obj.name, obj.id);
                obj.id += 100;
                convInfo(obj, tileSize);
                _c = obj.name;
                switch (_c) {
                    case 'Apple': return [3 /*break*/, 4];
                    case 'Bananas': return [3 /*break*/, 4];
                    case 'Cherries': return [3 /*break*/, 4];
                    case 'Kiwi': return [3 /*break*/, 4];
                    case 'Orange': return [3 /*break*/, 4];
                    case 'Pineapple': return [3 /*break*/, 4];
                    case 'Strawberry': return [3 /*break*/, 4];
                    case 'hero': return [3 /*break*/, 6];
                    case 'floor': return [3 /*break*/, 8];
                    case 'bar': return [3 /*break*/, 10];
                    case 'Box1': return [3 /*break*/, 12];
                    case 'Box2': return [3 /*break*/, 12];
                    case 'Box3': return [3 /*break*/, 12];
                    case 'Trampoline': return [3 /*break*/, 14];
                }
                return [3 /*break*/, 16];
            case 4: return [4 /*yield*/, nx.sendObj(addFruit(obj.id, new cobj_1.CVector2(obj.x, obj.y), obj.name))];
            case 5:
                _d.sent();
                return [3 /*break*/, 17];
            case 6:
                obj.id = 1;
                hero = nx.hero(obj.id, 'Mask Dude', new cobj_1.CVector2(obj.x - 0.5, obj.y - 2));
                hero.physical.shape = cobj_1.CBodyShape.actor;
                hero.physical.size = new cobj_1.CSize(2, 2);
                hero.physical.maskBits = 0x00FF;
                hero.visible.scale = new cobj_1.CVector2(2, 2);
                hero.visible.pos = new cobj_1.CVector2(0, 0);
                return [4 /*yield*/, nx.sendObjWait(hero)];
            case 7:
                _d.sent();
                nx.eventHandler.heroId = hero.id;
                return [3 /*break*/, 17];
            case 8:
                cobj = new cobj_1.CObject(obj.id);
                cobj.info = obj.name;
                cobj.physical = new cobj_1.CPhysical(cobj_1.CBodyShape.rectangle, new cobj_1.CVector2(obj.x, obj.y), cobj_1.CBodyType.static);
                cobj.physical.size = new cobj_1.CSize(obj.width, obj.height);
                return [4 /*yield*/, nx.sendObj(cobj)];
            case 9:
                _d.sent();
                return [3 /*break*/, 17];
            case 10:
                cobj = new cobj_1.CObject(obj.id);
                cobj.info = obj.name;
                cobj.physical = new cobj_1.CPhysical(cobj_1.CBodyShape.rectangle, new cobj_1.CVector2(obj.x, obj.y), cobj_1.CBodyType.static);
                cobj.physical.size = new cobj_1.CSize(obj.width, obj.height);
                cobj.physical.passableBottom = true;
                return [4 /*yield*/, nx.sendObj(cobj)];
            case 11:
                _d.sent();
                return [3 /*break*/, 17];
            case 12:
                cobj = new cobj_1.CObject(obj.id);
                cobj.info = 'box';
                cobj.physical = new cobj_1.CPhysical(cobj_1.CBodyShape.rectangle, new cobj_1.CVector2(obj.x, obj.y), cobj_1.CBodyType.static);
                cobj.physical.size = new cobj_1.CSize(obj.width, obj.height);
                cobj.visible = new cobj_1.CVisible([
                    new cobj_1.CAction('Items/Boxes/' + obj.name + '/Idle.png', new cobj_1.CSize(28, 24), [], cobj_1.CActionType.idle),
                    new cobj_1.CAction('Items/Boxes/' + obj.name + '/Hit (28x24).png', new cobj_1.CSize(28, 24), [], cobj_1.CActionType.hit, false),
                ]);
                cobj.visible.scale = new cobj_1.CVector2(28 / 18, 24 / 18);
                for (i = 0; i < cobj.visible.actions.length; i++) {
                    cobj.visible.actions[i].stepTime = 50 / 1000;
                }
                nx.eventHandler.objs[obj.id] = { name: obj.name, count: 0 };
                return [4 /*yield*/, nx.sendObj(cobj)];
            case 13:
                _d.sent();
                return [3 /*break*/, 17];
            case 14:
                cobj = new cobj_1.CObject(obj.id);
                cobj.info = obj.name;
                cobj.physical = new cobj_1.CPhysical(cobj_1.CBodyShape.rectangle, new cobj_1.CVector2(obj.x, obj.y), cobj_1.CBodyType.static);
                cobj.physical.size = new cobj_1.CSize(obj.width, obj.height);
                cobj.physical.isSensor = true;
                cobj.visible = new cobj_1.CVisible([
                    new cobj_1.CAction('Traps/Trampoline/Idle.png', new cobj_1.CSize(28, 28), [], cobj_1.CActionType.idle),
                    new cobj_1.CAction('Traps/Trampoline/Jump (28x28).png', new cobj_1.CSize(28, 28), [], cobj_1.CActionType.hit, false),
                ]);
                for (i = 0; i < cobj.visible.actions.length; i++) {
                    cobj.visible.actions[i].stepTime = 50 / 1000;
                }
                cobj.visible.scale = new cobj_1.CVector2(1.7, 1.7);
                cobj.visible.pos = new cobj_1.CVector2(0, -0.4);
                return [4 /*yield*/, nx.sendObj(cobj)];
            case 15:
                _d.sent();
                return [3 /*break*/, 17];
            case 16: return [3 /*break*/, 17];
            case 17:
                _i++;
                return [3 /*break*/, 3];
            case 18: return [2 /*return*/];
        }
    });
}); });
var InputHandler = /** @class */ (function (_super) {
    __extends(InputHandler, _super);
    function InputHandler(nx) {
        var _this = _super.call(this, nx) || this;
        _this.nx = nx;
        _this.key_down_left = false;
        _this.key_down_right = false;
        //hero_contact_count = 0;
        _this.hero_contacts = new Set();
        _this.hero_jump_count = 0;
        _this.dynamic_id = 1000;
        _this.facingLeft = false;
        _this.ready = false;
        return _this;
    }
    InputHandler.prototype.handleContact = function (contact) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, obj;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.ready)
                            return [2 /*return*/];
                        console.log(contact);
                        if (!(contact.info1 == 'hero')) return [3 /*break*/, 23];
                        _a = contact.info2;
                        switch (_a) {
                            case 'floor': return [3 /*break*/, 1];
                            case 'bar': return [3 /*break*/, 1];
                            case 'fruit': return [3 /*break*/, 10];
                            case 'box': return [3 /*break*/, 13];
                            case 'Trampoline': return [3 /*break*/, 18];
                            case 'Blocks': return [3 /*break*/, 22];
                        }
                        return [3 /*break*/, 23];
                    case 1:
                        if (!(contact.isEnded == false)) return [3 /*break*/, 8];
                        if (!(contact.y < 0)) return [3 /*break*/, 7];
                        if (!(this.hero_contacts.size == 0)) return [3 /*break*/, 6];
                        if (!(this.key_down_left || this.key_down_right)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.nx.setActionType(contact.id1, cobj_1.CActionType.run, this.facingLeft)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.nx.setActionType(contact.id1, cobj_1.CActionType.idle, this.facingLeft)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        this.hero_jump_count = 0;
                        _b.label = 6;
                    case 6:
                        this.hero_contacts.add(contact.id2);
                        _b.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        if (this.hero_contacts.has(contact.id2)) {
                            this.hero_contacts.delete(contact.id2);
                        }
                        _b.label = 9;
                    case 9: return [3 /*break*/, 23];
                    case 10:
                        if (!(contact.isEnded == false)) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.nx.setActionType(contact.id2, cobj_1.CActionType.hit, this.facingLeft)];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12: return [3 /*break*/, 23];
                    case 13:
                        if (!(contact.isEnded == false)) return [3 /*break*/, 17];
                        if (!(Math.abs(contact.y) > Math.abs(contact.x))) return [3 /*break*/, 15];
                        obj = this.objs[contact.id2];
                        obj.count += 1;
                        return [4 /*yield*/, this.nx.setActionType(contact.id2, cobj_1.CActionType.hit, this.facingLeft)];
                    case 14:
                        _b.sent();
                        _b.label = 15;
                    case 15:
                        if (!(contact.y < 0)) return [3 /*break*/, 17];
                        this.hero_jump_count = 0;
                        return [4 /*yield*/, this.nx.lineary(contact.id1, -20)];
                    case 16:
                        _b.sent();
                        _b.label = 17;
                    case 17: return [3 /*break*/, 23];
                    case 18:
                        if (!(contact.isEnded == false)) return [3 /*break*/, 21];
                        return [4 /*yield*/, this.nx.setActionType(contact.id2, cobj_1.CActionType.hit, this.facingLeft)];
                    case 19:
                        _b.sent();
                        return [4 /*yield*/, this.nx.lineary(contact.id1, -30)];
                    case 20:
                        _b.sent();
                        this.hero_jump_count = 0;
                        _b.label = 21;
                    case 21: return [3 /*break*/, 23];
                    case 22: 
                    /*
                    if (contact.type == 'begin') {
                      await this.nginx.cmdIF2('action', contact.id2, contact.x, contact.y);
                    }*/
                    return [3 /*break*/, 23];
                    case 23: return [2 /*return*/];
                }
            });
        });
    };
    InputHandler.prototype.handleEvent = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var c, _a, obj, i, cobj, cobj;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log(event);
                        c = event;
                        if (c.type == 'ready')
                            return [2 /*return*/];
                        _a = event.name;
                        switch (_a) {
                            case 'box': return [3 /*break*/, 1];
                            case 'Trampoline': return [3 /*break*/, 11];
                            case 'fruit': return [3 /*break*/, 13];
                            case 'hero': return [3 /*break*/, 15];
                        }
                        return [3 /*break*/, 17];
                    case 1:
                        obj = this.objs[event.id];
                        console.log(obj);
                        if (!(obj.count == 2)) return [3 /*break*/, 8];
                        i = 0;
                        _b.label = 2;
                    case 2:
                        if (!(i < 4)) return [3 /*break*/, 5];
                        cobj = new cobj_1.CObject(this.dynamic_id++);
                        cobj.info = "parts";
                        cobj.physical = new cobj_1.CPhysical(cobj_1.CBodyShape.circle, new cobj_1.CVector2(event.x - 0.5 + 0.1 * i, event.y - 0.5), cobj_1.CBodyType.dynamic);
                        cobj.physical.categoryBits = 0x0100;
                        cobj.physical.maskBits = 0x0FFF;
                        cobj.physical.size = new cobj_1.CSize(0.5, 0.5);
                        //cobj.physical.density = 1.0;
                        cobj.physical.contactReport = false;
                        cobj.visible = new cobj_1.CVisible([
                            new cobj_1.CAction('Items/Boxes/' + obj.name + '/Break.png', new cobj_1.CSize(28, 24), [i], cobj_1.CActionType.idle),
                        ]);
                        cobj.visible.scale = new cobj_1.CVector2(28 / 16, 24 / 16);
                        return [4 /*yield*/, this.nx.sendObj(cobj)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: 
                    //await this.nginx.opAction(c.id, c.x, c.y);
                    return [4 /*yield*/, this.nx.remove(event.id)];
                    case 6:
                        //await this.nginx.opAction(c.id, c.x, c.y);
                        _b.sent();
                        cobj = addFruit(this.dynamic_id++, new cobj_1.CVector2(event.x - 0.5, event.y - 0.5), 'Bananas');
                        //cobj.physical.type = CBodyType.dynamic;
                        return [4 /*yield*/, this.nx.sendObj(cobj)];
                    case 7:
                        //cobj.physical.type = CBodyType.dynamic;
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, this.nx.setActionType(event.id, cobj_1.CActionType.idle)];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10: return [3 /*break*/, 17];
                    case 11: return [4 /*yield*/, this.nx.setActionType(event.id, cobj_1.CActionType.idle)];
                    case 12:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 13: return [4 /*yield*/, this.nx.remove(event.id)];
                    case 14:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 15: return [4 /*yield*/, this.nx.setActionType(event.id, cobj_1.CActionType.jump, this.facingLeft)];
                    case 16:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    InputHandler.prototype.handleKey = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log(key);
                        if (!(key.isPressed == false)) return [3 /*break*/, 26];
                        _a = key.name;
                        switch (_a) {
                            case 'Arrow Left': return [3 /*break*/, 1];
                            case 'Arrow Right': return [3 /*break*/, 13];
                        }
                        return [3 /*break*/, 25];
                    case 1:
                        this.key_down_left = false;
                        if (!this.key_down_right) return [3 /*break*/, 7];
                        this.facingLeft = false;
                        return [4 /*yield*/, this.nx.constx(this.heroId, 7)];
                    case 2:
                        _c.sent();
                        if (!(this.hero_contacts.size != 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.nx.setActionType(this.heroId, cobj_1.CActionType.run, this.facingLeft)];
                    case 3:
                        _c.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.nx.setActionType(this.heroId, cobj_1.CActionType.noChange, this.facingLeft)];
                    case 5:
                        _c.sent();
                        _c.label = 6;
                    case 6: return [3 /*break*/, 12];
                    case 7: return [4 /*yield*/, this.nx.constx(this.heroId, 0)];
                    case 8:
                        _c.sent();
                        if (!(this.hero_contacts.size != 0)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.nx.setActionType(this.heroId, cobj_1.CActionType.idle, this.facingLeft)];
                    case 9:
                        _c.sent();
                        return [3 /*break*/, 12];
                    case 10: return [4 /*yield*/, this.nx.setActionType(this.heroId, cobj_1.CActionType.noChange, this.facingLeft)];
                    case 11:
                        _c.sent();
                        _c.label = 12;
                    case 12: return [3 /*break*/, 25];
                    case 13:
                        this.key_down_right = false;
                        if (!this.key_down_left) return [3 /*break*/, 19];
                        this.facingLeft = true;
                        return [4 /*yield*/, this.nx.constx(this.heroId, -7)];
                    case 14:
                        _c.sent();
                        if (!(this.hero_contacts.size != 0)) return [3 /*break*/, 16];
                        return [4 /*yield*/, this.nx.setActionType(this.heroId, cobj_1.CActionType.run, this.facingLeft)];
                    case 15:
                        _c.sent();
                        return [3 /*break*/, 18];
                    case 16: return [4 /*yield*/, this.nx.setActionType(this.heroId, cobj_1.CActionType.noChange, this.facingLeft)];
                    case 17:
                        _c.sent();
                        _c.label = 18;
                    case 18: return [3 /*break*/, 24];
                    case 19: return [4 /*yield*/, this.nx.constx(this.heroId, 0)];
                    case 20:
                        _c.sent();
                        if (!(this.hero_contacts.size != 0)) return [3 /*break*/, 22];
                        return [4 /*yield*/, this.nx.setActionType(this.heroId, cobj_1.CActionType.idle, this.facingLeft)];
                    case 21:
                        _c.sent();
                        return [3 /*break*/, 24];
                    case 22: return [4 /*yield*/, this.nx.setActionType(this.heroId, cobj_1.CActionType.noChange, this.facingLeft)];
                    case 23:
                        _c.sent();
                        _c.label = 24;
                    case 24: return [3 /*break*/, 25];
                    case 25: return [3 /*break*/, 52];
                    case 26:
                        _b = key.name;
                        switch (_b) {
                            case 'Arrow Left': return [3 /*break*/, 27];
                            case 'Arrow Right': return [3 /*break*/, 36];
                            case 'Arrow Up': return [3 /*break*/, 45];
                        }
                        return [3 /*break*/, 52];
                    case 27:
                        if (!!this.key_down_left) return [3 /*break*/, 33];
                        this.key_down_left = true;
                        this.facingLeft = true;
                        return [4 /*yield*/, this.nx.constx(this.heroId, -7)];
                    case 28:
                        _c.sent();
                        if (!(this.hero_contacts.size != 0)) return [3 /*break*/, 30];
                        return [4 /*yield*/, this.nx.setActionType(this.heroId, cobj_1.CActionType.run, this.facingLeft)];
                    case 29:
                        _c.sent();
                        return [3 /*break*/, 32];
                    case 30: return [4 /*yield*/, this.nx.setActionType(this.heroId, cobj_1.CActionType.noChange, this.facingLeft)];
                    case 31:
                        _c.sent();
                        _c.label = 32;
                    case 32: return [3 /*break*/, 35];
                    case 33: return [4 /*yield*/, this.nx.setActionType(this.heroId, cobj_1.CActionType.noChange, this.facingLeft)];
                    case 34:
                        _c.sent();
                        _c.label = 35;
                    case 35: return [3 /*break*/, 52];
                    case 36:
                        if (!!this.key_down_right) return [3 /*break*/, 42];
                        this.key_down_right = true;
                        this.facingLeft = false;
                        return [4 /*yield*/, this.nx.constx(this.heroId, 7)];
                    case 37:
                        _c.sent();
                        if (!(this.hero_contacts.size != 0)) return [3 /*break*/, 39];
                        return [4 /*yield*/, this.nx.setActionType(this.heroId, cobj_1.CActionType.run, this.facingLeft)];
                    case 38:
                        _c.sent();
                        return [3 /*break*/, 41];
                    case 39: return [4 /*yield*/, this.nx.setActionType(this.heroId, cobj_1.CActionType.noChange, this.facingLeft)];
                    case 40:
                        _c.sent();
                        _c.label = 41;
                    case 41: return [3 /*break*/, 44];
                    case 42: return [4 /*yield*/, this.nx.setActionType(this.heroId, cobj_1.CActionType.noChange, this.facingLeft)];
                    case 43:
                        _c.sent();
                        _c.label = 44;
                    case 44: return [3 /*break*/, 52];
                    case 45:
                        if (!(this.hero_contacts.size != 0)) return [3 /*break*/, 48];
                        return [4 /*yield*/, this.nx.lineary(this.heroId, -20)];
                    case 46:
                        _c.sent();
                        return [4 /*yield*/, this.nx.setActionType(this.heroId, cobj_1.CActionType.jump, this.facingLeft)];
                    case 47:
                        _c.sent();
                        this.hero_jump_count = 0;
                        return [3 /*break*/, 51];
                    case 48:
                        if (!(this.hero_jump_count < 1)) return [3 /*break*/, 51];
                        return [4 /*yield*/, this.nx.lineary(this.heroId, -20)];
                    case 49:
                        _c.sent();
                        return [4 /*yield*/, this.nx.setActionType(this.heroId, cobj_1.CActionType.doubleJump, this.facingLeft)];
                    case 50:
                        _c.sent();
                        this.hero_jump_count = 1;
                        _c.label = 51;
                    case 51: return [3 /*break*/, 52];
                    case 52: return [2 /*return*/];
                }
            });
        });
    };
    InputHandler.prototype.handleDirectional = function (directional) {
        return __awaiter(this, void 0, void 0, function () {
            var c, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log(directional);
                        c = directional;
                        _a = c.direction;
                        switch (_a) {
                            case 'IDLE': return [3 /*break*/, 1];
                            case 'MOVE_RIGHT': return [3 /*break*/, 4];
                            case 'MOVE_LEFT': return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 10];
                    case 1: return [4 /*yield*/, this.nx.setActionType(this.heroId, cobj_1.CActionType.idle, this.facingLeft)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.nx.constx(this.heroId, 0)];
                    case 3:
                        _b.sent();
                        this.key_down_right = false;
                        this.key_down_left = false;
                        return [3 /*break*/, 10];
                    case 4:
                        this.facingLeft = false;
                        return [4 /*yield*/, this.nx.setActionType(this.heroId, cobj_1.CActionType.run, this.facingLeft)];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, this.nx.constx(this.heroId, 7 * c.intensity / this.nx.precision)];
                    case 6:
                        _b.sent();
                        this.key_down_right = true;
                        this.key_down_left = true;
                        return [3 /*break*/, 10];
                    case 7:
                        this.facingLeft = true;
                        return [4 /*yield*/, this.nx.setActionType(this.heroId, cobj_1.CActionType.run, this.facingLeft)];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, this.nx.constx(this.heroId, -7 * c.intensity / this.nx.precision)];
                    case 9:
                        _b.sent();
                        this.key_down_right = true;
                        this.key_down_left = true;
                        return [3 /*break*/, 10];
                    case 10:
                        console.log(c.direction);
                        return [2 /*return*/];
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
                        if (!(this.hero_contacts.size != 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.nx.lineary(this.heroId, -20)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.nx.setActionType(this.heroId, cobj_1.CActionType.jump, this.facingLeft)];
                    case 2:
                        _a.sent();
                        this.hero_jump_count = 0;
                        return [3 /*break*/, 6];
                    case 3:
                        if (!(this.hero_jump_count < 1)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.nx.lineary(this.heroId, -20)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.nx.setActionType(this.heroId, cobj_1.CActionType.doubleJump, this.facingLeft)];
                    case 5:
                        _a.sent();
                        this.hero_jump_count = 1;
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return InputHandler;
}(EventHandler));
//# sourceMappingURL=game.js.map