"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CObjectInfo = exports.CStage = exports.CTileObject = exports.CObject = exports.CPhysical = exports.CVisible = exports.CAction = exports.buildCActionType = exports.CActionType = exports.CJoystickDirectionals = exports.CActionEvent = exports.CBodyShape = exports.CBodyType = exports.CSize = exports.CVector2 = void 0;
var CVector2 = /** @class */ (function () {
    function CVector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    return CVector2;
}());
exports.CVector2 = CVector2;
var CSize = /** @class */ (function () {
    function CSize(w, h) {
        this.w = 1;
        this.h = 1;
        this.w = w;
        this.h = h;
    }
    return CSize;
}());
exports.CSize = CSize;
var CBodyType;
(function (CBodyType) {
    CBodyType[CBodyType["static"] = 0] = "static";
    CBodyType[CBodyType["kinematic"] = 1] = "kinematic";
    CBodyType[CBodyType["dynamic"] = 2] = "dynamic";
})(CBodyType = exports.CBodyType || (exports.CBodyType = {}));
var CBodyShape;
(function (CBodyShape) {
    CBodyShape[CBodyShape["rectangle"] = 0] = "rectangle";
    CBodyShape[CBodyShape["actor"] = 1] = "actor";
    CBodyShape[CBodyShape["circle"] = 2] = "circle";
    CBodyShape[CBodyShape["triangle"] = 3] = "triangle";
    CBodyShape[CBodyShape["edge"] = 4] = "edge";
    CBodyShape[CBodyShape["polygon"] = 5] = "polygon";
})(CBodyShape = exports.CBodyShape || (exports.CBodyShape = {}));
var CActionEvent;
(function (CActionEvent) {
    CActionEvent[CActionEvent["DOWN"] = 0] = "DOWN";
    CActionEvent[CActionEvent["UP"] = 1] = "UP";
    CActionEvent[CActionEvent["MOVE"] = 2] = "MOVE";
    CActionEvent[CActionEvent["NONE"] = 3] = "NONE";
    CActionEvent[CActionEvent["UP_DOWN"] = 4] = "UP_DOWN";
    CActionEvent[CActionEvent["DOWN_MOVE"] = 5] = "DOWN_MOVE";
    CActionEvent[CActionEvent["ALL"] = 6] = "ALL";
    CActionEvent[CActionEvent["UP_MOVE"] = 7] = "UP_MOVE";
})(CActionEvent = exports.CActionEvent || (exports.CActionEvent = {}));
var CJoystickDirectionals;
(function (CJoystickDirectionals) {
    CJoystickDirectionals[CJoystickDirectionals["none"] = 0] = "none";
    CJoystickDirectionals[CJoystickDirectionals["all"] = 1] = "all";
    CJoystickDirectionals[CJoystickDirectionals["horizontal"] = 2] = "horizontal";
    CJoystickDirectionals[CJoystickDirectionals["vertical"] = 3] = "vertical";
})(CJoystickDirectionals = exports.CJoystickDirectionals || (exports.CJoystickDirectionals = {}));
var CActionType;
(function (CActionType) {
    CActionType[CActionType["idle"] = 0] = "idle";
    CActionType[CActionType["run"] = 1] = "run";
    CActionType[CActionType["jump"] = 2] = "jump";
    CActionType[CActionType["hit"] = 3] = "hit";
    CActionType[CActionType["fall"] = 4] = "fall";
    CActionType[CActionType["wallJump"] = 5] = "wallJump";
    CActionType[CActionType["doubleJump"] = 6] = "doubleJump";
    CActionType[CActionType["hitSide"] = 7] = "hitSide";
    CActionType[CActionType["hitTop"] = 8] = "hitTop";
    CActionType[CActionType["off"] = 9] = "off";
    CActionType[CActionType["on"] = 10] = "on";
    CActionType[CActionType["blink"] = 11] = "blink";
    CActionType[CActionType["hitLeft"] = 12] = "hitLeft";
    CActionType[CActionType["hitRight"] = 13] = "hitRight";
    CActionType[CActionType["hitBottom"] = 14] = "hitBottom";
    CActionType[CActionType["noChange"] = 15] = "noChange";
    CActionType[CActionType["tiles"] = 16] = "tiles";
    CActionType[CActionType["svg"] = 17] = "svg";
})(CActionType = exports.CActionType || (exports.CActionType = {}));
function buildCActionType(type) {
    switch (type) {
        case CActionType.idle: return "idle";
        case CActionType.run: return "run";
        case CActionType.jump: return "jump";
        case CActionType.hit: return "hit";
        case CActionType.fall: return "fall";
        case CActionType.wallJump: return "wallJump";
        case CActionType.doubleJump: return "doubleJump";
        case CActionType.hitSide: return "hitSide";
        case CActionType.hitTop: return "hitTop";
        case CActionType.off: return "off";
        case CActionType.on: return "on";
        case CActionType.blink: return "blink";
        case CActionType.hitLeft: return "hitLeft";
        case CActionType.hitRight: return "hitRight";
        case CActionType.hitBottom: return "hitBottom";
        case CActionType.noChange: return "noChange";
        case CActionType.tiles: return "tiles";
        case CActionType.svg: return "svg";
    }
}
exports.buildCActionType = buildCActionType;
function buildType(type) {
    switch (type) {
        case CBodyType.static: return "static";
        case CBodyType.kinematic: return "kinematic";
        case CBodyType.dynamic: return "dynamic";
    }
}
function buildShape(shape) {
    switch (shape) {
        case CBodyShape.rectangle: return "rectangle";
        case CBodyShape.actor: return "actor";
        case CBodyShape.circle: return "circle";
        case CBodyShape.triangle: return "triangle";
        case CBodyShape.edge: return "edge";
        case CBodyShape.polygon: return "polygon";
    }
}
var CAction = /** @class */ (function () {
    function CAction(path, tileSize, indices, type, repeat) {
        if (repeat === void 0) { repeat = true; }
        this.stepTime = 0.2;
        this.path = path;
        this.tileSize = tileSize;
        this.indices = indices;
        this.type = type;
        this.repeat = repeat;
    }
    CAction.prototype.build = function () {
        return {
            path: this.path,
            tileSizeX: this.tileSize.w,
            tileSizeY: this.tileSize.h,
            indices: this.indices,
            stepTime: this.stepTime,
            type: buildCActionType(this.type),
            repeat: this.repeat,
        };
    };
    return CAction;
}());
exports.CAction = CAction;
var CVisible = /** @class */ (function () {
    function CVisible(actions) {
        this.current = CActionType.idle;
        this.priority = 0;
        this.pos = new CVector2(0, 0);
        this.size = new CSize(1, 1);
        this.scale = new CVector2(1, 1);
        this.anchor = new CVector2(0.5, 0.5);
        this.tid = 0;
        this.actions = actions;
    }
    CVisible.prototype.build = function () {
        var actions = [];
        for (var i = 0; i < this.actions.length; i++) {
            actions.push(this.actions[i].build());
        }
        return {
            current: buildCActionType(this.current),
            priority: this.priority,
            x: this.pos.x,
            y: this.pos.y,
            width: this.size.w,
            height: this.size.h,
            scaleX: this.scale.x,
            scaleY: this.scale.y,
            anchorX: this.anchor.x,
            anchorY: this.anchor.y,
            actions: actions,
            tid: this.tid,
        };
    };
    return CVisible;
}());
exports.CVisible = CVisible;
var CPhysical = /** @class */ (function () {
    function CPhysical(shape, pos, type) {
        this.size = new CSize(1, 1);
        this.restitution = 0;
        this.friction = 0;
        this.density = 0;
        this.angle = 0;
        this.isSensor = false;
        this.categoryBits = 0x0001;
        this.maskBits = 0xFFFF;
        this.fixedRotation = true;
        this.type = CBodyType.dynamic;
        this.trackable = true;
        this.contactReport = true;
        this.passableBottom = false;
        this.shape = shape;
        this.pos = pos;
        this.type = type;
    }
    CPhysical.prototype.build = function () {
        return {
            shape: buildShape(this.shape),
            x: this.pos.x,
            y: this.pos.y,
            width: this.size.w,
            height: this.size.h,
            restitution: this.restitution,
            friction: this.friction,
            density: this.density,
            angle: this.angle,
            isSensor: this.isSensor,
            categoryBits: this.categoryBits,
            maskBits: this.maskBits,
            fixedRotation: this.fixedRotation,
            type: buildType(this.type),
            trackable: this.trackable,
            contactReport: this.contactReport,
            floats: this.floats,
            passableBottom: this.passableBottom,
        };
    };
    return CPhysical;
}());
exports.CPhysical = CPhysical;
var CObject = /** @class */ (function () {
    function CObject(id) {
        this.tid = 0;
        this.info = "NA";
        this.id = id;
    }
    CObject.prototype.build = function () {
        if (this.physical == undefined) {
            return {
                id: this.id,
                visible: this.visible.build(),
                tid: this.tid,
                info: this.info,
            };
        }
        else {
            if (this.visible == undefined) {
                return {
                    id: this.id,
                    physical: this.physical.build(),
                    tid: this.tid,
                    info: this.info,
                };
            }
            else {
                return {
                    id: this.id,
                    physical: this.physical.build(),
                    visible: this.visible.build(),
                    tid: this.tid,
                    info: this.info,
                };
            }
        }
    };
    return CObject;
}());
exports.CObject = CObject;
function CTileObject(path, tileSize, data, pos, size) {
    var obj = new CObject(0);
    obj.visible = new CVisible([new CAction(path, tileSize, data, CActionType.tiles)]);
    obj.visible.current = CActionType.tiles;
    obj.visible.pos = pos;
    obj.visible.anchor = new CVector2(0, 0);
    obj.visible.size = size;
    return obj;
}
exports.CTileObject = CTileObject;
var CStage = /** @class */ (function () {
    function CStage(size) {
        this.gravity = new CVector2(0, 0);
        this.pos = new CVector2(0, 0);
        this.debug = false;
        this.joystickDirectionals = CJoystickDirectionals.none;
        this.joystickPrecision = 3;
        this.button1 = CActionEvent.DOWN;
        this.button2 = CActionEvent.DOWN;
        this.size = size;
    }
    CStage.prototype.buildJoystickDirectionals = function (directions) {
        switch (directions) {
            case CJoystickDirectionals.none: return "none";
            case CJoystickDirectionals.all: return "all";
            case CJoystickDirectionals.horizontal: return "horizontal";
            case CJoystickDirectionals.vertical: return "vertical";
        }
    };
    CStage.prototype.buildCActionEvent = function (event) {
        switch (event) {
            case CActionEvent.DOWN: return "DOWN";
            case CActionEvent.UP: return "UP";
            case CActionEvent.MOVE: return "MOVE";
            case CActionEvent.NONE: return "NONE";
            case CActionEvent.UP_DOWN: return "UP_DOWN";
            case CActionEvent.DOWN_MOVE: return "DOWN_MOVE";
            case CActionEvent.ALL: return "ALL";
            case CActionEvent.UP_MOVE: return "UP_MOVE";
        }
    };
    CStage.prototype.build = function () {
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
            button1: this.buildCActionEvent(this.button1),
            button2: this.buildCActionEvent(this.button2),
        };
    };
    return CStage;
}());
exports.CStage = CStage;
var CObjectInfo = /** @class */ (function () {
    function CObjectInfo(info) {
        this.pos = new CVector2(info[0], info[1]);
        this.size = new CSize(info[2], info[3]);
        this.angle = info[4];
        this.linear = new CVector2(info[5], info[6]);
        this.angular = info[7];
    }
    return CObjectInfo;
}());
exports.CObjectInfo = CObjectInfo;
//# sourceMappingURL=cobj.js.map