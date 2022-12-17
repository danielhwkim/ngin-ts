var fs = require('fs');
const { runInThisContext } = require('vm');
const {Ngin, EventHandler, mainInternal} = require("./ngin");
//var {ngin} = require("./ngin");
const EventEmitter = require('events');
import {CObject, CActionType, CAction, CPhysical, CVisible, Buildable, Stage, Pos, Size, BodyType, BodyShape, JoystickDirectionals} from "./cobj";
const {l1, l2} = require("./gen");//

export class NginEx {
    ngin: typeof Ngin;
    constructor(ngin: typeof Ngin){
        this.ngin = ngin;
    }

    async sendObj(obj:Buildable) {
        if (obj instanceof CObject) {
            await this.ngin.addCObjectInternal(obj.build());
        } else if (obj instanceof Stage) {
            await this.ngin.initScreen(obj.build());
        }
    }

    async sendObjWait(obj:Buildable) {
        this.ngin.ackEmitter = new EventEmitter();         
        await this.sendObj(obj);
        return await EventEmitter.once(this.ngin.ackEmitter, 'ack');
    }    
    
    async forward(id:number, pos:Pos) {
        await this.ngin.command({
            strings: ['forward'],
            ints:[id],
            floats:[pos.x, pos.y],
        });
    }

    async follow(id:number) {
        await this.ngin.command({
            strings: ['follow'],
            ints:[id],
        });
    } 

    async remove(id:number) {
        await this.ngin.command({
            strings: ['remove'],
            ints:[id],
        });        
    } 

    async getBodyinfo(id:number) {
        this.ngin.cmdEmitter = new EventEmitter();    
        await this.ngin.command({
          strings:['bodyinfo'], 
          ints:[id], 
        });
        var value = await EventEmitter.once(this.ngin.cmdEmitter, 'cmd');
        return value[0].floats;
    }
    
    async angularVelocity(id:number, value:number) {
        //await this.ngin.setBodyOp(id, 'angularVelocity', value, 0);
        await this.ngin.command({
            strings:['angular'], 
            ints:[id],
            floats:[value]
        });        
    }

    async add(x, y) {
        await this.addFruit(200, x, y, 'Bananas');
    }

    async addFruit(id, x, y, fruit) {
        var obj = new CObject(id);
        obj.info = "fruit";
        obj.physical = new CPhysical(BodyShape.circle, new Pos(x,y), BodyType.static);
        //obj.physical.isSensor = true;
        var a1 = new CAction('Items/Fruits/' + fruit + '.png', new Size(32, 32), [/*0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16*/], CActionType.idle);
        a1.stepTime = 50/1000;
        obj.visible = new CVisible([a1]);
        obj.visible.scale = new Pos(1.5, 1.5);
        await this.sendObj(obj);
    }

    async addStage(bid, x, y, width, height) {
        let data = [];
    
        l1(width, height, data);

        var obj = new CObject(bid);
        obj.visible = new CVisible([ new CAction('tiled/tileset/0x72_DungeonTilesetII_v1.3.png', new Size(16, 16), data, CActionType.idle)]);
        obj.visible.current = CActionType.tiles;
        obj.visible.pos = new Pos(x,y);
        obj.visible.size = new Size(width, height);
        obj.visible.anchor = new Pos(0,0);
        //obj.visible.priority = 0;
        await this.sendObj(obj);

        data = [];
        l2(width, height, data);
        obj.visible.priority = 1;
        obj.visible.actions[0].indices = data;
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
        obj.visible = new CVisible([new CAction('tiled/tileset/0x72_DungeonTilesetII_v1.3.png', new Size(16, 16), [929,930,931,932, 931, 930], CActionType.idle)]);
        await this.sendObj(obj);
    }

    async addCoin(id, x, y) {
        var obj = new CObject(id);
        obj.info = "coin";
        obj.physical = new CPhysical(BodyShape.rectangle, new Pos(x,y), BodyType.static);
        //obj.physical.isSensor = true;
        obj.visible = new CVisible([new CAction('tiled/tileset/0x72_DungeonTilesetII_v1.3.png', new Size(16, 16), [403,404,405,406], CActionType.idle)]);
        await this.sendObj(obj);
    }

    async addActor(id, character, x, y) {
        const hx = 0.25;
        const hy = 0.25;

        var obj = new CObject(id);
        obj.info = "actor";
        obj.physical = new CPhysical(BodyShape.polygon, new Pos(x,y), BodyType.dynamic);
        obj.physical.floats = [-hx, -hy, -hx, hy, hx, hy, hx, -hy];
        //obj.physical.size = new Size(0.5, 0.5);
        
        obj.visible = new CVisible([
            new CAction('Main Characters/' + character +'/Idle (32x32).png', new Size(32, 32), [], CActionType.idle),
            new CAction('Main Characters/' + character +'/Run (32x32).png', new Size(32, 32), [], CActionType.run),
            new CAction('Main Characters/' + character +'/Jump (32x32).png', new Size(32, 32), [], CActionType.jump),
            new CAction('Main Characters/' + character +'/Hit (32x32).png', new Size(32, 32), [], CActionType.hit),
            new CAction('Main Characters/' + character +'/Fall (32x32).png', new Size(32, 32), [], CActionType.fall),
            new CAction('Main Characters/' + character +'/Wall Jump (32x32).png', new Size(32, 32), [], CActionType.wallJump),
            new CAction('Main Characters/' + character +'/Double Jump (32x32).png', new Size(32, 32), [], CActionType.doubleJump),                                                                        
        ]);
        for (var i=0; i<obj.visible.actions.length; i++) {
            obj.visible.actions[i].stepTime = 50/1000;
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

    async setCActionType(bid, skin, skinType, facingLeft:boolean = false) {
        //const obj = this.getObj(bid);
        //await this.ngin.setCActionTypeInternal(bid, skin, facingLeft, skinType);
        await this.ngin.command({

        });
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
        let x = new NginEx(new Ngin(root));
        await x.ngin.connect(host, port);
        //ngin.eventHandler = eventHandler; //new InputHandler(ngin);
    
        await body(x);
    })
}

