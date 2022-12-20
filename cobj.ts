export class CVec2 {
    constructor(x:number = 0, y:number = 0) {
      this.x = x;
      this.y = y;
    }
  
    x: number = 0;
    y: number = 0;
}
  
export class CSize {
    constructor(w:number, h:number) {
      this.w = w;
      this.h = h;
    }
    
    w: number = 1;
    h: number = 1;
}
  
export enum CBodyType {
    static,
    kinematic,  
    dynamic,
}
  
export enum CBodyShape {
    rectangle, 
    actor,
    circle,
    triangle,
    edge,
    polygon,
}
  
export enum CActionEvent { 
    DOWN,
    UP,
    MOVE,
    NONE,
    UP_DOWN,
    DOWN_MOVE,
    ALL,
    UP_MOVE, 
}
  
export enum CJoystickDirectionals {
    none,
    all,
    horizontal,
    vertical
}

export enum CActionType { 
    idle,
    run,
    jump,
    hit,
    fall,
    wallJump,
    doubleJump,
    hitSide,
    hitTop,
    off,
    on,
    blink,
    hitLeft,
    hitRight,
    hitBottom,
    noChange,
    tiles,
    svg,
}

export interface CBuildable {
    build();
}

export function buildCActionType(type:CActionType) {
    switch(type) {
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

function buildType(type:CBodyType) {
    switch(type) {
        case CBodyType.static: return "static";
        case CBodyType.kinematic: return "kinematic";
        case CBodyType.dynamic: return "dynamic";
    }
}


function buildShape(shape:CBodyShape) {
    switch(shape) {
        case CBodyShape.rectangle: return "rectangle";
        case CBodyShape.actor: return "actor";
        case CBodyShape.circle: return "circle";
        case CBodyShape.triangle: return "triangle";
        case CBodyShape.edge: return "edge";
        case CBodyShape.polygon: return "polygon";
    }
}

export class CAction implements CBuildable {
    path: string;
    tileSize: CSize;
    indices: number[];
    stepTime: number = 0.2;
    type: CActionType;
    repeat: boolean;
    constructor(path:string, tileSize:CSize, indices:number[], type:CActionType, repeat:boolean = true) {
        this.path = path;
        this.tileSize = tileSize;
        this.indices = indices;
        this.type = type;
        this.repeat = repeat;
    }
    build() {
        return {
            path:this.path,
            tileSizeX:this.tileSize.w,
            tileSizeY:this.tileSize.h,
            indices:this.indices,
            stepTime:this.stepTime,
            type: buildCActionType(this.type),
            repeat:this.repeat,
        };
    }
}

export class CVisible implements CBuildable {
    current: CActionType = CActionType.idle;
    priority: number = 0;
    pos: CVec2 = new CVec2(0,0);
    size: CSize = new CSize(1,1);
    scale: CVec2 = new CVec2(1,1);
    anchor: CVec2 = new CVec2(0.5,0.5);
    actions: CAction[];
    tid: number = 0;
    constructor(actions: CAction[]) {
        this.actions = actions;
    }
    build() {
        var actions = [];

        for (var i = 0; i<this.actions.length; i++) {
            actions.push(this.actions[i].build());
        }

        return {
            current:buildCActionType(this.current),
            priority:this.priority,
            x:this.pos.x,
            y:this.pos.y,
            width:this.size.w,
            height:this.size.h,
            scaleX:this.scale.x,
            scaleY:this.scale.y,  
            anchorX:this.anchor.x,
            anchorY:this.anchor.y,
            actions:actions,
            tid:this.tid,
        };
    }
}

export class CPhysical implements CBuildable {
    shape: CBodyShape;
    pos: CVec2;
    size: CSize = new CSize(1,1);
    restitution: number = 0;
    friction: number = 0;
    density: number = 0;
    angle: number = 0;
    isSensor: boolean = false;
    categoryBits: number = 0x0001;
    maskBits: number = 0xFFFF;
    fixedRotation: boolean= true;
    type: CBodyType = CBodyType.dynamic;
    trackable: boolean = true;
    contactReport: boolean = true;
    floats: number[];
    passableBottom: boolean = false;
    constructor(shape:CBodyShape, pos:CVec2, type:CBodyType) {
        this.shape = shape;
        this.pos = pos;
        this.type = type;
    }
    build() {
        return {
            shape:buildShape(this.shape),
            x:this.pos.x,
            y:this.pos.y,
            width:this.size.w,
            height:this.size.h,
            restitution:this.restitution,
            friction:this.friction,
            density:this.density,
            angle:this.angle,
            isSensor:this.isSensor,
            categoryBits:this.categoryBits,
            maskBits:this.maskBits,
            fixedRotation:this.fixedRotation,
            type:buildType(this.type),
            trackable:this.trackable,
            contactReport:this.contactReport,
            floats:this.floats,
            passableBottom:this.passableBottom,
        };
    }
}



export class CObject implements CBuildable {
    constructor(id:number) {
      this.id = id;
    }
    id: number;
    physical: CPhysical;
    visible: CVisible;
    tid: number = 0;
    info: string = "NA";

    build() {
        if (this.physical == undefined) {
            return {
                id:this.id, 
                visible:this.visible.build(),
                tid:this.tid,
                info:this.info,
            };
        } else {
            if (this.visible == undefined) {
                return {
                    id:this.id, 
                    physical:this.physical.build(),
                    tid:this.tid,
                    info:this.info,                    
                }
            } else {
                return {
                    id:this.id, 
                    physical:this.physical.build(), 
                    visible:this.visible.build(),
                    tid:this.tid,
                    info:this.info,                    
                }
            }
        }
    }
}

export function CTileObject(path:string, tileSize:CSize, data:number[], pos:CVec2, size:CSize) {
    var obj = new CObject(0);
    obj.visible = new CVisible([ new CAction(path, tileSize, data, CActionType.tiles)]);
    obj.visible.current = CActionType.tiles;
    obj.visible.pos = pos;
    obj.visible.anchor = new CVec2(0,0);
    obj.visible.size = size;
    return obj;
}

export class CStage implements CBuildable {
    constructor(size:CSize) {
      this.size = size;
    }
    background: string;
    gravity: CVec2 = new CVec2(0, 0);
    size: CSize;
    debug: boolean = false;
    joystickDirectionals:CJoystickDirectionals = CJoystickDirectionals.none;
    joystickPrecision: number = 3;
    button1:CActionEvent = CActionEvent.DOWN;
    button2:CActionEvent = CActionEvent.DOWN; 
  
    buildJoystickDirectionals(directions:CJoystickDirectionals) {
      switch(directions) {
        case CJoystickDirectionals.none: return "none";
        case CJoystickDirectionals.all: return "all";
        case CJoystickDirectionals.horizontal: return "horizontal";
        case CJoystickDirectionals.vertical: return "vertical";
      }
    }
  
    buildCActionEvent(event:CActionEvent) {
      switch(event) {
        case CActionEvent.DOWN: return "DOWN";
        case CActionEvent.UP: return "UP";
        case CActionEvent.MOVE: return "MOVE";
        case CActionEvent.NONE: return "NONE";
        case CActionEvent.UP_DOWN: return "UP_DOWN";
        case CActionEvent.DOWN_MOVE: return "DOWN_MOVE";
        case CActionEvent.ALL: return "ALL";
        case CActionEvent.UP_MOVE: return "UP_MOVE";      
      }
    }  
  
    build() {
      return {
        background: this.background,
        gravityX: this.gravity.x,
        gravityY: this.gravity.y,
        width: this.size.w,
        height: this.size.h,
        debug: this.debug,
        joystickDirectionals: this.buildJoystickDirectionals(this.joystickDirectionals),
        joystickPrecision: this.joystickPrecision,
        button1: this.buildCActionEvent(this.button1),
        button2: this.buildCActionEvent(this.button2),
      };
    }
}


export class CObjectInfo{
    constructor(info:number[]) {
        this.pos = new CVec2(info[0], info[1]);
        this.size = new CSize(info[2], info[3]);
        this.angle = info[4];
        this.linear = new CVec2(info[5], info[6]);
        this.angular = info[7];
    }
    pos:CVec2;
    size:CSize;
    angle:number;
    linear:CVec2;
    angular:number;
}