var fs = require('fs');
const {Ngin, EventHandler, mainInternal} = require("./ngin");
const EventEmitter = require('events');
import {CObject, CActionType, CAction, CPhysical, CVisible, CBuildable, CStage, CVector2, CSize, CBodyType, CBodyShape, CJoystickDirectionals, buildCActionType, CObjectInfo} from "./cobj";
const { NginX } = require("./nginx");
const {l1, l2} = require("./gen");//

export class Nx extends NginX {
    constructor(root){
        super(root);
    }

    
    async sendObj(obj:CBuildable) {
        if (obj instanceof CObject) {
            await this.addCObjectInternal(obj.build());
        } else if (obj instanceof CStage) {
            await this.initScreen(obj.build());
        }
    }

    async sendObjWait(obj:CBuildable) {
        this.ackEmitter = new EventEmitter();         
        await this.sendObj(obj);
        return await EventEmitter.once(this.ackEmitter, 'ack');
    }    

    async add(pos:CVector2) {
        await this.addFruit(200, pos, 'Bananas');
    }

    async addFruit(id:number, pos:CVector2, fruit:string) {
        var obj = new CObject(id);
        obj.info = "fruit";
        obj.physical = new CPhysical(CBodyShape.circle, pos, CBodyType.static);
        //obj.physical.isSensor = true;
        var a1 = new CAction('Items/Fruits/' + fruit + '.png', new CSize(32, 32), [/*0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16*/], CActionType.idle);
        a1.stepTime = 50/1000;
        obj.visible = new CVisible([a1]);
        obj.visible.scale = new CVector2(1.5, 1.5);
        await this.sendObj(obj);
    }

    async addCStage(bid, x, y, width, height) {
        let data = [];
    
        l1(width, height, data);

        var obj = new CObject(bid);
        obj.visible = new CVisible([ new CAction('tiled/tileset/0x72_DungeonTilesetII_v1.3.png', new CSize(16, 16), data, CActionType.idle)]);
        obj.visible.current = CActionType.tiles;
        obj.visible.pos = new CVector2(x,y);
        obj.visible.size = new CSize(width, height);
        obj.visible.anchor = new CVector2(0,0);
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
        obj.physical = new CPhysical(CBodyShape.rectangle, new CVector2(x, y), CBodyType.static);
        obj.physical.size = new CSize(width, height);
        await this.sendObj(obj);
    }


    async addSpike(id, x, y) {
        var obj = new CObject(id);
        obj.info = "spike";
        obj.physical = new CPhysical(CBodyShape.rectangle, new CVector2(x,y), CBodyType.static);
        obj.physical.isSensor = true;
        obj.visible = new CVisible([new CAction('tiled/tileset/0x72_DungeonTilesetII_v1.3.png', new CSize(16, 16), [929,930,931,932, 931, 930], CActionType.idle)]);
        await this.sendObj(obj);
    }

    async addCoin(id, x, y) {
        var obj = new CObject(id);
        obj.info = "coin";
        obj.physical = new CPhysical(CBodyShape.rectangle, new CVector2(x,y), CBodyType.static);
        obj.physical.isSensor = true;
        obj.visible = new CVisible([new CAction('tiled/tileset/0x72_DungeonTilesetII_v1.3.png', new CSize(16, 16), [403,404,405,406], CActionType.idle)]);
        await this.sendObj(obj);
    }

    hero(id:number, character:string, pos:CVector2) {
        const hx = 0.25;
        const hy = 0.25;

        var obj = new CObject(id);
        obj.info = "hero";
        obj.physical = new CPhysical(CBodyShape.polygon, pos, CBodyType.dynamic);
        obj.physical.floats = [-hx, -hy, -hx, hy, hx, hy, hx, -hy];
        obj.physical.fixedRotation = true;
        //obj.physical.size = new CSize(0.5, 0.5);
        
        obj.visible = new CVisible([
            new CAction('Main Characters/' + character +'/Idle (32x32).png', new CSize(32, 32), [], CActionType.idle),
            new CAction('Main Characters/' + character +'/Run (32x32).png', new CSize(32, 32), [], CActionType.run),
            new CAction('Main Characters/' + character +'/Jump (32x32).png', new CSize(32, 32), [], CActionType.jump),
            new CAction('Main Characters/' + character +'/Hit (32x32).png', new CSize(32, 32), [], CActionType.hit, false),
            new CAction('Main Characters/' + character +'/Fall (32x32).png', new CSize(32, 32), [], CActionType.fall),
            new CAction('Main Characters/' + character +'/Wall Jump (32x32).png', new CSize(32, 32), [], CActionType.wallJump, false),
            new CAction('Main Characters/' + character +'/Double Jump (32x32).png', new CSize(32, 32), [], CActionType.doubleJump, false),
        ]);
        for (var i=0; i<obj.visible.actions.length; i++) {
            obj.visible.actions[i].stepTime = 50/1000;
        }
        obj.visible.pos = new CVector2(0, -0.2);
        
        //obj.visible.scale = new CVector2(1.5, 1.5);
        return obj;
    }

    async setActionType(id, actionType, isFlipHorizontal = false) {
        await this.command({
            strings:['actionType', buildCActionType(actionType)], 
            ints:[id, isFlipHorizontal == true? 1:0],
        });      
    }

    async getCObjectInfo(id) {
        return new CObjectInfo(await this.getObjinfo(id));
    }

    async linearTo(id, pos:CVector2, speed) {
        this.cmdEmitter = new EventEmitter();        
        await this.command({
            strings:['linearTo'], 
            ints:[id], 
            floats:[pos.x, pos.y, speed],
        });
        var value = await EventEmitter.once(this.cmdEmitter, 'cmd');
        return value[0].floats;        
    }
    

    async forward(id, angle, speed) {
        await this.command({
            strings: ['forward'],
            ints:[id],
            floats:[angle, speed],
        });
    }    

    async lineary(id:number, velocity:number) {
        await this.command({
            strings:['lineary'], 
            ints:[id], 
            floats:[velocity],
        });
    }
    
    async remove(id:number) {
        await this.command({
            strings:['remove'], 
            ints:[id],
        });
    }   
    
    async constx(id:number, velocity:number) {
        await this.command({
            strings:['constx'], 
            ints:[id], 
            floats:[velocity],
        });
    }    
}

export function main(type, port, body) {

    mainInternal(type, port, async function (host, root) {
        let ngin = new Nx(root);
        await ngin.connect(host, port);
        //ngin.eventHandler = eventHandler; //new InputHandler(ngin);
    
        await body(ngin);
    })
}

