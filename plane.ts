var fs = require('fs');
var {EventHandler} = require("./ngin");
import {main} from "./nx";
import {CObject, CActionType, CAction, CPhysical, CVisible, CTileObject, CStage, CVector2, CSize, CBodyType, CBodyShape, CJoystickDirectionals} from "./cobj";

main('127.0.0.1', 4040, async (nx) =>  {
    nx.eventHandler = new InputHandler(nx);
    const d = fs.readFileSync('./data/planes0.tmj', 'utf8');
    const j = JSON.parse(d);
  
    const tiles = j.layers[0];
    const objlayer = j.layers[1];
    const data = tiles['data'];
    const tileCSize = j['tilewidth'];
    const precision = 3;
    console.log(j);
    var size = new CSize(tiles.width, tiles.height);

    var stage = new CStage(size);
    //stage.debug = true;
    stage.joystickDirectionals = CJoystickDirectionals.horizontal;
    await nx.sendObjWait(stage);

    await nx.sendObj(CTileObject('kenney_pixelshmup/tiles_packed.png', new CSize(tileCSize, tileCSize), data, new CVector2(0,0), size));

    var obj = new CObject(100);
    obj.physical = new CPhysical(CBodyShape.circle, new CVector2(11,11), CBodyType.dynamic);
    obj.physical.angle = 1.5;
    obj.physical.size = new CSize(2,2);
    obj.visible = new CVisible([ new CAction('kenney_pixelshmup/ships_packed.png', new CSize(32, 32), [1], CActionType.idle)]);
    obj.visible.size = new CSize(2,2);
    var value = await nx.sendObjWait(obj);
    console.log('1', value);

    nx.eventHandler.ready = true;

    await nx.follow(100);
  
    await nx.forward(100, 0, 5);

    obj.id = 200;
    obj.physical.pos = new CVector2(11, 0);
    obj.physical.angle = 3;
    //obj.visible.size = new CSize(2,2);    
    obj.visible.actions[0].indices = [10];
    var value = await nx.sendObjWait(obj);
    console.log('2', value); 
    
    await nx.forward(200, 0, 5);
    await nx.angularVelocity(200, 1);    

});

class InputHandler extends EventHandler {
    constructor(nx) {
        super(nx);
        this.nx = nx;        
        this.key_down_left = false;
        this.key_down_right = false;
        this.actor_contacts = new Set();
        this.actor_jump_count = 0;
        this.dynamic_id = 1000;
        this.facingLeft = false;  
        this.ready = false;      
    }

    async handleContact(contact) {
      if (!this.ready) return;
      console.log(contact);
      if (contact.isEnded == false) {
        if (contact.id1 == 101) {
          await this.nx.remove(contact.id1);
          var obj = new CObject(1000);
          obj.tid = contact.id2;
          obj.visible = new CVisible([ new CAction('kenney_pixelshmup/tiles_packed.png', new CSize(16, 16), [5], CActionType.idle)]);
          obj.visible.pos = new CVector2(0,0);
          await this.nx.sendObj(obj);
        }
      }
    }
  
    async handleEvent(event) {
      console.log(event);
      const c = event;
      if (c.type == 'ready')
        return;
    }

    async goRight() {
      await this.nx.angularVelocity(100, 1);
    }

    async goLeft() {
      await this.nx.angularVelocity(100, -1);
    }

    async stop() {
      await this.nx.angularVelocity(100, 0);   
    }

    async missile()
    {
      var info = await this.nx.getCObjectInfo(100);

      var obj = new CObject(101);
      obj.physical = new CPhysical(CBodyShape.rectangle, new CVector2(info.pos.x-0.5 + 2*Math.sin(info.angle), info.pos.y-0.5 - 2*Math.cos(info.angle)), CBodyType.dynamic);
      obj.physical.angle = info.angle;
      obj.visible = new CVisible([ new CAction('kenney_pixelshmup/tiles_packed.png', new CSize(16, 16), [1, 2, 3], CActionType.idle)]);
      var value = await this.nx.sendObjWait(obj);
      console.log('1', value);
      await this.nx.forward(101, 0, 20);
    }

    missile_id = 800;
  
    async handleKey(key) {
      //console.log(key);
      const c = key;
      if (c.isPressed == false) {
        switch (c.name) {
          case 'Arrow Left':
            this.key_down_left = false;
            if (this.key_down_right) {
              await this.goRight();
            } else {
              await this.stop();
            } 
          break;					
          case 'Arrow Right':
            this.key_down_right = false;       
            if (this.key_down_left) {
              await this.goLeft();
            } else {
              await this.stop();
            }             
          break;
        }
      } else {
        switch (c.name) {
          case 'Arrow Left':
            this.key_down_left = true;         
            await this.goLeft();
            break;					
          case 'Arrow Right':
            this.key_down_right = true;            
            await this.goRight();
            break;	
          case 'Arrow Up':	
            await this.missile();
            break;
          }
      }
    }  
  
    
    async handleDirectional(directional) {
      console.log(directional);

      switch(directional.direction) {
        case 'MOVE_LEFT':
          await this.goLeft();
          break;
        case 'MOVE_RIGHT':
          await this.goRight();
          break;
        default:
          await this.stop();
          break;
      }
    }
  
    async handleButton(button) {
      console.log(button);
      await this.missile();
    }  
}
  
  