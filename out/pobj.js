"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = exports.Stage = exports.JoystickDirectionals = exports.ActionEvent = exports.Pbody = exports.TilesInfo = exports.BodyShape = exports.BodyType = exports.Size = exports.Pos = void 0;
var Pos = /** @class */ (function () {
    function Pos(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    return Pos;
}());
exports.Pos = Pos;
var Size = /** @class */ (function () {
    function Size(w, h) {
        this.w = 1;
        this.h = 1;
        this.w = w;
        this.h = h;
    }
    return Size;
}());
exports.Size = Size;
var BodyType;
(function (BodyType) {
    BodyType[BodyType["static"] = 0] = "static";
    BodyType[BodyType["kinematic"] = 1] = "kinematic";
    BodyType[BodyType["dynamic"] = 2] = "dynamic";
})(BodyType = exports.BodyType || (exports.BodyType = {}));
var BodyShape;
(function (BodyShape) {
    BodyShape[BodyShape["rectangle"] = 0] = "rectangle";
    BodyShape[BodyShape["actor"] = 1] = "actor";
    BodyShape[BodyShape["circle"] = 2] = "circle";
    BodyShape[BodyShape["triangle"] = 3] = "triangle";
    BodyShape[BodyShape["edge"] = 4] = "edge";
    BodyShape[BodyShape["polygon"] = 5] = "polygon";
})(BodyShape = exports.BodyShape || (exports.BodyShape = {}));
var TilesInfo = /** @class */ (function () {
    function TilesInfo(path, size, col, data) {
        this.path = path;
        this.size = size;
        this.col = col;
        this.data = data;
    }
    TilesInfo.prototype.build = function () {
        return {
            path: this.path,
            tileSizeX: this.size.w,
            tileSizeY: this.size.h,
            tileColumns: this.col,
            data: this.data
        };
    };
    return TilesInfo;
}());
exports.TilesInfo = TilesInfo;
var Pbody = /** @class */ (function () {
    function Pbody(name, pos, size, id) {
        if (id === void 0) { id = 0; }
        this.angle = 0;
        this.contactReport = true;
        this.type = BodyType.static;
        this.shape = BodyShape.rectangle;
        this.isSensor = false;
        this.id = id;
        this.name = name;
        this.pos = pos;
        this.size = size;
        this.skin = name;
    }
    Pbody.prototype.buildType = function (type) {
        switch (type) {
            case BodyType.static: return "staticBody";
            case BodyType.kinematic: return "kinematicBody";
            case BodyType.dynamic: return "dynamicBody";
        }
    };
    Pbody.prototype.buildShape = function (shape) {
        switch (shape) {
            case BodyShape.rectangle: return "rectangle";
            case BodyShape.actor: return "actor";
            case BodyShape.circle: return "circle";
            case BodyShape.triangle: return "triangle";
            case BodyShape.edge: return "edge";
            case BodyShape.polygon: return "polygon";
        }
    };
    Pbody.prototype.build = function () {
        return {
            bid: this.id,
            name: this.name,
            skin: this.skin,
            shape: this.buildShape(this.shape),
            x: this.pos.x,
            y: this.pos.y,
            width: this.size.w,
            height: this.size.h,
            angle: this.angle,
            contactReport: this.contactReport,
            isSensor: this.isSensor,
            type: this.buildType(this.type),
            tilesInfo: (this.tilesInfo == null) ? null : this.tilesInfo.build(),
        };
    };
    return Pbody;
}());
exports.Pbody = Pbody;
var ActionEvent;
(function (ActionEvent) {
    ActionEvent[ActionEvent["DOWN"] = 0] = "DOWN";
    ActionEvent[ActionEvent["UP"] = 1] = "UP";
    ActionEvent[ActionEvent["MOVE"] = 2] = "MOVE";
    ActionEvent[ActionEvent["NONE"] = 3] = "NONE";
    ActionEvent[ActionEvent["UP_DOWN"] = 4] = "UP_DOWN";
    ActionEvent[ActionEvent["DOWN_MOVE"] = 5] = "DOWN_MOVE";
    ActionEvent[ActionEvent["ALL"] = 6] = "ALL";
    ActionEvent[ActionEvent["UP_MOVE"] = 7] = "UP_MOVE";
})(ActionEvent = exports.ActionEvent || (exports.ActionEvent = {}));
var JoystickDirectionals;
(function (JoystickDirectionals) {
    JoystickDirectionals[JoystickDirectionals["none"] = 0] = "none";
    JoystickDirectionals[JoystickDirectionals["all"] = 1] = "all";
    JoystickDirectionals[JoystickDirectionals["horizontal"] = 2] = "horizontal";
    JoystickDirectionals[JoystickDirectionals["vertical"] = 3] = "vertical";
})(JoystickDirectionals = exports.JoystickDirectionals || (exports.JoystickDirectionals = {}));
var Stage = /** @class */ (function () {
    function Stage(size) {
        this.gravity = new Pos(0, 0);
        this.pos = new Pos(0, 0);
        this.debug = false;
        this.joystickDirectionals = JoystickDirectionals.none;
        this.joystickPrecision = 3;
        this.button1 = ActionEvent.DOWN;
        this.button2 = ActionEvent.DOWN;
        this.size = size;
    }
    Stage.prototype.buildJoystickDirectionals = function (directions) {
        switch (directions) {
            case JoystickDirectionals.none: return "none";
            case JoystickDirectionals.all: return "all";
            case JoystickDirectionals.horizontal: return "horizontal";
            case JoystickDirectionals.vertical: return "vertical";
        }
    };
    Stage.prototype.buildActionEvent = function (event) {
        switch (event) {
            case ActionEvent.DOWN: return "DOWN";
            case ActionEvent.UP: return "UP";
            case ActionEvent.MOVE: return "MOVE";
            case ActionEvent.NONE: return "NONE";
            case ActionEvent.UP_DOWN: return "UP_DOWN";
            case ActionEvent.DOWN_MOVE: return "DOWN_MOVE";
            case ActionEvent.ALL: return "ALL";
            case ActionEvent.UP_MOVE: return "UP_MOVE";
        }
    };
    Stage.prototype.build = function () {
        return {
            background: this.background,
            gravityX: this.gravity.x,
            gravityY: this.gravity.y,
            x: this.pos.x,
            y: this.pos.y,
            width: this.size.w,
            height: this.size.h,
            debug: this.debug,
            joystickDirectionals: this.buildJoystickDirectionals(this.joystickDirectionals),
            joystickPrecision: this.joystickPrecision,
            button1: this.buildActionEvent(this.button1),
            button2: this.buildActionEvent(this.button2),
        };
    };
    return Stage;
}());
exports.Stage = Stage;
var Image = /** @class */ (function () {
    function Image(info, pos, size, id) {
        if (size === void 0) { size = new Size(1, 1); }
        if (id === void 0) { id = 0; }
        this.tilesInfo = info;
        this.pos = pos;
        this.size = size;
        this.id = id;
    }
    Image.prototype.build = function () {
        return {
            strings: ['image', this.tilesInfo.path],
            ints: [this.id, this.tilesInfo.size.w, this.tilesInfo.size.h, this.tilesInfo.col, this.tilesInfo.data[0]],
            floats: [this.pos.x, this.pos.y, this.size.w, this.size.h],
        };
    };
    return Image;
}());
exports.Image = Image;
//# sourceMappingURL=pobj.js.map