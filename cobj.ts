export class Pos {
    constructor(x:number = 0, y:number = 0) {
      this.x = x;
      this.y = y;
    }
  
    x: number = 0;
    y: number = 0;
}
  
export class Size {
    constructor(w:number, h:number) {
      this.w = w;
      this.h = h;
    }
    
    w: number = 1;
    h: number = 1;
}
  
export enum BodyType {
    static,
    kinematic,  
    dynamic,
}
  
export enum BodyShape {
    rectangle, 
    actor,
    circle,
    triangle,
    edge,
    polygon,
}
  
export enum ActionEvent { 
    DOWN,
    UP,
    MOVE,
    NONE,
    UP_DOWN,
    DOWN_MOVE,
    ALL,
    UP_MOVE, 
}
  
export enum JoystickDirectionals {
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

export interface Buildable {
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

function buildType(type:BodyType) {
    switch(type) {
        case BodyType.static: return "static";
        case BodyType.kinematic: return "kinematic";
        case BodyType.dynamic: return "dynamic";
    }
}


function buildShape(shape:BodyShape) {
    switch(shape) {
        case BodyShape.rectangle: return "rectangle";
        case BodyShape.actor: return "actor";
        case BodyShape.circle: return "circle";
        case BodyShape.triangle: return "triangle";
        case BodyShape.edge: return "edge";
        case BodyShape.polygon: return "polygon";
    }
}

export class CAction implements Buildable {
    path: string;
    tileSize: Size;
    indices: number[];
    stepTime: number = 0.2;
    type: CActionType;
    repeat: boolean = true;
    constructor(path:string, tileSize:Size, indices:number[], type:CActionType) {
        this.path = path;
        this.tileSize = tileSize;
        this.indices = indices;
        this.type = type;
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

export class CVisible implements Buildable {
    current: CActionType = CActionType.idle;
    priority: number = 0;
    pos: Pos = new Pos(0,0);
    size: Size = new Size(1,1);
    scale: Pos = new Pos(1,1);
    anchor: Pos = new Pos(0.5,0.5);
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

export class CPhysical implements Buildable {
    shape: BodyShape;
    pos: Pos;
    size: Size = new Size(1,1);
    restitution: number = 0;
    friction: number = 0;
    density: number = 0;
    angle: number = 0;
    isSensor: boolean = false;
    categoryBits: number = 0x0001;
    maskBits: number = 0xFFFF;
    fixedRotation: boolean= true;
    type: BodyType = BodyType.dynamic;
    trackable: boolean = true;
    contactReport: boolean = true;
    floats: number[];
    constructor(shape:BodyShape, pos:Pos, type:BodyType) {
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
        };
    }
}



export class CObject implements Buildable {
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

export function CTileObject(path:string, tileSize:Size, data:number[], pos:Pos, size:Size) {
    var obj = new CObject(0);
    obj.visible = new CVisible([ new CAction(path, tileSize, data, CActionType.tiles)]);
    obj.visible.current = CActionType.tiles;
    obj.visible.pos = pos;
    obj.visible.anchor = new Pos(0,0);
    obj.visible.size = size;
    return obj;
}

export class Stage implements Buildable {
    constructor(size:Size) {
      this.size = size;
    }
    background: string;
    gravity: Pos = new Pos(0, 0);
    size: Size;
    pos: Pos = new Pos(0, 0);
    debug: boolean = false;
    joystickDirectionals:JoystickDirectionals = JoystickDirectionals.none;
    joystickPrecision: number = 3;
    button1:ActionEvent = ActionEvent.DOWN;
    button2:ActionEvent = ActionEvent.DOWN; 
  
    buildJoystickDirectionals(directions:JoystickDirectionals) {
      switch(directions) {
        case JoystickDirectionals.none: return "none";
        case JoystickDirectionals.all: return "all";
        case JoystickDirectionals.horizontal: return "horizontal";
        case JoystickDirectionals.vertical: return "vertical";
      }
    }
  
    buildActionEvent(event:ActionEvent) {
      switch(event) {
        case ActionEvent.DOWN: return "DOWN";
        case ActionEvent.UP: return "UP";
        case ActionEvent.MOVE: return "MOVE";
        case ActionEvent.NONE: return "NONE";
        case ActionEvent.UP_DOWN: return "UP_DOWN";
        case ActionEvent.DOWN_MOVE: return "DOWN_MOVE";
        case ActionEvent.ALL: return "ALL";
        case ActionEvent.UP_MOVE: return "UP_MOVE";      
      }
    }  
  
    build() {
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
    }
  }