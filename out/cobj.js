"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stage = exports.CTileObject = exports.CObject = exports.CPhysical = exports.CVisible = exports.CAnimation = exports.CAction = exports.JoystickDirectionals = exports.ActionEvent = exports.BodyShape = exports.BodyType = exports.Size = exports.Pos = void 0;
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
var CAction;
(function (CAction) {
    CAction[CAction["idle"] = 0] = "idle";
    CAction[CAction["run"] = 1] = "run";
    CAction[CAction["jump"] = 2] = "jump";
    CAction[CAction["hit"] = 3] = "hit";
    CAction[CAction["fall"] = 4] = "fall";
    CAction[CAction["wallJump"] = 5] = "wallJump";
    CAction[CAction["doubleJump"] = 6] = "doubleJump";
    CAction[CAction["hitSide"] = 7] = "hitSide";
    CAction[CAction["hitTop"] = 8] = "hitTop";
    CAction[CAction["off"] = 9] = "off";
    CAction[CAction["on"] = 10] = "on";
    CAction[CAction["blink"] = 11] = "blink";
    CAction[CAction["hitLeft"] = 12] = "hitLeft";
    CAction[CAction["hitRight"] = 13] = "hitRight";
    CAction[CAction["hitBottom"] = 14] = "hitBottom";
    CAction[CAction["noChange"] = 15] = "noChange";
    CAction[CAction["tiles"] = 16] = "tiles";
})(CAction = exports.CAction || (exports.CAction = {}));
function buildCAction(action) {
    switch (action) {
        case CAction.idle: return "idle";
        case CAction.run: return "run";
        case CAction.jump: return "jump";
        case CAction.hit: return "hit";
        case CAction.fall: return "fall";
        case CAction.wallJump: return "wallJump";
        case CAction.doubleJump: return "doubleJump";
        case CAction.hitSide: return "hitSide";
        case CAction.hitTop: return "hitTop";
        case CAction.off: return "off";
        case CAction.on: return "on";
        case CAction.blink: return "blink";
        case CAction.hitLeft: return "hitLeft";
        case CAction.hitRight: return "hitRight";
        case CAction.hitBottom: return "hitBottom";
        case CAction.noChange: return "noChange";
        case CAction.tiles: return "tiles";
    }
}
function buildType(type) {
    switch (type) {
        case BodyType.static: return "staticBody";
        case BodyType.kinematic: return "kinematicBody";
        case BodyType.dynamic: return "dynamicBody";
    }
}
function buildShape(shape) {
    switch (shape) {
        case BodyShape.rectangle: return "rectangle";
        case BodyShape.actor: return "actor";
        case BodyShape.circle: return "circle";
        case BodyShape.triangle: return "triangle";
        case BodyShape.edge: return "edge";
        case BodyShape.polygon: return "polygon";
    }
}
var CAnimation = /** @class */ (function () {
    function CAnimation(path, tileSize, indices, action) {
        this.stepTime = 0.2;
        this.repeat = true;
        this.path = path;
        this.tileSize = tileSize;
        this.indices = indices;
        this.action = action;
    }
    CAnimation.prototype.build = function () {
        return {
            path: this.path,
            tileSizeX: this.tileSize.w,
            tileSizeY: this.tileSize.h,
            indices: this.indices,
            stepTime: this.stepTime,
            action: buildCAction(this.action),
            repeat: this.repeat,
        };
    };
    return CAnimation;
}());
exports.CAnimation = CAnimation;
var CVisible = /** @class */ (function () {
    function CVisible(animations) {
        this.current = CAction.idle;
        this.priority = 0;
        this.pos = new Pos(0, 0);
        this.size = new Size(1, 1);
        this.scale = new Pos(1, 1);
        this.anchor = new Pos(0.5, 0.5);
        this.tid = 0;
        this.animations = animations;
    }
    CVisible.prototype.build = function () {
        var animations = [];
        for (var i = 0; i < this.animations.length; i++) {
            animations.push(this.animations[i].build());
        }
        return {
            current: buildCAction(this.current),
            priority: this.priority,
            x: this.pos.x,
            y: this.pos.y,
            width: this.size.w,
            height: this.size.h,
            scaleX: this.scale.x,
            scaleY: this.scale.y,
            anchorX: this.anchor.x,
            anchorY: this.anchor.y,
            animations: animations,
            tid: this.tid,
        };
    };
    return CVisible;
}());
exports.CVisible = CVisible;
var CPhysical = /** @class */ (function () {
    function CPhysical(shape, pos, type) {
        this.size = new Size(1, 1);
        this.restitution = 0;
        this.friction = 0;
        this.density = 0;
        this.angle = 0;
        this.isSensor = false;
        this.categoryBits = 0x0001;
        this.maskBits = 0xFFFF;
        this.fixedRotation = true;
        this.type = BodyType.dynamic;
        this.trackable = true;
        this.contactReport = true;
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
    obj.visible = new CVisible([new CAnimation(path, tileSize, data, CAction.tiles)]);
    obj.visible.current = CAction.tiles;
    obj.visible.pos = pos;
    obj.visible.anchor = new Pos(0, 0);
    obj.visible.size = size;
    return obj;
}
exports.CTileObject = CTileObject;
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
//# sourceMappingURL=cobj.js.map