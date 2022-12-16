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
var protobuf = require("protobufjs");
//var fs = require('fs');
var net = require('net');
var client = new net.Socket();
var EventEmitter = require('events');
client.setNoDelay(true);
var bonjour = require('bonjour')();
var ngin;
//exports.__esModule = true;
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
var EventHandler = /** @class */ (function () {
    //directionMap = {};
    function EventHandler(ngin) {
        this.actorBid = 0;
        this.ngin = ngin;
        //for (const i in this.ngin.JoystickMoveDirectional.values) {
        //console.log(i, typeof i, this.ngin.JoystickMoveDirectional.values[i]);
        //this.directionMap[i] = 
        //}
    }
    EventHandler.prototype.handle = function (cmdinfo) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = cmdinfo.head;
                        switch (_a) {
                            case this.ngin.Head.values.contact: return [3 /*break*/, 1];
                            case this.ngin.Head.values.event: return [3 /*break*/, 3];
                            case this.ngin.Head.values.key: return [3 /*break*/, 5];
                            case this.ngin.Head.values.directional: return [3 /*break*/, 7];
                            case this.ngin.Head.values.button: return [3 /*break*/, 9];
                            case this.ngin.Head.values.cmd: return [3 /*break*/, 11];
                        }
                        return [3 /*break*/, 13];
                    case 1:
                        if (cmdinfo.contact.type == this.ngin.ContactType.values.begin) {
                            cmdinfo.contact.type = 'begin';
                        }
                        else {
                            cmdinfo.contact.type = 'end';
                        }
                        return [4 /*yield*/, this.handleContact(cmdinfo.contact)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 3:
                        if (cmdinfo.event.type == this.ngin.EventType.values.complete) {
                            cmdinfo.event.type = 'complete';
                        }
                        else {
                            cmdinfo.event.type = 'ready';
                        }
                        return [4 /*yield*/, this.handleEvent(cmdinfo.event)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 5:
                        if (cmdinfo.key.type == this.ngin.KeyType.values.down) {
                            cmdinfo.key.type = 'down';
                        }
                        else {
                            cmdinfo.key.type = 'up';
                        }
                        return [4 /*yield*/, this.handleKey(cmdinfo.key)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 7:
                        cmdinfo.directional.direction = this.ngin.JoystickMoveDirectional.values[cmdinfo.directional.direction];
                        cmdinfo.directional.iid = this.ngin.TouchInputId.values[cmdinfo.directional.iid];
                        /*
                        if (cmdinfo.directional.type == this.ngin.KeyType.values.down) {
                          cmdinfo.directional.type = 'down';
                        } else {
                          cmdinfo.directional.type = 'up';
                        } */
                        return [4 /*yield*/, this.handleDirectional(cmdinfo.directional)];
                    case 8:
                        /*
                        if (cmdinfo.directional.type == this.ngin.KeyType.values.down) {
                          cmdinfo.directional.type = 'down';
                        } else {
                          cmdinfo.directional.type = 'up';
                        } */
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 9:
                        cmdinfo.button.event = this.ngin.ActionEvent.values[cmdinfo.button.event];
                        cmdinfo.button.iid = this.ngin.TouchInputId.values[cmdinfo.button.iid];
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
    function Ngin() {
        this.precision = 3;
    }
    Ngin.prototype.init = function (root) {
        this.root = root;
        this.CObject = root.lookupType("commander.CObject");
        this.BodyShape = root.lookupEnum("commander.BodyShape");
        this.BodyType = root.lookupEnum("commander.BodyType");
        this.BodyOpInfo = root.lookupType("commander.BodyOpInfo");
        this.BodyOp = root.lookupEnum("commander.BodyOp");
        this.CActionInfo = root.lookupType("commander.CActionInfo");
        this.CAction = root.lookupEnum("commander.CAction");
        this.CActionType = root.lookupEnum("commander.CActionType");
        this.CActionExtra = root.lookupEnum("commander.CActionExtra");
        this.ContactType = root.lookupEnum("commander.ContactType");
        this.EventType = root.lookupEnum("commander.EventType");
        this.KeyType = root.lookupEnum("commander.KeyType");
        this.BodyInfo = root.lookupType("commander.BodyInfo");
        this.Head = root.lookupEnum("commander.Head");
        this.InitInfo = root.lookupType("commander.InitInfo");
        this.CmdType = root.lookupEnum("commander.CmdType");
        this.Cmd = root.lookupType("commander.Cmd");
        //console.log(this.InitInfo);
        this.CmdInfo = root.lookupType("commander.CmdInfo");
        this.JoystickDirectionals = root.lookupEnum("commander.JoystickDirectionals");
        this.JoystickMoveDirectional = root.lookupEnum("commander.JoystickMoveDirectional");
        this.TouchInputId = root.lookupEnum("commander.TouchInputId");
        this.ActionEvent = root.lookupEnum("commander.ActionEvent");
        this.BodyInfoQuery = root.lookupType("commander.BodyInfoQuery");
        this.BodyInfoQueryResult = root.lookupType("commander.BodyInfoQueryResult");
        this.QueryInfo = root.lookupType("commander.QueryInfo");
        //this.eventEmitter = new EventEmitter();
        this.walls = new Set();
        ngin = this;
    };
    Ngin.prototype.connect = function (host, port) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(host, port);
                        client.on('data', function (chunk) {
                            //console.log(chunk, chunk.length);
                            ngin.onCmd(chunk);
                        });
                        //await this.onCmd('chunk');
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
    /*
    async addBodyInternal(info) {
      if ('shape' in info) {
      info.shape = this.BodyShape.values[info.shape];
      } else {
      info.shape = this.BodyShape.values.rectangle;
      }
  
      if ('type' in info) {
      info.type = this.BodyType.values[info.type];
      } else {
      info.type = this.BodyType.values.staticBody;
      }
        
      const buf_body = this.BodyInfo.encode(info).finish();
  
      //console.log(info.bid, info);
      await this.send(buf_body, this.Head.values.bodyinfo);
    }*/
    Ngin.prototype.addCObjectInternal = function (cobj) {
        return __awaiter(this, void 0, void 0, function () {
            var i, a, buf_cobj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ('visible' in cobj) {
                            cobj.visible.current = this.CAction.values[cobj.visible.current];
                            for (i = 0; i < cobj.visible.animations.length; i++) {
                                a = cobj.visible.animations[i];
                                a.action = this.CAction.values[a.action];
                            }
                        }
                        if ('physical' in cobj) {
                            cobj.physical.shape = this.BodyShape.values[cobj.physical.shape];
                            cobj.physical.type = this.BodyType.values[cobj.physical.type];
                        }
                        buf_cobj = this.CObject.encode(cobj).finish();
                        //console.log(info.bid, info);  
                        return [4 /*yield*/, this.send(buf_cobj, this.Head.values.cobject)];
                    case 1:
                        //console.log(info.bid, info);  
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Ngin.prototype.initScreen = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var buf_body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (info.joystickPrecision) {
                            this.precision = info.joystickPrecision;
                        }
                        if ('joystickDirectionals' in info) {
                            info.joystickDirectionals = this.JoystickDirectionals.values[info.joystickDirectionals];
                        }
                        if ('button1' in info) {
                            info.button1 = this.ActionEvent.values[info.button1];
                        }
                        if ('button2' in info) {
                            info.button2 = this.ActionEvent.values[info.button2];
                        }
                        return [4 /*yield*/, this.InitInfo.encode(info).finish()];
                    case 1:
                        buf_body = _a.sent();
                        //console.log('wait - initScreen'); 
                        //this.ackEmitter = new EventEmitter();    
                        return [4 /*yield*/, this.send(buf_body, this.Head.values.init)];
                    case 2:
                        //console.log('wait - initScreen'); 
                        //this.ackEmitter = new EventEmitter();    
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
                            skin: this.CAction.values[skin],
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
    Ngin.prototype.setBodyOp = function (bid, op, x, y) {
        return __awaiter(this, void 0, void 0, function () {
            var buf_body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        buf_body = this.BodyOpInfo.encode({
                            bid: bid,
                            op: this.BodyOp.values[op],
                            x: x,
                            y: y,
                        }).finish();
                        return [4 /*yield*/, this.send(buf_body, this.Head.values.bodyop)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Ngin.prototype.cmdIF2 = function (cmd, bid, x, y) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
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
                        //console.log(head, buf_body.length);
                        //console.log(buf);
                        return [4 /*yield*/, client.write(buf)];
                    case 1:
                        //console.log(head, buf_body.length);
                        //console.log(buf);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Ngin.prototype.scan = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
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
                        //console.log('bodyinfo', value);
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
//export { mainInternal, EventHandler, Ngin};
//exports.mainInternal = mainInternal;
//exports.EventHandler = EventHandler;
//exports.Ngin = Ngin;
//exports.__esModule = true;
//exports.Ngin = exports.EventHandler = exports.mainInternal = void 0;
module.exports = { mainInternal: mainInternal, EventHandler: EventHandler, Ngin: Ngin };
//exports.mainInternal = mainInternal;
//exports.EventHandler = EventHandler;
//exports.Ngin = Ngin;
//# sourceMappingURL=ngin.js.map