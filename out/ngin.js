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
exports.main = void 0;
var protobuf = require("protobufjs");
//var fs = require('fs');
var net = require('net');
var client = new net.Socket();
var EventEmitter = require('events');
client.setNoDelay(true);
var bonjour = require('bonjour')();
var ngin;
function mainInternal(type, port, body) {
    var _this = this;
    // browse for all http services
    if (type[3] == '.') {
        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            var root;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protobuf.load("command.proto")];
                    case 1:
                        root = _a.sent();
                        return [4 /*yield*/, body(type, root)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }, 0);
    }
    else {
        bonjour.find({ type: type }, function (service) {
            return __awaiter(this, void 0, void 0, function () {
                var host, addr, root;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log(service.addresses);
                            for (addr in service.addresses) {
                                addr = service.addresses[addr];
                                console.log('addr:', addr);
                                if (addr[3] == '.') {
                                    host = addr;
                                }
                            }
                            //const host = service.addresses[2];
                            //const port = 4040;  
                            console.log('host:', host);
                            return [4 /*yield*/, protobuf.load("command.proto")];
                        case 1:
                            root = _a.sent();
                            return [4 /*yield*/, body(host, root)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    }
}
function main(type, port, body) {
    mainInternal(type, port, function (host, root) {
        return __awaiter(this, void 0, void 0, function () {
            var x;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        x = new Ngin(root);
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
var EventHandler = /** @class */ (function () {
    function EventHandler(ngin) {
    }
    EventHandler.prototype.handle = function (cmdinfo) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = cmdinfo.head;
                        switch (_a) {
                            case ngin.Head.values.contact: return [3 /*break*/, 1];
                            case ngin.Head.values.event: return [3 /*break*/, 3];
                            case ngin.Head.values.key: return [3 /*break*/, 5];
                            case ngin.Head.values.directional: return [3 /*break*/, 7];
                            case ngin.Head.values.button: return [3 /*break*/, 9];
                            case ngin.Head.values.cmd: return [3 /*break*/, 11];
                        }
                        return [3 /*break*/, 13];
                    case 1: return [4 /*yield*/, this.handleContact(cmdinfo.contact)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 3: return [4 /*yield*/, this.handleEvent(cmdinfo.event)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 5: return [4 /*yield*/, this.handleKey(cmdinfo.key)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 7:
                        cmdinfo.directional.direction = ngin.JoystickMoveDirectional.values[cmdinfo.directional.direction];
                        cmdinfo.directional.iid = ngin.TouchInputId.values[cmdinfo.directional.iid];
                        return [4 /*yield*/, this.handleDirectional(cmdinfo.directional)];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 9:
                        cmdinfo.button.event = ngin.ActionEvent.values[cmdinfo.button.event];
                        cmdinfo.button.iid = ngin.TouchInputId.values[cmdinfo.button.iid];
                        return [4 /*yield*/, this.handleButton(cmdinfo.button)];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, this.handleCmd(cmdinfo.cmd)];
                    case 12:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    EventHandler.prototype.handleContact = function (contact) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(contact);
                return [2 /*return*/];
            });
        });
    };
    EventHandler.prototype.handleEvent = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(event);
                return [2 /*return*/];
            });
        });
    };
    EventHandler.prototype.handleKey = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(key);
                return [2 /*return*/];
            });
        });
    };
    EventHandler.prototype.handleDirectional = function (directional) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(directional);
                return [2 /*return*/];
            });
        });
    };
    EventHandler.prototype.handleButton = function (button) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(button);
                return [2 /*return*/];
            });
        });
    };
    EventHandler.prototype.handleCmd = function (cmd) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(cmd);
                return [2 /*return*/];
            });
        });
    };
    return EventHandler;
}());
var Ngin = /** @class */ (function () {
    function Ngin(root) {
        this.precision = 3;
        this.root = root;
        this.CObject = root.lookupType("commander.CObject");
        this.BodyShape = root.lookupEnum("commander.BodyShape");
        this.BodyType = root.lookupEnum("commander.BodyType");
        this.CActionType = root.lookupEnum("commander.CActionType");
        this.Head = root.lookupEnum("commander.Head");
        this.CStageInfo = root.lookupType("commander.CStageInfo");
        this.Cmd = root.lookupType("commander.Cmd");
        this.CmdInfo = root.lookupType("commander.CmdInfo");
        this.JoystickDirectionals = root.lookupEnum("commander.JoystickDirectionals");
        this.JoystickMoveDirectional = root.lookupEnum("commander.JoystickMoveDirectional");
        this.TouchInputId = root.lookupEnum("commander.TouchInputId");
        this.ActionEvent = root.lookupEnum("commander.ActionEvent");
        //this.BodyInfoQuery = root.lookupType("commander.BodyInfoQuery");
        //this.BodyInfoQueryResult = root.lookupType("commander.BodyInfoQueryResult");
        this.QueryInfo = root.lookupType("commander.QueryInfo");
        this.walls = new Set();
        ngin = this;
    }
    Ngin.prototype.connect = function (host, port) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(host, port);
                        client.on('data', function (chunk) {
                            ngin.onCmd(chunk);
                        });
                        client.on('end', function () {
                            console.log('Requested an end to the TCP connection');
                        });
                        return [4 /*yield*/, client.connect({ port: port, host: host })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Ngin.prototype.sendCObjectInternal = function (cobj) {
        return __awaiter(this, void 0, void 0, function () {
            var i, a, buf_cobj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ('visible' in cobj) {
                            cobj.visible.current = this.CActionType.values[cobj.visible.current];
                            for (i = 0; i < cobj.visible.actions.length; i++) {
                                a = cobj.visible.actions[i];
                                a.type = this.CActionType.values[a.type];
                            }
                        }
                        if ('physical' in cobj) {
                            cobj.physical.shape = this.BodyShape.values[cobj.physical.shape];
                            cobj.physical.type = this.BodyType.values[cobj.physical.type];
                        }
                        buf_cobj = this.CObject.encode(cobj).finish();
                        return [4 /*yield*/, this.send(buf_cobj, this.Head.values.cobject)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Ngin.prototype.sendCStageInternal = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var buf_body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.CStageInfo.encode(info).finish()];
                    case 1:
                        buf_body = _a.sent();
                        return [4 /*yield*/, this.send(buf_body, this.Head.values.stage)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Ngin.prototype.onCmd = function (chunk) {
        return __awaiter(this, void 0, void 0, function () {
            var index, size_info, size, data, cmd, head;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < chunk.length)) return [3 /*break*/, 8];
                        size_info = chunk.slice(index, index + 4);
                        size = size_info.readUint32LE(0);
                        data = chunk.slice(index + 4, index + 4 + size);
                        cmd = this.CmdInfo.decode(data);
                        head = this.Head.valuesById[cmd.head];
                        if (!(cmd.head == this.Head.values.cmd)) return [3 /*break*/, 2];
                        this.cmdEmitter.emit('cmd', cmd.cmd);
                        return [3 /*break*/, 7];
                    case 2:
                        if (!(cmd.head == this.Head.values.ack)) return [3 /*break*/, 3];
                        console.log('ack:', cmd.ack.code);
                        this.ackEmitter.emit('ack', cmd.ack.code);
                        return [3 /*break*/, 7];
                    case 3:
                        if (!(cmd.head == this.Head.values.bodyinfoqueryresult)) return [3 /*break*/, 4];
                        this.bodyinfoEmitter.emit('bodyinfo', cmd.bodyinfo);
                        return [3 /*break*/, 7];
                    case 4:
                        if (!(cmd.head == this.Head.values.queryresult)) return [3 /*break*/, 5];
                        this.resultEmitter.emit('result', cmd.result);
                        return [3 /*break*/, 7];
                    case 5:
                        if (!this.eventHandler) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.eventHandler.handle(cmd)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        index = index + 4 + size;
                        return [3 /*break*/, 1];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Ngin.prototype.setCActionInternal = function (bid, skin, facingLeft, skinType) {
        return __awaiter(this, void 0, void 0, function () {
            var extra, info, buf_body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        extra = 0;
                        if (facingLeft != undefined) {
                            if (facingLeft) {
                                extra = this.CActionExtra.values.left;
                            }
                            else {
                                extra = this.CActionExtra.values.right;
                            }
                        }
                        info = {
                            bid: bid,
                            skin: this.CActionType.values[skin],
                            type: skinType ? this.CActionType.values[skinType] : 0,
                            extra: extra,
                        };
                        buf_body = this.CActionInfo.encode(info).finish();
                        return [4 /*yield*/, this.send(buf_body, this.Head.values.bodystatus)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Ngin.prototype.send = function (buf_body, head) {
        return __awaiter(this, void 0, void 0, function () {
            var buf_head, buf_len, buf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        buf_head = Buffer.alloc(4);
                        buf_head.writeUInt32LE(head);
                        buf_len = Buffer.alloc(4);
                        buf_len.writeUInt32LE(buf_body.length);
                        buf = Buffer.concat([buf_head, buf_len, buf_body]);
                        return [4 /*yield*/, client.write(buf)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Ngin.prototype.queryBodyinfo = function (bid) {
        return __awaiter(this, void 0, void 0, function () {
            var buf_body, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        buf_body = this.BodyInfoQuery.encode({ qid: bid }).finish();
                        this.bodyinfoEmitter = new EventEmitter();
                        return [4 /*yield*/, this.send(buf_body, this.Head.values.bodyinfoquery)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, EventEmitter.once(this.bodyinfoEmitter, 'bodyinfo')];
                    case 2:
                        value = (_a.sent())[0];
                        return [2 /*return*/, value];
                }
            });
        });
    };
    Ngin.prototype.prepareAck = function (bid) {
        this.ackEmitter = new EventEmitter();
    };
    Ngin.prototype.waitAckValue = function (bid) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, EventEmitter.once(this.ackEmitter, 'ack')];
                    case 1:
                        value = (_a.sent())[0];
                        return [2 /*return*/, value];
                }
            });
        });
    };
    Ngin.prototype.command = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var cmd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cmd = this.Cmd.encode(info).finish();
                        return [4 /*yield*/, this.send(cmd, this.Head.values.cmd)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Ngin;
}());
module.exports = { mainInternal: mainInternal, EventHandler: EventHandler, Ngin: Ngin, main: main };
//# sourceMappingURL=ngin.js.map