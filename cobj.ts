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

export enum CAction { 
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
}

export interface Buildable {
    build();
}

function buildCAction(action:CAction) {
    switch(action) {
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

function buildType(type:BodyType) {
    switch(type) {
        case BodyType.static: return "staticBody";
        case BodyType.kinematic: return "kinematicBody";
        case BodyType.dynamic: return "dynamicBody";
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

export class CAnimation implements Buildable {
    path: string;
    tileSize: Size;
    indices: number[];
    stepTime: number = 0.2;
    action: CAction;
    repeat: boolean = true;
    constructor(path:string, tileSize:Size, indices:number[], action:CAction) {
        this.path = path;
        this.tileSize = tileSize;
        this.indices = indices;
        this.action = action;
    }
    build() {
        return {
            path:this.path,
            tileSizeX:this.tileSize.w,
            tileSizeY:this.tileSize.h,
            indices:this.indices,
            stepTime:this.stepTime,
            action:buildCAction(this.action),
            repeat:this.repeat,
        };
    }
}

export class CVisible implements Buildable {
    current: CAction = CAction.idle;
    priority: number = 0;
    pos: Pos = new Pos(0,0);
    size: Size = new Size(1,1);
    scale: Pos = new Pos(1,1);
    anchor: Pos = new Pos(0.5,0.5);
    animations: CAnimation[];
    tid: number = 0;
    constructor(animations: CAnimation[]) {
        this.animations = animations;
    }
    build() {
        var animations = [];

        for (var i = 0; i<this.animations.length; i++) {
            animations.push(this.animations[i].build());
        }

        return {
            current:buildCAction(this.current),
            priority:this.priority,
            x:this.pos.x,
            y:this.pos.y,
            width:this.size.w,
            height:this.size.h,
            scaleX:this.scale.x,
            scaleY:this.scale.y,  
            anchorX:this.anchor.x,
            anchorY:this.anchor.y,
            animations:animations,
            tid:this.tid,
        };
    }
}

export class CPhysical implements Buildable {
    name: string = "no name";
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
            name:this.name,
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

    build() {
        if (this.physical == undefined) {
            return {
                id:this.id, 
                visible:this.visible.build(),
                tid:this.tid,
            };
        } else {
            if (this.visible == undefined) {
                return {
                    id:this.id, 
                    physical:this.physical.build(),
                    tid:this.tid,
                }
            } else {
                return {
                    id:this.id, 
                    physical:this.physical.build(), 
                    visible:this.visible.build(),
                    tid:this.tid,
                }
            }
        }
    }
}

export function CTileObject(path:string, tileSize:Size, data:number[], pos:Pos, size:Size) {
    var obj = new CObject(0);
    obj.visible = new CVisible([ new CAnimation(path, tileSize, data, CAction.tiles)]);
    obj.visible.current = CAction.tiles;
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