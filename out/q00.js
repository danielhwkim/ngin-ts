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
var testutil_js_1 = require("./testutil.js");
var test01_js_1 = require("./test01.js");
var cobj_1 = require("./cobj");
var hint = "\
### Python\n\
\n\
```python\n\
run((cmd) =>  {\n\
    for (let i=0; i<12; i++) {\n\
        for (let j=0; j<12; j++) {\n\
            if (😄) {\n\
                cmd.add(i, j);\n\
            }\n\
        }\n\
    }\n\
    cmd.submit();\n\
});\n\
```\n\
\n\
### Comparison Operators\n\
\n\
| Operator | Meaning                  |\n\
| -------- | ------------------------ |\n\
| `==`     | Equal to                 |\n\
| `!=`     | Not equal to             |\n\
| `<`      | Less than                |\n\
| `>`      | Greater Than             |\n\
| `<=`     | Less than or Equal to    |\n\
| `>=`     | Greater than or Equal to |\n\
\n\
### Math Operators\n\
\n\
From **Highest** to **Lowest** precedence:\n\
\n\
| Operators | Operation        | Example         |\n\
| --------- | ---------------- | --------------- |\n\
| **        | Exponent         | `2 ** 3 = 8`    |\n\
| %         | Modulus/Remainder | `22 % 8 = 6`    |\n\
| //        | Integer division | `22 // 8 = 2`   |\n\
| /         | Division         | `22 / 8 = 2.75` |\n\
| *         | Multiplication   | `3 * 3 = 9`     |\n\
| -         | Subtraction      | `5 - 2 = 3`     |\n\
| +         | Addition         | `2 + 2 = 4`     |\n\
\n\
";
(0, testutil_js_1.runq)(function (nx) { return __awaiter(void 0, void 0, void 0, function () {
    var width, height, margin, gid, size, stage, funcsAll, stopwatch, c, func, funcs, v, r, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                width = 12;
                height = 12;
                margin = 3;
                gid = 100;
                size = new cobj_1.Size(width + margin, height);
                stage = new cobj_1.Stage(size);
                stage.background = 'Blue';
                //stage.debug = true;
                stage.joystickDirectionals = cobj_1.JoystickDirectionals.horizontal;
                return [4 /*yield*/, nx.sendObjWait(stage)];
            case 1:
                _a.sent();
                return [4 /*yield*/, nx.command({
                        strings: ['hint', hint],
                        ints: [0],
                    })];
            case 2:
                _a.sent();
                funcsAll = [[function (i, j) { return i < j; }, function (i, j) { return i <= j; }, function (i, j) { return i > j; }, function (i, j) { return i >= j; }],
                    [function (i, j) { return i == j; }, function (i, j) { return i != j; }, function (i, j) { return i == j + 2; }, function (i, j) { return i != j - 2; }],
                    [function (i, j) { return i < j * 2; }, function (i, j) { return i > j * 2; }, function (i, j) { return i <= j / 2; }, function (i, j) { return i >= j / 2; }, function (i, j) { return i + j < 15; }, function (i, j) { return i * j < 50; }],
                    [function (i, j) { return j % 2; }, function (i, j) { return i % 2; }, function (i, j) { return j <= 6; }, function (i, j) { return i <= 6; }, function (i, j) { return i > 6; }, function (i, j) { return j > 6; }],
                    [function (i, j) { return j % 2 != i % 2; }, function (i, j) { return j % 2 == i % 2; }, function (i, j) { return j % 3 == i % 3; }, function (i, j) { return j % 3 != i % 3; }]];
                console.log(Math.floor(Math.random() * 10));
                console.log(Math.floor(Math.random() * 10));
                console.log(Math.floor(Math.random() * 10));
                console.log(Math.floor(Math.random() * 10));
                console.log(Math.floor(Math.random() * 10));
                nx.eventHandler.ready = true;
                stopwatch = new testutil_js_1.Stopwatch(nx, 200, [12, 0, 2, 1]);
                c = 0;
                func = undefined;
                _a.label = 3;
            case 3:
                if (!(c < funcsAll.length)) return [3 /*break*/, 5];
                if (func == undefined) {
                    funcs = funcsAll[c];
                    v = Math.random() * funcs.length;
                    r = Math.floor(v);
                    console.log(c, funcs.length, v, r);
                    func = funcs[r];
                }
                return [4 /*yield*/, (0, test01_js_1.test01)(nx, width, height, margin, func, stopwatch)];
            case 4:
                result = _a.sent();
                console.log(result);
                if (result[0]) {
                    c += 1;
                    func = undefined;
                }
                else {
                    stopwatch.num += 10;
                }
                return [3 /*break*/, 3];
            case 5: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=q00.js.map