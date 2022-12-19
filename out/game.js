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
function getGameData() {
    return '{ "compressionlevel":-1,\
"height":17,\
"infinite":false,\
"layers":[\
       {\
        "data":[200, 180, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 5, 200, 201, 101, 102, 103, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 200, 201, 123, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 200, 201, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 200, 201, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 123, 23, 200, 201, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 123, 124, 125, 183, 184, 184, 184, 184, 185, 23, 200, 201, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 146, 147, 205, 206, 206, 206, 206, 207, 23, 200, 201, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 205, 206, 228, 228, 206, 207, 23, 200, 201, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 205, 207, 0, 0, 205, 207, 23, 200, 201, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 205, 207, 0, 123, 205, 207, 23, 200, 201, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 205, 208, 184, 184, 209, 207, 23, 180, 223, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 205, 206, 206, 206, 206, 207, 23, 201, 183, 184, 184, 185, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 205, 206, 206, 206, 206, 207, 23, 201, 205, 206, 206, 207, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 183, 184, 184, 184, 184, 184, 184, 184, 184, 184, 209, 206, 123, 206, 104, 23, 201, 227, 123, 205, 208, 184, 185, 0, 0, 0, 0, 0, 0, 0, 183, 184, 184, 209, 206, 206, 206, 206, 206, 206, 206, 206, 206, 124, 125, 206, 126, 23, 202, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 179, 206, 206, 206, 206, 206, 206, 206, 123, 206, 206, 206, 146, 147, 123, 148, 23, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 202, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 203],\
        "height":17,\
        "id":1,\
        "name":"Tile Layer 1",\
        "opacity":1,\
        "type":"tilelayer",\
        "visible":true,\
        "width":32,\
        "x":0,\
        "y":0\
       }, \
       {\
        "draworder":"topdown",\
        "id":2,\
        "name":"Object Layer 1",\
        "objects":[\
               {\
                "height":16,\
                "id":1,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":32,\
                "x":80,\
                "y":224\
               }, \
               {\
                "height":16,\
                "id":32,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":32,\
                "x":48,\
                "y":16\
               }, \
               {\
                "height":16,\
                "id":33,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":32,\
                "y":32\
               }, \
               {\
                "height":16,\
                "id":16,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":160,\
                "y":192\
               }, \
               {\
                "height":16,\
                "id":21,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":144,\
                "y":128\
               }, \
               {\
                "height":16,\
                "id":23,\
                "name":"Apple",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":384,\
                "y":48\
               }, \
               {\
                "height":16,\
                "id":27,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":208,\
                "y":128\
               }, \
               {\
                "height":16,\
                "id":24,\
                "name":"Apple",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":432,\
                "y":32\
               }, \
               {\
                "height":16,\
                "id":29,\
                "name":"Apple",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":320,\
                "y":144\
               }, \
               {\
                "height":16,\
                "id":26,\
                "name":"Trampoline",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":160,\
                "y":224\
               }, \
               {\
                "height":16,\
                "id":17,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":176,\
                "y":128\
               }, \
               {\
                "height":16,\
                "id":20,\
                "name":"Apple",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":400,\
                "y":32\
               }, \
               {\
                "height":16,\
                "id":28,\
                "name":"Trampoline",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":320,\
                "y":192\
               }, \
               {\
                "height":16,\
                "id":30,\
                "name":"Apple",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":320,\
                "y":80\
               }, \
               {\
                "height":16,\
                "id":22,\
                "name":"Apple",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":416,\
                "y":48\
               }, \
               {\
                "height":16,\
                "id":25,\
                "name":"Apple",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":320,\
                "y":112\
               }, \
               {\
                "height":16,\
                "id":18,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":160,\
                "y":160\
               }, \
               {\
                "height":16,\
                "id":19,\
                "name":"Apple",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":448,\
                "y":48\
               }, \
               {\
                "height":16,\
                "id":13,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":128,\
                "x":352,\
                "y":80\
               }, \
               {\
                "height":16,\
                "id":34,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":32,\
                "x":368,\
                "y":96\
               }, \
               {\
                "height":31.4545454545455,\
                "id":9,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":48,\
                "x":32,\
                "y":192\
               }, \
               {\
                "height":16.3636363636364,\
                "id":10,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":15.8181818181818,\
                "x":112,\
                "y":128\
               }, \
               {\
                "height":16,\
                "id":2,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":32,\
                "x":224,\
                "y":224\
               }, \
               {\
                "height":16,\
                "id":6,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":416,\
                "x":80,\
                "y":-0.181818181818184\
               }, \
               {\
                "height":16,\
                "id":3,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":112,\
                "x":112,\
                "y":240\
               }, \
               {\
                "height":48,\
                "id":4,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":144,\
                "x":256,\
                "y":208\
               }, \
               {\
                "height":64,\
                "id":5,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":15.636363636364,\
                "x":496,\
                "y":0\
               }, \
               {\
                "height":96,\
                "id":7,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":400,\
                "y":112\
               }, \
               {\
                "height":144,\
                "id":8,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16.1818181818182,\
                "x":16,\
                "y":48\
               }, \
               {\
                "height":15.6364,\
                "id":31,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":31.6364,\
                "x":480,\
                "y":64\
               }, \
               {\
                "height":16,\
                "id":35,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":160,\
                "y":96\
               }, \
               {\
                "height":16,\
                "id":36,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":144,\
                "y":64\
               }, \
               {\
                "height":16,\
                "id":37,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":192,\
                "y":96\
               }, \
               {\
                "height":16.3636,\
                "id":38,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":15.8182,\
                "x":128,\
                "y":96\
               }, \
               {\
                "height":16,\
                "id":39,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":176,\
                "y":64\
               }, \
               {\
                "height":16,\
                "id":40,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":160,\
                "y":32\
               }, \
               {\
                "height":16,\
                "id":41,\
                "name":"hero",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":48,\
                "y":176\
               }],\
        "opacity":1,\
        "type":"objectgroup",\
        "visible":true,\
        "x":0,\
        "y":0\
       }],\
"nextlayerid":3,\
"nextobjectid":42,\
"orientation":"orthogonal",\
"renderorder":"right-down",\
"tiledversion":"1.7.2",\
"tileheight":16,\
"tilesets":[\
       {\
        "firstgid":1,\
        "source":"Terrain (16x16).json"\
       }],\
"tilewidth":16,\
"type":"map",\
"version":"1.6",\
"width":32\
}';
}
(0, nx_1.main)('127.0.0.1', 4040, function (nx) { return __awaiter(void 0, void 0, void 0, function () {
    var j, tiles, objlayer, data, tileSize, precision, size, stage, objs, _a, _b, _i, key, obj, _c, hero, cobj, cobj, cobj, cobj, i;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                nx.eventHandler = new InputHandler(nx);
                j = JSON.parse(getGameData());
                tiles = j.layers[0];
                objlayer = j.layers[1];
                data = tiles['data'];
                tileSize = j['tilewidth'];
                precision = 3;
                size = new cobj_1.CSize(tiles.width, tiles.height);
                stage = new cobj_1.CStage(size);
                //stage.debug = true;
                stage.background = 'Blue';
                stage.gravity = new cobj_1.CPos(0, 60);
                stage.joystickDirectionals = cobj_1.CJoystickDirectionals.horizontal;
                return [4 /*yield*/, nx.sendObjWait(stage)];
            case 1:
                _d.sent();
                return [4 /*yield*/, nx.sendObj((0, cobj_1.CTileObject)('Terrain/Terrain (16x16).png', new cobj_1.CSize(tileSize, tileSize), data, new cobj_1.CPos(0, 0), size))];
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
                if (!(_i < _a.length)) return [3 /*break*/, 17];
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
                    case 'hero': return [3 /*break*/, 5];
                    case 'floor': return [3 /*break*/, 7];
                    case 'bar': return [3 /*break*/, 9];
                    case 'Box1': return [3 /*break*/, 11];
                    case 'Box2': return [3 /*break*/, 11];
                    case 'Box3': return [3 /*break*/, 11];
                    case 'Trampoline': return [3 /*break*/, 13];
                }
                return [3 /*break*/, 15];
            case 4:
                nx.addFruit(obj.id, new cobj_1.CPos(obj.x, obj.y), obj.name);
                return [3 /*break*/, 16];
            case 5:
                obj.id = 1;
                hero = nx.hero(obj.id, 'Mask Dude', new cobj_1.CPos(obj.x - 0.5, obj.y - 2));
                hero.physical.shape = cobj_1.CBodyShape.actor;
                hero.physical.size = new cobj_1.CSize(2, 2);
                hero.physical.maskBits = 0x00FF;
                hero.visible.scale = new cobj_1.CPos(2, 2);
                hero.visible.pos = new cobj_1.CPos(0, 0);
                return [4 /*yield*/, nx.sendObjWait(hero)];
            case 6:
                _d.sent();
                if (nx.eventHandler) {
                    nx.eventHandler.actorBid = hero.id;
                }
                return [3 /*break*/, 16];
            case 7:
                cobj = new cobj_1.CObject(obj.id);
                cobj.info = obj.name;
                cobj.physical = new cobj_1.CPhysical(cobj_1.CBodyShape.rectangle, new cobj_1.CPos(obj.x, obj.y), cobj_1.CBodyType.static);
                cobj.physical.size = new cobj_1.CSize(obj.width, obj.height);
                //cobj.physical.anchor = new CPos(0, 0);
                return [4 /*yield*/, nx.sendObj(cobj)];
            case 8:
                //cobj.physical.anchor = new CPos(0, 0);
                _d.sent();
                return [3 /*break*/, 16];
            case 9:
                cobj = new cobj_1.CObject(obj.id);
                cobj.info = obj.name;
                cobj.physical = new cobj_1.CPhysical(cobj_1.CBodyShape.rectangle, new cobj_1.CPos(obj.x, obj.y), cobj_1.CBodyType.static);
                cobj.physical.size = new cobj_1.CSize(obj.width, obj.height);
                //cobj.physical.anchor = new CPos(0, 0);
                return [4 /*yield*/, nx.sendObj(cobj)];
            case 10:
                //cobj.physical.anchor = new CPos(0, 0);
                _d.sent();
                return [3 /*break*/, 16];
            case 11:
                cobj = new cobj_1.CObject(obj.id);
                cobj.info = obj.name;
                cobj.physical = new cobj_1.CPhysical(cobj_1.CBodyShape.rectangle, new cobj_1.CPos(obj.x, obj.y), cobj_1.CBodyType.static);
                cobj.physical.size = new cobj_1.CSize(obj.width, obj.height);
                //cobj.physical.anchor = new CPos(0, 0);
                return [4 /*yield*/, nx.sendObj(cobj)];
            case 12:
                //cobj.physical.anchor = new CPos(0, 0);
                _d.sent();
                return [3 /*break*/, 16];
            case 13:
                cobj = new cobj_1.CObject(obj.id);
                cobj.info = obj.name;
                cobj.physical = new cobj_1.CPhysical(cobj_1.CBodyShape.rectangle, new cobj_1.CPos(obj.x, obj.y), cobj_1.CBodyType.static);
                cobj.physical.size = new cobj_1.CSize(obj.width, obj.height);
                cobj.visible = new cobj_1.CVisible([
                    new cobj_1.CAction('Traps/Trampoline/Idle.png', new cobj_1.CSize(28, 28), [], cobj_1.CActionType.idle),
                    new cobj_1.CAction('Traps/Trampoline/Jump (28x28).png', new cobj_1.CSize(28, 28), [], cobj_1.CActionType.hit),
                ]);
                for (i = 0; i < cobj.visible.actions.length; i++) {
                    cobj.visible.actions[i].stepTime = 50 / 1000;
                }
                cobj.visible.scale = new cobj_1.CPos(1.7, 1.7);
                cobj.visible.pos = new cobj_1.CPos(0, -0.4);
                //cobj.visible.current = CActionType.hit;
                return [4 /*yield*/, nx.sendObj(cobj)];
            case 14:
                //cobj.visible.current = CActionType.hit;
                _d.sent();
                return [3 /*break*/, 16];
            case 15: return [3 /*break*/, 16];
            case 16:
                _i++;
                return [3 /*break*/, 3];
            case 17: return [2 /*return*/];
        }
    });
}); });
var InputHandler = /** @class */ (function (_super) {
    __extends(InputHandler, _super);
    //nginx;
    function InputHandler(ngin) {
        var _this = _super.call(this, ngin) || this;
        _this.nginx = ngin;
        _this.key_down_left = false;
        _this.key_down_right = false;
        //actor_contact_count = 0;
        _this.actor_contacts = new Set();
        _this.actor_jump_count = 0;
        _this.dynamic_id = 1000;
        _this.facingLeft = false;
        _this.ready = false;
        return _this;
    }
    InputHandler.prototype.handleContact = function (contact) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.ready)
                    return [2 /*return*/];
                console.log(contact);
                return [2 /*return*/];
            });
        });
    };
    InputHandler.prototype.handleEvent = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(event);
                return [2 /*return*/];
            });
        });
    };
    InputHandler.prototype.handleKey = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(key);
                return [2 /*return*/];
            });
        });
    };
    InputHandler.prototype.handleDirectional = function (directional) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(directional);
                return [2 /*return*/];
            });
        });
    };
    InputHandler.prototype.handleButton = function (button) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(button);
                return [2 /*return*/];
            });
        });
    };
    return InputHandler;
}(EventHandler));
//# sourceMappingURL=game.js.map