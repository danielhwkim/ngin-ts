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
var _a = require("./ngin"), Ngin = _a.Ngin, mainInternal = _a.mainInternal; //
var _b = require("./gen"), l1 = _b.l1, l2 = _b.l2; //
//exports.__esModule = true;
//exports.NginX = exports.main = void 0;
function main(type, port, body) {
    mainInternal(type, port, function (host, root) {
        return __awaiter(this, void 0, void 0, function () {
            var ngin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ngin = new NginX(root);
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
var NginX = /** @class */ (function (_super) {
    __extends(NginX, _super);
    //omap;
    function NginX(root) {
        var _this = _super.call(this) || this;
        console.log("NginX constructor");
        _this.init(root);
        //this.omap = new Map();
        _this.facingLeft = false;
        return _this;
    }
    //getObj(bid) {
    //    return this.omap.get(bid);
    //}
    NginX.prototype.addBody = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("addBody");
                        if (!('fixedRotaton' in info)) {
                            info.fixedRotation = true;
                        }
                        if (!('categoryBits' in info)) {
                            info.categoryBits = 0x0001;
                        }
                        if (!('maskBits' in info)) {
                            info.maskBits = 0xFFFF;
                        }
                        if (!('trackable' in info)) {
                            info.trackable = true;
                        }
                        /*
                        if ('shape' in info) {
                        info.shape = this.BodyShape.values[info.shape];
                        } else {
                        info.shape = this.BodyShape.values.rectangle;
                        }
                    
                        if ('type' in info) {
                        info.type = this.BodyType.values[info.type];
                        } else {
                        info.type = this.BodyType.values.staticBody;
                        }*/
                        //this.omap.set(info.bid, info);  
                        return [4 /*yield*/, this.addBodyInternal(info)];
                    case 1:
                        /*
                        if ('shape' in info) {
                        info.shape = this.BodyShape.values[info.shape];
                        } else {
                        info.shape = this.BodyShape.values.rectangle;
                        }
                    
                        if ('type' in info) {
                        info.type = this.BodyType.values[info.type];
                        } else {
                        info.type = this.BodyType.values.staticBody;
                        }*/
                        //this.omap.set(info.bid, info);  
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.setCAction = function (bid, skin, skinType, facingLeft) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //const obj = this.getObj(bid);
                    return [4 /*yield*/, this.setCActionInternal(bid, skin, facingLeft, skinType)];
                    case 1:
                        //const obj = this.getObj(bid);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.addStage = function (bid, x, y, width, height) {
        return __awaiter(this, void 0, void 0, function () {
            var data, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = [];
                        obj = {
                            name: 'tiles',
                            skin: 'tiles',
                            x: x,
                            y: y,
                            width: width,
                            height: height,
                            tilesInfo: {
                                path: 'tiled/tileset/0x72_DungeonTilesetII_v1.3.png',
                                tileSizeX: 16,
                                tileSizeY: 16,
                                tileColumns: 32,
                                data: data,
                            }
                        };
                        l1(width, height, data);
                        return [4 /*yield*/, this.addBody(obj)];
                    case 1:
                        _a.sent();
                        //obj['priority'] = 1;
                        data = [];
                        l2(width, height, data);
                        obj.tilesInfo.data = data;
                        return [4 /*yield*/, this.addBody(obj)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.addVoid(bid++, x + 1, y + 1 + 0.2, width - 2, 0.6)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.addVoid(bid++, x + 1, y + height - 1 + 0.2, width - 2, 0.6)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.addVoid(bid++, x + 0.8, y + 0.8, 0.2, height - 2 + 0.2)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.addVoid(bid++, x + width - 1, y + 0.8, 0.2, height - 2 + 0.2)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, bid];
                }
            });
        });
    };
    NginX.prototype.addVoid = function (bid, x, y, width, height) {
        return __awaiter(this, void 0, void 0, function () {
            var x1, y1, x2, y2, i, j;
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
                                this.walls.add(this.xyToNumber(i, j));
                                //console.log(i,j, this.xyToNumber(i,j));
                            }
                        }
                        return [4 /*yield*/, this.addBody({
                                bid: bid,
                                name: 'void',
                                skin: 'wall',
                                x: x,
                                y: y,
                                width: width,
                                height: height,
                                // priority:2,
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.playNoChange = function (bid, facingLeft) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setCAction(bid, 'noChange', 'loop', facingLeft)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.playRun = function (bid, facingLeft) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setCAction(bid, 'run', 'loop', facingLeft)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.playJump = function (bid, facingLeft) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setCAction(bid, 'jump', 'loop', facingLeft)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.playDoubleJumpNotify = function (bid, facingLeft) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setCAction(bid, 'doubleJump', 'notify', facingLeft)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.playIdle = function (bid, facingLeft) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setCAction(bid, 'idle', 'loop', facingLeft)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.playHitNotify = function (bid, facingLeft) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setCAction(bid, 'hit', 'notify', facingLeft)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.playHitOnce = function (bid, facingLeft) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setCAction(bid, 'hit', 'once', facingLeft)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.opVel = function (bid, x, y) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setBodyOp(bid, 'linearVelocity', x, y)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.opVelY = function (bid, y) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setBodyOp(bid, 'yLinearVelocity', 0, y)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.opVelXright = function (bid, x) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setBodyOp(bid, 'xConstantVelocity', 1, x)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.opVelXleft = function (bid, x) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setBodyOp(bid, 'xConstantVelocity', -1, x)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.opAction = function (bid, x, y) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setBodyOp(bid, 'action', x, y)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.opRemove = function (bid, x, y) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setBodyOp(bid, 'remove', x, y)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.addFruit = function (bid, fruit, x, y) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addBody({
                            bid: bid,
                            name: 'fruit',
                            skin: fruit,
                            x: x,
                            y: y,
                            width: 1,
                            height: 1,
                            isSensor: true,
                            // priority:2,
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.addAnimatedObj = function (bid, x, y, tilesInfo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addBody({
                            bid: bid,
                            name: 'animated_obj',
                            x: x,
                            y: y,
                            width: 1,
                            height: 1,
                            tilesInfo: tilesInfo
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.addAnimation = function (x, y, tilesInfo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addBody({
                            name: 'tiles',
                            skin: 'animation',
                            x: x,
                            y: y,
                            width: 1,
                            height: 1,
                            tilesInfo: tilesInfo
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.addDisappearingAnimation = function (x, y, tilesInfo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addAnimation(x, y, {
                            path: 'Main Characters/Desappearing (96x96).png',
                            tileSizeX: 96,
                            tileSizeY: 96,
                            tileColumns: 7,
                            data: [0, 1, 2, 3, 4, 5, 6]
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.addSpike = function (bid, x, y) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addBody({
                            bid: bid,
                            name: 'animated_obj',
                            skin: 'spike',
                            x: x,
                            y: y,
                            width: 1,
                            height: 1,
                            tilesInfo: {
                                path: 'tiled/tileset/0x72_DungeonTilesetII_v1.3.png',
                                tileSizeX: 16,
                                tileSizeY: 16,
                                tileColumns: 32,
                                data: [929, 930, 931, 932, 931, 930]
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.addCoin = function (bid, x, y) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addBody({
                            bid: bid,
                            name: 'animated_obj',
                            skin: 'coin',
                            x: x,
                            y: y,
                            width: 1,
                            height: 1,
                            tilesInfo: {
                                path: 'tiled/tileset/0x72_DungeonTilesetII_v1.3.png',
                                tileSizeX: 16,
                                tileSizeY: 16,
                                tileColumns: 32,
                                data: [403, 404, 405, 406]
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.addActor = function (bid, name, x, y) {
        return __awaiter(this, void 0, void 0, function () {
            var hx, hy, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //console.log('wait - addActor');    
                        this.prepareAck(bid);
                        hx = 0.25 / 2;
                        hy = 0.25 / 2;
                        return [4 /*yield*/, this.addBody({
                                bid: bid,
                                name: 'actor',
                                skin: name,
                                shape: 'polygon',
                                x: x,
                                y: y - 0.2,
                                width: 1,
                                height: 1,
                                type: 'dynamic',
                                facingLeft: true,
                                floats: [-hx, -hy / 2, hx, hy / 2, hx, hy * 2, -hx, hy * 2]
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.waitAckValue(bid)];
                    case 2:
                        value = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.moveActor = function (bid, cmdname, facingLeft) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.playRun(bid, facingLeft)];
                    case 1:
                        _a.sent();
                        console.log('wait - moveActor', cmdname);
                        this.prepareAck();
                        return [4 /*yield*/, this.command({
                                ints: [bid],
                                strings: [cmdname],
                                floats: [0, -0.2],
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.waitAckValue(bid)];
                    case 3:
                        value = _a.sent();
                        console.log('act - moveActor', cmdname, value);
                        return [4 /*yield*/, this.playIdle(bid, facingLeft)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.moveBack = function (bid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.playRun(bid)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.command({
                                ints: [bid],
                                strings: ['moveBack'],
                                floats: [0, -0.2],
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.moveLeft = function (bid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.facingLeft = true;
                        return [4 /*yield*/, this.moveActor(bid, 'moveLeft', this.facingLeft)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.moveRight = function (bid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.facingLeft = false;
                        return [4 /*yield*/, this.moveActor(bid, 'moveRight', this.facingLeft)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.moveUp = function (bid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.moveActor(bid, 'moveUp')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.moveDown = function (bid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.moveActor(bid, 'moveDown')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NginX.prototype.isLeftWall = function (bid) {
        return __awaiter(this, void 0, void 0, function () {
            var info, x, y;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.queryBodyinfo(bid)];
                    case 1:
                        info = _a.sent();
                        x = Math.floor(info.x);
                        y = Math.floor(info.y);
                        //console.log(x-1, y, this.xyToNumber(x-1, y));
                        //console.log(this.walls);
                        return [2 /*return*/, this.walls.has(this.xyToNumber(x - 1, y))];
                }
            });
        });
    };
    NginX.prototype.xyToNumber = function (x, y) {
        return (x << 16) + y;
    };
    NginX.prototype.isRightWall = function (bid) {
        return __awaiter(this, void 0, void 0, function () {
            var info, x, y;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.queryBodyinfo(bid)];
                    case 1:
                        info = _a.sent();
                        x = Math.floor(info.x);
                        y = Math.floor(info.y);
                        return [2 /*return*/, this.walls.has(this.xyToNumber(x + 1, y))];
                }
            });
        });
    };
    NginX.prototype.isUpWall = function (bid) {
        return __awaiter(this, void 0, void 0, function () {
            var info, x, y;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.queryBodyinfo(bid)];
                    case 1:
                        info = _a.sent();
                        x = Math.floor(info.x);
                        y = Math.floor(info.y);
                        return [2 /*return*/, this.walls.has(this.xyToNumber(x, y - 1))];
                }
            });
        });
    };
    NginX.prototype.isDownWall = function (bid) {
        return __awaiter(this, void 0, void 0, function () {
            var info, x, y;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.queryBodyinfo(bid)];
                    case 1:
                        info = _a.sent();
                        x = Math.floor(info.x);
                        y = Math.floor(info.y);
                        return [2 /*return*/, this.walls.has(this.xyToNumber(x, y + 1))];
                }
            });
        });
    };
    return NginX;
}(Ngin));
//exports.main = main;
//exports.NginX = NginX;
//export { main, NginX};
module.exports = { main: main, NginX: NginX }; //
//# sourceMappingURL=nginx.js.map