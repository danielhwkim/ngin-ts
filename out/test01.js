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
var _a = require("./testutil.js"), run = _a.run, Util = _a.Util, Stopwatch = _a.Stopwatch;
function test01(ngin, width, height, margin, func, stopwatch) {
    return __awaiter(this, void 0, void 0, function () {
        var util, set, nothing_to_delete, i, j, value, message, size, fill, fillopacity, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    util = new Util(ngin);
                    set = new Set();
                    nothing_to_delete = 0;
                    for (i = 0; i < width; i++) {
                        for (j = 0; j < height; j++) {
                            if (func(i, j)) {
                                set.add(i * 100 + j);
                            }
                        }
                    }
                    ngin.eventHandler.handleEvent = function (event) {
                        console.log(event);
                        var x = event.x;
                        var y = event.y;
                        if (set.has(x * 100 + y)) {
                            set.delete(x * 100 + y);
                        }
                        else {
                            nothing_to_delete++;
                            console.log('wrong:', x, y);
                        }
                    };
                    return [4 /*yield*/, ngin.command({ strings: ['enable'], ints: [4041, 0] })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, ngin.command({
                            strings: ['svg', util.drawSvgGrid(width, height, func)],
                            ints: [100, 100],
                            floats: [0, 0, width, height],
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, util.countDown(width, height, 3, 1)];
                case 3:
                    _a.sent();
                    //await ngin.addCoin(1000, 3, 4);
                    //let stopwatch = new Stopwatch(ngin, 200, [12,0,2,1]);
                    stopwatch.run();
                    return [4 /*yield*/, ngin.command({ strings: ['enable'], ints: [4041, 1] })];
                case 4:
                    _a.sent();
                    ngin.prepareAck();
                    return [4 /*yield*/, ngin.command({ strings: ['wait'], ints: [4040] })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, ngin.waitAckValue(4040)];
                case 6:
                    value = _a.sent();
                    console.log('ack:', value);
                    result = true;
                    if (set.size == 0 && nothing_to_delete == 0) {
                        //console.log("SUCCESS!");
                        message = "SUCCESS!";
                        size = 2;
                        fill = "blue";
                        fillopacity = 1;
                    }
                    else {
                        //console.log("FAILURE!");
                        message = "FAILURE!";
                        size = 2;
                        fill = "red";
                        fillopacity = 1;
                        result = false;
                    }
                    return [4 /*yield*/, ngin.command({
                            strings: ['svg', util.drawSvgTextFullScreen(width + margin, height, message, size, fill, fillopacity)],
                            ints: [10000],
                            floats: [0, 0, width + margin, height],
                        })];
                case 7:
                    _a.sent();
                    stopwatch.stop();
                    return [4 /*yield*/, util.countDown(width, height, 3, 1)];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, ngin.command({ strings: ['removeAll'] })];
                case 9:
                    _a.sent();
                    return [2 /*return*/, [result, set.size + nothing_to_delete]];
            }
        });
    });
}
module.exports = { test01: test01 };
//# sourceMappingURL=test01.js.map