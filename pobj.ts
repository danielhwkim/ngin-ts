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

export class TilesInfo implements Pobj {
  path: string; 
  size: Size;
  col: number;
  data: number[];
  constructor(  path: string,
    size: Size,
    col: number,
    data: number[]) {
      this.path = path;
      this.size = size;
      this.col = col;
      this.data = data;
  }
  build() {
    return {
      path:this.path, 
      tileSizeX:this.size.w, 
      tileSizeY:this.size.h,
      tileColumns:this.col,
      data:this.data
    }
  }
}

export interface Pobj {
  build();
}

export class Pbody implements Pobj {
  constructor(name: string, pos: Pos, size: Size, id: number=0) {
    this.id = id;
    this.name = name;
    this.pos = pos;
    this.size = size;
    this.skin = name;
  }
  id: number;
  name: string;
  skin: string;
  pos: Pos;
  size: Size;
  angle: number = 0;
  contactReport: boolean = true;
  type: BodyType = BodyType.static;
  tilesInfo: TilesInfo;
  shape: BodyShape = BodyShape.rectangle;
  isSensor: boolean = false;

  buildType(type:BodyType) {
    switch(type) {
      case BodyType.static: return "staticBody";
      case BodyType.kinematic: return "kinematicBody";
      case BodyType.dynamic: return "dynamicBody";
    }
  }

  buildShape(shape:BodyShape) {
    switch(shape) {
      case BodyShape.rectangle: return "rectangle";
      case BodyShape.actor: return "actor";
      case BodyShape.circle: return "circle";
      case BodyShape.triangle: return "triangle";
      case BodyShape.edge: return "edge";
      case BodyShape.polygon: return "polygon";
    }
  }



  build() {
    return {
      bid:this.id,
      name:this.name,
      skin:this.skin,
      shape:this.buildShape(this.shape),
      x:this.pos.x,
      y:this.pos.y,
      width:this.size.w,
      height:this.size.h,
      angle:this.angle,
      contactReport:this.contactReport, 
      isSensor:this.isSensor,     
      type:this.buildType(this.type),
      tilesInfo: (this.tilesInfo == null)? null:this.tilesInfo.build(),
    };
  }
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


export class Stage implements Pobj {
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

export class Image implements Pobj {
  id: number;
  pos: Pos;
  size: Size;
  tilesInfo: TilesInfo;

  constructor(info:TilesInfo, pos:Pos, size:Size = new Size(1,1), id:number = 0) {
    this.tilesInfo = info;
    this.pos = pos;
    this.size = size;
    this.id = id;
  }

  build() {
    return {
      strings: ['image', this.tilesInfo.path],
      ints:[this.id, this.tilesInfo.size.w, this.tilesInfo.size.h, this.tilesInfo.col, this.tilesInfo.data[0]],
      floats:[this.pos.x, this.pos.y, this.size.w, this.size.h],
    };
  }
}