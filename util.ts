var fs = require('fs');
const { runInThisContext } = require('vm');
var {EventHandler, mainInternal} = require("./ngin");
//var {NginX} = require("./nginx");
const EventEmitter = require('events');
//var {Pos, Size, BodyType, BodyShape, TilesInfo, Pobj, Stage, JoystickDirectionals} = require("./pobj");
//import {Pos, Size, BodyType, BodyShape, JoystickDirectionals} from "./pobj";
import {CObject, CAction, CAnimation, CPhysical, CVisible, Buildable, Stage, Pos, Size, BodyType, BodyShape, JoystickDirectionals} from "./cobj";
import { NginX } from "./nginx";
const {l1, l2} = require("./gen");//

export class NginEx {
    nginx: NginX;
    constructor(nginx: NginX){
        this.nginx = nginx;
        //this.init(root);
    }

    async sendObj(obj:Buildable) {
        if (obj instanceof CObject) {
            await this.nginx.addCObjectInternal(obj.build());
        } else if (obj instanceof Stage) {
            await this.nginx.initScreen(obj.build());
        }
    }

    async sendObjWait(obj:Buildable) {
        this.nginx.ackEmitter = new EventEmitter();         
        await this.sendObj(obj);
        return await EventEmitter.once(this.nginx.ackEmitter, 'ack');
    }    
    
    async forward(id:number, pos:Pos) {
        await this.nginx.command({
            strings: ['forward'],
            ints:[id],
            floats:[pos.x, pos.y],
        });
    }

    async follow(id:number) {
        await this.nginx.command({
            strings: ['follow'],
            ints:[id],
        });
    } 

    async remove(id:number) {
        await this.nginx.opRemove(id,0,0);
    } 

    async getBodyinfo(id:number) {
        this.nginx.cmdEmitter = new EventEmitter();    
        await this.nginx.command({
          strings:['bodyinfo'], 
          ints:[id], 
        });
        var value = await EventEmitter.once(this.nginx.cmdEmitter, 'cmd');
        return value[0].floats;
    }
    
    async angularVelocity(id:number, value:number) {
        await this.nginx.setBodyOp(id, 'angularVelocity', value, 0);
    }

    async add(x, y) {
        await this.addFruit(200, x, y, 'Bananas');
    }

    async addFruit(id, x, y, fruit) {
        var obj = new CObject(id);
        obj.info = "fruit";
        obj.physical = new CPhysical(BodyShape.circle, new Pos(x,y), BodyType.static);
        //obj.physical.isSensor = true;
        var a1 = new CAnimation('Items/Fruits/' + fruit + '.png', new Size(32, 32), [/*0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16*/], CAction.idle);
        a1.stepTime = 50/1000;
        obj.visible = new CVisible([a1]);
        obj.visible.scale = new Pos(1.5, 1.5);
        await this.sendObj(obj);
    }

    async addStage(bid, x, y, width, height) {
        let data = [];
    
        l1(width, height, data);

        var obj = new CObject(bid);
        obj.visible = new CVisible([ new CAnimation('tiled/tileset/0x72_DungeonTilesetII_v1.3.png', new Size(16, 16), data, CAction.idle)]);
        obj.visible.current = CAction.tiles;
        obj.visible.pos = new Pos(x,y);
        obj.visible.size = new Size(width, height);
        obj.visible.anchor = new Pos(0,0);
        //obj.visible.priority = 0;
        await this.sendObj(obj);

        data = [];
        l2(width, height, data);
        obj.visible.priority = 1;
        obj.visible.animations[0].indices = data;
        await this.sendObj(obj);

        await this.addVoid(bid++, x+1,y+1+0.2,width-2,0.6);
        await this.addVoid(bid++, x+1,y+height-1+0.2,width-2,0.6);
        await this.addVoid(bid++, x+0.8,y+1.2,0.2,height-2+0.6);
        await this.addVoid(bid++, x+width-1,y+1.2,0.2,height-2+0.6);
        return bid;
    }    
  
    async addVoid(bid, x, y, width, height) {
        const x1 = Math.floor(x);
        const y1 = Math.floor(y);
        const x2 = Math.ceil(x + width);
        const y2 = Math.ceil(y + height);
        //console.log(x1,y1,x2,y2);
        for (let i=x1; i<x2; i++) {
          for (let j=y1; j<y2; j++) {
            //this.walls.add(this.xyToNumber(i,j));
            //console.log(i,j, this.xyToNumber(i,j));
          }
        }
  
        var obj = new CObject(bid);
        obj.info = "wall";
        obj.physical = new CPhysical(BodyShape.rectangle, new Pos(x, y), BodyType.static);
        obj.physical.size = new Size(width, height);
        await this.sendObj(obj);
    }


    async addSpike(id, x, y) {
        var obj = new CObject(id);
        obj.info = "spike";
        obj.physical = new CPhysical(BodyShape.rectangle, new Pos(x,y), BodyType.static);
        //obj.physical.isSensor = true;
        obj.visible = new CVisible([new CAnimation('tiled/tileset/0x72_DungeonTilesetII_v1.3.png', new Size(16, 16), [929,930,931,932, 931, 930], CAction.idle)]);
        await this.sendObj(obj);
    }

    async addCoin(id, x, y) {
        var obj = new CObject(id);
        obj.info = "coin";
        obj.physical = new CPhysical(BodyShape.rectangle, new Pos(x,y), BodyType.static);
        //obj.physical.isSensor = true;
        obj.visible = new CVisible([new CAnimation('tiled/tileset/0x72_DungeonTilesetII_v1.3.png', new Size(16, 16), [403,404,405,406], CAction.idle)]);
        await this.sendObj(obj);
    }

    async addActor(id, character, x, y) {
        const hx = 0.25/2;
        const hy = 0.25/2;

        var obj = new CObject(id);
        obj.info = "actor";
        obj.physical = new CPhysical(BodyShape.rectangle, new Pos(x,y), BodyType.dynamic);
        obj.visible = new CVisible([
            new CAnimation('Main Characters/' + character +'/Idle (32x32).png', new Size(32, 32), [], CAction.idle),
            new CAnimation('Main Characters/' + character +'/Run (32x32).png', new Size(32, 32), [], CAction.run),
            new CAnimation('Main Characters/' + character +'/Jump (32x32).png', new Size(32, 32), [], CAction.jump),
            new CAnimation('Main Characters/' + character +'/Hit (32x32).png', new Size(32, 32), [], CAction.hit),
            new CAnimation('Main Characters/' + character +'/Fall (32x32).png', new Size(32, 32), [], CAction.fall),
            new CAnimation('Main Characters/' + character +'/Wall Jump (32x32).png', new Size(32, 32), [], CAction.wallJump),
            new CAnimation('Main Characters/' + character +'/Double Jump (32x32).png', new Size(32, 32), [], CAction.doubleJump),                                                                        
        ]);
        for (var i=0; i<obj.visible.animations.length; i++) {
            obj.visible.animations[i].stepTime = 50/1000;
        }
        obj.visible.pos = new Pos(0, -0.2);
        //obj.visible.scale = new Pos(1.5, 1.5);
        await this.sendObj(obj);

        /*
        await this.addBody({
          bid:bid,
          name:'actor',
          skin:name,
          shape:'polygon',
          x:x,
          y:y-0.2,
          width:1,
          height:1,
          type:'dynamic',
          facingLeft:true,
          floats:[-hx, -hy/2, hx, hy/2, hx, hy*2, -hx, hy*2]
        });  */
    }
      
      
    /*
  
    
  
    async addActor(bid, name, x, y) {
      //console.log('wait - addActor');    
      this.prepareAck(bid);
      const hx = 0.25/2;
          const hy = 0.25/2;
      await this.addBody({
        bid:bid,
        name:'actor',
        skin:name,
        shape:'polygon',
        x:x,
        y:y-0.2,
        width:1,
        height:1,
        type:'dynamic',
        facingLeft:true,
        floats:[-hx, -hy/2, hx, hy/2, hx, hy*2, -hx, hy*2]
      });  
      const value = await this.waitAckValue(bid);
    }*/    
}

export function main(type, port, body) {

    mainInternal(type, port, async function (host, root) {
        let x = new NginEx(new NginX(root));
        await x.nginx.connect(host, port);
        //ngin.eventHandler = eventHandler; //new InputHandler(ngin);
    
        await body(x);
    })
}

