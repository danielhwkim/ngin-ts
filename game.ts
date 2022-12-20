var fs = require('fs');
var {EventHandler} = require("./ngin");
import {main, Nx} from "./nx";
import {CObject, CActionType, CAction, CPhysical, CVisible, CTileObject, CStage, CVec2, CSize, CBodyType, CBodyShape, CJoystickDirectionals} from "./cobj";


function conv(v, tileSize) {
    return Math.round(v*2.0/tileSize)/2.0;
}

function convInfo(info, tileSize) {
    info.x = conv(info.x, tileSize);
    info.y = conv(info.y, tileSize);
    info.width = conv(info.width, tileSize);
    info.height = conv(info.height, tileSize);
    return info;
}  

function addFruit(id:number, pos:CVec2, name:string) {
  var cobj = new CObject(id);
  cobj.info = "fruit";
  cobj.physical = new CPhysical(CBodyShape.circle, pos, CBodyType.static);
  cobj.physical.isSensor = true;
  cobj.visible = new CVisible([
    new CAction('Items/Fruits/' + name + '.png', new CSize(32, 32), [], CActionType.idle),
    new CAction('Items/Fruits/Collected.png', new CSize(32, 32), [], CActionType.hit, false),            
  ]);
  cobj.visible.scale = new CVec2(1.5, 1.5);
  for (var i=0; i<cobj.visible.actions.length; i++) {
    cobj.visible.actions[i].stepTime = 50/1000;
  }
  return cobj;
}

main('127.0.0.1', 4040, async (nx:Nx) =>  {
    nx.eventHandler = new InputHandler(nx);
    nx.eventHandler.objs = {};
    const j = JSON.parse(fs.readFileSync('./data/level03.json', 'utf8'));
  
    const tiles = j.layers[0];
    const objlayer = j.layers[1];
    const data = tiles['data'];
    const tileSize = j['tilewidth'];
    //const precision = 3;
    const size = new CSize(tiles.width, tiles.height);
  

    var stage = new CStage(size);
    //stage.debug = true;
    stage.background = 'Blue';
    stage.gravity = new CVec2(0, 60);
    stage.joystickDirectionals = CJoystickDirectionals.horizontal;
    await nx.sendObjWait(stage);


    await nx.sendObj(CTileObject('Terrain/Terrain (16x16).png', new CSize(tileSize, tileSize), data, new CVec2(0,0), size));
    nx.eventHandler.ready = true;
    const objs = objlayer.objects;


    for (let key in objs) {
      let obj = objs[key];
      console.log(obj.name, obj.id);
      obj.id += 100;
      convInfo(obj, tileSize);
      switch(obj.name) {
        case 'Apple':
        case 'Bananas':
        case 'Cherries':
        case 'Kiwi':
        case 'Orange':
        case 'Pineapple':
        case 'Strawberry':    
          await nx.sendObj(addFruit(obj.id, new CVec2(obj.x, obj.y), obj.name));
          break;

        case 'hero':
          obj.id = 1;
          var hero = nx.hero(obj.id, 'Mask Dude', new CVec2(obj.x - 0.5, obj.y - 2));
          hero.physical.shape = CBodyShape.actor;
          hero.physical.size = new CSize(2, 2);
          hero.physical.maskBits = 0x00FF;
          hero.visible.scale = new CVec2(2,2);
          hero.visible.pos = new CVec2(0, 0);
          await nx.sendObjWait(hero);
          nx.eventHandler.heroId = hero.id;
          break;

          case 'floor':
            var cobj = new CObject(obj.id);
            cobj.info = obj.name;
            cobj.physical = new CPhysical(CBodyShape.rectangle, new CVec2(obj.x, obj.y), CBodyType.static);
            cobj.physical.size = new CSize(obj.width,obj.height);
            await nx.sendObj(cobj);
            break;

          case 'bar':
            var cobj = new CObject(obj.id);
            cobj.info = obj.name;
            cobj.physical = new CPhysical(CBodyShape.rectangle, new CVec2(obj.x, obj.y), CBodyType.static);
            cobj.physical.size = new CSize(obj.width,obj.height);
            cobj.physical.passableBottom = true;
            await nx.sendObj(cobj);            
            break;

          case 'Box1':
          case 'Box2':
          case 'Box3':
            var cobj = new CObject(obj.id);
            cobj.info = 'box';
            cobj.physical = new CPhysical(CBodyShape.rectangle, new CVec2(obj.x, obj.y), CBodyType.static);
            cobj.physical.size = new CSize(obj.width,obj.height);
            cobj.visible = new CVisible([
              new CAction('Items/Boxes/' + obj.name + '/Idle.png', new CSize(28, 24), [], CActionType.idle),
              new CAction('Items/Boxes/' + obj.name + '/Hit (28x24).png', new CSize(28, 24), [], CActionType.hit, false),
            ]);
            cobj.visible.scale = new CVec2(28 / 18, 24 / 18);
            for (var i=0; i<cobj.visible.actions.length; i++) {
              cobj.visible.actions[i].stepTime = 50/1000;
            }            
            nx.eventHandler.objs[obj.id] = {name:obj.name, count:0};
            await nx.sendObj(cobj); 
            break;

          case 'Trampoline':
            var cobj = new CObject(obj.id);
            cobj.info = obj.name;
            cobj.physical = new CPhysical(CBodyShape.rectangle, new CVec2(obj.x, obj.y), CBodyType.static);
            cobj.physical.size = new CSize(obj.width,obj.height);
            cobj.physical.isSensor = true;
            cobj.visible = new CVisible([
              new CAction('Traps/Trampoline/Idle.png', new CSize(28, 28), [], CActionType.idle),
              new CAction('Traps/Trampoline/Jump (28x28).png', new CSize(28, 28), [], CActionType.hit, false),
            ]);
            for (var i=0; i<cobj.visible.actions.length; i++) {
              cobj.visible.actions[i].stepTime = 50/1000;
            }
            cobj.visible.scale = new CVec2(1.7, 1.7);
            cobj.visible.pos = new CVec2(0, -0.4);
            await nx.sendObj(cobj); 
            break;

        default:
          break;
      }
    }
});

class InputHandler extends EventHandler {

    nx;
    constructor(nx) {
        super(nx);
        this.nx = nx;
        this.key_down_left = false;
        this.key_down_right = false;
        //hero_contact_count = 0;
        this.hero_contacts = new Set();
        this.hero_jump_count = 0;
        this.dynamic_id = 1000;
        this.facingLeft = false;  
        this.ready = false;      
    }

    async handleContact(contact) {
      if (!this.ready) return;
      console.log(contact);
      if (contact.info1 == 'hero') {
        switch(contact.info2) {
          case 'floor':
          case 'bar':
            if (contact.isEnded == false) {
              if (contact.y < 0) {
                if (this.hero_contacts.size == 0) {
                  if (this.key_down_left || this.key_down_right) {
                    await this.nx.setActionType(contact.id1, CActionType.run, this.facingLeft);
                  } else {
                    await this.nx.setActionType(contact.id1, CActionType.idle, this.facingLeft);         
                  }
                  this.hero_jump_count = 0;                
                }
                this.hero_contacts.add(contact.id2);
              }
            } else {
              if (this.hero_contacts.has(contact.id2)) {
                this.hero_contacts.delete(contact.id2);
              }
            }
            break;
          case 'fruit':
            if (contact.isEnded == false) {
              await this.nx.setActionType(contact.id2, CActionType.hit, this.facingLeft);
            }
            break;
            case 'box':
            if (contact.isEnded == false) {
              //print(contact.x, contact.y)
              if (Math.abs(contact.y) > Math.abs(contact.x)) {
                const obj = this.objs[contact.id2];
                obj.count += 1
                await this.nx.setActionType(contact.id2, CActionType.hit, this.facingLeft);
              }
              if (contact.y < 0) {
                this.hero_jump_count = 0;
                await this.nx.lineary(contact.id1, -20);
              }
            }
            break;
          case 'Trampoline':
            if (contact.isEnded == false) {
              await this.nx.setActionType(contact.id2, CActionType.hit, this.facingLeft);
              await this.nx.lineary(contact.id1, -30);
              this.hero_jump_count = 0;
            }
            break;
          case 'Blocks':
            /*
            if (contact.type == 'begin') {
              await this.nginx.cmdIF2('action', contact.id2, contact.x, contact.y);
            }*/
            break;         
        }
      }
    }
  
    async handleEvent(event) {
      console.log(event);
      const c = event;
      if (c.isEnded == false)
        return;
  
      switch(event.info) {
        case 'box':
          var obj = this.objs[event.id];
          console.log(obj);
          
          if (obj.count == 2) {
            for (var i = 0; i < 4; i++) {
              var cobj = new CObject(this.dynamic_id++);
              cobj.info = "parts";
              cobj.physical = new CPhysical(CBodyShape.circle, new CVec2(event.x - 0.5 +0.1*i, event.y - 0.5), CBodyType.dynamic);
              cobj.physical.categoryBits = 0x0100;
              cobj.physical.maskBits = 0x0FFF;
              cobj.physical.size = new CSize(0.5, 0.5);
              //cobj.physical.density = 1.0;
              cobj.physical.contactReport = false;
              cobj.visible = new CVisible([
                new CAction('Items/Boxes/' + obj.name + '/Break.png', new CSize(28, 24), [i], CActionType.idle),
              ]);
              cobj.visible.scale = new CVec2(28 / 16, 24 / 16);
              await this.nx.sendObj(cobj);
            }

            //await this.nginx.opAction(c.id, c.x, c.y);
            await this.nx.remove(event.id);
            var cobj = addFruit(this.dynamic_id++, new CVec2(event.x - 0.5, event.y - 0.5), 'Bananas');
            //cobj.physical.type = CBodyType.dynamic;
            await this.nx.sendObj(cobj);
          } else {
            await this.nx.setActionType(event.id, CActionType.idle);
          }
          break;
        case 'Trampoline':
          await this.nx.setActionType(event.id, CActionType.idle);
          break;
        case 'fruit':
          await this.nx.remove(event.id);
          break;
        case 'hero':
          await this.nx.setActionType(event.id, CActionType.jump, this.facingLeft);
          break; 
      }
    }
  
    async handleKey(key) {
      console.log(key);
      
      if (key.isPressed == false) {
        switch (key.name) {
          case 'Arrow Left':
            this.key_down_left = false;
            if (this.key_down_right) {
                this.facingLeft = false;
                await this.nx.constx(this.heroId, 7);
                if (this.hero_contacts.size != 0) {
                  await this.nx.setActionType(this.heroId, CActionType.run, this.facingLeft);                    
                } else {
                  await this.nx.setActionType(this.heroId, CActionType.noChange, this.facingLeft);
                }
            } else {
              await this.nx.constx(this.heroId, 0);
              if (this.hero_contacts.size != 0) {
                await this.nx.setActionType(this.heroId, CActionType.idle, this.facingLeft);                  
              } else {
                await this.nx.setActionType(this.heroId, CActionType.noChange, this.facingLeft);                  
              }			
            }
          break;					
          case 'Arrow Right':
            this.key_down_right = false;
            if (this.key_down_left) {
                this.facingLeft = true;
                await this.nx.constx(this.heroId, -7);
                if (this.hero_contacts.size != 0) { 
                    await this.nx.setActionType(this.heroId, CActionType.run, this.facingLeft);     
                } else {
                  await this.nx.setActionType(this.heroId, CActionType.noChange, this.facingLeft);      
                }
            } else {
              await this.nx.constx(this.heroId, 0);
              if (this.hero_contacts.size != 0) {					
                await this.nx.setActionType(this.heroId, CActionType.idle, this.facingLeft);                               
              } else {
                await this.nx.setActionType(this.heroId, CActionType.noChange, this.facingLeft);                              					
              }
            }
          break;
        }
      } else {
        switch (key.name) {
          case 'Arrow Left':
            if (! this.key_down_left) {
                this.key_down_left = true;
                this.facingLeft = true;
                await this.nx.constx(this.heroId, -7);
                if (this.hero_contacts.size != 0) { 
                  await this.nx.setActionType(this.heroId, CActionType.run, this.facingLeft);                          
                } else {
                  await this.nx.setActionType(this.heroId, CActionType.noChange, this.facingLeft); 
                }
            } else {
              await this.nx.setActionType(this.heroId, CActionType.noChange, this.facingLeft);                      
            }
            break;
          case 'Arrow Right':
            if (! this.key_down_right) {
              this.key_down_right = true;
              this.facingLeft = false;
              await this.nx.constx(this.heroId, 7);
              if (this.hero_contacts.size != 0) { 		
                await this.nx.setActionType(this.heroId, CActionType.run, this.facingLeft);                            				
              } else {
                await this.nx.setActionType(this.heroId, CActionType.noChange, this.facingLeft);  
              }
            } else {
              await this.nx.setActionType(this.heroId, CActionType.noChange, this.facingLeft);                      
            }
            break;				
          case 'Arrow Up':	
            if (this.hero_contacts.size != 0) { 
              await this.nx.lineary(this.heroId, -20);
              await this.nx.setActionType(this.heroId, CActionType.jump, this.facingLeft);                          
              this.hero_jump_count = 0
            }
            else if (this.hero_jump_count < 1) {
              await this.nx.lineary(this.heroId, -20);
              await this.nx.setActionType(this.heroId, CActionType.doubleJump, this.facingLeft);                  
              this.hero_jump_count = 1   
            }
            break;
          }
      }
    }  
  
    
    async handleDirectional(directional) {
      console.log(directional);
      const c = directional;
      switch(c.direction) {
        case 'IDLE':
          await this.nx.setActionType(this.heroId, CActionType.idle, this.facingLeft);
          await this.nx.constx(this.heroId, 0);
          this.key_down_right = false;
          this.key_down_left = false;
          break;
        case 'MOVE_RIGHT':
          this.facingLeft = false;
          await this.nx.setActionType(this.heroId, CActionType.run, this.facingLeft);
          await this.nx.constx(this.heroId, 7*c.intensity/this.nx.precision);
          this.key_down_right = true;
          this.key_down_left = true;
          break;
        case 'MOVE_LEFT':
          this.facingLeft = true;
          await this.nx.setActionType(this.heroId, CActionType.run, this.facingLeft);
          await this.nx.constx(this.heroId, -7*c.intensity/this.nx.precision);            
          this.key_down_right = true;
          this.key_down_left = true;	  
          break;
      }
      console.log(c.direction);
    }
  
    async handleButton(button) {
      console.log(button);
      if (this.hero_contacts.size != 0) { 
        await this.nx.lineary(this.heroId, -20);
        await this.nx.setActionType(this.heroId, CActionType.jump, this.facingLeft);
        this.hero_jump_count = 0;
      } else if (this.hero_jump_count < 1) {
        await this.nx.lineary(this.heroId, -20);
        await this.nx.setActionType(this.heroId, CActionType.doubleJump, this.facingLeft);        
        this.hero_jump_count = 1;
      }
    }  
}
