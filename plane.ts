var fs = require('fs');
var {EventHandler} = require("./ngin");
import {main} from "./util";
//import {Pos, Size, BodyType, BodyShape, JoystickDirectionals} from "./pobj";
import {CObject, CActionType, CAction, CPhysical, CVisible, CTileObject, Stage, Pos, Size, BodyType, BodyShape, JoystickDirectionals} from "./cobj";

main('127.0.0.1', 4040, async (x) =>  {
    x.nginx.eventHandler = new InputHandler(x);
    const d = fs.readFileSync('planes0.tmj', 'utf8');
    const j = JSON.parse(d);
  
    const tiles = j.layers[0];
    const objlayer = j.layers[1];
    const data = tiles['data'];
    const tileSize = j['tilewidth'];
    const precision = 3;
    console.log(j);
    var size = new Size(tiles.width, tiles.height);

    var stage = new Stage(size);
    //stage.debug = true;
    stage.joystickDirectionals = JoystickDirectionals.horizontal;
    await x.sendObjWait(stage);

    await x.sendObj(CTileObject('kenney_pixelshmup/tiles_packed.png', new Size(tileSize, tileSize), data, new Pos(0,0), size));

    var obj = new CObject(100);
    obj.physical = new CPhysical(BodyShape.circle, new Pos(11,11), BodyType.dynamic);
    obj.physical.angle = 1.5;
    obj.physical.size = new Size(2,2);
    obj.visible = new CVisible([ new CAction('kenney_pixelshmup/ships_packed.png', new Size(32, 32), [1], CActionType.idle)]);
    obj.visible.size = new Size(2,2);
    var value = await x.sendObjWait(obj);
    console.log('1', value);

    x.nginx.eventHandler.ready = true;

    await x.follow(100);
  
    await x.forward(100, new Pos(5, 0));

    obj.id = 200;
    obj.physical.pos = new Pos(11, 0);
    obj.physical.angle = 3;
    //obj.visible.size = new Size(2,2);    
    obj.visible.actions[0].indices = [10];
    var value = await x.sendObjWait(obj);
    console.log('2', value); 
    
    await x.forward(200, new Pos(5, 0));
    await x.angularVelocity(200, 1);    

});

class InputHandler extends EventHandler {
    constructor(x) {
        super(x.nginx);
        this.x = x;        
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
        if (contact.id2 == 101) {
          await this.x.remove(contact.id2);
        }
        var obj = new CObject(1000);
        obj.tid = contact.id2;
        obj.visible = new CVisible([ new CAction('kenney_pixelshmup/tiles_packed.png', new Size(16, 16), [5], CActionType.idle)]);
        obj.visible.pos = new Pos(0,0);
        await this.x.sendObj(obj);
      }
    }
  
    async handleEvent(event) {
      console.log(event);
      const c = event;
      if (c.type == 'ready')
        return;
    }

    async goRight() {
      await this.x.angularVelocity(100, 1);
    }

    async goLeft() {
      await this.x.angularVelocity(100, -1);
    }

    async stop() {
      await this.x.angularVelocity(100, 0);   
    }

    async missile()
    {
      var x,y,w,h,a,lvx,lvy,av;
      [x,y,w,h,a,lvx,lvy,av] = await this.x.getBodyinfo(100);

      var obj = new CObject(101);
      obj.physical = new CPhysical(BodyShape.rectangle, new Pos(x-0.5 + 2*Math.sin(a), y-0.5 - 2*Math.cos(a)), BodyType.dynamic);
      obj.physical.angle = a;
      obj.visible = new CVisible([ new CAction('kenney_pixelshmup/tiles_packed.png', new Size(16, 16), [1, 2, 3], CActionType.idle)]);
      var value = await this.x.sendObjWait(obj);
      console.log('1', value);
      await this.x.forward(101, new Pos(20, 0));
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
  
  