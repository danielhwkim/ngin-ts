var fs = require('fs');
var {EventHandler} = require("./ngin");
import {main} from "./util";
import {Pos, Size, BodyType, BodyShape, TilesInfo, Pobj, Pbody, Stage, JoystickDirectionals, Image} from "./pobj";

main('daniel', 4040, async (ngin) =>  {
    ngin.eventHandler = new InputHandler(ngin);
    const d = fs.readFileSync('planes0.tmj', 'utf8');
    const j = JSON.parse(d);
  
    const tiles = j.layers[0];
    const objlayer = j.layers[1];
    const data = tiles['data'];
    const tileSize = j['tilewidth'];
    const precision = 3;
    console.log(j);

    var stage = new Stage(new Size(tiles.width, tiles.height));
    stage.joystickDirectionals = JoystickDirectionals.horizontal;
    await ngin.sendObjWait(stage);

    var body = new Pbody('tiles', new Pos(), new Size(tiles.width, tiles.height));
    body.tilesInfo = new TilesInfo('kenney_pixelshmup/tiles_packed.png', new Size(tileSize, tileSize), 12, data);
    await ngin.sendObj(body);

    body = new Pbody('obj', new Pos(11, 11), new Size(2, 2), 100);
    body.angle = 1.5;
    body.contactReport = true;
    body.type = BodyType.dynamic;
    body.tilesInfo = new TilesInfo('kenney_pixelshmup/ships_packed.png', new Size(32, 32), 4, [1]);
    var value = await ngin.sendObjWait(body);
    console.log(value);


    ngin.eventHandler.ready = true;

    await ngin.follow(100);
    
    await ngin.forward(100, new Pos(5, 0));

    body.id = 200;
    body.pos = new Pos(11,0);
    body.angle = 3;
    body.tilesInfo.data = [10];
    var value = await ngin.sendObjWait(body);
    console.log(value);


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
        if (contact.skin2 == 'missile') {
          await this.ngin.remove(contact.bid2);
        }

        await this.ngin.sendObj(new Image(new TilesInfo('kenney_pixelshmup/tiles_packed.png', new Size(16, 16), 12, [5]), new Pos(-1, -1), new Size(1,1), contact.bid2));
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

      var body = new Pbody('obj', new Pos(x-0.5 + 2*Math.sin(a), y-0.5 - 2*Math.cos(a)), new Size(1, 1), 101);
      body.angle = a;
      body.skin = 'missile';
      //body.contactReport = true;
      body.type = BodyType.dynamic;
      body.isSensor = false;
      body.tilesInfo = new TilesInfo('kenney_pixelshmup/tiles_packed.png', new Size(16, 16), 12, [1, 2, 3]);
      var value = await this.ngin.sendObjWait(body);
      console.log(value);

      await this.ngin.forward(101, new Pos(10, 0));
      //await this.ngin.follow(100);      
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
  
  