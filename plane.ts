var fs = require('fs');
var {EventHandler} = require("./ngin");
import {main} from "./util";
//import {Pos, Size, BodyType, BodyShape, JoystickDirectionals} from "./pobj";
import {CObject, CAction, CAnimation, CPhysical, CVisible, CTileObject, Stage, Pos, Size, BodyType, BodyShape, JoystickDirectionals} from "./cobj";

main('127.0.0.1', 4040, async (ngin) =>  {
    ngin.eventHandler = new InputHandler(ngin);
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
    await ngin.sendObjWait(stage);

    await ngin.sendObj(CTileObject('kenney_pixelshmup/tiles_packed.png', new Size(tileSize, tileSize), data, new Pos(0,0), size));

    var obj = new CObject(100);
    obj.physical = new CPhysical(BodyShape.circle, new Pos(11,11), BodyType.dynamic);
    obj.physical.angle = 1.5;
    obj.physical.size = new Size(2,2);
    obj.visible = new CVisible([ new CAnimation('kenney_pixelshmup/ships_packed.png', new Size(32, 32), [1], CAction.idle)]);
    obj.visible.size = new Size(2,2);
    var value = await ngin.sendObjWait(obj);
    console.log('1', value);

    ngin.eventHandler.ready = true;

    await ngin.follow(100);
  
    await ngin.forward(100, new Pos(5, 0));

    obj.id = 200;
    obj.physical.pos = new Pos(11, 0);
    obj.physical.angle = 3;
    //obj.visible.size = new Size(2,2);    
    obj.visible.animations[0].indices = [10];
    var value = await ngin.sendObjWait(obj);
    console.log('2', value); 
    
    await ngin.forward(200, new Pos(5, 0));
    await ngin.angularVelocity(200, 1);    

});

class InputHandler extends EventHandler {
    constructor(ngin) {
        super(ngin);
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
      if (contact.type == 'begin') {
        if (contact.bid2 == 101) {
          await this.ngin.remove(contact.bid2);
        }
        var obj = new CObject(1000);
        obj.tid = contact.bid2;
        obj.visible = new CVisible([ new CAnimation('kenney_pixelshmup/tiles_packed.png', new Size(16, 16), [5], CAction.idle)]);
        obj.visible.pos = new Pos(0,0);
        await this.ngin.sendObj(obj);
      }
    }
  
    async handleEvent(event) {
      console.log(event);
      const c = event;
      if (c.type == 'ready')
        return;
    }

    async goRight() {
      await this.ngin.angularVelocity(100, 1);
    }

    async goLeft() {
      await this.ngin.angularVelocity(100, -1);
    }

    async stop() {
      await this.ngin.angularVelocity(100, 0);   
    }

    async missile()
    {
      var x,y,w,h,a,lvx,lvy,av;
      [x,y,w,h,a,lvx,lvy,av] = await this.ngin.getBodyinfo(100);

      var obj = new CObject(101);
      obj.physical = new CPhysical(BodyShape.rectangle, new Pos(x-0.5 + 2*Math.sin(a), y-0.5 - 2*Math.cos(a)), BodyType.dynamic);
      obj.physical.angle = a;
      obj.visible = new CVisible([ new CAnimation('kenney_pixelshmup/tiles_packed.png', new Size(16, 16), [1, 2, 3], CAction.idle)]);
      var value = await this.ngin.sendObjWait(obj);
      console.log('1', value);
      await this.ngin.forward(101, new Pos(10, 0));
    }

    missile_id = 800;
  
    async handleKey(key) {
      //console.log(key);
      const c = key;
      if (c.type == 'up') {
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
  
  